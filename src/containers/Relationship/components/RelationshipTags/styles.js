import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    relationshipTagsWrapper: {
      padding: 14,
    },
    relationshipTagsItem: {
      marginBottom: 24,
      '& > div:first-child': {
        marginBottom: 10,
      },
    },
    tagsHead: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
      padding: '6px 0 16px 0',
    },
  })
)
