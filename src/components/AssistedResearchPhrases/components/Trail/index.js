import { nanoid } from 'nanoid'
import React, { memo } from 'react'
import { a, useTrail } from 'react-spring'

import useStyles from './styles'

const Trail = ({ children, ...props }) => {
  const classes = useStyles()
  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    x: 0,
    height: 115,
    from: { opacity: 0, x: 40, height: 0 },
  })

  return (
    <div className={classes.trailsMain} {...props}>
      {trail.map(({ x, height, ...rest }, index) => {
        const uniqueId = nanoid()

        return (
          <a.div
            key={`${items[index]}` + uniqueId}
            className={classes.trailText}
            style={{ ...rest, transform: x.interpolate((x) => `translate3d(0,${x}px,0)`) }}
          >
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        )
      })}
    </div>
  )
}

export default memo(Trail)
