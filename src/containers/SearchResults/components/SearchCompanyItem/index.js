/* eslint-disable jsx-a11y/anchor-is-valid */
// import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Box, Typography } from '@mui/material'
import { DialogPopUp, Share } from 'components'
import { CONNECTED, FOLLOWING } from 'constant'
import PublicCompanyView from 'containers/PublicCompanyView'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { memo, useCallback, useState } from 'react'
import { capitalizeFirstLetters } from 'utils'

import EngageCompany from '../EngageCompany'
import useStyles from './styles'

const SearchCompanyItem = ({ id, name, description, objectiveMatches, logoUrl, openProfileInModal, isProfile }) => {
  const { t } = useTranslation('searchResults')
  const classes = useStyles()
  const [isPublic, setIsPublic] = useState(false)
  const href = openProfileInModal ? `/search-results/?publicId=${id}` : `/public-profile/${id}`

  const handleDialogClose = useCallback(() => {
    setIsPublic(false)
  }, [])

  const handleClick = useCallback(() => {
    setIsPublic(true)
  }, [])

  return (
    <>
      <Box className={classes.resultItem}>
        <Box className={classes.resultItemLogo}>
          <Avatar className={classes.avatar} src={logoUrl} onClick={handleClick}>
            {capitalizeFirstLetters(name)}
          </Avatar>
        </Box>

        <Box>
          {isProfile ? (
            <Typography variant="h6" className={classes.companyName} onClick={handleClick}>
              {name}
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.companyName}>
              <Link href={href} as={`/public-profile/${id}`}>
                <a className={classes.companyNameLink}>{name}</a>
              </Link>
            </Typography>
          )}

          <Typography variant="body2" className={classes.description}>
            {description === 'None' ? (
              <Typography variant="caption" fontStyle={'italic'}>
                No description
              </Typography>
            ) : (
              description
            )}
          </Typography>

          <Box className={classes.possiblematch}>
            <Typography variant="subtitle2">{t('Possible Objective Match')}:</Typography>

            {objectiveMatches.map((objectiveMatch) => (
              <Typography key={objectiveMatch} variant="subtitle2" className={classes.matchTitle}>
                {objectiveMatch}
              </Typography>
            ))}
          </Box>

          <Box className={classes.itemActions}>
            {/*             <Typography variant="caption">
              <SearchIcon color="primary" />
              <span>{'More Like This'}</span>
            </Typography> */}

            <EngageCompany id={id} status={FOLLOWING} />

            <EngageCompany id={id} status={CONNECTED} />

            <Share title="Share" id={id} />
          </Box>
        </Box>
      </Box>

      {isPublic && (
        <DialogPopUp
          isOpenModal={isPublic}
          closeModal={handleDialogClose}
          maxWidth={'lg'}
          isButton
          dialogContentClasses={{ root: classes.dialogContent }}
        >
          <PublicCompanyView companyId={id} />
        </DialogPopUp>
      )}
    </>
  )
}

export default memo(SearchCompanyItem)
