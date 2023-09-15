import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import InfoIcon from '@mui/icons-material/Info'
import { Box, IconButton, Typography } from '@mui/material'
import { BaseButton } from 'components'
import { FieldArray, Form, Formik, useFormikContext } from 'formik'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect, useState } from 'react'
import EasyEdit from 'react-easy-edit'
import { appendProtocol, isURL } from 'utils'

import CTAButtons from './components/CTAButtons'
import DisplayComponent from './components/DisplayComponent'
import EditComponent from './components/EditComponent'
import useStyles from './styles'

const AutoSubmitLinks = ({ existLinksCount, onHandleSave }) => {
  const { values } = useFormikContext()
  const isDeleted = values.socialLinks.length < existLinksCount

  useEffect(() => {
    if (isDeleted) {
      onHandleSave(values)
    }
  }, [values, isDeleted, onHandleSave])

  return null
}

const EasyEditArrayOfLinks = ({ name, value: links, handleSave, toolTipPlacement, classNameButton, buttonIcon }) => {
  const { t } = useTranslation('common')

  const classes = useStyles()
  const [error, setError] = useState(false)
  const existLinksCount = links.length

  const initialValues = {
    socialLinks: links ? links : [],
  }

  const onHandleSave = useCallback(
    ({ socialLinks }) => {
      const data = { value: socialLinks.map((m) => appendProtocol(m)), name }

      handleSave(data)
    },
    [handleSave, name]
  )

  const onHandleValidate = useCallback((value) => {
    const isNotValid = value != '' && isURL(value)

    if (!isNotValid) {
      setError(true)
    } else {
      setError(false)
    }

    return isNotValid
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => console.log('values', values)}
    >
      {({ values, setFieldValue, resetForm }) => (
        <Form autoComplete="off">
          <FieldArray
            name={'socialLinks'}
            render={({ insert, remove }) => (
              <>
                {isEmpty(values[name]) ? (
                  <Box className={classes.emtyContacts}>
                    <InfoIcon />
                    <Typography variant="subtitle2">No Links</Typography>
                  </Box>
                ) : (
                  <ul className={classes.links}>
                    {values[name].map((value, index) => (
                      <li key={index}>
                        <Box className={classes.wrapper}>
                          <EasyEdit
                            type={'text'}
                            value={value || null}
                            onSave={() => onHandleSave(values)}
                            onCancel={() => {
                              resetForm(initialValues)
                              setError(false)
                            }}
                            displayComponent={<DisplayComponent placement={toolTipPlacement} />}
                            editComponent={
                              <EditComponent
                                remove={remove}
                                index={index}
                                name={name}
                                value={value}
                                setFieldValue={setFieldValue}
                                error={error}
                              />
                            }
                            saveButtonLabel={<DoneIcon />}
                            cancelButtonLabel={<CloseIcon />}
                            onValidate={(value) => onHandleValidate(value)}
                          />

                          {value && <CTAButtons value={value} />}
                        </Box>
                      </li>
                    ))}
                  </ul>
                )}

                <Box display="flex" justifyContent="flex-end" mt={2} className={classNameButton}>
                  {values[name].length < 5 && (
                    <>
                      {buttonIcon ? (
                        <IconButton size="small" onClick={() => insert(values[name].length, '')}>
                          {buttonIcon}
                        </IconButton>
                      ) : (
                        <BaseButton
                          title={`+ ${t('Add')}`}
                          onClick={() => insert(values[name].length, '')}
                          className={classes.addButton}
                        />
                      )}
                    </>
                  )}
                </Box>
              </>
            )}
          />

          <AutoSubmitLinks existLinksCount={existLinksCount} onHandleSave={onHandleSave} />
        </Form>
      )}
    </Formik>
  )
}

export default memo(EasyEditArrayOfLinks)
