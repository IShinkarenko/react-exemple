import { Box, Paper } from '@mui/material'
import { useSetupNewCompany, useUpdateCompanyProfile } from 'api/hooks'
import { BaseButton, PageHead, PageLoader, Steps } from 'components'
import { useCheckUser } from 'hooks/useCheckUser'
import { updateCompaniesCache } from 'libs/cache/updateCompaniesCache'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'routes'
import { apiGetFilePreview } from 'services/apiGetFilePreview'
import { getLogoUploadUrl } from 'utils'

import GeneralInfo from './components/GeneralInfo'
import InviteMembers from './components/InviteMembers'
import { useNewCompanyState } from './hooks/useNewCompanyState'
import useStyles from './styles'

const NewCompany = ({ userId, userName, userFullName }) => {
  const { t } = useTranslation('createCompany')
  const classes = useStyles()
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useNewCompanyState()
  const { session } = useCheckUser()
  const { description, name, errors, logo } = state
  const [updateCompany] = useUpdateCompanyProfile()

  const [setupNewCompany] = useSetupNewCompany({
    onCompleted: ({ setupNewCompany: { id } }) => {
      handeleSetCompanyLogo(id, logo.blob)

      router.push({
        pathname: routes.company,
        query: { companyId: id },
      })
    },
  })

  useEffect(() => {
    return () => {
      setLoading(false)
    }
  }, [])

  const stepProps = { setActiveStep, dispatch, state }

  const handleCancel = () => {
    router.back()
  }

  const handleCreateNewCompany = useCallback(() => {
    const normilizedData = {
      userId,
      userName,
      companyName: name,
      fullName: userFullName,
      companyDescription: description,
    }

    setLoading(true)

    setupNewCompany({
      variables: {
        input: normilizedData,
      },
      update: (cache, { data }) => updateCompaniesCache({ userId, cache, data }),
    })
  }, [description, name, userId, userName, userFullName, setupNewCompany])

  const handeleSetCompanyLogo = useCallback(
    async (companyId, image) => {
      const uploadUrl = getLogoUploadUrl({ companyId })

      try {
        if (session && session.accessToken) {
          const data = await apiGetFilePreview(session.accessToken, uploadUrl, image)
          updateCompany({
            variables: {
              input: {
                id: companyId,
                logoUrl: data.url,
              },
            },
          })
        } else {
          throw 'A current user session and token was not provided.'
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    [session, updateCompany]
  )

  let stepComponent
  switch (activeStep) {
    case 1:
      stepComponent = <InviteMembers {...stepProps} />
      break
    default:
      stepComponent = <GeneralInfo {...stepProps} />
      break
  }

  return (
    <>
      <PageHead
        title={t('Create New Company')}
        right={
          <Box className={classes.buttonsGroup}>
            <BaseButton title={`${t('Cancel')}`} variant="outlined" onClick={handleCancel} disabled={loading} />
            <BaseButton
              title={`${t('Save')}`}
              disabled={!isEmpty(errors) || activeStep !== 1 || loading}
              onClick={handleCreateNewCompany}
            />
          </Box>
        }
      />

      <Paper elevation={3} className={classes.container}>
        <Box className={classes.steps}>
          <Steps
            activeStep={activeStep}
            steps={[t('General Info'), t('Members')]}
            className={classes.newCompanyStepper}
          />
        </Box>

        <Box className={classes.newCompanyStepsContainer}>{stepComponent}</Box>

        {loading && <PageLoader />}
      </Paper>
    </>
  )
}

export default NewCompany
