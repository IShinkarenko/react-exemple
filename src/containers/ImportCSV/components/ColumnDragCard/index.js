/* eslint-disable jsx-a11y/aria-role */
import React, { useMemo } from 'react'

import { PREVIEW_ROW_COUNT } from './../Parser'
import useStyles from './styles'

// @todo sort out "grabbing" cursor state (does not work with pointer-events:none)
export const ColumnDragCard = ({
  hasHeaders,
  column: optionalColumn,
  rowCount = PREVIEW_ROW_COUNT,
  hasError,
  isAssigned,
  isShadow,
  isDraggable,
  isDragged,
  isDropIndicator,
}) => {
  const classes = useStyles()
  const isDummy = !optionalColumn

  const column = useMemo(
    () =>
      optionalColumn || {
        index: -1,
        code: '',
        header: hasHeaders ? '' : undefined,
        values: [...new Array(PREVIEW_ROW_COUNT)].map(() => ''),
      },
    [optionalColumn, hasHeaders]
  )

  const headerValue = column.header
  const dataValues = column.values.slice(0, headerValue === undefined ? rowCount : rowCount - 1)

  return (
    // not changing variant dynamically because it causes a height jump
    <div
      key={isDummy || isShadow ? 1 : isDropIndicator ? 2 : 0} // force re-creation to avoid transition anim
      className={classes.CSVImporter_ColumnDragCard}
      data-dummy={!!isDummy}
      data-error={!!hasError}
      data-shadow={!!isShadow}
      data-draggable={!!isDraggable}
      data-dragged={!!isDragged}
      data-drop-indicator={!!isDropIndicator}
    >
      <div className={classes.CSVImporter_ColumnDragCard__cardHeader}>
        {isDummy ? <var role="text">Unassigned field</var> : <var role="text">Column {column.code}</var>}
        {isDummy || isAssigned ? '\u00a0' : <b aria-hidden>{column.code}</b>}
      </div>

      {headerValue !== undefined ? (
        <div className={classes.CSVImporter_ColumnDragCard__cardValue} data-header>
          {headerValue || '\u00a0'}
        </div>
      ) : null}

      {/* all values grouped into one readable string */}
      <div role="text">
        {dataValues.map((value, valueIndex) => (
          <div key={valueIndex} className={classes.CSVImporter_ColumnDragCard__cardValue}>
            {value || '\u00a0'}
          </div>
        ))}
      </div>
    </div>
  )
}
