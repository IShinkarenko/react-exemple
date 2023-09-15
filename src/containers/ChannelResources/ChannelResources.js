import { Box } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useChannelResources } from 'api/hooks'
import { TabBar } from 'components'
import { useFetchJson } from 'hooks/useFetchJson'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import ResourceItem from './ResourceItem'
import useStyles from './styles'

const ChannelResources = () => {
  const classes = useStyles()
  const {
    query: { channelId },
  } = useRouter()
  const router = useRouter()
  const optionsBasePath = `/static/locales/${router.locale}/lists`
  const { result } = useFetchJson(`${optionsBasePath}/resources.json`)
  const [resourceType, setResourceType] = useState('')
  const [isSuggestions, setIsSuggestions] = useState(true)
  const { loading, data } = useChannelResources({ skip: !channelId, variables: { id: channelId } })
  const resources = data && data.getCompanyChannel.resources.items

  const onChangeType = (e) => {
    setResourceType(e.target.value)
  }
  const onChangeSuggestions = (e) => {
    setIsSuggestions(e.target.checked)
  }

  return (
    <>
      <TabBar
        isSearch
        isSelect
        isSwitch
        isSwitchChecked={isSuggestions}
        onChangeSwitch={onChangeSuggestions}
        selectOptions={result}
        selectOnChange={onChangeType}
        selectValue={resourceType}
      />
      <Box className={classes.resourcesGrid} mt={4}>
        {(loading ? Array.from(new Array(5)) : resources).map((resource, index) =>
          resource ? (
            <ResourceItem key={resource.id} resource={resource} />
          ) : (
            <Box key={index} mt={1} mb={1}>
              <Skeleton variant="rectangular" width={310} height={130} />
            </Box>
          )
        )}
      </Box>
    </>
  )
}

export default ChannelResources
