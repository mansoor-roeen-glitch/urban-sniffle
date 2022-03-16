// Dependencies
import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Service from './neutralRoutes/services/Service'
import Create from './neutralRoutes/Create/Create'
import Logout from './neutralRoutes/Logout/Logout'
import Instances from './adminRoutes/instances/Instances'

export default function ClientRoutes({subHeader, token}) {
  return (
    <Routes>

      <Route path="/services" exact element={<Instances token={token} subHeader={subHeader} instanceType='service' />} />
      <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
      <Route path="/create/service" exact element={<Create token={token} subHeader={subHeader} />} />

      <Route path="/logout" exact element={<Logout />} />  
    </Routes>
  )
}
