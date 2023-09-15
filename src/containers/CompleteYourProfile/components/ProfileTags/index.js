import { Input, TagTypeIndustrial, TagTypeKeywords, TagTypeMarkets, TagTypeObjectives } from 'components'
import { requiredTagsFields } from 'containers/CompleteYourProfile/constants'
import { Field, Form, Formik, getIn } from 'formik'
import { useTranslation } from 'next-i18next'
import React, { useCallback } from 'react'
import * as yup from 'yup'

import useStyles from './styles'

const signUpSchema = (t) =>
  yup.object().shape({
    organization: yup.string().required(t('Organization name is required.')),
    website: yup.string().required(t('Webste is required.')),
    description: yup
      .string()
      .required(t('Company description is required to appear in search.'))
      .max(2048, t('Description should not be no more then 2048 digits')),
  })

const ProfileTags = ({ dispatch, initialValues, tagsValues = [] }) => {
  const { t } = useTranslation('auth')
  const classes = useStyles()

  const handleChangeTags = useCallback(
    (newTags) => {
      dispatch({ type: 'SET_TAGS_VALUES', payload: newTags })
    },
    [dispatch]
  )

  const handleCompanyScoreChange = useCallback(
    (score) => {
      dispatch({ type: 'SET_COMPANY_SCORE', payload: score.length })
    },
    [dispatch]
  )

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
        validationSchema={signUpSchema(t)}
      >
        {({ values, errors, touched, handleBlur, setFieldTouched, setFieldValue }) => {
          const onHandleBlur = (e, name) => {
            const errorMessage = getIn(errors, name)
            const isError = errorMessage && getIn(touched, name)
            const score = Object.values(values).filter((value) => !!value)

            handleBlur(e)

            if ((!isError && values[name]) || (isError && !values[name])) {
              handleCompanyScoreChange(score)
            }
          }

          return (
            <Form className={classes.searchTagsWrap}>
              <Field
                name="organization"
                label={t('Company Name')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'organization')}
                onChange={(e) => {
                  setFieldValue('organization', e.target.value)
                  setFieldTouched('organization')
                  dispatch({ type: 'SET_INITIAL_VALUES', payload: { organization: e.target.value } })
                }}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <Field
                name="website"
                label={t('Website')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'website')}
                onChange={(e) => {
                  setFieldValue('website', e.target.value)
                  setFieldTouched('website')
                  dispatch({ type: 'SET_INITIAL_VALUES', payload: { website: e.target.value } })
                }}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />

              <TagTypeIndustrial handleChange={handleChangeTags} tags={tagsValues} requiredTags={requiredTagsFields} />

              <TagTypeMarkets handleChange={handleChangeTags} tags={tagsValues} requiredTags={requiredTagsFields} />

              <TagTypeObjectives handleChange={handleChangeTags} tags={tagsValues} requiredTags={requiredTagsFields} />

              <TagTypeKeywords handleChange={handleChangeTags} tags={tagsValues} />

              <Field
                name="description"
                label={t('Company Description')}
                component={Input}
                onBlur={(e) => onHandleBlur(e, 'description')}
                multiline
                onChange={(e) => {
                  setFieldValue('description', e.target.value)
                  setFieldTouched('description')
                  dispatch({ type: 'SET_INITIAL_VALUES', payload: { description: e.target.value } })
                }}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                required
              />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default ProfileTags
