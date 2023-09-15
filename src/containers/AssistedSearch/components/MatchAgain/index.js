import InfoIcon from '@mui/icons-material/Info'
import { Box, Collapse, Typography } from '@mui/material'
import clsx from 'clsx'
import { BaseButton, TagTypeIndustrial, TagTypeMarkets, TagTypeObjectives } from 'components'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect } from 'react'

import useStyles from './styles'

const MatchAgain = ({ tags, expanded, errors, handleSearchAgain, dispatch }) => {
  const { t } = useTranslation('assistedResearch')
  const classes = useStyles()

  useEffect(() => {
    if (!expanded && !isEmpty(tags)) {
      dispatch({ type: 'SET_EXPANDED', payload: true })
    }
  }, [expanded, dispatch, tags])

  const hadleOpenFilters = useCallback(() => {
    if (expanded) {
      handleSearchAgain()
    } else {
      dispatch({ type: 'SET_EXPANDED', payload: !expanded })
    }
  }, [dispatch, expanded, handleSearchAgain])

  const onHandleChange = useCallback(
    (newTags) => {
      dispatch({ type: 'SET_TAGS', payload: newTags })
    },
    [dispatch]
  )

  return (
    <Box width={'100%'} className={clsx(classes.searchAgainDefault, expanded && classes.searchAgainExpanded)}>
      <Box className={clsx(classes.searchAgainWrap, expanded && classes.searchAgainWrapActive)}>
        <Box className={classes.infoBox}>
          <InfoIcon />
          <Typography>
            {t(
              'If you do not find relevant information, you can change criteria and click on Match Again to get new company matches.'
            )}
          </Typography>
        </Box>

        <BaseButton
          title={expanded ? t('Get my matches') : t('Match Again')}
          className={classes.searchAgain}
          onClick={hadleOpenFilters}
        />
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={classes.filtersArea}>
          <TagTypeIndustrial handleChange={onHandleChange} tags={tags} errors={errors} />

          <TagTypeMarkets handleChange={onHandleChange} tags={tags} errors={errors} />

          <TagTypeObjectives handleChange={onHandleChange} tags={tags} errors={errors} />
        </Box>
      </Collapse>
    </Box>
  )
}

export default memo(MatchAgain)
