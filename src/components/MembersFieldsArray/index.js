import DeleteIcon from '@mui/icons-material/Delete'
import { Box, IconButton } from '@mui/material'
import { BaseButton, CustomSelect, Input } from 'components'
import { memberRoles } from 'constant'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'
import React, { memo } from 'react'

import useStyles from './styles'

const MembersFieldsArray = ({ values, name, remove, insert, limit }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const isRemoveButton = values[name].length > 1

  return (
    <>
      <Box>
        {values[name] &&
          values[name].length > 0 &&
          values[name].map((value, index) => (
            <Box className={classes.fieldArray} key={index}>
              <Field label={t('Email')} name={`${name}.${index}.email`} component={Input} margin={'dense'} />

              <Field
                label={t('Role')}
                name={`${name}.${index}.role`}
                options={memberRoles}
                component={CustomSelect}
                margin={'none'}
                variant="outlined"
              />

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
          title={`+ ${t('Add member')}`}
          disabled={!values[name].length}
          onClick={() => insert(values[name].length, { email: '', role: '' })}
          className={classes.addButton}
        />
      )}
    </>
  )
}

export default memo(MembersFieldsArray)
