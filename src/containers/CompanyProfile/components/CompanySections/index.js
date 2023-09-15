import AddIcon from '@mui/icons-material/Add'
import { Box, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import {
  useCompanyProfileSections,
  useCreateCompanyProfileSection,
  useDeleteCompanyProfileSection,
  useUpdateCompanyProfileSection,
} from 'api/hooks'
import clsx from 'clsx'
import { DialogPopUp, SectionLoader } from 'components'
import { updateCompanyProfileSectionCache } from 'libs/cache/updateCompanyProfileSectionCache'
import { updateCompanyProfileSections } from 'libs/cache/updateCompanyProfileSections'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import AddNewSection from '../AddNewSection'
import CompanySectionItems from '../CompanySectionItems'
import SummarySectionData from '../SummarySectionData'
import useStyles from './styles'

const CompanySections = () => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()
  const {
    query: { companyId },
  } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [activeSectionId, setActiveSection] = useState()

  const { loading, data } = useCompanyProfileSections({ variables: { id: companyId } })
  const [createCompanyProfileSection] = useCreateCompanyProfileSection()
  const [updateCompanyProfileSection] = useUpdateCompanyProfileSection()
  const [deleteCompanyProfileSection] = useDeleteCompanyProfileSection()

  const profileSectionsData = data?.getCompany?.profileSections
  const profileSections = useMemo(() => profileSectionsData?.items || [], [profileSectionsData?.items])
  const isProfileSections = !isEmpty(profileSections)
  const profileSectionsLength = profileSections.length

  useEffect(() => {
    if (!activeSectionId && isProfileSections && !loading) {
      setActiveSection(profileSections[0]['id'])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const handleChangeTab = useCallback((event, newValue) => {
    setActiveTab(newValue)
  }, [])

  const handleOpenNewSectionForm = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleClickTab = useCallback((id) => {
    setActiveSection(id)
  }, [])

  const setNextSectionAsActive = useCallback(() => {
    const deletedSectionIndex = profileSections.findIndex((section) => section?.id === activeSectionId)
    const isLastSection = deletedSectionIndex === profileSectionsLength - 1
    let nextActiveSectionId

    if (profileSectionsLength === 1) {
      return setActiveSection(null)
    }

    if (isLastSection) {
      nextActiveSectionId = profileSections[deletedSectionIndex - 1]['id']
      setActiveTab(deletedSectionIndex - 1)
    } else {
      nextActiveSectionId = profileSections[deletedSectionIndex + 1]['id']
    }

    setActiveSection(nextActiveSectionId)
  }, [activeSectionId, profileSections, profileSectionsLength])

  const handleCreateSection = useCallback(
    (data) => {
      createCompanyProfileSection({
        variables: {
          input: {
            companyId,
            orderIndex: profileSectionsLength + 1,
            ...data,
          },
        },
        update: (cache, { data }) => {
          updateCompanyProfileSections({ companyId, cache, data })
          setActiveTab(profileSectionsLength)
          handleClickTab(data?.createCompanyProfileSection?.id)
        },
      })
    },
    [companyId, createCompanyProfileSection, profileSectionsLength, handleClickTab]
  )

  const handleUpdateSection = useCallback(
    (data, sections, result) => {
      const id = data.id ? data.id : activeSectionId

      updateCompanyProfileSection({
        variables: {
          input: {
            companyId,
            id,
            ...data,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateCompanyProfileSection: {
            companyId,
            id: activeSectionId,
            __typename: 'CompanyProfileSection',
            ...data,
          },
        },
        update: (cache) => {
          if (sections || result) {
            updateCompanyProfileSectionCache({ companyId, cache, sections, result })
          }
        },
      })
    },
    [activeSectionId, companyId, updateCompanyProfileSection]
  )

  const handleDeleteSection = useCallback(() => {
    setNextSectionAsActive()

    deleteCompanyProfileSection({
      variables: {
        id: activeSectionId,
      },
      update: (cache, { data: { deleteCompanyProfileSection } }) => {
        cache.evict({ id: cache.identify(deleteCompanyProfileSection) })
        cache.gc()
      },
    })
  }, [activeSectionId, deleteCompanyProfileSection, setNextSectionAsActive])

  if (loading) {
    return <SectionLoader sx={{ p: 3 }} />
  }

  return (
    <>
      <Box className={clsx(classes.companyInfoBlock, classes.companySections)}>
        <Box className={classes.addNewSectionButton} onClick={handleOpenNewSectionForm}>
          <Tooltip title={t('Add New Section')} placement={'top'} arrow={true}>
            <Box className={classes.addNewSectionButtonInner}>
              <AddIcon />
            </Box>
          </Tooltip>
        </Box>

        {isProfileSections && (
          <SummarySectionData
            activeSectionId={activeSectionId}
            profileSections={profileSections}
            handleUpdateSection={handleUpdateSection}
            handleDeleteSection={handleDeleteSection}
          />
        )}

        {!isProfileSections && (
          <Box className={classes.emptyItemsFallback}>
            <Typography variant="h4">{t('No sections, yet!')}</Typography>
            <Typography variant="body2" className={classes.emptyItemsSubtitle}>
              {t('Add your first section.')}
            </Typography>
            <img className={classes.emptyItemsIcon} src="/static/arrow_34.svg" alt="arrow" />
          </Box>
        )}

        <Tabs
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChangeTab}
          scrollButtons
          variant="scrollable"
          classes={{ root: classes.profileSectionsTabs, scrollButtons: classes.scrollBtn }}
          allowScrollButtonsMobile
        >
          {profileSections.map(({ id, name }) => (
            <Tab
              key={id}
              label={name}
              className={classes.tab}
              classes={{ selected: classes.selectedTab }}
              onClick={() => handleClickTab(id)}
            />
          ))}
        </Tabs>

        {profileSections.map(({ id, profileSectionType }, index) => {
          return (
            <CompanySectionItems
              key={id}
              index={index}
              sectionId={id}
              activeTab={activeTab}
              profileSectionType={profileSectionType}
            />
          )
        })}
      </Box>

      <DialogPopUp
        isOpenModal={isOpen}
        title={t('Add New Section')}
        description={t(
          'A Profile Section is a child of a Company and helps to describe it. A profile section will be of a given type, which will determine the structure of its content.'
        )}
        closeModal={handleDialogClose}
        maxWidth="xs"
      >
        <AddNewSection
          profileSections={profileSections}
          handleDialogClose={handleDialogClose}
          handleCreateSection={handleCreateSection}
        />
      </DialogPopUp>
    </>
  )
}

export default memo(CompanySections)
