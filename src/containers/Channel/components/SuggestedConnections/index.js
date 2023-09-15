import { Box } from '@mui/system'
import { Pagination } from 'components'
import SearchResults from 'containers/SearchResults'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'

import useStyles from './styles'

const SuggestedConnections = ({ suggestedCompanies, total }) => {
  const classes = useStyles()
  const [companies, setCompanies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pages, setPages] = useState(null)
  const [postsPerPage] = useState(25)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentCompanies = companies.slice(indexOfFirstPost, indexOfLastPost)

  useEffect(() => {
    if (suggestedCompanies) {
      setCompanies(suggestedCompanies)
    }
  }, [suggestedCompanies])

  useEffect(() => {
    if (!isEmpty(companies)) {
      getPageNumbers()
    }
  }, [getPageNumbers, companies])

  const getPageNumbers = useCallback(() => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(companies.length / postsPerPage); i++) {
      pageNumbers.push(i)
    }

    setPages(pageNumbers.length - 1)
  }, [companies.length, postsPerPage])

  const handlePaginate = useCallback((pageNumber) => {
    setCurrentPage(pageNumber)
  }, [])

  return (
    <Box mt={3}>
      <SearchResults
        title={'Suggested Companies'}
        result={currentCompanies}
        total={total}
        className={classes.suggestedCompaniesResult}
      />

      <Pagination
        pages={pages}
        currentPage={currentPage}
        paginate={handlePaginate}
        className={classes.suggestedCompaniesPagination}
      />
    </Box>
  )
}

export default SuggestedConnections
