import { useLazyQuery } from '@apollo/client'
import { Box } from '@mui/material'
import { useCompany, useCreateUserNotification, useUpdateCompanyProfile } from 'api/hooks'
import { GET_TEXT_SUMMARY } from 'api/hooks/queries/useGetTextSummary/useGetTextSummary.gql'
import { GET_COMPANIES_BY_DOMAIN } from 'api/hooks/queries/useSearchCompaniesByDomain/useSearchCompaniesByDomain.gql'
import { CLAIM, TEXT_SUMMARY } from 'constant'
import { updateNotificationsCache } from 'libs/cache/updateNotificationsCache'
import { isEmpty } from 'lodash-es'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import CompanyBanner from './components/CompanyBanner'
import CompanySections from './components/CompanySections'
import CompanyTags from './components/CompanyTags'
import GeneralInformation from './components/GeneralInformation'
import useStyles from './styles'

const CompanyProfile = ({ userId }) => {
  const router = useRouter()
  const { companyId } = router.query
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [updateCompany] = useUpdateCompanyProfile()
  const [createUserNotification] = useCreateUserNotification()

  const { data, loading: companyLoading } = useCompany({ variables: { id: companyId } })

  const [getCompanyByDomain] = useLazyQuery(GET_COMPANIES_BY_DOMAIN, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => handleCreateClaimNotification(data),
  })

  const [getTextSummary] = useLazyQuery(GET_TEXT_SUMMARY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => handleCreateTextSummaryNotification(data),
  })

  const company = data?.getCompany
  const tags = company?.tags
  const bannerUrl = company?.bannerUrl

  const handleStartLoading = useCallback(() => {
    setLoading(true)
  }, [])

  const handleFieldSave = useCallback(
    ({ name, value }) => {
      updateCompanyData({ [name]: value })
    },
    [updateCompanyData]
  )

  const updateCompanyData = useCallback(
    (newData) => {
      const prevWebsiteUrl = company?.websiteUrl
      const prevDescription = company?.description
      const { websiteUrl: newWebsiteUrl, description: newDescription } = newData

      updateCompany({
        variables: {
          input: {
            id: companyId,
            ...newData,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCompany: {
            id: companyId,
            __typename: 'Company',
            ...newData,
          },
        },
      })

      if (newWebsiteUrl && prevWebsiteUrl !== newWebsiteUrl) {
        getCompanyByDomain({ variables: { domain: newWebsiteUrl } })
      }

      if (newDescription && prevDescription !== newDescription) {
        getTextSummary({
          variables: {
            text: newDescription,
          },
        })
      }

      setLoading(false)
    },
    [company?.description, company?.websiteUrl, companyId, getCompanyByDomain, getTextSummary, updateCompany]
  )

  const handleCreateClaimNotification = useCallback(
    (data) => {
      const suggestedCompanies = data?.searchCompaniesByDomain?.items.filter((item) => item.id !== companyId)

      if (isEmpty(suggestedCompanies)) {
        return
      }

      suggestedCompanies.forEach(({ id, name }) => {
        handleCreateNotification({
          headline: `Claim ${name}`,
          message: 'You indicated your desire to claim this company profile',
          metaData: JSON.stringify({ companyId: id, name, isLinkToProfile: true, type: CLAIM }),
        })
      })
    },
    [companyId, handleCreateNotification]
  )

  const handleCreateTextSummaryNotification = useCallback(
    (data) => {
      const textSummary = data?.getTextSummary

      if (!textSummary) {
        return
      }

      handleCreateNotification({
        headline: 'Suggested Text Summary',
        message: textSummary,
        metaData: JSON.stringify({ type: TEXT_SUMMARY }),
      })
    },
    [handleCreateNotification]
  )

  const handleCreateNotification = useCallback(
    (data) => {
      createUserNotification({
        variables: {
          input: {
            notificationType: 'SystemAlert',
            isNew: true,
            userId,
            ...data,
          },
        },
        update: (cache, { data }) => updateNotificationsCache({ userId, cache, data }),
      })
    },
    [createUserNotification, userId]
  )

  if (companyLoading && !company) return null

  return (
    <Box className={classes.companyProfileContainer}>
      <CompanyBanner
        src={bannerUrl}
        loading={loading}
        handleChange={handleFieldSave}
        handleStartLoading={handleStartLoading}
      />

      <Box className={classes.companyContainer}>
        <Box className={classes.companyInfoBlock}>
          <GeneralInformation
            company={company}
            handleChange={handleFieldSave}
            handleStartLoading={handleStartLoading}
          />

          <CompanyTags tags={tags} handleChange={handleFieldSave} />
        </Box>

        <CompanySections />
      </Box>
    </Box>
  )
}

export default CompanyProfile
