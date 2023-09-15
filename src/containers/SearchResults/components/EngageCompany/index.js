import BookmarkIcon from '@mui/icons-material/Bookmark'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Typography } from '@mui/material'
import { FOLLOWING } from 'constant'
import EngageCompanyInterface from 'containers/Relationship/components/EngageCompanyInterface'
import { useCheckUser } from 'hooks/useCheckUser'
import React, { memo, useCallback, useState } from 'react'

const EngageCompany = ({ id: selectedCompanyId, status: selectedStatus }) => {
  const { user } = useCheckUser()
  const [openEngagementOptions, setOpenEngagementOptions] = useState(false)

  const handleClick = useCallback(() => {
    setOpenEngagementOptions(true)
  }, [])

  const handleCloseEngagementOptions = useCallback(() => {
    setOpenEngagementOptions(false)
  }, [])

  return (
    <>
      <Typography variant="caption" onClick={handleClick}>
        {selectedStatus === FOLLOWING ? (
          <>
            <BookmarkIcon color="primary" />
            <span>{'Follow'}</span>
          </>
        ) : (
          <>
            <PersonAddIcon color="primary" />
            <span>{'Connect'}</span>
          </>
        )}
      </Typography>

      {openEngagementOptions && (
        <EngageCompanyInterface
          isUserAutorized={user}
          selectedCompanyId={selectedCompanyId}
          selectedStatus={selectedStatus}
          handleCloseEngagementOptions={handleCloseEngagementOptions}
        />
      )}
    </>
  )
}

export default memo(EngageCompany)
