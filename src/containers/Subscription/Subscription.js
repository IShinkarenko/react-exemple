import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useCompanyPaymentConfig } from 'api/hooks'
import { BaseButton, PageLoader } from 'components'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import routes from 'routes'
import getStripe from 'utils/get-stripejs'
import { postData } from 'utils/payment'

import SubscriptionItem from './components/SubscriptionItem'
import useStyles from './styles'

const Subscription = ({ plans, userId }) => {
  const { t } = useTranslation('subscription')
  const router = useRouter()
  const {
    query: { companyId: currentCompanyId },
  } = router
  const classes = useStyles()
  const { loading: companyLoading, isCompanyBasic } = useCompanySubscriptionLevel()
  const { loading: paymentLoading, data } = useCompanyPaymentConfig({ variables: { id: currentCompanyId } })
  const paymentsConfig = data?.getCompany?.paymentsConfig
  const paymentData = paymentsConfig && JSON.parse(paymentsConfig)

  const handleCheckout = async (price) => {
    try {
      const { sessionId } = await postData({
        url: '/api/checkout-sessions',
        data: { price, currentCompanyId, userId, paymentData },
      })

      const stripe = await getStripe()
      stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      return console.log(error.message)
    }
  }

  const handleRedirectToCustomerPortal = async () => {
    const { url, error } = await postData({
      url: '/api/create-portal-link',
      data: { currentCompanyId, paymentData },
    })

    if (error) return alert(error.message)

    window.location.assign(url)

    if (error) return alert('error.message', error.message)
  }

  const handleBack = () => {
    router.push({
      pathname: routes.company,
      query: { companyId: currentCompanyId },
    })
  }

  if (companyLoading || paymentLoading) return <PageLoader />

  return (
    <Box className={classes.subscription}>
      <Tooltip title="Back To Dashboard">
        <IconButton onClick={handleBack} className={classes.backIcon} size="large">
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>

      {!isCompanyBasic && (
        <Box className={classes.bannerInfo}>
          <Typography className={classes.bannerInfoTitle}>
            Your <u>Expandigo Unlimited</u> subscription will automatically renew on <b>Friday, Novemver 25, 2022</b>
          </Typography>
          <BaseButton
            title="Manage Your Subscription"
            onClick={handleRedirectToCustomerPortal}
            className={classes.customerPortalButton}
          />
        </Box>
      )}

      <Box className={classes.top}>
        <Typography className={classes.subscriptionTitle}>{t('Subscription')}</Typography>

        <Typography className={classes.subscriptionSubtitle}>
          {t('Two Package Options To Support Your Specific Needs')}
        </Typography>
      </Box>

      <Box className={classes.subscriptions}>
        {plans.map((plan) => (
          <SubscriptionItem
            key={plan.priceId}
            {...plan}
            paymentData={paymentData}
            handleCheckout={handleCheckout}
            handleCustomerPortal={handleRedirectToCustomerPortal}
          />
        ))}
      </Box>

      {/*       <Box className={classes.faqContainer}>
        <Box className={classes.faqInner}>
          <Typography className={classes.subscriptionTitle}>Freequently asked questions</Typography>

          <Box className={classes.questions}>
            <Box className={classes.question}>
              <Typography variant="h6">What is your refund policy</Typography>

              <Typography variant="body2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, ex et. Cupiditate adipisci illo ipsa
                doloribus dicta aspernatur{' '}
              </Typography>
            </Box>
            <Box className={classes.question}>
              <Typography variant="h6">What is your refund policy</Typography>

              <Typography variant="body2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, ex et. Cupiditate adipisci illo ipsa
                doloribus dicta aspernatur{' '}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.questions}>
            <Box className={classes.question}>
              <Typography variant="h6">What is your refund policy</Typography>

              <Typography variant="body2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, ex et. Cupiditate adipisci illo ipsa
                doloribus dicta aspernatur{' '}
              </Typography>
            </Box>
            <Box className={classes.question}>
              <Typography variant="h6">What is your refund policy</Typography>

              <Typography variant="body2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur, ex et. Cupiditate adipisci illo ipsa
                doloribus dicta aspernatur{' '}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box> */}
    </Box>
  )
}

export default Subscription
