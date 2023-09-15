/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import { ResponsiveSidebar } from 'components'
import { TRADITIONAL_SEARCH } from 'constant'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useEffect, useState } from 'react'

import ResultsContainer from './components/ResultsContainer'
import ResultsSidebar from './components/ResultsSidebar'
import useStyles from './styles'

const UnauthenticatedSearchResults = ({ mobileOpen, handleDrawerToggle }) => {
  const classes = useStyles()
  const {
    query: { q },
  } = useRouter()
  const [searchParams, setSearchParams] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isNewSearch, setIsNewSearch] = useState(false)
  const [completeProfileView, setCompleteProfileView] = useState(false)

  useEffect(() => {
    if (typeof window !== undefined) {
      if (q) {
        import('jsencrypt')
          .then((x) => x.JSEncrypt)
          .then((JSEncrypt) => {
            const jsDecrypt = new JSEncrypt()
            jsDecrypt.setPrivateKey(
              `-----BEGIN RSA PRIVATE KEY-----${process.env.NEXT_PUBLIC_RSA_PRIVATE_KEY}-----END RSA PRIVATE KEY-----`
            )
            const decryptedSearch = jsDecrypt.decrypt(q.replace(/ /g, '+'))

            setSearchParams({
              text: decryptedSearch,
              searchType: TRADITIONAL_SEARCH,
            })
          })
      } else {
        getSearchParams()
      }
    }
  }, [q])

  const getSearchParams = useCallback(() => {
    const existTags = localStorage.getItem('tags')
    const existText = localStorage.getItem('text')
    const existSearchType = localStorage.getItem('searchType')

    setLoading(true)

    setSearchParams({
      searchType: existSearchType,
      tags: JSON.parse(existTags),
      text: existText,
    })

    setLoading(false)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    handleDrawerToggle()
  }, [handleDrawerToggle])

  const handleCompleteProfile = useCallback(() => {
    if (mobileOpen) {
      handleCloseSidebar()
    }

    setCompleteProfileView(true)
  }, [handleCloseSidebar, mobileOpen])

  const handleNewSearch = useCallback(() => {
    if (mobileOpen) {
      handleCloseSidebar()
    }

    if (completeProfileView) {
      setCompleteProfileView(false)
    }

    getSearchParams()
    setIsNewSearch(true)
  }, [completeProfileView, handleCloseSidebar, mobileOpen])

  const handleResetNewSeacrh = useCallback(() => {
    setIsNewSearch(false)
  }, [])

  if (loading || !searchParams) return null

  return (
    <Box className={classes.container}>
      <ResponsiveSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleCloseSidebar} width={350}>
        <ResultsSidebar
          isNewSearch={isNewSearch}
          searchParams={searchParams}
          handleNewSearch={handleNewSearch}
          completeProfileView={completeProfileView}
          handleCompleteProfile={handleCompleteProfile}
        />
      </ResponsiveSidebar>

      <Box className={classes.resultsWrapper}>
        <ResultsContainer
          isNewSearch={isNewSearch}
          searchParams={searchParams}
          completeProfileView={completeProfileView}
          handleNewSearch={handleNewSearch}
          handleResetNewSeacrh={handleResetNewSeacrh}
        />
      </Box>
    </Box>
  )
}

export default memo(UnauthenticatedSearchResults)
