import { Button } from '@mui/material'
import { animated, useChain, useSpring, useSpringRef, useTransition } from '@react-spring/web'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'

import ExpandForm from '../ExpandForm'
import useStyles from './styles'

const DEFAULT_HEIGHT = '45px'

const Expand = ({ name, socialLinks, handleToggleExpandPannel, open }) => {
  const classes = useStyles()
  const { t } = useTranslation('relationships')
  // The height of the content inside of the accordion
  const [contentHeight, setContentHeight] = useState(DEFAULT_HEIGHT)
  // Gets the height of the element (ref)
  const [ref, { height }] = useMeasure()

  const springApi = useSpringRef()
  const transitionStyles = useSpring({
    ref: springApi,
    // config: config.gentle,
    from: { width: '15%', height: '5%', maxHeight: '45px' },
    to: {
      width: open ? '100%' : '15%',
      height: open ? `${contentHeight + 35}px` : DEFAULT_HEIGHT,
      maxHeight: open ? `${contentHeight + 35}px` : DEFAULT_HEIGHT,
      background: open ? 'rgb(234, 238, 243)' : '#74d3d1',
      position: open ? 'absolute' : 'absolute',
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(open ? [ExpandForm] : [], {
    ref: transApi,
    from: { opacity: 0 }, //scale: 0
    enter: { opacity: 1 }, // scale: 1
    leave: { opacity: 0, scale: 0 }, //scale: 0
  })

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [0, open ? 0.1 : 0])

  useEffect(() => {
    //Sets initial height
    setContentHeight(height)

    //Adds resize event listener
    window.addEventListener('resize', setContentHeight(height))

    // Clean-up
    return window.removeEventListener('resize', setContentHeight(height))
  }, [height])

  return (
    <animated.div style={transitionStyles} className={classes.container}>
      {!open && (
        <Button className={classes.expandButton} onClick={handleToggleExpandPannel}>
          <Image src="/static/emblem.png" alt="Expandigo" width={20} height={20} />
          {t('Expand')}
        </Button>
      )}

      {transition((style, Component) => {
        return (
          <animated.div className={classes.expandContainer} ref={ref} style={style}>
            <Component handleToggleExpandPannel={handleToggleExpandPannel} name={name} socialLinks={socialLinks} />
          </animated.div>
        )
      })}
    </animated.div>
  )
}

export default Expand
