import { Box } from '@mui/material'
import { useCompanyProfileSections } from 'api/hooks'
import clsx from 'clsx'
import { SectionLoader, Tabs } from 'components'
import { PRIVATE_NETWORK_ONLY, PUBLIC_NETWORK } from 'constant'
import { isEmpty } from 'lodash'
import React from 'react'
import { generateTabs } from 'utils'

import PublicSectionItems from '../PublicSectionItems'
import useStyles from './styles'

const PublicProfileSections = ({ user, activeTab, companyId, handleChange }) => {
  const classes = useStyles()
  const visibilityLevelArr = user ? [PUBLIC_NETWORK, PRIVATE_NETWORK_ONLY] : [PUBLIC_NETWORK]

  const { loading, data } = useCompanyProfileSections({
    variables: {
      id: companyId,
      filter: {
        visibilityLevel: visibilityLevelArr,
      },
    },
  })

  const profileSections = data?.getCompany?.profileSections?.items

  if (loading) {
    return <SectionLoader sx={{ p: 3 }} />
  }

  if (isEmpty(profileSections)) {
    return null
  }

  return (
    <>
      <Box className={clsx(classes.companyInfoBlock, classes.companySections)}>
        <Tabs
          tabs={generateTabs(profileSections)}
          activeTab={activeTab}
          handleChange={handleChange}
          scrollButtons
          variant="scrollable"
          tabClassName={classes.tab}
          isIcon={false}
          allowScrollButtonsMobile
        />

        {profileSections.map(({ id }, index) => (
          <PublicSectionItems key={id} user={user} sectionId={id} index={index} activeTab={activeTab} />
        ))}
      </Box>
    </>
  )
}

export default PublicProfileSections
