import { useLazyQuery } from '@apollo/client'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Typography } from '@mui/material'
import { useCompanyRealtionshipKeyContacts, useExpandRelationshipContact } from 'api/hooks'
import { FETCH_CURRENT_COMPANY_CREDIT } from 'api/hooks/queries/useFetchCurrentCompanyCredit/useFetchCurrentCompanyCredit.gql'
import { SectionLoader } from 'components'
import { EXPANSION_CREDIT } from 'constant'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import ExpandFormLoader from '../ExpandFormLoader'
import ExpandFormSelection from '../ExpandFormSelection'
import useStyles from './styles'

const ExpandForm = ({ handleToggleExpandPannel, name, socialLinks }) => {
  const classes = useStyles()
  const { t } = useTranslation('relationships')
  const { isCompanyBasic } = useCompanySubscriptionLevel()
  const {
    query: { companyId, relationshipId },
  } = useRouter()

  const { loading: contactsLoading, data: contactData } = useCompanyRealtionshipKeyContacts({
    variables: { id: relationshipId },
  })

  const contacts = contactData?.getCompanyRelationship?.contacts?.items

  const [expanding, setExpanding] = useState(false)
  const [selections, setSelections] = useState(contacts?.map(() => false))
  const initCount = selections.filter((f) => f).length
  const [credit, setCredit] = useState({
    maxSpend: initCount,
    available: 0,
    overage: 0,
    price: 0.0,
    priorUsed: 0,
    month: 0,
    year: 0,
    creditCount: 0,
  })
  const [progressTitle, setProgressTitle] = useState()
  const [progressSubTitle, setProgressSubTitle] = useState()
  const progress = useRef(0)

  useEffect(() => {
    fetchCurrentCompanyCredit({ variables: { companyId: companyId, creditType: EXPANSION_CREDIT } })
  }, [companyId, fetchCurrentCompanyCredit])

  const [fetchCurrentCompanyCredit, { loading: creditsLoading }] = useLazyQuery(FETCH_CURRENT_COMPANY_CREDIT, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.fetchCurrentCompanyCredit) {
        const c = data?.fetchCurrentCompanyCredit
        setCredit({
          maxSpend: credit.maxSpend,
          available: c.limit + c.paid + c.free - c.used,
          overage: credit.overage,
          price: c.price,
          priorUsed: c.used,
          month: c.month,
          year: c.year,
          creditCount: c.limit + c.paid + c.free,
        })
      }
    },
  })

  const handleChangeSelection = useCallback(
    (index) => {
      const value = selections[index] ? false : true
      const free = contacts[index].providerPersonId
      const currentSpend = free ? credit.maxSpend : value ? credit.maxSpend + 1 : credit.maxSpend - 1
      setSelections([...selections.slice(0, index), value, ...selections.slice(index + 1)])
      setCredit({
        maxSpend: currentSpend,
        available: credit.available,
        overage: credit.available - currentSpend < 0 ? (credit.available - currentSpend) * -1 : 0,
        price: credit.price,
        priorUsed: credit.priorUsed,
        month: credit.month,
        year: credit.year,
        creditCount: credit.creditCount,
      })
    },
    [setSelections, selections, setCredit, credit, contacts]
  )

  const closeOnTimeout = useCallback(
    (step, wait) => {
      setProgressTitle(t('Finishing and Closing'))
      progress.current = progress.current + step
      setTimeout(() => {
        handleToggleExpandPannel()
      }, wait)
    },
    [handleToggleExpandPannel, t]
  )

  const handleProgress = useCallback(
    (contact) => {
      const step = 100 / selections.filter((f) => f).length
      setProgressTitle(t('Processed'))
      setProgressSubTitle(`${contact.providerPersonId ? t('Matched and Expanded') : t('No Match for')} ${contact.name}`)
      progress.current = progress.current + step
      if (progress.current >= 100.0) closeOnTimeout(step, 3000)
    },
    [t, selections, closeOnTimeout]
  )

  const [expandRelationshipContact] = useExpandRelationshipContact({
    onCompleted: (data) => {
      handleProgress(data?.expandRelationshipContact)
    },
  })

  const handleExpandContact = useCallback(() => {
    setExpanding(true)
    setProgressTitle(t('Processing'))
    selections.forEach((s, i) => {
      if (s) {
        const relationshipName = socialLinks ? socialLinks.filter((f) => f.toLowerCase().indexOf('linkedin') >= 0) : []
        if (!progressSubTitle) setProgressSubTitle(contacts[i].name)
        expandRelationshipContact({
          variables: {
            companyId: companyId,
            relationshipName: relationshipName.length > 0 ? relationshipName[0] : name,
            relationshipContactId: contacts[i].id,
          },
        })
      }
    })
  }, [t, selections, progressSubTitle, contacts, expandRelationshipContact, companyId, name, socialLinks])

  const loading = contactsLoading || creditsLoading

  return (
    <Box p={2}>
      <Box className={classes.expandHeading} mb={1}>
        <Typography variant="h4">
          {!expanding
            ? `${t(
                'Would you like to expand your knowledge with the most recent contact information available for'
              )} ${name}?`
            : t('Contact Expansion')}
        </Typography>
        <IconButton onClick={handleToggleExpandPannel}>
          <CloseIcon />
        </IconButton>
      </Box>
      {loading && !expanding ? (
        <SectionLoader />
      ) : expanding ? (
        <ExpandFormLoader title={progressTitle} subtitle={progressSubTitle} progress={progress.current} />
      ) : (
        <ExpandFormSelection
          handleExpandContact={handleExpandContact}
          handleToggleExpandPannel={handleToggleExpandPannel}
          handleChangeSelection={handleChangeSelection}
          contacts={contacts}
          selections={selections}
          credit={credit}
          isCompanyBasic={isCompanyBasic}
        />
      )}
    </Box>
  )
}

export default ExpandForm
