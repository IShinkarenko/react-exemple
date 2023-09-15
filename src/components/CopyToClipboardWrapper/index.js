import FileCopyIcon from '@mui/icons-material/FileCopy'
import { Box, Tooltip } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import React, { memo, useCallback, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const useStyles = makeStyles(() =>
  createStyles({
    copyIcon: {
      fontSize: '15px',
      marginLeft: '15px',
      cursor: 'pointer',
    },
  })
)

const CopyToClipboardWrapper = ({ children, value, className, isIcon = true }) => {
  const classes = useStyles()
  const [isCopied, setIsCopied] = useState(false)
  const tooltipTitle = isCopied ? 'Copied' : 'Copy'

  const handleCopy = useCallback(() => {
    setIsCopied(true)
  }, [])

  return (
    <CopyToClipboard text={value} onCopy={handleCopy}>
      <Box display="flex" alignItems="center" className={className}>
        {children}

        {isIcon && (
          <Tooltip title={tooltipTitle} placement={'top'} arrow>
            <FileCopyIcon color="action" className={classes.copyIcon} />
          </Tooltip>
        )}
      </Box>
    </CopyToClipboard>
  )
}

export default memo(CopyToClipboardWrapper)
