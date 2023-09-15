import { Box, Button, Typography } from '@mui/material'
import { Analytics } from 'aws-amplify'
import clsx from 'clsx'
import { DialogPopUp } from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo, useState } from 'react'

import useStyles from './styles'

const SubscriptionItem = ({
  priceId,
  productId,
  name,
  price,
  description,
  features,
  paymentData,
  handleCheckout,
  handleCustomerPortal,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('subscription')
  const [showPrompt, setShowPrompt] = useState(false)
  const currentPlan = productId === paymentData?.productId
  const defaultPlan = name === 'Expandigo Basic'

  const isUnlimited = name === 'Expandigo Unlimited'
  const logo = isUnlimited
    ? 'https://expandigo.com/assets/img/shape/icon_unlimited.png'
    : 'https://expandigo.com/assets/img/shape/icon_basic.png'

  const handleClick = () => {
    setShowPrompt(true)
    return null

    if (currentPlan || defaultPlan) {
      return null
    }

    if (paymentData?.productId && defaultPlan) {
      handleCustomerPortal()
    } else {
      handleCheckout(priceId)
    }
  }

  const handleDialogClose = () => {
    Analytics.record({
      name: 'UpgradeUnlimitedPrompt',
      attributes: { response: 'false' },
    })

    setShowPrompt(false)
  }

  const handleApprove = () => {
    Analytics.record({
      name: 'UpgradeUnlimitedPrompt',
      attributes: { response: 'true' },
    })

    setShowPrompt(false)
  }

  return (
    <Box className={classes.subscriptionItem}>
      <Box className={clsx(classes.subscriptionHead, isUnlimited && classes.subscriptionUnlimited)}>
        <Box className={clsx(classes.subscriptionLogo, isUnlimited && classes.subscriptionUnlimited)}>
          <img src={logo} alt="unlimited" />
        </Box>

        <Typography className={classes.subscriptionName}>{name}</Typography>

        <Typography className={clsx(classes.subscriptionPrice, isUnlimited && classes.subscriptionPriceUnlimited)}>
          <sup>$</sup> {price / 100} <sub>/ m</sub>
        </Typography>
      </Box>

      <Box className={classes.subscriptionDescription}>
        <Typography className={classes.subscriptionDescriptionTitle}>{description}</Typography>
      </Box>

      <ul className={classes.subscriptionDetails}>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <Button
        className={clsx(classes.subscriptionButton, !isUnlimited && classes.subscriptionButtonBasic)}
        variant={isUnlimited ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleClick}
      >
        {currentPlan || (defaultPlan && !paymentData?.productId) ? 'Current Plan' : 'Subscribe'}
      </Button>

      <DialogPopUp
        isOpenModal={showPrompt}
        title={t('Would you like to be notified?')}
        successTitle={t('Yes')}
        cancelTitle={t('No')}
        handleAccept={handleApprove}
        closeModal={handleDialogClose}
        description={t(
          'The ability to upgrade will be available after this early beta phase for users who wish to move to a paid plan. Would you like to be notified when subscriptions are available for upgrade?'
        )}
      />
    </Box>
  )
}

export default memo(SubscriptionItem)
