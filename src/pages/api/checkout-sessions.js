const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res) => {
  if (req.method === 'POST') {
    const {
      price,
      quantity = 1,
      userId,
      paymentData: { customerId },
      currentCompanyId,
    } = req.body

    try {
      const createOrRetrieveCustomer = async () => {
        if (!customerId) {
          const customer = await stripe.customers.create({
            metadata: {
              companyId: currentCompanyId,
              cognitoUserId: userId,
            },
          })
          return customer.id
        }

        if (customerId) return customerId
      }

      const customer = await createOrRetrieveCustomer()

      console.log('customerId', customer)

      const session = await stripe.checkout.sessions.create({
        customer,
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        line_items: [
          {
            price,
            quantity,
          },
        ],
        mode: 'subscription',
        subscription_data: {
          metadata: {
            companyId: currentCompanyId,
            cognitoUserId: userId,
          },
        },
        success_url: `${req.headers.origin}/company/${currentCompanyId}/current-plan/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/company/${currentCompanyId}/current-plan/?canceled=true`,
      })

      return res.status(200).json({ sessionId: session.id })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

export default createCheckoutSession
