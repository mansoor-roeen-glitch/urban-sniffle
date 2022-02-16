import React from 'react'

export default function appjsFunctions() {
  return (
    <div>
        <Route path="/nodes" exact element={<Nodes handleSubHeader={handleSubHeader} userDetails={userDetails} token={token} handleNodeClick={handleNodeClick} />} />
<Route path="/pools" exact element={<Pools handleSubHeader={handleSubHeader} userDetails={userDetails} token={token} handlePoolClick={handlePoolClick} />} />
<Route path="/plans" exact element={<Plans userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} handlePlanClick={handlePlanClick} />} />
<Route path="/create_service" exact element={<Create handleSubHeader={handleSubHeader} token={token}  />} />
<Route path="/plans/:id" exact element={<Plan userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} planDetails={selectedPlan} />} /> 
<Route path="/templates" exact element={< Templates userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} handleTemplateClick={handleTemplateClick} />} />
<Route path="/create/plan" exact element={<CreatePlan userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} />} />
<Route path="/templates/:id" exact element={<Template userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} templateDetails={selectedTemplate} />} /> 
<Route path="/create/template" exact element={<CreateTemplate userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} />} />
<Route path="/services/:id/:hostname" exact element={<Service handleSubHeader={handleSubHeader} token={token} details={selected} />} /> 
<Route path="/create/node" exact element={<CreateNode userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} />} />
<Route path="/nodes/:id" exact element={<Node userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} nodeDetails={selectedNode} />} /> 
<Route path="/create/pool" exact element={<CreatePool userDetails={userDetails} handleSubHeader={handleSubHeader} token={token} />} />
<Route path="/services/:id/:hostname/update" exact element={<UpdateService handleSubHeader={handleSubHeader} token={token} details={selected} />} /> 
    </div>
  )
}
