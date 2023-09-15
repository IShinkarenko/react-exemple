// eslint-disable-next-line simple-import-sort/sort
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Typography } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import { useCompanyChannels, useCompanyRealtionship, useUpdateCompanyRelationship } from 'api/hooks'
import clsx from 'clsx'
import { PageHead, SectionLoader } from 'components'
import { FOLLOWING, NONE, sourceTypeLabels } from 'constant'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'
import routes from 'routes'

import Expand from './components/Expand'
import Follow from './components/Follow'
import Connect from './components/Connect'
import RelationshipGeneral from './components/RelationshipGeneral'
import RelationshipKeyContacts from './components/RelationshipKeyContacts'
import RelationshipNotes from './components/RelationshipNotes'
import RelationshipTags from './components/RelationshipTags'
import useStyles from './styles'

const Relationship = () => {
  const classes = useStyles()
  const router = useRouter()
  const {
    query: { companyId, relationshipId },
  } = router
  const [open, setOpen] = useState(false)
  const styleProps = useSpring({ opacity: open ? 0 : 1, left: open ? '30px' : '0px' })

  const [updateCompanyRelationship] = useUpdateCompanyRelationship()
  const { loading, data } = useCompanyRealtionship({
    variables: { id: relationshipId },
  })
  const { loading: channelsLoading, data: dataChannels } = useCompanyChannels({
    variables: { id: companyId },
  })

  const profile = data?.getCompanyRelationship
  const companyChannels = dataChannels?.getCompany?.channels?.items
  const isShowFollow = profile?.status === FOLLOWING || profile?.status === NONE

  const handleUpdateRelationship = useCallback(
    ({ name, value, ...rest }) => {
      updateCompanyRelationship({
        variables: {
          input: {
            companyId,
            id: relationshipId,
            [name]: value,
            ...rest,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCompanyRelationship: {
            companyId,
            id: relationshipId,
            [name]: value,
            ...rest,
            __typename: 'CompanyRelationship',
          },
        },
      })
    },
    [companyId, relationshipId, updateCompanyRelationship]
  )

  const handleShowAllRelationships = useCallback(() => {
    router.push({
      pathname: routes.companyRelationships,
      query: { companyId },
    })
  }, [companyId, router])

  const handleToggleExpandPannel = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  if (loading || channelsLoading) return <SectionLoader />

  return (
    <>
      <Box className={classes.relationshipContainer}>
        <Box className={classes.contactHeading}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <PageHead
              title={
                <animated.div style={styleProps} className={classes.relationshipHeadButtons}>
                  {profile?.name}

                  {isShowFollow ? (
                    <Follow
                      status={profile?.status}
                      websiteUrl={profile?.websiteUrl}
                      companyChannels={companyChannels}
                      relationshipChannels={profile?.channels ?? []}
                      expandigoCompanyId={profile?.expandigoCompanyId}
                      handleUpdateRelationship={handleUpdateRelationship}
                    />
                  ) : (
                    <Connect
                      status={profile?.status}
                      websiteUrl={profile?.websiteUrl}
                      companyChannels={companyChannels}
                      relationshipChannels={profile?.channels ?? []}
                      expandigoCompanyId={profile?.expandigoCompanyId}
                      handleUpdateRelationship={handleUpdateRelationship}
                    />
                  )}
                </animated.div>
              }
              backIcon={
                <animated.div style={styleProps} className={classes.relationshipBackIcon}>
                  <ArrowBackIcon />
                </animated.div>
              }
              backLinkOnclick={handleShowAllRelationships}
              right={
                <Expand
                  name={profile?.name}
                  socialLinks={profile?.socialLinks}
                  open={open}
                  handleToggleExpandPannel={handleToggleExpandPannel}
                />
              }
              className={classes.relationshipHeader}
            />

            <animated.div style={styleProps}>
              <Box className={classes.subtitle} justifyContent={'flex-end'}>
                <Typography variant="caption" color={'#5f5f5f'}>
                  Source Type:
                </Typography>
                <Typography variant="caption" className={clsx(classes.sourceType, classes[profile?.sourceType])}>
                  {sourceTypeLabels[profile?.sourceType]}
                </Typography>
              </Box>
              <Box className={classes.subtitle} justifyContent={'flex-end'}>
                <Typography variant="caption" color={'#5f5f5f'}>
                  Source Name:
                </Typography>
                <Typography variant="caption">{profile?.sourceName || 'Unknown'}</Typography>
              </Box>
            </animated.div>
          </Box>

          <Box>
            <Box className={classes.subtitle}>
              <Typography variant="caption" color={'#5f5f5f'}>
                Created:
              </Typography>
              <Typography variant="caption">{moment(profile?.creationTimestamp).format('L LT')}</Typography>
            </Box>
            <Box className={classes.subtitle}>
              <Typography variant="caption" color={'#5f5f5f'}>
                Last Updated:
              </Typography>
              <Typography variant="caption">{moment(profile?.modificationTimestamp).format('L LT')}</Typography>
            </Box>
          </Box>
        </Box>

        <animated.div style={styleProps} className={classes.relationshipProfile}>
          {profile && <RelationshipGeneral profile={profile} handleUpdateRelationship={handleUpdateRelationship} />}

          <Box className={classes.middle}>
            <Box className={classes.middleTop}>
              <RelationshipKeyContacts />
            </Box>

            <Box className={classes.middleBottom}>
              <RelationshipTags
                types={profile?.types ?? []}
                sources={profile?.sources ?? []}
                websiteUrl={profile?.websiteUrl}
                standardTags={profile?.standardTags ?? []}
                handleUpdateRelationship={handleUpdateRelationship}
              />
            </Box>
          </Box>

          <Box className={classes.right}>
            <RelationshipNotes />
          </Box>
        </animated.div>
      </Box>
    </>
  )
}

export default memo(Relationship)
