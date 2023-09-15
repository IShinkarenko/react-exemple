import { Box, LinearProgress, Typography } from '@mui/material'
import Particles from 'react-tsparticles'

import useStyles from './styles'

const ExpandFormLoader = ({ title, subtitle, progress }) => {
  const classes = useStyles()

  return (
    <Box>
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
      <Box className={classes.loadingDialogContent}>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h6">{subtitle}</Typography>
      </Box>
    </Box>
  )
}

export default ExpandFormLoader
