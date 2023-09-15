const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createPortalLink = async (req, res) => {
  const {
    currentCompanyId,
    paymentData: { customerId },
  } = req.body

  if (req.method === 'POST') {
    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${req.headers.origin}/company/${currentCompanyId}/current-plan/`,
      })

      return res.status(200).json({ url })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default createPortalLink
