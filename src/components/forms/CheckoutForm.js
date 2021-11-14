import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default Checkout = () => {
  const onToken = () => {
    console.log("clicked")
  }

  return (
    <StripeCheckout 
      stripeKey="pk_test_51IAeMABTTOfES3wkzf4lVJYhFPOrCF58g6eCA7T7yJDpy1xqvpYptQQHzirTWN2lTvzm6oy0A8haXMzbug6Fmo2v007xkgRUw0"
      token={onToken}
    />
  )
}