import { Box } from '@mui/material'
import { Avatar, NavigationButtons, StepSubHeader } from 'components'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'

import GeneralInfoForm from '../GeneralInfoForm'
import useStyles from './styles'

const GeneralInfo = ({ setActiveStep, dispatch, state }) => {
  const { t } = useTranslation('createCompany')
  const classes = useStyles()
  const { name, description, errors, logo } = state

  const handleSetCompanyLogo = ({ blob, croppedImage }) => {
    dispatch({ type: 'SET_LOGO', payload: { blob, croppedImage } })
  }

  return (
    <>
      <Box className={classes.generalInfoContainer}>
        <Box className={classes.logoBlock}>
          <StepSubHeader
            header={t('Add Logo')}
            body={t('Logo image should be no more than 10MB')}
            align="center"
            classBox={classes.descriptionText}
          />

          <Box className={classes.uploadLogo}>
            <Avatar
              src={logo.croppedImage}
              url={''}
              name={''}
              width="140px"
              height="140px"
              handleChange={handleSetCompanyLogo}
            />
          </Box>
        </Box>

        <Box className={classes.companyInfoBlock}>
          <StepSubHeader
            header={t('Add Information')}
            body={t('Add a name and short description for this organization')}
            align="center"
            classBox={classes.descriptionText}
          />

          <GeneralInfoForm name={name} description={description} dispatch={dispatch} />
        </Box>
      </Box>

      <NavigationButtons
        skip={false}
        activeStep={0}
        handlerNext={(step) => setActiveStep(step)}
        lastStep={false}
        fullBtnWidth={true}
        disabled={!isEmpty(errors) || !name}
      />
    </>
  )
}

export default GeneralInfo
