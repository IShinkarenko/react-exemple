import { Box } from '@mui/material'
import { BaseButton, CustomSwitch, DynamicAutocomplete, InlineRadioGroup, Input, SubHead } from 'components'
import { ADD, NUMBER, RELATIONSHIP_CUSTOM_FIELD, SELECT, typesOptions } from 'constant'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import useStyles from './styles'

const DefinitionForm = ({ name, mode, editValue, bufferValue, handleSubmit, handleCancel }) => {
  const { t } = useTranslation(['relationships'])
  const classes = useStyles()
  const isAddMode = mode === ADD
  const isCustomFiled = name === RELATIONSHIP_CUSTOM_FIELD
  const definitionValue = isAddMode ? bufferValue : editValue?.name
  const configurationData = !isAddMode && editValue && JSON.parse(editValue?.configuration)

  const onHandleSubmit = ({ value, ...rest }) => {
    const normilizedData = {
      value,
      id: editValue && editValue.id,
      configuration: JSON.stringify(rest),
    }

    handleSubmit(normilizedData)
  }

  return (
    <Box>
      <Formik
        initialValues={{
          value: definitionValue,
          type: configurationData?.type || '',
          required: configurationData?.required || false,
          currency: configurationData?.currency || false,
          decimal: configurationData?.decimal || '',
          list: configurationData?.list || [],
        }}
        onSubmit={onHandleSubmit}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Form>
            <Field name="value" label={t('Value')} component={Input} />

            {isCustomFiled && (
              <>
                <SubHead title={t('Choose type of the field')} />
                <Field
                  name="type"
                  options={typesOptions}
                  component={InlineRadioGroup}
                  className={classes.radioButton}
                />

                {values.type === NUMBER && (
                  <>
                    <SubHead title={t('Specify Number format')} mt={4} />
                    <Box className={classes.numbers}>
                      <Field name="currency" label={'Currency'} component={CustomSwitch} />

                      <Field
                        name="decimal"
                        label={t('How many decimal places?')}
                        component={Input}
                        InputProps={{ type: 'number' }}
                        margin={'none'}
                      />
                    </Box>
                  </>
                )}

                {values.type === SELECT && (
                  <>
                    <SubHead
                      title={t(
                        'Provide a list of values that can be selected from when added/updated on the Relationship profile.'
                      )}
                      mt={4}
                      mb={2}
                    />
                    <Field name="list" label={t('Options')} component={DynamicAutocomplete} />
                  </>
                )}

                <SubHead title={t('Clarify whether this field should be required or empty?')} mt={4} />
                <Field name="required" label={t('Required')} component={CustomSwitch} />
              </>
            )}

            <Box mt={6} display="flex" justifyContent="flex-end">
              <BaseButton title={t('Cancel')} variant="outlined" onClick={handleCancel} />

              <BaseButton title={t('Save')} variant="contained" type="submit" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default DefinitionForm
