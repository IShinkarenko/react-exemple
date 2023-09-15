import { useCompanyProfileSectionItems } from 'api/hooks/queries/useCompanyProfileSectionItems'
import {
  Custom,
  EmailAddress,
  GenaralComponent,
  KeyContact,
  PhoneNumber,
  SectionLoader,
  SocialOutpost,
  TabPanel,
  Website,
} from 'components'
import { PRIVATE_NETWORK_ONLY, PUBLIC_NETWORK } from 'constant'
import React from 'react'

import useStyles from './styles'

const PublicSectionItems = ({ user, sectionId, index, activeTab }) => {
  const classes = useStyles()
  const visibilityLevelArr = user ? [PUBLIC_NETWORK, PRIVATE_NETWORK_ONLY] : [PUBLIC_NETWORK]

  const { loading, data } = useCompanyProfileSectionItems({
    variables: {
      id: sectionId,
      filter: {
        visibilityLevel: visibilityLevelArr,
      },
    },
  })

  const sectionItems = data?.getCompanyProfileSection?.items?.items

  const itemsArr = {
    ['EmailAddress']: EmailAddress,
    ['KeyContact']: KeyContact,
    ['PhoneNumber']: PhoneNumber,
    ['Custom']: Custom,
    ['Website']: Website,
    ['AnnualRevenue']: GenaralComponent,
    ['EmployeeCount']: GenaralComponent,
    ['SocialOutpost']: SocialOutpost,
    ['Header']: GenaralComponent,
    ['Address']: GenaralComponent,
    ['FoundingYear']: GenaralComponent,
    ['Affiliation']: GenaralComponent,
    ['Award']: GenaralComponent,
    ['Certification']: GenaralComponent,
    ['Location']: GenaralComponent,
    ['Mention']: GenaralComponent,
    ['PressRelease']: GenaralComponent,
  }

  if (loading) {
    return <SectionLoader sx={{ p: 3 }} />
  }

  return (
    <TabPanel value={activeTab} index={index} className={classes.sectionPanel}>
      {sectionItems.map(({ id, sectionItemType, value }) => {
        const Component = itemsArr[sectionItemType]
        // const isOffline = visibilityLevel === OFFLINE
        // const isByRequestOnly = visibilityLevel === BY_REQUEST_ONLY
        // const isPrivateNetwork = visibilityLevel === PRIVATE_NETWORK_ONLY
        // const isPublicNetwork = visibilityLevel === PUBLIC_NETWORK

        return <Component key={id} value={JSON.parse(value)} name={sectionItemType} />
      })}
    </TabPanel>
  )
}

export default PublicSectionItems
