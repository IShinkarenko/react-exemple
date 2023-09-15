import InfoIcon from '@mui/icons-material/Info'
import { Box, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { ColumnDragObject } from './../ColumnDragObject'
import { ColumnDragSourceArea } from './../ColumnDragSourceArea'
import { useColumnDragState } from './../ColumnDragState'
import { ColumnDragTargetArea } from './../ColumnDragTargetArea'
import { generateColumnCode, generatePreviewColumns } from './../ColumnPreview'
import { ImporterFrame } from './../ImporterFrame'
import useStyles from './styles'

export const ColumnPicker = ({ fields, preview, onAccept, onCancel }) => {
  const classes = useStyles()

  const columns = useMemo(
    () =>
      generatePreviewColumns(preview.firstRows, preview.hasHeaders).map((item) => ({
        ...item,
        code: generateColumnCode(item.index),
      })),
    [preview]
  )

  const initialAssignments = useMemo(() => {
    // prep insensitive/fuzzy match stems for known columns
    const columnStems = columns.map((column) => {
      const trimmed = column.header && column.header.trim()

      if (!trimmed) {
        return undefined
      }

      return trimmed.toLowerCase()
    })

    // pre-assign corresponding fields
    const result = {}
    const assignedColumnIndexes = []

    fields.forEach((field) => {
      // find by field stem
      const fieldLabelStem = field.label.trim().toLowerCase() // @todo consider normalizing other whitespace/non-letters

      const matchingColumnIndex = columnStems.findIndex((columnStem, columnIndex) => {
        // no headers or no meaningful stem value
        if (columnStem === undefined) {
          return false
        }

        // always check against assigning twice
        if (assignedColumnIndexes[columnIndex]) {
          return false
        }

        return columnStem === fieldLabelStem
      })

      // assign if found
      if (matchingColumnIndex !== -1) {
        assignedColumnIndexes[matchingColumnIndex] = true
        result[field.name] = matchingColumnIndex
      }
    })

    return result
  }, [fields, columns])

  // track which fields need to show validation warning
  const [fieldTouched, setFieldTouched] = useState({})
  const [validationError, setValidationError] = useState(null > null)

  const {
    fieldAssignments,
    dragState,
    dragEventBinder,
    dragHoverHandler,
    columnSelectHandler,
    assignHandler,
    unassignHandler,
  } = useColumnDragState(fields, initialAssignments, (fieldName) => {
    setFieldTouched((prev) => {
      if (prev[fieldName]) {
        return prev
      }

      const copy = { ...prev }
      copy[fieldName] = true
      return copy
    })
  })

  return (
    <ImporterFrame
      fileName={preview.file.name}
      subtitle="Select Columns"
      error={validationError}
      onCancel={onCancel}
      onNext={() => {
        // mark all fields as touched
        const fullTouchedMap = {}
        fields.some((field) => {
          fullTouchedMap[field.name] = true
        })
        setFieldTouched(fullTouchedMap)

        // submit if validation succeeds
        const hasUnassignedRequired = fields.some(
          (field) => !field.isOptional && fieldAssignments[field.name] === undefined
        )

        if (!hasUnassignedRequired) {
          onAccept({ ...fieldAssignments })
        } else {
          setValidationError('Please assign all required fields')
        }
      }}
    >
      <ColumnDragSourceArea
        columns={columns}
        fieldAssignments={fieldAssignments}
        dragState={dragState}
        eventBinder={dragEventBinder}
        onSelect={columnSelectHandler}
        onUnassign={unassignHandler}
      />
      <Box className={classes.infoBox}>
        <InfoIcon />
        <Typography>
          The columns above appear in your CSV file. The fields below will compose the profile of your imported Company.
          We have tried to assign them for you where CSV column names matched destination field names. You can drag and
          drop columns to their intended fields below to establish a mapping. If a mapping was not intended, you can
          click the (X) to return it to your list of available columns above.
        </Typography>
      </Box>
      <ColumnDragTargetArea
        hasHeaders={preview.hasHeaders}
        fields={fields}
        columns={columns}
        fieldTouched={fieldTouched}
        fieldAssignments={fieldAssignments}
        dragState={dragState}
        eventBinder={dragEventBinder}
        onHover={dragHoverHandler}
        onAssign={assignHandler}
        onUnassign={unassignHandler}
      />

      <ColumnDragObject dragState={dragState} />
    </ImporterFrame>
  )
}
