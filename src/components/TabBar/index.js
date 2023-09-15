import SearchIcon from '@mui/icons-material/Search'
import { Box, FormControlLabel, InputBase, Switch, Toolbar } from '@mui/material'
import { SimpleSelect } from 'components'
import { useTranslation } from 'next-i18next'
import React from 'react'

import useStyles from './styles'

const TabBar = ({
  isSearch,
  isSelect,
  isSwitch,
  isSwitchChecked,
  onChangeSwitch,
  selectOptions,
  selectOnChange,
  selectValue,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const handleSelectChange = (e) => selectOnChange(e)

  const handleSwitchChange = (e) => onChangeSwitch(e)

  return (
    <Box position="static" className={classes.tabBar}>
      <Toolbar>
        {isSearch && (
          <Box className={classes.search} role="search">
            <Box className={classes.searchIcon}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder={t('Search')}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        )}

        {isSelect && (
          <Box ml={3}>
            <SimpleSelect
              label={t('Status')}
              name="ConnectionStatus"
              value={selectValue}
              options={selectOptions}
              handleChange={handleSelectChange}
              margin="dense"
              className={classes.select}
            />
          </Box>
        )}

        {isSwitch && (
          <Box ml={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={isSwitchChecked}
                  onChange={handleSwitchChange}
                  name="suggestions"
                  color="primary"
                  role="switch"
                  aria-checked={isSwitchChecked}
                />
              }
              label={t('Include Suggestions')}
              aria-checked={isSwitchChecked}
            />
          </Box>
        )}
      </Toolbar>
    </Box>
  )
}

export default TabBar
