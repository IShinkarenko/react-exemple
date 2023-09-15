// import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { usePublicCompany } from 'api/hooks'
import { BaseButton, CopyToClipboardWrapper, Head, InfoItem, Share } from 'components'
import { CONNECTED, FOLLOWING, NEW } from 'constant'
import ClaimCompany from 'containers/ClaimCompany'
import { companySizeKeys } from 'containers/CompanyProfile/constants'
import EngageCompany from 'containers/SearchResults/components/EngageCompany'
import { useCheckUser } from 'hooks/useCheckUser'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import routes from 'routes'
import { capitalizeFirstLetters, splitLocation } from 'utils'

import EmptyData from './components/EmptyData'
import PublicProfileSections from './components/PublicProfileSections'
import TagsList from './components/TagsList'
import useStyles from './styles'

const PublicCompanyView = ({ companyId, isSignIn }) => {
  const { t } = useTranslation('companyProfile')

  const classes = useStyles()
  const router = useRouter()
  const { user } = useCheckUser()
  const [activeTab, setActiveTab] = useState(0)

  const { data, loading } = usePublicCompany({ variables: { id: companyId } })

  const company = data?.getCompany
  const isClaim = company?.status === NEW

  const handleChange = useCallback((event, newValue) => {
    setActiveTab(newValue)
  }, [])

  const handleSignIn = useCallback(() => {
    router.push(routes.signIn)
  }, [router])

  if (loading && !company)
    return (
      <Box p={'7%'} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress disableShrink />
      </Box>
    )

  return (
    <>
      <Head
        title={company?.name}
        og={{ title: company?.name, description: company?.description, image: company?.logoUrl }}
        twitter={{ title: company?.name, description: company?.description, image: company?.logoUrl }}
      />

      <Box>
        <Box className={classes.companyBackground} style={{ backgroundImage: `url(/static/company1.jpg)` }}></Box>

        <Box className={classes.companyContainer}>
          <Box className={classes.companyInfoBlock}>
            <Box className={classes.companyGeneralInfoContainer}>
              <Box className={classes.companyLogoWrap}>
                <Avatar className={classes.companyLogo} src={company?.logoUrl}>
                  {capitalizeFirstLetters(company?.name || '')}
                </Avatar>
              </Box>

              <Box className={classes.companyInfoInner}>
                <Box className={classes.header}>
                  <Typography variant="h4">{company?.name}</Typography>

                  {isSignIn && (
                    <BaseButton title={t('Sign-In For More...')} className={classes.button} onClick={handleSignIn} />
                  )}
                </Box>

                <Box mt={2}>
                  <Box mr={2}>
                    <InfoItem
                      title={t('Location')}
                      text={company?.location ? splitLocation(JSON.parse(company?.location)) : <EmptyData />}
                    />

                    <InfoItem title={t('Company Size')} text={companySizeKeys[company?.companySize] ?? <EmptyData />} />

                    <InfoItem title={t('Industry')} text={t(company?.industry) ?? <EmptyData />} />
                  </Box>

                  <Box mt={2} className={classes.companySecondaryData}>
                    {company?.publiclyTraded && (
                      <InfoItem title={`${t('Type')}:`} text={'Public Company'} direction={'column'} />
                    )}

                    <InfoItem
                      title={`${t('Founded')}:`}
                      text={company?.foundingYear ? new Date(company?.foundingYear).getFullYear() : <EmptyData />}
                      direction={'column'}
                    />

                    <InfoItem
                      title={`${t('Website')}:`}
                      text={
                        (
                          <CopyToClipboardWrapper value={company?.websiteUrl}>
                            <a href={company?.websiteUrl} target="_blank" rel="noreferrer">
                              {company?.websiteUrl}
                            </a>
                          </CopyToClipboardWrapper>
                        ) ?? <EmptyData />
                      }
                      direction={'column'}
                    />
                  </Box>
                </Box>

                <Box className={classes.itemActions}>
                  {/*                   <Typography variant="caption">
                    <SearchIcon color="primary" />
                    <span>{'More Like This'}</span>
                  </Typography> */}

                  {isClaim && <ClaimCompany companyId={companyId} companyName={company?.name} user={user} />}

                  <EngageCompany id={companyId} status={FOLLOWING} />

                  <EngageCompany id={companyId} status={CONNECTED} />

                  <Share title="Share" id={companyId} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={classes.companyInfoBlock}>
            <Typography variant="h6">{t('Description')}</Typography>

            <Typography className={classes.companyDescription}>
              {company?.description || <i>{t('No description provided')}</i>}
            </Typography>

            <TagsList title={t('Keyword')} name={'Keyword'} tags={company?.tags} />

            <TagsList title={t('Industry Sectors')} name={'OperatingSector'} tags={company?.tags} />

            <TagsList title={t('Markets')} name={'OperatingMarket'} tags={company?.tags} />
          </Box>

          <PublicProfileSections user={user} companyId={companyId} activeTab={activeTab} handleChange={handleChange} />
        </Box>
      </Box>
    </>
  )
}

export default PublicCompanyView
