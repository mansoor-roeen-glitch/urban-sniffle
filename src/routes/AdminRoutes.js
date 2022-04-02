// Dependencies
import React from 'react'
import {Routes, Route} from 'react-router-dom'

// Components
import Dashboard from './adminRoutes/Dashboard/Dashboard'
import Service from './neutralRoutes/services/Service'
import Logout from './neutralRoutes/Logout/Logout'
import Instance from './neutralRoutes/instance/Instance'
import Instances from './neutralRoutes/instances/Instances'
import CreateInstance from './neutralRoutes/createInstance/CreateInstance'

export default function AdminRoutes({subHeader, token}) {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard token={token} subHeader={subHeader} />} />
      
      <Route path="/services" exact element={<Instances token={token} subHeader={subHeader} instanceType='service' />} />
      <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
      <Route path="/create/service/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='service' />} />
      <Route path="/services/:instance_id/:hostname/update" exact element={<Instance token={token} subHeader={subHeader} instanceType='service' />} />

      <Route path="/plans" exact element={<Instances token={token} subHeader={subHeader} instanceType='plan' />} />
      <Route path="/plans/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='plan' />} />
      <Route path="/create/plan/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='plan' />} />

      <Route path="/nodes" exact element={<Instances token={token} subHeader={subHeader} instanceType='node' />} />
      <Route path="/nodes/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='node' />} />
      <Route path="/create/node/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='node' />} />

      <Route path="/templates" exact element={<Instances token={token} subHeader={subHeader} instanceType='template' />} />
      <Route path="/templates/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='template' />} />
      <Route path="/create/template/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='template' />} />

      <Route path="/ippools" exact element={<Instances token={token} subHeader={subHeader} instanceType='ippool' />} />
      <Route path="/ippools/:instance_id/" exact element={<Instance token={token} subHeader={subHeader} instanceType='ippool' />} />
      <Route path="/create/ippool/" exact element={<CreateInstance token={token} subHeader={subHeader} instanceType='ippool' />} />

      <Route path="/logout" exact element={<Logout />} />   
    </Routes>
  )
}
