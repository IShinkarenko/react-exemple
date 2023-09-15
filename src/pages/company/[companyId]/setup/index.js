import { Box, Paper, Skeleton } from '@mui/material'
import { useCreateCompanyChannel, useUpdateCompanyTags, useUpdatePreferences } from 'api/hooks'
import { GET_COMPANY } from 'api/hooks/queries/useCompany/useCompany.gql'
import { GET_PREFERENCES } from 'api/hooks/queries/usePreferences/usePreferences.gql'
import { withSSRContext } from 'aws-amplify'
import { PageHead, PageLoader } from 'components'
import { ACTIVE, DEFAULT_CHANNEL, DEFAULT_COMPANY, defaultChannel, NEW } from 'constant'
import CompanySetupStepper from 'containers/CompanySetupStepper'
import MainLayout from 'layouts/MainLayout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import routes from 'routes'
import { getPreferenceId } from 'utils'

const CompanySetup = ({ userId, company, isNewCompany, defaultChannelId }) => {
  const { t } = useTranslation('companySetup')
  const {
    query: { companyId },
  } = useRouter()
  const router = useRouter()
  const companyData = company?.data?.getCompany
  const [createCompanyChannel] = useCreateCompanyChannel({
    onCompleted: ({ createCompanyChannel: { id } }) => setDefaultChanneltoUserPreferences(id),
  })
  const [updateCompany, { loading }] = useUpdateCompanyTags()
  const [updateUser] = useUpdatePreferences({
    onCompleted: ({ updateUser }) => {
      const channelId = updateUser?.preferences.find((company) => company.preferenceType === DEFAULT_CHANNEL)

      router.push({
        pathname: routes.companyChannel,
        query: { companyId, channelId },
      })
    },
  })

  useEffect(() => {
    if (!isNewCompany) {
      router.push({
        pathname: routes.companyChannel,
        query: { companyId, channelId: defaultChannelId },
      })
    }
  })

  const handleCreateDefaultChannel = (tagsValues) =>
    createCompanyChannel({
      variables: {
        input: {
          ...defaultChannel,
          companyId,
          tags: tagsValues,
        },
      },
    })

  const updateCompanyTags = (tagsValues) =>
    updateCompany({
      variables: {
        input: {
          id: companyId,
          tags: tagsValues,
          status: ACTIVE,
        },
      },
    })

  const setDefaultChanneltoUserPreferences = (channelId) =>
    updateUser({
      variables: {
        input: {
          id: userId,
          preferences: [
            {
              preferenceType: 'DefaultCompany',
              value: companyId,
            },
            {
              preferenceType: 'DefaultChannel',
              value: channelId,
            },
          ],
        },
      },
    })

  if (!isNewCompany) return <PageLoader />

  return (
    <>
      <PageHead
        title={
          company ? (
            `${t('Expanding Opportunities for')} ${companyData?.name}`
          ) : (
            <Box display="flex" justifyContent="center">
              <Skeleton variant="text" height="40px" width="200px" />
            </Box>
          )
        }
      />

      <Paper elevation={1}>
        <Box width={'100%'}>
          <CompanySetupStepper
            isTagsUpdated={loading}
            handleUpdateTags={updateCompanyTags}
            handleCreateDefaultChannel={handleCreateDefaultChannel}
          />
        </Box>
      </Paper>
    </>
  )
}

CompanySetup.getLayout = (page) => (
  <MainLayout sidebar={false} fullWidth>
    {page}
  </MainLayout>
)

export const getServerSideProps = async ({ locale, req }) => {
  const { Auth, API } = withSSRContext({ req })
  let userProps = {}

  try {
    const user = await Auth.currentAuthenticatedUser()
    const preferences = await API.graphql({ query: GET_PREFERENCES, variables: { id: user.attributes.sub } })

    const defaultCompanyId = getPreferenceId(preferences.data, DEFAULT_COMPANY)
    const defaultChannelId = getPreferenceId(preferences.data, DEFAULT_CHANNEL)

    const company = await API.graphql({ query: GET_COMPANY, variables: { id: defaultCompanyId } })

    userProps = {
      company,
      userId: user.attributes.sub,
      isNewCompany: company.data.getCompany.status === NEW,
      defaultChannelId: defaultChannelId ? defaultChannelId : '',
    }
  } catch (err) {
    console.log('error, user not authenticated')
  }

  return {
    props: {
      ...userProps,
      ...(await serverSideTranslations(locale, ['companySetup', 'companyMenu', 'accountMenu', 'common'])),
    },
  }
}

export default CompanySetup
