import { badRequest, internalServerError, success } from 'lib/api/responses'
import Shopify from 'lib/shopify'

const checkout = async (req, res) => {
  const store = new Shopify()

  try {
    switch (req.method) {
      case 'GET': {
        const { cart } = await store.createCart()
        success(res, { cart })
        break
      }
      case 'POST': {
        const { cartId } = req.body
        const cart = await store.checkCart(cartId)
        success(res, { cart })
        break
      }
      default:
        badRequest(res, `Request method ${req.method} not supported.`)
        break
    }
  } catch (error) {
    internalServerError(res, error)
  }
}

export default checkout
