import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import { DialogPopUp } from 'components'
import PublicCompanyView from 'containers/PublicCompanyView'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'
import routes from 'routes'

import SearchCompanyItem from './components/SearchCompanyItem'
import useStyles from './styles'

const SearchResults = ({
  total,
  result,
  isSignIn,
  isProfile,
  className,
  isHeader = true,
  openProfileInModal = true,
}) => {
  const { t } = useTranslation('searchResults')
  const classes = useStyles()
  const router = useRouter()
  const totalCount = total

  const handleClose = useCallback(() => {
    router.push(routes.searchResults)
  }, [router])

  return (
    <>
      <Box className={clsx(classes.resultsContainer, className)}>
        <Box className={classes.resultsList}>
          <>
            {isHeader && (
              <Box className={classes.resultsHead}>
                {/* <Typography variant="h6">{title ? title : 'Other Results'}</Typography> */}
                <Typography variant="caption">{`${result.length} ${t('matches')} of ${totalCount}`}</Typography>
              </Box>
            )}

            {result.map((company) => (
              <SearchCompanyItem
                key={company.id}
                {...company}
                openProfileInModal={openProfileInModal}
                isProfile={isProfile}
              />
            ))}
          </>
        </Box>
      </Box>

      {openProfileInModal && (
        <DialogPopUp
          isOpenModal={!!router.query.publicId}
          closeModal={handleClose}
          maxWidth={'lg'}
          isButton
          dialogContentClasses={{ root: classes.dialogContent }}
        >
          <PublicCompanyView companyId={router.query.publicId} isSignIn={isSignIn} />
        </DialogPopUp>
      )}
    </>
  )
}

export default memo(SearchResults)
