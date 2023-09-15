import Papa from 'papaparse'
import { ReadableWebToNodeStream } from 'readable-web-to-node-stream'

const BOM_CODE = 65279 // 0xFEFF

export const PREVIEW_ROW_COUNT = 5

// polyfill as implemented in https://github.com/eligrey/Blob.js/blob/master/Blob.js#L653
// (this is for Safari pre v14.1)
function streamForBlob(blob) {
  if (blob.stream) {
    return blob.stream()
  }

  const res = new Response(blob)
  if (res.body) {
    return res.body
  }

  throw new Error('This browser does not support client-side file reads')
}

export function parsePreview(file, customConfig) {
  // wrap synchronous errors in promise
  return new Promise((resolve) => {
    let firstChunk = null
    let firstWarning = undefined
    const rowAccumulator = []

    function reportSuccess() {
      // PapaParse normally complains first anyway, but might as well flag it
      if (rowAccumulator.length === 0) {
        return {
          parseError: new Error('File is empty'),
        }
      }

      // remember whether this file has only one line
      const isSingleLine = rowAccumulator.length === 1

      // fill preview with blanks if needed
      while (rowAccumulator.length < PREVIEW_ROW_COUNT) {
        rowAccumulator.push([])
      }

      resolve({
        file,
        parseError: undefined,
        parseWarning: firstWarning || undefined,
        firstChunk: firstChunk || '',
        firstRows: rowAccumulator,
        isSingleLine,
      })
    }

    // true streaming support for local files (@todo wait for upstream fix)
    // @todo close the stream
    const nodeStream = new ReadableWebToNodeStream(streamForBlob(file))
    Papa.parse(nodeStream, {
      ...customConfig,

      chunkSize: 10000, // not configurable, preview only
      preview: PREVIEW_ROW_COUNT,
      skipEmptyLines: true,
      error: (error) => {
        resolve({
          parseError: error,
        })
      },
      beforeFirstChunk: (chunk) => {
        firstChunk = chunk
      },
      chunk: ({ data, errors }, parser) => {
        // ignoring possible leading BOM
        data.forEach((row) => {
          rowAccumulator.push(row.map((item) => (typeof item === 'string' ? item : '')))
        })

        if (errors.length > 0 && !firstWarning) {
          firstWarning = errors[0]
        }

        // finish parsing after first chunk
        nodeStream.pause() // parser does not pause source stream, do it here explicitly
        parser.abort()

        reportSuccess()
      },
      complete: reportSuccess,
    })
  }).catch((error) => {
    return {
      parseError: error, // delegate message display to UI logic
    }
  })
}

export function processFile(preview, fieldAssignments, reportProgress, callback) {
  const { file, hasHeaders, papaParseConfig } = preview
  const fieldNames = Object.keys(fieldAssignments)

  // wrap synchronous errors in promise
  return new Promise((resolve, reject) => {
    // skip first line if needed
    let skipLine = hasHeaders
    let skipBOM = !hasHeaders
    let processedCount = 0

    // true streaming support for local files (@todo wait for upstream fix)
    const nodeStream = new ReadableWebToNodeStream(streamForBlob(file))
    Papa.parse(nodeStream, {
      ...papaParseConfig,
      chunkSize: papaParseConfig.chunkSize || 10000, // our own preferred default

      error: (error) => {
        reject(error)
      },
      chunk: ({ data }, parser) => {
        // pause to wait until the rows are consumed
        nodeStream.pause() // parser does not pause source stream, do it here explicitly
        parser.pause()

        const skipped = skipLine && data.length > 0

        const rows = (skipped ? data.slice(1) : data).map((row) => {
          const stringRow = row.map((item) => (typeof item === 'string' ? item : ''))

          // perform BOM skip on first value
          if (skipBOM && stringRow.length > 0) {
            skipBOM = false
            stringRow[0] = stringRow[0].charCodeAt(0) === BOM_CODE ? stringRow[0].substring(1) : stringRow[0]
          }

          const record = {}

          fieldNames.forEach((fieldName) => {
            const columnIndex = fieldAssignments[fieldName]
            if (columnIndex !== undefined) {
              record[fieldName] = stringRow[columnIndex]
            }
          })

          return record
        })

        // clear line skip flag if there was anything to skip
        if (skipped) {
          skipLine = false
        }

        // info snapshot for processing callback
        const info = {
          startIndex: processedCount,
        }

        processedCount += rows.length

        // @todo collect errors
        reportProgress(rows.length)

        // wrap sync errors in promise
        // (avoid invoking callback if there are no rows to consume)
        const whenConsumed = new Promise((resolve) => {
          const result = rows.length ? callback(rows, info) : undefined

          // introduce delay to allow a frame render
          setTimeout(() => resolve(result), 0)
        })

        // unpause parsing when done
        whenConsumed.then(
          () => {
            nodeStream.resume()
            parser.resume()
          },
          () => {
            // @todo collect errors
            nodeStream.resume()
            parser.resume()
          }
        )
      },
      complete: () => {
        resolve()
      },
    })
  })
}
