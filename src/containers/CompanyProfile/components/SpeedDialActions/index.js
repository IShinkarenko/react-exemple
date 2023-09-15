import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AnnouncementIcon from '@mui/icons-material/Announcement'
import BusinessIcon from '@mui/icons-material/Business'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import CardMembershipIcon from '@mui/icons-material/CardMembership'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import ContactsIcon from '@mui/icons-material/Contacts'
import HomeIcon from '@mui/icons-material/Home'
import HttpIcon from '@mui/icons-material/Http'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import TitleIcon from '@mui/icons-material/Title'
import TodayIcon from '@mui/icons-material/Today'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, useMediaQuery } from '@mui/material'
import {
  ADDRESS,
  AFFILIATION,
  ANNUAL_REVENUE,
  AWARD,
  CERTIFICATION,
  CUSTOM,
  EMAIL_ADDRESS,
  EMPLOYEE_COUNT,
  FOUNDING_YEAR,
  HEADER,
  KEY_CONTACT,
  PHONE_NUMBER,
  PRESSRELEASE,
  SOCIAL_OUT_POST,
  WEBSITE,
} from 'containers/CompanyProfile/constants'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useMemo, useState } from 'react'

import useStyles from './styles'

const SpeedDialActions = ({ profileSectionType, handleClick, className }) => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const matches = useMediaQuery('(max-width:580px)')

  const handleOpen = useCallback(() => {
    setOpen(!open)
  }, [open])

  const onHandleClick = useCallback(
    (sectionItemType) => {
      handleClick({ sectionItemType })
    },
    [handleClick]
  )

  const itemsActions = useMemo(
    () => ({
      KeyContacts: [
        { icon: <ContactsIcon />, name: t('Add Key Contact'), type: KEY_CONTACT },
        { icon: <ContactPhoneIcon />, name: t('Add Phone'), type: PHONE_NUMBER },
        { icon: <ContactMailIcon />, name: t('Add Email'), type: EMAIL_ADDRESS },
        { icon: <TitleIcon />, name: t('Add Header'), type: HEADER },
        { icon: <TextFieldsIcon />, name: t('Add Custom Item'), type: CUSTOM },
        { icon: <HomeIcon />, name: t('Add Address'), type: ADDRESS },
        { icon: <HttpIcon />, name: t('Add Website'), type: WEBSITE },
        { icon: <QuestionAnswerIcon />, name: t('Add Social Outpost'), type: SOCIAL_OUT_POST },
      ],
      KeyPerformanceIndicators: [
        { icon: <TitleIcon />, name: t('Add Header'), type: HEADER },
        { icon: <TextFieldsIcon />, name: t('Add Custom Item'), type: CUSTOM },
        { icon: <SupervisorAccountIcon />, name: t('Add Employee Count'), type: EMPLOYEE_COUNT },
        { icon: <TodayIcon />, name: t('Add Founding Year'), type: FOUNDING_YEAR },
        { icon: <AccountBalanceIcon />, name: t('Add Annual Revenue'), type: ANNUAL_REVENUE },
      ],
      General: [
        { icon: <TitleIcon />, name: t('Add Header'), type: HEADER },
        { icon: <TextFieldsIcon />, name: t('Add Custom Item'), type: CUSTOM },
        { icon: <ContactsIcon />, name: t('Add Key Contact'), type: KEY_CONTACT },
        { icon: <HomeIcon />, name: t('Add Address'), type: ADDRESS },
        { icon: <HttpIcon />, name: t('Add Website'), type: WEBSITE },
        { icon: <ContactPhoneIcon />, name: t('Add Phone'), type: PHONE_NUMBER },
        { icon: <QuestionAnswerIcon />, name: t('Add Social Outpost'), type: SOCIAL_OUT_POST },
      ],
      OnlinePresence: [
        { icon: <QuestionAnswerIcon />, name: t('Add Social Outpost'), type: SOCIAL_OUT_POST },
        { icon: <TitleIcon />, name: t('Add Header'), type: HEADER },
        { icon: <TextFieldsIcon />, name: t('Add Custom Item'), type: CUSTOM },
      ],
      Reputation: [
        { icon: <CardMembershipIcon />, name: t('Add Certification'), type: CERTIFICATION },
        { icon: <CardGiftcardIcon />, name: t('Add Award'), type: AWARD },
        { icon: <AnnouncementIcon />, name: t('Add Press Release'), type: PRESSRELEASE },
        { icon: <TitleIcon />, name: t('Add Header'), type: HEADER },
        { icon: <TextFieldsIcon />, name: t('Add Custom Item'), type: CUSTOM },
      ],
      Affilations: [
        { icon: <BusinessIcon />, name: 'Add Affiliation', type: AFFILIATION },
        { icon: <TitleIcon />, name: 'Add Header', type: HEADER },
        { icon: <TextFieldsIcon />, name: 'Add Custom Item', type: CUSTOM },
      ],
    }),
    [t]
  )

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      icon={<SpeedDialIcon />}
      onClick={handleOpen}
      open={open}
      direction={matches ? 'up' : 'left'}
      classes={{
        actions: classes.actions,
        fab: className,
        root: classes.root,
      }}
    >
      {itemsActions[profileSectionType].map(({ name, icon, type }) => (
        <SpeedDialAction
          key={name}
          icon={icon}
          tooltipTitle={name}
          onClick={() => onHandleClick(type)}
          tooltipPlacement="top"
        />
      ))}
    </SpeedDial>
  )
}

export default memo(SpeedDialActions)
