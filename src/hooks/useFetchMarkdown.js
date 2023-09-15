import { useEffect, useState } from 'react'
import { fetchMarkdown } from 'utils'

export const useFetchMarkdown = (markdownUrl) => {
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState([])
  useEffect(() => {
    if (markdownUrl) {
      setFetching(true)
      fetchMarkdown(markdownUrl).then((json) => {
        if (json) {
          setResult(json)
        }
        setFetching(false)
      })
    }
  }, [markdownUrl])
  return { result, fetching }
}
