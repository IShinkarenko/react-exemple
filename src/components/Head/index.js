import { baseUrl } from 'constant'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import React, { memo } from 'react'

const Head = ({ title, twitter, og }) => {
  const router = useRouter()
  const metaUrl = `${baseUrl}${router.asPath}`

  const META_DATA = {
    openGraph: {
      url: metaUrl,
      title: og?.title || 'Expandigo',
      description:
        og?.description ||
        'Expandigo makes it fast and easy to manage business relationships and expand opportunities by finding and staying connected to the data, resources and companies needed to achieve stated objectives.',
      image: og?.image || '/static/logo-tagline-x-large.png',
    },
    twitter: {
      url: metaUrl,
      title: twitter?.title || 'Expandigo',
      description:
        twitter?.description ||
        'Expandigo makes it fast and easy to manage business relationships and expand opportunities by finding and staying connected to the data, resources and companies needed to achieve stated objectives.',
      image: twitter?.image || '/static/logo-tagline-x-large.png',
    },
  }

  return (
    <NextHead>
      <title>{title || META_DATA.openGraph.title}</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

      <meta name="description" content={META_DATA.openGraph.description}></meta>
      <meta name="title" content={title || META_DATA.openGraph.title} />

      <meta property="og:type" content="website" key="ogtype" />
      <meta property="og:url" content={META_DATA.openGraph.url} key="ogurl" />
      <meta property="og:title" content={META_DATA.openGraph.title} key="ogtitle" />
      <meta property="og:description" content={META_DATA.openGraph.description} key="ogdescription" />
      <meta property="og:image" content={META_DATA.openGraph.image} key="ogimage" />

      <meta property="twitter:card" content="summary_large_image" key="twittercard" />
      <meta property="twitter:url" content={META_DATA.twitter.url} key="twitterurl" />
      <meta property="twitter:title" content={META_DATA.twitter.title} key="twittertitle" />
      <meta property="twitter:description" content={META_DATA.twitter.description} key="twitterdescription" />
      <meta property="twitter:image" content={META_DATA.twitter.image} key="twitterimage" />
    </NextHead>
  )
}

export default memo(Head)
