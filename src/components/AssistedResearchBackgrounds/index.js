import { Box } from '@mui/material'
import React, { memo } from 'react'
import { animated, config, useTransition } from 'react-spring'

import useStyles from './styles'

const slides = [
  { id: 0, url: 'https://cdn.expandigo.com/system/locales/en-US/develop-app/step_1.jpeg' },
  { id: 1, url: 'https://cdn.expandigo.com/system/locales/en-US/develop-app/step_2.jpeg' },
  { id: 2, url: 'https://cdn.expandigo.com/system/locales/en-US/develop-app/step_3.jpeg' },
]

const AssistedResearchBackgrounds = ({ activeStep, className }) => {
  const classes = useStyles()

  const transitions = useTransition(slides[activeStep], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  })

  return (
    <Box className={(classes.bgWrap, className)}>
      {transitions((styles, item) => (
        <animated.div
          style={{
            ...styles,
            height: '100%',
          }}
        >
          <Box style={{ backgroundImage: `url(${item.url})` }} className={classes.bgImages}></Box>
        </animated.div>
      ))}
    </Box>
  )
}

export default memo(AssistedResearchBackgrounds)
