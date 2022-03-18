// Dependencies
import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Dashboard from './adminRoutes/Dashboard/Dashboard'
import Service from './neutralRoutes/services/Service'
import Logout from './neutralRoutes/Logout/Logout'
import Instance from './adminRoutes/instance/Instance'
import Instances from './adminRoutes/instances/Instances'
import CreateInstance from './adminRoutes/createInstance/CreateInstance'

export default function AdminRoutes({subHeader, token}) {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard token={token} subHeader={subHeader} />} />
      
      <Route path="/services" exact element={<Instances token={token} subHeader={subHeader} instanceType='service' />} />
      <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
      <Route path="/create/service/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='service' />} />

      <Route path="/plans" exact element={<Instances token={token} subHeader={subHeader} instanceType='plan' />} />
      <Route path="/plans/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='plan' />} />
      <Route path="/create/plan/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='plan' />} />

      <Route path="/nodes" exact element={<Instances token={token} subHeader={subHeader} instanceType='node' />} />
      <Route path="/nodes/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='node' />} />
      <Route path="/create/node/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='node' />} />

      <Route path="/templates" exact element={<Instances token={token} subHeader={subHeader} instanceType='template' />} />
      <Route path="/templates/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='template' />} />
      <Route path="/create/template/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='template' />} />

      <Route path="/pools" exact element={<Instances token={token} subHeader={subHeader} instanceType='pool' />} />
      <Route path="/pools/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='pool' />} />
      <Route path="/create/pool/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='pool' />} />

      <Route path="/logout" exact element={<Logout />} />   
    </Routes>
  )
}
