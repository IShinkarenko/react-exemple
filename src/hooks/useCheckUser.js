import { Auth, Hub } from 'aws-amplify'
import { useEffect, useState } from 'react'

export const useCheckUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    setLoading(true)
    checkUserAuth()
    const unsubscribe = Hub.listen('auth', () => checkUserAuth())
    return () => unsubscribe()
  }, [])

  async function checkUserAuth() {
    try {
      const signedInUser = await Auth.currentAuthenticatedUser()
      const userSession = await Auth.currentSession()

      setUser(signedInUser)
      setSession(userSession)
      setLoading(false)
    } catch (err) {
      setUser(null)
      setLoading(false)
    }
  }

  return { loading, user, session }
}
