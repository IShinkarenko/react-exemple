import { Check } from '@mui/icons-material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React, { memo } from 'react'

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#74D3D1',
    '& > div': {
      width: 8,
      height: 8,
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: 16,
        height: 16,
        background: 'transparent',
        border: '1px solid #74D3D1',
        borderRadius: '50%',
        top: '-4px',
        left: '-4px',
      },
    },
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#74D3D1',
    zIndex: 1,
    fontSize: 18,
  },
})

const QontoStepIcon = (props) => {
  const classes = useQontoStepIconStyles()
  const { active, completed } = props

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  )
}

export default memo(QontoStepIcon)
