import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, LinearProgress, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import Particles from 'react-tsparticles'

import useStyles from './styles'

const SearchLoader = () => {
  const classes = useStyles()
  const [progress, setProgress] = React.useState(0)
  const [seconds, setSeconds] = useState(8500)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (seconds === 0) {
          return 100
        }

        if (seconds > 0) {
          setSeconds(seconds - 500)
          const diff = (500 * 100) / 8500

          return Math.min(oldProgress + diff, 100)
        }
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [seconds])

  return (
    <Dialog open={true} maxWidth={'sm'} fullWidth={true}>
      <Particles
        id="tsparticles"
        className={classes.particles}
        options={{
          fpsLimit: 60,
          fullScreen: { enable: false, zIndex: 0 },
          interactivity: {
            detectsOn: 'canvas',
            modes: {
              bubble: {
                distance: 400,
                duration: 4,
                opacity: 0.8,
                size: 20,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#74d3d1',
            },
            links: {
              color: '#74d3d1',
              distance: 150,
              enable: true,
              opacity: 0.7,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 2.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 190,
            },
            opacity: {
              value: 0.7,
            },
            shape: {
              type: 'circle',
            },
            size: {
              random: true,
              value: 3,
            },
          },
          detectRetina: true,
        }}
      />

      <DialogContent classes={{ root: classes.loadingDialogContent }}>
        <DialogTitle className={classes.loadingDialogTitle}>
          Expandigo is searching for the best companies for you to expand your opportunities...
        </DialogTitle>

        <DialogContentText component="div">
          <LinearProgress variant="determinate" value={progress} />
          <Box className={classes.dialogCounter}>
            <Typography className={classes.dialogCount}>Companies Found</Typography>
            <CountUp start={0} end={1000} duration={8.7} className={classes.dialogCounterNumber} />
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SearchLoader)
