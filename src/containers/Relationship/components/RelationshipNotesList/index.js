import { Box, List, ListSubheader } from '@mui/material'
import { groupBy } from 'lodash'
import moment from 'moment'
import React, { memo } from 'react'

import RelationshipNoteItem from '../RelationshipNoteItem'
import useStyles from './styles'

const RelationshipNotesList = ({ notes, handleUpdateNote, handleDeleteNote }) => {
  const classes = useStyles()
  const currentData = moment(new Date()).format('LL')
  const groupedNotesByDate = groupBy(notes, ({ creationTimestamp }) => moment(creationTimestamp).format('LL'))

  return (
    <List className={classes.root} subheader={<li />}>
      {Object.entries(groupedNotesByDate).map(([key, value]) => (
        <li key={moment(key).unix()}>
          <ul className={classes.ul}>
            <ListSubheader className={classes.subheader}>
              <Box className={classes.subheaderInner}>{key === currentData ? 'Today' : key}</Box>
            </ListSubheader>

            {value.slice().map((note) => (
              <RelationshipNoteItem
                key={note.id}
                note={note}
                handleUpdateNote={handleUpdateNote}
                handleDeleteNote={handleDeleteNote}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  )
}

export default memo(RelationshipNotesList)
