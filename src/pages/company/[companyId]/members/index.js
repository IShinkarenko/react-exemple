import { Analytics } from 'aws-amplify'
import { DialogPopUp, PageHead } from 'components'
import Members from 'containers/Members'
import InviteMembers from 'containers/Members/components/InviteMembers'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'

const TeamMembers = () => {
  const { t } = useTranslation('teamMembers')
  const [isInvite, setIsInvite] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const { isCompanyBasic } = useCompanySubscriptionLevel()

  const handleIviteViewToggle = () => {
    if (isCompanyBasic) {
      return setShowPrompt(true)
    }

    setIsInvite(!isInvite)
  }

  const handleDialogClose = () => {
    Analytics.record({
      name: 'TeamMemberInviteFeaturePrompt',
      attributes: { response: 'false' },
    })

    setShowPrompt(false)
  }

  const handleApprove = () => {
    Analytics.record({
      name: 'TeamMemberInviteFeaturePrompt',
      attributes: { response: 'true' },
    })

    setShowPrompt(false)
  }

  return (
    <>
      {!isInvite && <PageHead title={t('Team Members')} />}

      {isInvite ? (
        <InviteMembers handleIviteViewToggle={handleIviteViewToggle} />
      ) : (
        <Members handleIviteViewToggle={handleIviteViewToggle} />
      )}

      <DialogPopUp
        isOpenModal={showPrompt}
        title={t('Would you like to be notified?')}
        successTitle={t('Yes')}
        cancelTitle={t('No')}
        handleAccept={handleApprove}
        closeModal={handleDialogClose}
        description={t(
          'The ability to add more team members will be available after this early beta phase for users who wish to upgrade to a paid plan. Would you like to be notified when this feature is available for upgrade?'
        )}
      />
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['teamMembers', 'companyMenu', 'accountMenu', 'common'])),
  },
})
export default TeamMembers
