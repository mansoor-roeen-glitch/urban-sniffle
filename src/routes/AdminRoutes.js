// Dependencies
import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Dashboard from './Dashboard/Dashboard'
import Service from './neutralRoutes/services/Service'
import Services from './neutralRoutes/services/Services'
import Create from './Create/Create'
import Logout from './Logout/Logout'
import Plans from './adminRoutes/plans/Plans'
import Plan from './adminRoutes/plan/Plan'
import CreatePlan from './adminRoutes/createPlan/CreatePlan'

export default function AdminRoutes({subHeader, token}) {
  return (
    <Routes>
      <Route path="/dashboard" exact element={<Dashboard token={token} subHeader={subHeader} />} />
      
      <Route path="/services" exact element={<Services token={token} subHeader={subHeader} />} />
      <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
      <Route path="/create/service" exact element={<Create token={token} subHeader={subHeader} />} />

      <Route path="/plans" exact element={<Plans token={token} subHeader={subHeader} />} />
      <Route path="/plans/:plan_id/" exact element={<Plan token={token} subHeader={subHeader} />} />
      <Route path="/create/plan" exact element={<CreatePlan token={token} subHeader={subHeader} />} />

      <Route path="/logout" exact element={<Logout />} />   
    </Routes>
  )
}
