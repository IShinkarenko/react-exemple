import { withSSRContext } from 'aws-amplify'
import Subscription from 'containers/Subscription'
import MainLayout from 'layouts/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import initStripe from 'stripe'

const CurrentPlan = ({ plans, userId }) => {
  return <Subscription plans={plans} userId={userId} />
}

CurrentPlan.getLayout = (page) => (
  <MainLayout sidebar={false} fullWidth>
    {page}
  </MainLayout>
)

export const getServerSideProps = async ({ locale, req }) => {
  const { Auth } = withSSRContext({ req })
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
  const { data: prices } = await stripe.prices.list()
  let userProps = {}

  try {
    const user = await Auth.currentAuthenticatedUser()

    userProps = {
      userId: user.attributes.sub,
    }
  } catch (err) {
    console.log('error, user not authenticated')
  }

  const plans = await Promise.all(
    prices
      .filter((f) => f.active)
      .map(async (price) => {
        const product = await stripe.products.retrieve(price.product)
        return {
          priceId: price.id,
          productId: product.id,
          name: product.name,
          description: product.description,
          price: price.unit_amount,
          interval: price.recurring.interval,
          currency: price.currency,
          features: price.nickname ? JSON.parse(price.nickname) : [],
        }
      })
  )

  return {
    props: {
      ...userProps,
      plans: plans.reverse(),
      ...(await serverSideTranslations(locale, ['subscription', 'companyMenu', 'accountMenu'])),
    },
  }
}

export default CurrentPlan
