import React, { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { ColumnDragCard } from './../ColumnDragCard'
import useStyles from './styles'

export const ColumnDragObject = ({ dragState }) => {
  const classes = useStyles()
  const referenceBoxRef = useRef(null)

  // @todo wrap in a no-events overlay to clip against screen edges
  const dragBoxRef = useRef(null)
  const dragObjectPortal =
    dragState && dragState.pointerStartInfo
      ? createPortal(
          <div className={classes.CSVImporter_ColumnDragObject}>
            <div className={classes.CSVImporter_ColumnDragObject__positioner} ref={dragBoxRef}>
              <div className={classes.CSVImporter_ColumnDragObject__holder}>
                <ColumnDragCard column={dragState.column} isDragged />
              </div>
            </div>
          </div>,
          document.body
        )
      : null

  // set up initial position
  const pointerStartInfo = dragState && dragState.pointerStartInfo
  useLayoutEffect(() => {
    if (!pointerStartInfo || !dragBoxRef.current) {
      return
    }

    const { initialXY, initialWidth } = pointerStartInfo

    dragBoxRef.current.style.left = `${initialXY[0]}px`
    dragBoxRef.current.style.top = `${initialXY[1]}px`
    dragBoxRef.current.style.width = `${initialWidth}px`

    // copy known font style from main content
    // @todo consider other text style properties?
    if (referenceBoxRef.current) {
      const computedStyle = window.getComputedStyle(referenceBoxRef.current)
      dragBoxRef.current.style.fontFamily = computedStyle.fontFamily
      dragBoxRef.current.style.fontSize = computedStyle.fontSize
      dragBoxRef.current.style.fontWeight = computedStyle.fontWeight
      dragBoxRef.current.style.fontStyle = computedStyle.fontStyle
      dragBoxRef.current.style.letterSpacing = computedStyle.letterSpacing
    }
  }, [pointerStartInfo])

  // / subscribe to live position updates without state changes
  useLayoutEffect(() => {
    if (dragState) {
      dragState.updateListeners['dragObj'] = (xy) => {
        if (!dragBoxRef.current) {
          return
        }

        dragBoxRef.current.style.left = `${xy[0]}px`
        dragBoxRef.current.style.top = `${xy[1]}px`
      }
    }
  }, [dragState])

  return <div ref={referenceBoxRef}>{dragObjectPortal}</div>
}
