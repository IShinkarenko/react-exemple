import AddIcon from '@mui/icons-material/Add'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import { useCompanyDefinitions } from 'api/hooks'
import { EasyEditArrayOfLinks, EasyEditField, InfoItem, SectionLoader } from 'components'
import { RELATIONSHIP_CUSTOM_FIELD } from 'constant'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'
import { appendProtocol, capitalizeFirstLetters } from 'utils'

import RelationshipCustomFileds from '../RelationshipCustomFileds'
import useStyles from './styles'

const RelationshipGeneral = ({ profile, handleUpdateRelationship }) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const {
    query: { companyId },
  } = useRouter()
  const { loading, data } = useCompanyDefinitions({
    variables: { id: companyId, filter: { definitionType: RELATIONSHIP_CUSTOM_FIELD } },
  })
  const customFieldDefinitions = data?.getCompany?.definitions?.items
  const customFields = profile?.customFields

  const handleEditField = useCallback(
    ({ value, name }) => {
      const v = name === 'websiteUrl' ? appendProtocol(value) : value
      handleUpdateRelationship({ value: v, name })
    },
    [handleUpdateRelationship]
  )

  return (
    <Box className={classes.relationshipGeneralInfo}>
      {loading ? (
        <SectionLoader />
      ) : (
        <>
          <Box className={classes.relationshipGeneralInfoTop}>
            <Avatar className={classes.relationshipAvatar}>
              <Typography variant="subtitle2">{capitalizeFirstLetters(profile?.name)}</Typography>
            </Avatar>

            <EasyEditField
              name={'name'}
              value={profile?.name}
              handleSave={handleEditField}
              displayCmpClass={classes.relationshipName}
            />
          </Box>

          <Box className={classes.relationshipFields}>
            <InfoItem
              title={t('Name')}
              direction={'column'}
              text={<EasyEditField name={'name'} value={profile?.name} handleSave={handleEditField} />}
              className={classes.relationshipField}
            />

            <InfoItem
              title={t('Description')}
              direction={'column'}
              text={
                <EasyEditField
                  name={'description'}
                  value={profile?.description}
                  handleSave={handleEditField}
                  textfiled
                />
              }
              className={classes.relationshipField}
            />

            <Divider sx={{ margin: '17px 0' }} />

            <InfoItem
              title={t('Address')}
              direction={'column'}
              text={<EasyEditField name={'addressLine1'} value={profile?.addressLine1} handleSave={handleEditField} />}
              className={classes.relationshipField}
            />
            <InfoItem
              title={t('Address 2')}
              direction={'column'}
              text={<EasyEditField name={'addressLine2'} value={profile?.addressLine2} handleSave={handleEditField} />}
              className={classes.relationshipField}
            />
            <InfoItem
              title={t('Address 3')}
              direction={'column'}
              text={<EasyEditField name={'addressLine3'} value={profile?.addressLine3} handleSave={handleEditField} />}
              className={classes.relationshipField}
            />

            <Box className={classes.row}>
              <InfoItem
                title={t('City or Locality')}
                direction={'column'}
                text={<EasyEditField name={'city'} value={profile?.city} handleSave={handleEditField} />}
                className={classes.relationshipField}
              />

              <InfoItem
                title={t('State or Region')}
                direction={'column'}
                text={
                  <EasyEditField
                    name={'stateOrProvince'}
                    value={profile?.stateOrProvince}
                    handleSave={handleEditField}
                  />
                }
                className={classes.relationshipField}
              />

              <InfoItem
                title={t('Postal Code')}
                direction={'column'}
                text={<EasyEditField name={'postalCode'} value={profile?.postalCode} handleSave={handleEditField} />}
                className={classes.relationshipField}
              />
            </Box>

            <InfoItem
              title={t('Country')}
              direction={'column'}
              text={<EasyEditField name={'country'} value={profile?.country} handleSave={handleEditField} />}
              className={classes.relationshipField}
            />

            <Divider sx={{ margin: '17px 0' }} />

            <InfoItem
              title={t('Website')}
              direction={'column'}
              text={<EasyEditField name={'websiteUrl'} value={profile?.websiteUrl} handleSave={handleEditField} />}
              className={classes.relationshipField}
            />

            <Box className={classes.relationshipSocialLinks}>
              <InfoItem
                title={<Typography variant="subtitle2">{t('Social Links')}</Typography>}
                direction={'column'}
                text={
                  <>
                    <EasyEditArrayOfLinks
                      name={'socialLinks'}
                      value={profile.socialLinks ?? []}
                      handleSave={handleEditField}
                      toolTipPlacement="right"
                      classNameButton={classes.addSocialLinkBtn}
                      buttonIcon={<AddIcon />}
                    />
                  </>
                }
                className={classes.relationshipFiel}
              />
            </Box>

            <Box className={classes.relationshipSocialLinks}>
              <InfoItem
                tooltip
                title={<Typography variant="subtitle2">{t('Custom fields')}</Typography>}
                tooltipTitle={t('You can add new custom fields in Relationships Settings')}
              />

              <RelationshipCustomFileds
                customFieldDefinitions={customFieldDefinitions}
                customFields={customFields ?? []}
                handleUpdateRelationship={handleUpdateRelationship}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  )
}

export default memo(RelationshipGeneral)
