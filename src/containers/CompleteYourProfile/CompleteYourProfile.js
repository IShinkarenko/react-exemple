import 'react-circular-progressbar/dist/styles.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import { Auth } from 'aws-amplify'
import clsx from 'clsx'
import { DialogPopUp } from 'components'
import { CONFIRM_SIGN_UP } from 'constant'
import TermsAndConditions from 'containers/Auth/components/TermsAndConditions'
import { useAppDispatch } from 'hooks/useAppState'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect } from 'react'
import routes from 'routes'
import { getTagsByType } from 'utils'

import GeneralProgress from './components/GeneralProgress'
import ProfileHeading from './components/ProfileHeading'
import ProfileInformation from './components/ProfileInformation'
import ProfileTags from './components/ProfileTags'
import { requiredReqularFields, requiredTagsFields, tagsList } from './constants'
import { useCompleteProfileState } from './hooks/useCompleteProfileState'
import useStyles from './styles'

const CompleteYourProfile = ({ className, signUpFromSearch = false }) => {
  const { t } = useTranslation('auth')
  const classes = useStyles()
  const router = useRouter()
  const [state, dispatch] = useCompleteProfileState()
  const appDispatch = useAppDispatch()
  const { companyScore, personalScore, tagsValues, expanded, initialValues, error, isUserAgreeWithTerms, isOpen } =
    state
  const filledTags = tagsList.filter((tagType) => !isEmpty(getTagsByType(tagsValues, tagType)))
  const tagsScore = filledTags.length + companyScore
  const generalScore = ((personalScore + tagsScore) / 15) * 100

  const isReqularFieldsHasValue = requiredReqularFields.every((field) => initialValues[field])
  const isTagsFieldsHasValue = requiredTagsFields.every(
    (field) => !!tagsValues.find(({ tagType }) => tagType === field)
  )

  const isDisabled = !isReqularFieldsHasValue || !isTagsFieldsHasValue || !isUserAgreeWithTerms

  useEffect(() => {
    if (generalScore === 100) {
      window.scroll({ top: 0, behavior: 'smooth' })
    }
  }, [generalScore])

  useEffect(() => {
    const existTags = localStorage.getItem('tags')

    if (existTags) {
      dispatch({ type: 'SET_TAGS_VALUES', payload: JSON.parse(existTags) })
    }
  }, [dispatch])

  const handleChange = useCallback(
    (panel) => (event, isExpanded) => {
      dispatch({ type: 'SET_EXPANDED', payload: isExpanded ? panel : false })
    },
    [dispatch]
  )

  const handleOpenTermsAndConditions = useCallback(() => {
    dispatch({ type: 'SET_IS_OPEN', payload: true })
  }, [dispatch])

  const handleChangeTermsAndConditions = (event) => {
    dispatch({ type: 'SET_IS_USER_AGREE_WITH_TERMS', payload: event.target.checked })
  }

  const handleDialogClose = useCallback(() => {
    dispatch({ type: 'SET_IS_OPEN', payload: false })
  }, [dispatch])

  const signUp = useCallback(
    async (data) => {
      appDispatch({ type: 'SET_USERNAME', payload: data.username })

      try {
        await Auth.signUp(data).then(() => {
          appDispatch({ type: 'SET_AUTH_FORM_TYPE', payload: CONFIRM_SIGN_UP })
        })

        if (data?.description) {
          localStorage.setItem('signUpDescription', data?.description)
        }

        if (signUpFromSearch) {
          router.push(routes.signIn)
        }
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
      }
    },
    [appDispatch, dispatch, router, signUpFromSearch]
  )

  const handleCompleteProfile = useCallback(() => {
    const { name, username, password, email, organization, phone_number, description, website } = initialValues
    const normilizedData = {
      username,
      password,
      attributes: {
        name,
        email,
        phone_number,
        profile: description,
        website: website,
        'custom:organization': organization,
        'custom:tags': JSON.stringify(tagsValues),
      },
    }

    if (error) {
      dispatch({ type: 'SET_ERROR', payload: null })
    }

    signUp(normilizedData)
  }, [dispatch, error, initialValues, signUp, tagsValues])

  return (
    <>
      <Box className={clsx(classes.completeProfileContainer, className)}>
        <GeneralProgress
          generalScore={generalScore}
          handleCompleteProfile={handleCompleteProfile}
          isDisabled={isDisabled}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={handleChangeTermsAndConditions}
              name="termsAndConditions"
              checked={isUserAgreeWithTerms}
            />
          }
          label={
            <Typography variant="body2" className={classes.agreeText}>
              {t(`By creating an account, you agree to Expandigo's`)}
              <Typography variant="caption" onClick={handleOpenTermsAndConditions}>
                {t('Conditions of Use and Privacy Notice.')}
              </Typography>
            </Typography>
          }
          classes={{ label: classes.label }}
        />

        <Box className={classes.profileContainer}>
          <Accordion expanded={expanded === 'personalInfo'} onChange={handleChange('personalInfo')}>
            <AccordionSummary
              classes={{ content: classes.accordionSummary, expandIcon: classes.expandIcon }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <ProfileHeading heading="Personal Information" score={personalScore} fieldsCount={6} />
            </AccordionSummary>

            <AccordionDetails>
              <ProfileInformation dispatch={dispatch} initialValues={initialValues} />
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === 'searchTags'} onChange={handleChange('searchTags')}>
            <AccordionSummary
              classes={{ content: classes.accordionSummary, expandIcon: classes.expandIcon }}
              expandIcon={<KeyboardArrowDownIcon />}
            >
              <ProfileHeading heading={t('Company Information')} score={tagsScore} fieldsCount={9} />
            </AccordionSummary>

            <AccordionDetails>
              <ProfileTags dispatch={dispatch} tagsValues={tagsValues} initialValues={initialValues} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      <DialogPopUp
        isOpenModal={isOpen}
        title={'Terms And Conditions'}
        successTitle={'Agree'}
        closeModal={handleDialogClose}
        handleAccept={handleDialogClose}
        maxWidth={'md'}
      >
        <TermsAndConditions />
      </DialogPopUp>
    </>
  )
}

export default memo(CompleteYourProfile)
