import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'
import React from 'react'

const ErrorsBgSync = ({ dispatch }) => {
  const { errors } = useFormikContext()

  React.useEffect(() => {
    if (!isEmpty(errors)) {
      dispatch({ type: 'SET_ERRORS', payload: errors })
    }

    return () => {
      dispatch({ type: 'SET_ERRORS', payload: null })
    }
  }, [errors, dispatch])

  return null
}

export default ErrorsBgSync
