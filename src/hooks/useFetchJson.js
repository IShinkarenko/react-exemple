import { useEffect, useState } from 'react'
import { fetchJson } from 'utils'

export const useFetchJson = (jsonUrl) => {
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState([])
  useEffect(() => {
    if (jsonUrl) {
      setFetching(true)
      fetchJson(jsonUrl).then((json) => {
        if (json) {
          setResult(json)
        }
        setFetching(false)
      })
    }
  }, [jsonUrl])
  return { result, fetching }
}
