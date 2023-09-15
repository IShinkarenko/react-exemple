import React, { useMemo, useState } from 'react'

import { ColumnDragCard } from './../ColumnDragCard'
//import { Column } from './../ColumnPreview'
import { IconButton } from './../IconButton'
import useStyles from './styles'

const SOURCES_PAGE_SIZE = 5

// @todo readable status text if not mouse-drag
//const SourceBox = ({ column = Column, fieldAssignments, dragState, eventBinder, onSelect, onUnassign }) => {
const SourceBox = ({ column, fieldAssignments, dragState, eventBinder, onSelect, onUnassign }) => {
  const classes = useStyles()
  const isDragged = dragState ? column === dragState.column : false

  const isAssigned = useMemo(
    () => Object.keys(fieldAssignments).some((fieldName) => fieldAssignments[fieldName] === column.index),
    [fieldAssignments, column]
  )

  const eventHandlers = useMemo(() => eventBinder(column), [eventBinder, column])

  return (
    <div className={classes.CSVImporter_ColumnDragSourceArea__box}>
      <div {...(isAssigned ? {} : eventHandlers)}>
        <ColumnDragCard
          column={column}
          isAssigned={isAssigned}
          isShadow={isDragged || isAssigned}
          isDraggable={!dragState && !isDragged && !isAssigned}
        />
      </div>

      {/* tab order after column contents */}
      <div className={classes.CSVImporter_ColumnDragSourceArea__boxAction}>
        {isAssigned ? (
          <IconButton
            key="clear" // key-prop helps clear focus on click
            label="Clear column assignment"
            small
            type="replay"
            onClick={() => {
              onUnassign(column)
            }}
          />
        ) : (
          <IconButton
            key="dragSelect" // key-prop helps clear focus on click
            focusOnly
            label={dragState && dragState.column === column ? 'Unselect column' : 'Select column for assignment'}
            small
            type="back"
            onClick={() => {
              onSelect(column)
            }}
          />
        )}
      </div>
    </div>
  )
}

// @todo current page indicator (dots)
export const ColumnDragSourceArea = ({ columns, fieldAssignments, dragState, eventBinder, onSelect, onUnassign }) => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [pageChanged, setPageChanged] = useState(false)
  const pageCount = Math.ceil(columns.length / SOURCES_PAGE_SIZE)

  const start = page * SOURCES_PAGE_SIZE
  const pageContents = columns
    .slice(start, start + SOURCES_PAGE_SIZE)
    .map((column, columnIndex) => (
      <SourceBox
        key={columnIndex}
        column={column}
        fieldAssignments={fieldAssignments}
        dragState={dragState}
        eventBinder={eventBinder}
        onSelect={onSelect}
        onUnassign={onUnassign}
      />
    ))

  while (pageContents.length < SOURCES_PAGE_SIZE) {
    pageContents.push(
      <div key={pageContents.length} className={classes.CSVImporter_ColumnDragSourceArea__pageFiller} />
    )
  }

  return (
    <section className={classes.CSVImporter_ColumnDragSourceArea} aria-label="Columns to import">
      <div className={classes.CSVImporter_ColumnDragSourceArea__control}>
        <IconButton
          label="Show previous columns"
          type="back"
          disabled={page === 0}
          onClick={() => {
            setPage((prev) => Math.max(0, prev - 1))
            setPageChanged(true)
          }}
        />
      </div>
      <div className={classes.CSVImporter_ColumnDragSourceArea__page}>
        {dragState && !dragState.pointerStartInfo ? (
          <div className={classes.CSVImporter_ColumnDragSourceArea__pageIndicator} role="status">
            Assigning column {dragState.column.code}
          </div>
        ) : (
          // show page number if needed (and treat as status role if it has changed)
          // @todo changing role to status does not seem to work
          pageCount > 1 && (
            <div
              className={classes.CSVImporter_ColumnDragSourceArea__pageIndicator}
              role={pageChanged ? 'status' : 'text'}
            >
              Page {page + 1} of {pageCount}
            </div>
          )
        )}

        {pageContents}
      </div>
      <div className={classes.CSVImporter_ColumnDragSourceArea__control}>
        <IconButton
          label="Show next columns"
          type="forward"
          disabled={page === pageCount - 1}
          onClick={() => {
            setPage((prev) => Math.min(pageCount - 1, prev + 1))
          }}
        />
      </div>
    </section>
  )
}
