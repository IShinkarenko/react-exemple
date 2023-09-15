import AddCircleIcon from '@mui/icons-material/AddCircle'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ShareIcon from '@mui/icons-material/Share'
import { Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import { INSTANCE_STATUS_SUGGESTED } from 'constant'
import React from 'react'

import useStyles from './styles'

const ResourceItem = ({ resource }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h6">{resource.name}</Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="play/pause" size="large">
            <PlayArrowIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="play/pause" size="large">
            <ShareIcon className={classes.icon} />
          </IconButton>
          {resource.instanceStatus === INSTANCE_STATUS_SUGGESTED ? (
            <IconButton aria-label="include" size="large">
              <AddCircleIcon className={classes.suggestedIcon} />
            </IconButton>
          ) : undefined}
        </div>
      </div>
      <CardMedia className={classes.cover} image={`/static/example-resource-${resource.orderIndex}.jpg`} />
    </Card>
  )
}

export default ResourceItem
