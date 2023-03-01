import { useStore } from 'lib/store'
import { useEffect } from 'react'

const useCart = () => {
  const setDebouncing = useStore((state) => state.setIsDebouncing)
  const storageId = process.env.NEXT_PUBLIC_LOCAL_STORAGE_CHECKOUT_ID
  const checkoutId = useStore((state) => state.checkoutId)
  const setCheckoutId = useStore((state) => state.setCheckoutId)

  useEffect(() => {
    const fetchCartId = async () => {
      const res = await fetch('/api/checkout')
      const { cart } = await res.json()
      localStorage.setItem(storageId, cart.id)
      setCheckoutId(localStorage.getItem(storageId))
    }

    const checkCartId = async () => {
      const cart = await fetch(`/api/checkout`, {
        method: 'POST',
        body: JSON.stringify({
          cartId: localId,
        }),
        headers: {
          'content-type': 'application/json',
        },
      })
      return cart.json()
    }

    if (!localStorage.getItem(storageId)) {
      fetchCartId()
      return
    }
    const localId = localStorage.getItem(storageId)

    checkCartId()
      .then(({ cart }) => {
        if (cart && typeof cart === 'string' && cart.length > 10) {
          setCheckoutId(cart)
          return
        }

        fetchCartId()
      })
      .catch((error) => {
        console.log('cart id fetching error', error)
        fetchCartId()
      })
  }, [storageId])

  const cartFetcher = async (...args) => {
    const res = await fetch(...args)
    const { checkout } = await res.json()
    return checkout
  }

  const updateItem = async (quantity, variantId, lineItemId) => {
    await fetch(`/api/checkout/${checkoutId}-update`, {
      method: 'PUT',
      body: JSON.stringify({
        lineItemId,
        variantId,
        quantity,
        putAction: 'update',
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  const addItem = async (quantity, variantId) => {
    await fetch(`/api/checkout/${checkoutId}-add`, {
      method: 'POST',
      body: JSON.stringify({
        variantId,
        quantity,
      }),
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  const removeItem = async (lineItemId) => {
    await fetch(`/api/checkout/${checkoutId}-remove`, {
      method: 'PUT',
      body: JSON.stringify({ lineItemId, putAction: 'remove' }),
      headers: {
        'content-type': 'application/json',
      },
    })
  }

  const debounce = (fn, wait) => {
    let t
    return function () {
      clearTimeout(t)
      setDebouncing(true)
      t = setTimeout(() => {
        fn.apply(this, arguments)
        setDebouncing(false)
      }, wait)
    }
  }

  return {
    cartFetcher,
    updateItem,
    addItem,
    removeItem,
    debounce,
  }
}

export default useCart
