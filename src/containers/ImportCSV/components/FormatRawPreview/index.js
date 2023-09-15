import React from 'react'

import { FormatErrorMessage } from './../FormatErrorMessage'
import useStyles from './styles'

const RAW_PREVIEW_SIZE = 500

export const FormatRawPreview = React.memo(({ chunk, warning, onCancelClick }) => {
  const classes = useStyles()
  const chunkSlice = chunk.slice(0, RAW_PREVIEW_SIZE)
  const chunkHasMore = chunk.length > RAW_PREVIEW_SIZE

  return (
    <div className={classes.CSVImporter_FormatRawPreview}>
      <div className={classes.CSVImporter_FormatRawPreview__scroll}>
        <pre className={classes.CSVImporter_FormatRawPreview__pre}>
          {chunkSlice}
          {chunkHasMore && <aside>...</aside>}
        </pre>
      </div>

      {warning ? (
        <FormatErrorMessage onCancelClick={onCancelClick}>
          {warning.message || String(warning)}: please check data formatting
        </FormatErrorMessage>
      ) : null}
    </div>
  )
})
