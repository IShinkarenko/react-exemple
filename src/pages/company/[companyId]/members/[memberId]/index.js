import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useCompanyChannels, useCompanyUser, useUpdateCompanyUser } from 'api/hooks'
import { ChipSelect, ConfirmSelect, MemberStatusToggle, PageHead, TableRowField } from 'components'
import { useFetchJson } from 'hooks/useFetchJson'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import routes from 'routes'
import { renderValueFromOptions } from 'utils'

import useStyles from './styles'

const MemberProfile = () => {
  const { t } = useTranslation('teamMembers')
  const router = useRouter()
  const {
    query: { memberId, companyId },
  } = useRouter()
  const classes = useStyles()
  const optionsBasePath = `/static/locales/${router.locale}/lists`
  const { result: permissionsOptions } = useFetchJson(`${optionsBasePath}/permissions.json`)
  const [updateCompanyUser] = useUpdateCompanyUser()
  const { data } = useCompanyUser({ variables: { id: memberId } })
  const { data: data_channels } = useCompanyChannels({
    variables: { id: companyId },
  })

  const companyChannels = data_channels?.getCompany?.channels?.items
  const member = data?.getCompanyUser
  const allowedChannels = member?.userPolicy?.allowedChannels
  const permissions = member?.userPolicy?.permissions
  const isColaborator = member?.role === 'Collaborator'
  const isChannelSubscriber = member?.role === 'ChannelSubscriber'

  const channelsOptions = useMemo(
    () => (companyChannels || []).map((option) => ({ label: option.name, value: option.id })),
    [companyChannels]
  )

  // eslint-disable-next-line prettier/prettier
  const permissionsValue = useMemo(() => renderValueFromOptions(permissionsOptions, permissions), [permissionsOptions, permissions,])

  // eslint-disable-next-line prettier/prettier
  const channelsValue = useMemo(() => renderValueFromOptions(channelsOptions, allowedChannels), [channelsOptions,allowedChannels,])

  const handleClick = () => router.push(routes.companyMembers, `/company/${companyId}/members`)

  const updateMemberData = ({ role, disabled, name, options }) => {
    const normalizedOptions = name && options.map(({ value }) => value)
    const normalizedData = {
      role,
      disabled,
      companyId,
      id: member?.id,
      userId: member?.userId,
      userName: member?.userName,
      companyName: member?.companyName,
      userPolicy: {
        allowedChannels: name === 'allowedChannels' ? normalizedOptions : allowedChannels,
        permissions: name === 'permissions' ? normalizedOptions : permissions,
      },
    }

    updateCompanyUser({
      variables: {
        input: normalizedData,
      },
    })
  }

  return (
    <>
      <Box role="complementary">
        {member ? (
          <PageHead backLinkOnclick={handleClick} title={member?.name} />
        ) : (
          <Box mb={4}>
            <Skeleton variant="rectangular" width={'30%'} height={30} />
          </Box>
        )}

        <Paper elevation={1}>
          <TableContainer>
            <Table className={classes.profileTable}>
              <TableBody>
                <TableRowField title={t('Role')} align="left">
                  <ConfirmSelect
                    name="role"
                    value={member?.role}
                    optionsUrl={`${optionsBasePath}/roles.json`}
                    handleUpdateData={updateMemberData}
                  />
                </TableRowField>

                <TableRowField title={t('Status')} align="left">
                  <MemberStatusToggle isDisable={member?.disabled} handleUpdateData={updateMemberData} />
                </TableRowField>

                {isColaborator && (
                  <TableRowField title={t('Permission')} align="left">
                    <ChipSelect
                      name="permissions"
                      label={t('Permissions')}
                      jsonUrl={`${optionsBasePath}/permissions.json`}
                      values={permissionsValue}
                      handleChange={updateMemberData}
                      freeSolo={false}
                    />
                  </TableRowField>
                )}

                {isChannelSubscriber && (
                  <TableRowField title={t('Allowed Channels')} align="left">
                    <ChipSelect
                      name="allowedChannels"
                      label={t('Allowed Channels')}
                      options={channelsOptions}
                      values={channelsValue}
                      handleChange={updateMemberData}
                      freeSolo={false}
                    />
                  </TableRowField>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['teamMembers', 'companyMenu', 'accountMenu'])),
  },
})

export default MemberProfile
