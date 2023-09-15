import React from 'react'

import useStyles from './styles'

export const FormatDataRowPreview = React.memo(({ hasHeaders, rows }) => {
  const classes = useStyles()
  const headerRow = hasHeaders ? rows[0] : null
  const bodyRows = hasHeaders ? rows.slice(1) : rows

  return (
    <div className={classes.CSVImporter_FormatDataRowPreview}>
      <table className={classes.CSVImporter_FormatDataRowPreview__table}>
        {headerRow && (
          <thead>
            <tr>
              {headerRow.map((item, itemIndex) => (
                <th key={itemIndex}>{item}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((item, itemIndex) => (
                <td key={itemIndex}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})
