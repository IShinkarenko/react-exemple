import { useUserProfile } from 'api/hooks'
import { withSSRContext } from 'aws-amplify'
import NewCompany from 'containers/NewCompany'
import MainLayout from 'layouts/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const CreateCompany = ({ userId, userName }) => {
  const { data } = useUserProfile({ variables: { id: userId } })
  const fullName = data?.getUser?.fullName

  return <NewCompany userId={userId} userName={userName} userFullName={fullName} />
}

export const getServerSideProps = async ({ locale, req }) => {
  const { Auth } = withSSRContext({ req })
  let userProps = {}

  try {
    const user = await Auth.currentAuthenticatedUser()

    userProps = {
      userId: user.attributes.sub,
      userName: user.username,
    }
  } catch (err) {
    console.log('error, user not authenticated')
  }
  return {
    props: {
      ...userProps,
      ...(await serverSideTranslations(locale, ['createCompany', 'footer', 'common'])),
    },
  }
}

CreateCompany.getLayout = (page) => <MainLayout sidebar={false}>{page}</MainLayout>

export default CreateCompany
