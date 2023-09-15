import AddIcon from '@mui/icons-material/AddCircleOutline'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Collapse } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { BaseButton, SimpleSelect } from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useState } from 'react'
import { ComposableMap, Geographies, Graticule } from 'react-simple-maps'

import Groups from './components/Groups'
import LoadGeographies from './components/LoadGeographies'
import useStyles from './styles'
const WorldAtlas = ({ name, onHandleSelect, dataUrl }) => {
  const { t } = useTranslation('tags')

  const classes = useStyles()
  const theme = useTheme()
  const [properties, setProperties] = useState({ name: '', key: '', metrics: [], groups: [], provinces: [] })
  const [select, setSelect] = useState([])
  const [geos, setGeos] = useState([])
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleSetProperties = (rsmKey) => {
    setSelectedValue({ value: rsmKey })
  }

  const handleChange = (event) => {
    const value = event.target.value
    setSelectedValue({ event, value })
  }

  const setSelectedValue = useCallback(
    ({ event, value }) => {
      const geo = geos.filter((f) => f.rsmKey === value)

      setSelect(value)

      if (geo && geo.length > 0) {
        setProperties(geo[0].properties)

        onHandleSelect(event, {
          name,
          label: geo[0].properties.name,
          value: geo[0].properties.key,
        })
      }
    },
    [geos, name, onHandleSelect]
  )

  const handleGroupSelection = (event, data) => {
    onHandleSelect(event, { ...data, name, isGroup: true })
  }

  const handleSelectProvinces = (event, { key, name: label, country }) => {
    onHandleSelect(event, { name, label, value: key || country })
  }

  return (
    <Box>
      <Box className={classes.mapContainer}>
        <Box flex="0.8">
          <SimpleSelect
            label={t('Select Geography')}
            variant="filled"
            name="marketSelect"
            value={select}
            options={geos}
            handleChange={handleChange}
            extractValue={(option) => option.rsmKey}
            extractLabel={(option) => option.properties.name}
          />

          <ComposableMap data-tip="" projectionConfig={{ scale: 150 }} className={classes.map}>
            <Graticule stroke={theme.palette.grey[300]} />

            <Geographies geography={dataUrl}>
              {({ geographies }) => (
                <LoadGeographies
                  geographies={geographies}
                  geos={geos}
                  setGeos={setGeos}
                  select={select}
                  handleSetProperties={handleSetProperties}
                  // defaultCountry={defaultCountry}
                />
              )}
            </Geographies>
          </ComposableMap>
        </Box>

        {properties.name && properties.name.length && (
          <Box flex="0.35" className={classes.groupWrap}>
            <Groups properties={properties} handleGroupSelection={handleGroupSelection} />

            <Box mt={3} display="flex" justifyContent="center">
              {properties.provinces.length > 0 && (
                <BaseButton
                  variant={'text'}
                  onClick={handleExpandClick}
                  title={expanded ? t('Show Less') : t('Show More')}
                  endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Box p={2}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box className={classes.provinceWrap}>
            {properties.provinces.map((province) => (
              <BaseButton
                key={province.key}
                variant="outlined"
                onClick={(e) => handleSelectProvinces(e, province)}
                title={province.name}
                startIcon={<AddIcon />}
                className={classes.provinceButton}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default memo(WorldAtlas)
