import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { ColumnPicker } from './components/ColumnPicker'
import { generatePreviewColumns } from './components/ColumnPreview'
import { FileSelector } from './components/FileSelector'
import { FormatPreview } from './components/FormatPreview'
import { ProgressDisplay } from './components/ProgressDisplay'
import useStyles from './styles'

const FieldDefinitionContext = React.createContext(null)

let fieldIdCount = 0

// defines a field to be filled from file column during import
export const ImporterField = ({ name, label, optional }) => {
  const fieldId = useMemo(() => (fieldIdCount += 1), [])
  const fieldSetter = useContext(FieldDefinitionContext)

  // update central list as needed
  useEffect(() => {
    if (!fieldSetter) {
      console.error('importer field must be a child of importer') // @todo
      return
    }

    fieldSetter((prev) => {
      const newField = { id: fieldId, name, label, isOptional: !!optional }

      const copy = [...prev]
      const existingIndex = copy.findIndex((item) => item.name === name)

      // preserve existing array position if possible
      // @todo keep both copies in a map to deal with dynamic fields better
      if (existingIndex === -1) {
        copy.push(newField)
      } else {
        copy[existingIndex] = newField
      }

      return copy
    })
  }, [fieldId, fieldSetter, name, label, optional])

  // on component unmount, remove this field from list by ID
  useEffect(() => {
    if (!fieldSetter) {
      console.error('importer field must be a child of importer') // @todo
      return
    }

    return () => {
      fieldSetter((prev) => {
        return prev.filter((field) => field.id !== fieldId)
      })
    }
  }, [fieldId, fieldSetter])

  return null
}

const ContentWrapper = ({ setFields, preview, externalPreview, content, children }) => {
  const classes = useStyles()
  const finalContent = useMemo(() => {
    return typeof content === 'function'
      ? content({
          file: preview && preview.file,
          preview: externalPreview,
        })
      : content
  }, [preview, externalPreview, content])

  return (
    <div className={classes.CSVImporter_Importer}>
      {children}

      <FieldDefinitionContext.Provider value={setFields}>{finalContent}</FieldDefinitionContext.Provider>
    </div>
  )
}

export function Importer({
  assumeNoHeaders,
  restartable,
  processChunk,
  onStart,
  onComplete,
  onClose,
  children: content,
  ...customPapaParseConfig
}) {
  // helper to combine our displayed content and the user code that provides field definitions
  const [fields, setFields] = useState([])

  const [selectedFile, setSelectedFile] = useState(null)

  const [preview, setPreview] = useState(null)
  const [formatAccepted, setFormatAccepted] = useState(false)

  const [fieldAssignments, setFieldAssignments] = useState(null)

  const fileHandler = useCallback((file) => {
    setSelectedFile(file)
  }, [])

  const externalPreview = useMemo(() => {
    // generate stable externally-visible data objects
    const externalColumns = preview && generatePreviewColumns(preview.firstRows, preview.hasHeaders)
    return (
      preview &&
      externalColumns && {
        rawData: preview.firstChunk,
        columns: externalColumns,
        skipHeaders: !preview.hasHeaders,
        parseWarning: preview.parseWarning,
      }
    )
  }, [preview])

  if (selectedFile === null) {
    return (
      <ContentWrapper setFields={setFields} preview={preview} externalPreview={externalPreview} content={content}>
        <FileSelector onSelected={fileHandler} />
      </ContentWrapper>
    )
  }

  if (!formatAccepted || preview === null || externalPreview === null) {
    return (
      <ContentWrapper setFields={setFields} preview={preview} externalPreview={externalPreview} content={content}>
        <FormatPreview
          customConfig={customPapaParseConfig}
          file={selectedFile}
          assumeNoHeaders={assumeNoHeaders}
          currentPreview={preview}
          onChange={(parsedPreview) => {
            setPreview(parsedPreview)
          }}
          onAccept={() => {
            setFormatAccepted(true)
          }}
          onCancel={() => {
            setSelectedFile(null)
            setPreview(null)
          }}
        />
      </ContentWrapper>
    )
  }

  if (fieldAssignments === null) {
    return (
      <ContentWrapper setFields={setFields} preview={preview} externalPreview={externalPreview} content={content}>
        <ColumnPicker
          fields={fields}
          preview={preview}
          onAccept={(assignments) => {
            setFieldAssignments(assignments)
          }}
          onCancel={() => {
            // keep existing preview data
            setFormatAccepted(false)
          }}
        />
      </ContentWrapper>
    )
  }

  return (
    <ContentWrapper setFields={setFields} preview={preview} externalPreview={externalPreview} content={content}>
      <ProgressDisplay
        preview={preview}
        externalPreview={externalPreview}
        fieldAssignments={fieldAssignments}
        processChunk={processChunk}
        onStart={onStart}
        onRestart={
          restartable
            ? () => {
                // reset all state
                setSelectedFile(null)
                setPreview(null)
                setFormatAccepted(false)
                setFieldAssignments(null)
              }
            : undefined
        }
        onComplete={onComplete}
        onClose={onClose}
      />
    </ContentWrapper>
  )
}
