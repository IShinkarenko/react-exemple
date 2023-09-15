import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    profileTable: {
      '& tbody': {
        '& tr:first-child': {
          height: '70px',
          '@media(max-width: 580px)': {
            height: 'auto',
          },
        },
      },
    },
    select: {
      width: '100%',
      maxWidth: 500,
    },
  })
)
