import { Box, Drawer, Typography } from '@mui/material'
import { itemTypes } from 'containers/CompanyProfile/constants'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import VisibilitySectionIndicator from '../VisibilitySectionIndicator'
import useStyles from './styles'

const grid = 8

const getListStyle = () => ({
  background: 'rgb(235, 236, 240)',
  padding: grid,
  width: '100%',
  height: '100%',
  borderRadius: 5,
  border: '1px solid #ddd',
  overflow: 'scroll',
})

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? '#d9f1f1' : '#fff',
  border: '1px solid #ddd',
  borderRadius: 5,
  position: 'relative',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const CompanySectionsOrdering = ({ isOpen, handleToggleDrawer, handleUpdate, orderList }) => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()
  const [list, setList] = useState([])

  useEffect(() => {
    if (orderList) {
      setList(orderList)
    }
  }, [orderList])

  const reorder = useCallback((list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }, [])

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return
      }

      const newSections = reorder(list, result.source.index, result.destination.index)

      setList(newSections)

      const normalizedData = {
        id: list[result.source.index].id,
        orderIndex: result.destination.index,
      }

      handleUpdate(normalizedData, list, result)
    },
    [handleUpdate, list, reorder]
  )

  return (
    <Drawer
      anchor={'right'}
      open={isOpen}
      onClose={handleToggleDrawer}
      onOpen={handleToggleDrawer}
      classes={{ paper: classes.outboundPaper }}
    >
      <Box className={classes.sectionOrdering}>
        <Box className={classes.sectionOrderingTop}>
          <Box className={classes.sectionOrderingBg}></Box>
          <Typography variant="h4" className={classes.sectionOrderingTitle}>
            {t('Change the order')}
          </Typography>
          <Typography variant="body2" className={classes.sectionOrderingSubtitle}>
            {t('You can change the order using Drag & Drop')}
          </Typography>
        </Box>

        <Box className={classes.sectionOrderinDndContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {list.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                          >
                            <Box className={classes.orderItem}>
                              <Typography>
                                {item.sectionItemType ? itemTypes[item.sectionItemType] : item.name}
                              </Typography>
                              <VisibilitySectionIndicator
                                visibilityLevel={item?.visibilityLevel}
                                isLabel={false}
                                className={classes.sectionBadge}
                              />
                            </Box>
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
    </Drawer>
  )
}

export default memo(CompanySectionsOrdering)
