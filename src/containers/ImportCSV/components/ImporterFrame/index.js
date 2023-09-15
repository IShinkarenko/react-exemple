import { Alert, AlertTitle, Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'

import { IconButton } from './../IconButton'
import { TextButton } from './../TextButton'
import useStyles from './styles'

export const ImporterFrame = ({
  fileName,
  subtitle,
  secondaryDisabled,
  secondaryLabel,
  nextDisabled,
  nextLabel,
  error,
  onSecondary,
  onNext,
  onCancel,
  children,
}) => {
  const classes = useStyles()
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    if (subtitleRef.current) {
      subtitleRef.current.focus()
    } else if (titleRef.current) {
      titleRef.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.CSVImporter_ImporterFrame}>
      <div className={classes.CSVImporter_ImporterFrame__header}>
        <IconButton label="Go to previous step" type="arrowBack" disabled={!onCancel} onClick={onCancel} />

        <div className={classes.CSVImporter_ImporterFrame__headerTitle} tabIndex={-1} ref={titleRef}>
          {fileName}
        </div>

        {subtitle ? (
          <>
            <div className={classes.CSVImporter_ImporterFrame__headerCrumbSeparator}>
              <span />
            </div>
            <div className={classes.CSVImporter_ImporterFrame__headerSubtitle} tabIndex={-1} ref={subtitleRef}>
              {subtitle}
            </div>
          </>
        ) : null}
      </div>

      {children}

      {error && error.length > 0 && (
        <Box flex="1" mb={1} mt={4}>
          <Alert severity="error">
            <AlertTitle>Errors</AlertTitle>
            {error}
          </Alert>
        </Box>
      )}

      <div className={classes.CSVImporter_ImporterFrame__footer}>
        <div className={classes.CSVImporter_ImporterFrame__footerFill} />

        {secondaryLabel ? (
          <div className={classes.CSVImporter_ImporterFrame__footerSecondary}>
            <TextButton disabled={!!secondaryDisabled} onClick={onSecondary}>
              {secondaryLabel}
            </TextButton>
          </div>
        ) : null}
        <TextButton disabled={!!nextDisabled} onClick={onNext}>
          {nextLabel || 'Next'}
        </TextButton>
      </div>
    </div>
  )
}
