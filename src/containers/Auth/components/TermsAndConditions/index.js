import { useFetchMarkdown } from 'hooks/useFetchMarkdown'
import { useRouter } from 'next/router'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const TermsAndConditions = () => {
  const router = useRouter()
  const optionsBasePath = `/static/locales/${router.locale}/mds`
  const { result } = useFetchMarkdown(`${optionsBasePath}/terms.md`)

  console.log(result)
  return <ReactMarkdown>{result}</ReactMarkdown>
}

export default TermsAndConditions
