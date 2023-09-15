import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import CachedIcon from '@mui/icons-material/Cached'
import FindReplaceIcon from '@mui/icons-material/FindReplace'
import { Box, Collapse, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material'
import { OptionsMenu } from 'components'
import { typeLabels } from 'constant'
import { groupBy, isEmpty } from 'lodash'
import { I18nContext, useTranslation } from 'next-i18next'
import React, { memo, useCallback, useContext, useMemo, useState } from 'react'

import useStyles from './styles'

const SearchHistoryItem = ({
  item: { id, modificationTimestamp, tags = [], text },
  handleSearchAgain,
  handleDialogOpen,
}) => {
  const { t } = useTranslation('assistedResearch')

  const classes = useStyles()
  const {
    i18n: { language },
  } = useContext(I18nContext)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const groupedTags = useMemo(() => groupBy(tags, 'tagType'), [tags])

  const handleToggleDetails = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const actions = useMemo(
    () => [
      {
        title: t('Search again'),
        icon: <FindReplaceIcon fontSize="small" />,
        handleClick: () => handleSearchAgain(id),
        disabled: false,
      },
      {
        title: t('Convert to Channel'),
        icon: <CachedIcon fontSize="small" />,
        handleClick: () => handleDialogOpen({ tags }),
        disabled: !!text,
      },
    ],
    [handleDialogOpen, handleSearchAgain, id, t, tags, text]
  )

  return (
    <ListItem>
      <ListItemText>
        <Typography>{new Date(modificationTimestamp).toLocaleString(language)}</Typography>

        <Typography variant="subtitle2" color="textSecondary" onClick={handleToggleDetails} className={classes.details}>
          {t('Details')}
          {isCollapsed ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </Typography>

        <Collapse in={isCollapsed}>
          <Box mt={2}>
            {text && (
              <Typography variant="subtitle2" color="textSecondary">
                Seacrh Text:
                <Typography variant="caption" className={classes.historyTag}>
                  {text}
                </Typography>
              </Typography>
            )}

            {!isEmpty(tags) &&
              Object.entries(groupedTags).map(([key, value]) => (
                <Typography key={key} variant="subtitle2" color="textSecondary">
                  {typeLabels[key]}:
                  <Typography variant="caption" className={classes.historyTag}>
                    {value.map(({ label }, index) => (
                      <span key={label}>
                        {label}
                        {index !== value.length - 1 && ', '}
                      </span>
                    ))}
                  </Typography>
                </Typography>
              ))}
          </Box>
        </Collapse>
      </ListItemText>

      <ListItemSecondaryAction>
        <OptionsMenu actions={actions} />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default memo(SearchHistoryItem)
