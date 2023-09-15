import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { BaseButton, Input } from 'components'
import { Field } from 'formik'
import React, { memo } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    addButton: {
      padding: '2px 7px',
    },
    fieldArray: {
      display: 'flex',
      position: 'relative',
      paddingRight: '50px',
    },
    removeButton: {
      marginLeft: '5px',
      position: 'absolute',
      right: 0,
      top: 10,
    },
  })
)

const FieldsArray = ({ values, name, label, remove, insert, limit }) => {
  const classes = useStyles()
  const isRemoveButton = values[name].length > 0

  return (
    <>
      <Box>
        {values[name] &&
          values[name].length > 0 &&
          values[name].map((value, index) => (
            <Box className={classes.fieldArray} key={index}>
              <Field label={label} name={`${name}.${index}`} component={Input} margin={'dense'} />

              {isRemoveButton && (
                <IconButton
                  color={'secondary'}
                  onClick={() => remove(index)}
                  className={classes.removeButton}
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
      </Box>
      {values[name].length < limit && (
        <BaseButton
          isDefault
          variant="text"
          title={`+ Add Link`}
          disabled={values[name].length > limit}
          onClick={() => insert(values[name].length, '')}
          className={classes.addButton}
        />
      )}
    </>
  )
}

export default memo(FieldsArray)
