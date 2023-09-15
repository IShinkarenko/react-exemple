import React, { memo, useEffect } from 'react'

import LoadGeography from '../LoadGeography'

const LoadGeographies = ({ geos, geographies, setGeos, select, handleSetProperties }) => {
  useEffect(() => {
    if (!geos.length) {
      setGeos(geographies)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return geos.map((geo) => (
    <LoadGeography
      key={geo.rsmKey}
      select={select}
      geography={geo}
      handleSetProperties={handleSetProperties}
      // defaultCountry={defaultCountry}
    />
  ))
}

export default memo(LoadGeographies)
