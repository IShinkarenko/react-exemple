import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from '@mui/material'
import clsx from 'clsx'
import { Input } from 'components'
import { Field } from 'formik'
import React from 'react'

import useStyles from './styles'

const EditComponent = ({ setParentValue, setFieldValue, className, remove, name, index, value, error }) => {
  const classes = useStyles()

  const handleRemove = () => {
    remove(index)
  }

  return (
    <Box className={clsx(classes.editWrapper)}>
      <Field
        name={`${name}.${index}`}
        component={Input}
        margin={'dense'}
        variant="standard"
        className={className}
        onChange={(e) => {
          const value = e.target.value
          setParentValue(value)
          setFieldValue(`${name}.${index}`, value)
        }}
        error={error}
      />

      {value && (
        <IconButton color={'secondary'} onClick={handleRemove} className={classes.removeButton} size="large">
          <DeleteIcon />
        </IconButton>
      )}
    </Box>
  )
}
export default EditComponent
