import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'

import useStyles from './styles'

export const FileSelector = ({ onSelected }) => {
  const classes = useStyles()
  const onSelectedRef = useRef(onSelected)
  onSelectedRef.current = onSelected

  const dropHandler = useCallback((acceptedFiles) => {
    // silently ignore if nothing to do
    if (acceptedFiles.length < 1) {
      return
    }

    const file = acceptedFiles[0]
    onSelectedRef.current(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: dropHandler,
  })

  return (
    <Box className={classes.CSVImporter_FileSelector} data-active={!!isDragActive} {...getRootProps()}>
      <input {...getInputProps()} accept=".csv" />

      <CloudUploadIcon sx={{ fontSize: '40px', mb: '14px', color: '#4b4b4b' }} />

      {isDragActive ? (
        <span>Drop CSV file here...</span>
      ) : (
        <Box>
          <Typography variant="body2">Drag-and-drop CSV file here, or click to select in folder</Typography>
        </Box>
      )}
    </Box>
  )
}
