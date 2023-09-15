import { useCallback, useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-use-gesture'

export function useColumnDragState(fields, initialAssignments, onTouched) {
  // wrap in ref to avoid re-triggering
  const onTouchedRef = useRef(onTouched)
  onTouchedRef.current = onTouched

  const [dragState, setDragState] = useState(null > null)

  const [fieldAssignments, setFieldAssignments] = useState(initialAssignments)

  // make sure there are no extra fields
  useEffect(() => {
    const removedFieldNames = Object.keys(fieldAssignments).filter(
      (existingFieldName) => !fields.some((field) => field.name === existingFieldName)
    )

    if (removedFieldNames.length > 0) {
      // @todo put everything inside this setter
      setFieldAssignments((prev) => {
        const copy = { ...prev }

        removedFieldNames.forEach((fieldName) => {
          delete copy[fieldName]
        })

        return copy
      })
    }
  }, [fields, fieldAssignments, setFieldAssignments])

  const internalAssignHandler = useCallback(
    (column, fieldName) => {
      setFieldAssignments((prevAssignments) => {
        const copy = { ...prevAssignments }

        // ensure dropped column does not show up elsewhere
        Object.keys(prevAssignments).forEach((name) => {
          if (copy[name] === column.index) {
            delete copy[name]
          }
        })

        // set new field column
        if (fieldName !== null) {
          copy[fieldName] = column.index
        }

        return copy
      })

      // mark for validation display
      if (fieldName) {
        onTouchedRef.current(fieldName)
      }
    },
    [setFieldAssignments]
  )

  const bindDrag = useDrag(({ first, last, event, xy, args }) => {
    if (first && event) {
      // only prevent default inside first event
      // (touchmove uses passive event handler and would trigger warning)
      event.preventDefault()

      const [column, startFieldName] = args

      setDragState({
        pointerStartInfo: {
          initialXY: xy,
          initialWidth: event.currentTarget instanceof HTMLElement ? event.currentTarget.offsetWidth : 0,
        },
        column,
        dropFieldName: startFieldName !== undefined ? startFieldName : null,
        updateListeners: {},
      })
    } else if (last) {
      setDragState(null)

      if (dragState) {
        internalAssignHandler(dragState.column, dragState.dropFieldName)
      }
    }

    // @todo figure out a cleaner event stream solution
    if (dragState) {
      const listeners = dragState.updateListeners
      for (const key of Object.keys(listeners)) {
        listeners[key](xy)
      }
    }
  }, {})

  // when dragging, set root-level user-select:none to prevent text selection, see Importer.scss
  // (done via class toggle to avoid interfering with any other dynamic style changes)
  useEffect(() => {
    if (dragState) {
      document.body.classList.add('CSVImporter_dragging')
    } else {
      // remove text selection prevention after a delay (otherwise on iOS it still selects something)
      const timeoutId = setTimeout(() => {
        document.body.classList.remove('CSVImporter_dragging')
      }, 200)

      return () => {
        // if another drag state comes along then cancel our delay and just clean up class right away
        clearTimeout(timeoutId)
        document.body.classList.remove('CSVImporter_dragging')
      }
    }
  }, [dragState])

  const columnSelectHandler = useCallback((column) => {
    setDragState((prev) => {
      // toggle off if needed
      if (prev && prev.column === column) {
        return null
      }

      return {
        pointerStartInfo: null, // no draggable position information
        column,
        dropFieldName: null,
        updateListeners: {},
      }
    })
  }, [])

  const dragHoverHandler = useCallback((fieldName, isOn) => {
    setDragState((prev) => {
      if (!prev) {
        return prev
      }

      if (isOn) {
        // set the new drop target
        return {
          ...prev,
          dropFieldName: fieldName,
        }
      } else if (prev.dropFieldName === fieldName) {
        // clear drop target if we are still the current one
        return {
          ...prev,
          dropFieldName: null,
        }
      }

      // no changes by default
      return prev
    })
  }, [])

  const assignHandler = useCallback(
    (fieldName) => {
      // clear active drag state
      setDragState(null)

      if (dragState) {
        internalAssignHandler(dragState.column, fieldName)
      }
    },
    [internalAssignHandler, dragState]
  )

  const unassignHandler = useCallback(
    (column) => {
      setFieldAssignments((prev) => {
        const assignedFieldName = Object.keys(prev).find((fieldName) => prev[fieldName] === column.index)

        if (assignedFieldName === undefined) {
          return prev
        }

        const copy = { ...prev }
        delete copy[assignedFieldName]
        return copy
      })
    },
    [setFieldAssignments]
  )

  return {
    fieldAssignments,
    dragState,
    dragEventBinder: bindDrag,
    dragHoverHandler,
    columnSelectHandler,
    assignHandler,
    unassignHandler,
  }
}
