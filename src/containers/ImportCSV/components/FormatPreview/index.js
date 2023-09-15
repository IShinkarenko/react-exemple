import React, { useEffect, useMemo, useRef, useState } from 'react'

import { FormatDataRowPreview } from './../FormatDataRowPreview'
import { FormatErrorMessage } from './../FormatErrorMessage'
import { FormatRawPreview } from './../FormatRawPreview'
import { ImporterFrame } from './../ImporterFrame'
import { parsePreview } from './../Parser'
import useStyles from './styles'

export const FormatPreview = ({
  customConfig,
  file,
  assumeNoHeaders,
  currentPreview,
  onChange,
  onAccept,
  onCancel,
}) => {
  const classes = useStyles()

  // augmented PreviewResults from parser
  const [preview, setPreview] = useState(
    () =>
      currentPreview && {
        parseError: undefined,
        ...currentPreview,
      }
  )

  // wrap in ref to avoid triggering effect
  const customConfigRef = useRef(customConfig)
  customConfigRef.current = customConfig
  const assumeNoHeadersRef = useRef(assumeNoHeaders)
  assumeNoHeadersRef.current = assumeNoHeaders
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  // notify of current state
  useEffect(() => {
    onChangeRef.current(preview && !preview.parseError ? preview : null)
  }, [preview])

  // perform async preview parse once for the given file
  const asyncLockRef = useRef(0)
  useEffect(() => {
    const oplock = asyncLockRef.current

    // lock in the current PapaParse config instance for use in multiple spots
    const papaParseConfig = customConfigRef.current

    // kick off the preview parse
    parsePreview(file, papaParseConfig).then((results) => {
      // ignore if stale
      if (oplock !== asyncLockRef.current) {
        return
      }

      if (results.parseError) {
        setPreview(results)
      } else {
        // pre-fill headers flag (only possible with >1 lines)
        const hasHeaders = !assumeNoHeadersRef.current && !results.isSingleLine

        setPreview({ ...results, papaParseConfig, hasHeaders })
      }
    })

    return () => {
      // invalidate current oplock on change or unmount
      asyncLockRef.current += 1
    }
  }, [file, setPreview])

  // preview result content to display
  const reportBlock = useMemo(() => {
    if (!preview) {
      return null
    }

    if (preview.parseError) {
      return (
        <div className={classes.CSVImporter_FormatPreview__mainResultBlock}>
          <FormatErrorMessage onCancelClick={onCancel}>
            Import error: <b>{preview.parseError.message || String(preview.parseError)}</b>
          </FormatErrorMessage>
        </div>
      )
    }

    return (
      <div className={classes.CSVImporter_FormatPreview__mainResultBlock}>
        <div className={classes.CSVImporter_FormatPreview__header}>Raw File Contents</div>

        <FormatRawPreview chunk={preview.firstChunk} warning={preview.parseWarning} onCancelClick={onCancel} />

        {preview.parseWarning ? null : (
          <>
            <div className={classes.CSVImporter_FormatPreview__header}>
              Preview Import
              {/* {!preview.isSingleLine && ( // hide setting if only one line anyway
                <label className={classes.CSVImporter_FormatPreview__headerToggle}>
                  <input
                    type="checkbox"
                    checked={preview.hasHeaders}
                    onChange={() => {
                      setPreview((prev) =>
                        prev && !prev.parseError // appease type safety
                          ? {
                              ...prev,
                              hasHeaders: !prev.hasHeaders,
                            }
                          : prev
                      )
                    }}
                  />
                  <span>Data has headers</span>
                </label>
              )} */}
            </div>
            <FormatDataRowPreview hasHeaders={preview.hasHeaders} rows={preview.firstRows} />
          </>
        )}
      </div>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, onCancel, setPreview])

  return (
    <ImporterFrame
      fileName={file.name}
      nextDisabled={!preview || !!preview.parseError || !!preview.parseWarning}
      onNext={() => {
        if (!preview || preview.parseError) {
          throw new Error('unexpected missing preview info')
        }

        onAccept()
      }}
      onCancel={onCancel}
    >
      {reportBlock || <div className={classes.CSVImporter_FormatPreview__mainPendingBlock}>Loading preview...</div>}
    </ImporterFrame>
  )
}
