import { scaleQuantile } from 'd3-scale'
import { useRouter } from 'next/router'
import React, { memo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
import { rounded } from 'utils'

const MapChart = ({ geographies: geographiesData }) => {
  const router = useRouter()
  const [content, setContent] = useState('')
  const dataUrl = `/static/locales/${router.locale}/world-atlas.json`

  const colorScale = scaleQuantile()
    .domain(geographiesData.map((d) => d.companyCount))
    .range(['#E4F8E1', '#CEF3D0', '#BBEDC7', '#A9E7C3', '#97E1C4', '#85DAC9', '#74D3D1', '#6CC2C9', '#64B0BF'])

  return (
    <>
      <ComposableMap data-tip="">
        <Geographies geography={dataUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = geographiesData.find((s) => s.name === geo.properties.name)

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(d['companyCount']) : '#E0E4E7'}
                  onMouseEnter={() => {
                    if (d) {
                      const { name, companyCount } = d
                      setContent(`${name} — ${rounded(companyCount)} Companies`)
                    }

                    if (!d && geo) {
                      const { name } = geo.properties
                      setContent(`${name}`)
                    }
                  }}
                  onMouseLeave={() => {
                    setContent('')
                  }}
                  style={{
                    default: { outline: 'none', stroke: 'white', strokeWidth: 1 },
                    hover: {
                      outline: 'none',
                      fill: '#C4C6CA',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      <ReactTooltip>{content}</ReactTooltip>
    </>
  )
}

export default memo(MapChart)
