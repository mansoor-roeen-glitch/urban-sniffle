// Dependencies
import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Dashboard from './Dashboard/Dashboard'
import Service from './Services/Service'
import Services from './Services/Services.js'
import Create from './Create/Create'
import Logout from './Logout/Logout'

export default function ClientRoutes({subHeader, token}) {
  return (
    <Routes>
      <Route path="/dashboard" exact element={<Dashboard token={token} subHeader={subHeader} />} />
      <Route path="/services" exact element={<Services token={token} subHeader={subHeader} />} />
      <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
      <Route path="/create/service" exact element={<Create token={token} subHeader={subHeader} />} />
      <Route path="/logout" exact element={<Logout />} />  
    </Routes>
  )
}
