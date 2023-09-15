import { Box } from '@mui/material'
import { useCompanyChannels, useUpdateCompanyChannel } from 'api/hooks'
import { LinkSkeleton } from 'components'
import { updateCompanyChannelsOrderCache } from 'libs/cache/updateCompanyChannelsOrderCache'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import ChannelItem from '../ChannelItem'

const ChannelsList = () => {
  const {
    query: { companyId },
  } = useRouter()
  const [channels, setChannels] = useState([])
  const { loading, data: data_channels } = useCompanyChannels({
    skip: !companyId,
    variables: { id: companyId },
  })
  const getChannels = data_channels?.getCompany?.channels?.items
  const [updateCompanyChannel] = useUpdateCompanyChannel()

  useEffect(() => {
    if (getChannels) {
      setChannels(getChannels)
    }
  }, [getChannels])

  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) return

    const newItems = reorder(channels, source.index, destination.index)

    setChannels(newItems)

    updateCompanyChannel({
      variables: {
        input: {
          companyId: companyId,
          id: channels[source.index].id,
          orderIndex: destination.index,
        },
      },
      update: (cache) => {
        updateCompanyChannelsOrderCache({ companyId, cache, channels, result })
      },
    })
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  return (
    <>
      {!loading ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="channel-list">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {channels.map((channel, index) => (
                  <Draggable key={channel.id} draggableId={channel.id} index={index}>
                    {(provided) => (
                      <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ChannelItem channel={channel} />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <>
          <LinkSkeleton />
          <LinkSkeleton />
        </>
      )}
    </>
  )
}

export default ChannelsList
