import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Avatar, Box, Divider, Link, List, ListItem, Paper, Typography } from '@mui/material'
import { CopyToClipboardWrapper, OptionsMenu } from 'components'
import { keyContactField } from 'containers/Relationships/constants'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { capitalizeFirstLetters } from 'utils'

import useStyles from './styles'

const RelationshipKeyContact = ({
  contactId,
  isOptions = true,
  handleOpenDialogBasedOnAction,
  contact: { id, name, title, socialLinks, ...contactInfo },
}) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const isSocialLinks = socialLinks && !!socialLinks[0]

  const actions = [
    {
      title: t('Edit'),
      icon: <EditIcon fontSize="small" />,
      handleClick: () => handleOpenDialogBasedOnAction(id, 'edit'),
    },
    {
      title: t('Delete'),
      icon: <DeleteIcon fontSize="small" />,
      handleClick: () => handleOpenDialogBasedOnAction(id, 'delete'),
    },
  ]

  return (
    <>
      <Box className={classes.keyContact}>
        <Paper elevation={0} className={classes.keyContactInner}>
          <Box className={classes.keyContactHead}>
            <Box className={classes.keyContactHeadInner}>
              <Avatar>
                <Typography variant="subtitle2">{capitalizeFirstLetters(name)}</Typography>
              </Avatar>

              <Typography variant="h6" className={classes.keyContactName}>
                {name}

                <Typography variant="body2" color="textSecondary">
                  {title}
                </Typography>
              </Typography>
            </Box>
            {isOptions && <OptionsMenu actions={actions} closeFlag={contactId} />}
          </Box>

          <Divider />

          <Box>
            {Object.keys(keyContactField).map((field, index) => (
              <React.Fragment key={index}>
                {contactInfo[field] && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">
                      {t(`${keyContactField[field]}`)}

                      {keyContactField[field] === 'Email' ? (
                        <CopyToClipboardWrapper value={contactInfo[field]} className={classes.keyContactsCopy}>
                          <Link href={`mailto:${contactInfo[field]}`} className={classes.email}>
                            {contactInfo[field]}
                          </Link>
                        </CopyToClipboardWrapper>
                      ) : (
                        <Link href={`tel:${contactInfo[field]}`} className={classes.email}>
                          {contactInfo[field]}
                        </Link>
                      )}
                    </Typography>
                  </Box>
                )}
              </React.Fragment>
            ))}
          </Box>

          <Box>
            {isSocialLinks && (
              <Box mt={2}>
                <Typography variant="subtitle2">
                  {t('Social Links:')}
                  <List className={classes.list}>
                    {socialLinks.map((link) => (
                      <ListItem key={link} className={classes.listItem}>
                        <Link
                          key={link}
                          href={link}
                          target="_blank"
                          variant="body2"
                          rel="noreferrer"
                          className={classes.link}
                        >
                          {link}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default RelationshipKeyContact
