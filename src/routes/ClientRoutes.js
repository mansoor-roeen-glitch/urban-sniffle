// Dependencies
import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Logout from './neutralRoutes/Logout/Logout'
import Instances from './adminRoutes/instances/Instances'
import CreateInstance from './adminRoutes/createInstance/CreateInstance'
import Service from './neutralRoutes/services/Service'
import handleStripeCheckout from '../functions/handleStripeCheckout'

export default function ClientRoutes({subHeader, token}) {
  
  const handleServiceBilling = async ({id, setActionLoading}) => {
    let response = await handleStripeCheckout({id, token})
    if (response) setActionLoading(false);
  }
  
  return (
    <Routes>

      <Route path="/services" exact element={<Instances token={token} subHeader={subHeader} instanceType='service' />} />
      <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
      <Route path="/create/service" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='service' optionalAction={handleServiceBilling} />} />

      <Route path="/logout" exact element={<Logout />} />  
    </Routes>
  )
}
