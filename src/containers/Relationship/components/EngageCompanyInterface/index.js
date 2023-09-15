import { useLazyQuery } from '@apollo/client'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material'
import { useCreateCompanyRelationship } from 'api/hooks'
import { GET_COMPANY_CHANNELS } from 'api/hooks/queries/useCompanyChannels/useCompanyChannels.gql'
import { GET_PUBLIC_COMPANY } from 'api/hooks/queries/usePublicCompany/usePublicCompany.gql'
import { DialogPopUp } from 'components'
import { FOLLOWING, SIGN_IN, SIGN_UP } from 'constant'
import { useAppDispatch } from 'hooks/useAppState'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import routes from 'routes'

const EngageCompanyInterface = ({
  isUserAutorized,
  selectedCompanyId,
  selectedStatus,
  handleCloseEngagementOptions,
  handleCompleted = () => null,
}) => {
  const router = useRouter()
  const {
    query: { companyId },
  } = router

  const dispatch = useAppDispatch()

  const [isOpenAuthorizedModal, setIsOpenAuthorizedModal] = useState(false)
  const [isOpenUnAuthorizedModal, setIsUnOpenAuthorizedModal] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [checkedChannels, setCheckedChannels] = useState([])

  useEffect(() => {
    getPublicCompany({ variables: { id: selectedCompanyId } })

    if (isUserAutorized) {
      setIsOpenAuthorizedModal(true)
      getCompanyChannels({ variables: { id: companyId } })
    } else {
      setIsUnOpenAuthorizedModal(true)
    }
  }, [companyId, getCompanyChannels, getPublicCompany, selectedCompanyId, isUserAutorized])

  const [createCompanyRelationship] = useCreateCompanyRelationship({
    onCompleted: () => {
      setIsOpenAuthorizedModal(false)
      handleCloseEngagementOptions()
      handleCompleted()
      toast('Success!')
    },
  })

  const [getCompanyChannels, { loading: companyChannelsLoading, data }] = useLazyQuery(GET_COMPANY_CHANNELS, {
    onCompleted: (data) => setCheckedChannels(data?.getCompany?.channels?.items),
  })

  const [getPublicCompany, { loading: publicCompanyLoading, data: publicCompanyData }] = useLazyQuery(
    GET_PUBLIC_COMPANY
  )

  const companyChannels = data?.getCompany?.channels?.items || []
  const publicCompany = publicCompanyData?.getCompany
  const loading = companyChannelsLoading || publicCompanyLoading
  const form = selectedStatus === FOLLOWING ? 'followedCompany' : 'connectedCompany'

  const handleDialogClose = useCallback(() => {
    if (isOpenAuthorizedModal) {
      setIsOpenAuthorizedModal(false)
      setCheckedChannels([])
    } else {
      setIsUnOpenAuthorizedModal(false)
    }

    handleCloseEngagementOptions()
  }, [isOpenAuthorizedModal, handleCloseEngagementOptions])

  const handleAccept = useCallback(() => {
    const { name, id, websiteUrl, description } = publicCompany

    createCompanyRelationship({
      variables: {
        input: {
          companyId,
          name,
          websiteUrl,
          description,
          channels: checkedChannels?.filter((f) => f.id).map((m) => m.id) || [],
          status: selectedStatus,
          expandigoCompanyId: id,
          sourceType: 'ManualEntry',
        },
      },
    })
  }, [createCompanyRelationship, publicCompany, companyId, selectedStatus, checkedChannels])

  const handleCollapseChannels = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const handleCheckChannel = useCallback(
    (value) => () => {
      const currentIndex = checkedChannels.indexOf(value)
      const newChecked = [...checkedChannels]

      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      setCheckedChannels(newChecked)
    },
    [checkedChannels]
  )

  const handleSignIn = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
    localStorage.setItem(
      form,
      JSON.stringify({ companyId: selectedCompanyId, name: publicCompany?.name, type: selectedStatus })
    )
    router.push(routes.signIn)
  }, [dispatch, publicCompany?.name, router, selectedCompanyId, selectedStatus, form])

  const handleSignUp = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_UP })
    localStorage.setItem(
      form,
      JSON.stringify({ companyId: selectedCompanyId, name: publicCompany?.name, type: selectedStatus })
    )
    router.push(routes.signIn)
  }, [dispatch, publicCompany?.name, router, selectedCompanyId, selectedStatus, form])

  return (
    <>
      {isOpenAuthorizedModal && (
        <DialogPopUp
          loading={loading}
          isOpenModal={isOpenAuthorizedModal}
          closeModal={handleDialogClose}
          fullWidth={false}
          title={selectedStatus === FOLLOWING ? 'Follow' : 'Connect'}
          successTitle={selectedStatus === FOLLOWING ? 'Follow' : 'Connect'}
          handleAccept={handleAccept}
          sx={{
            '.MuiPaper-root': {
              minWidth: '280px',
            },
          }}
        >
          <List
            component="nav"
            sx={{ width: '280px' }}
            subheader={
              <ListSubheader>
                <Typography variant="subtitle2" sx={{ mt: 1, mb: 2 }}>
                  On what channels would you like to see this company?
                </Typography>
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleCollapseChannels}>
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>

              <ListItemText primary="Channels" />
              {isCollapsed ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {companyChannels.map(({ id, name }, index) => (
                  <ListItemButton
                    key={index}
                    role={undefined}
                    onClick={handleCheckChannel(id)}
                    dense
                    sx={{ padding: '4px 32px' }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        size="small"
                        edge="start"
                        checked={checkedChannels.indexOf(id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>

                    <ListItemText primary={name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
        </DialogPopUp>
      )}

      {isOpenUnAuthorizedModal && (
        <DialogPopUp
          isOpenModal={isOpenUnAuthorizedModal}
          title={selectedStatus === FOLLOWING ? 'Follow Company Profile' : 'Connect With This Company'}
          description={
            selectedStatus === FOLLOWING
              ? 'To follow this profile, you must be a signed-in user. What would you like to do?'
              : 'To connect with this company, you must be a signed-in user. What would you like to do?'
          }
          closeModal={handleDialogClose}
          dialogActions={
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'} ali>
              <Button onClick={handleDialogClose}>Cancel</Button>

              <Box>
                <Button variant="outlined" onClick={handleSignUp}>
                  Sign Up
                </Button>
                <Button variant="contained" onClick={handleSignIn} sx={{ ml: 1 }}>
                  Sign In
                </Button>
              </Box>
            </Box>
          }
        />
      )}
    </>
  )
}

export default memo(EngageCompanyInterface)
