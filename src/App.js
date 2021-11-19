import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import {createBrowserHistory} from 'history'
import Register from "./routes/Register/Register";
import Login from './routes/Login/Login'
import Reset from "./routes/Reset/Reset";
import axios from "axios";

// Components
import Base from './routes/Base/Base';
import Service from './routes/Service/Service';
import Create from './routes/Create/Create';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import Plans from './routes/Plans/Plans';
import Plan from './routes/Plans/components/Plan';
import CreatePlan from './routes/Plans/components/CreatePlan';
import Templates from './routes/templates/Templates';
import Template from './routes/templates/components/Template'
import CreateTemplate from './routes/templates/components/CreateTemplate';
import Logout from './routes/Logout/Logout';
import styled from 'styled-components';
import getUserDetails from "./functions/getUserDetails";
import Nodes from "./routes/Nodes/Nodes";
import CreateNode from "./routes/Nodes/components/CreateNode";
import Node from './routes/Nodes/components/Node';
import Pools from './routes/Pools/Pools';
import CreatePool from './routes/Pools/components/CreatePool';
import LandingPage from "./routes/LandingPage/LandingPage";

function App() {

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const [userData, setUserData] = React.useState()
  const [userDataLoading, setUserDataLoading] = React.useState(true)
  const [userDataSuccess, setUserDataSuccess] = React.useState(false)
  const [userDataError, setUserDataError] = React.useState(false)

  const [pathname, setPathname] = React.useState(window.location.pathname)
  const [redirectTo, setRedirectTo] = React.useState("")
  const [config, setConfig] = React.useState({})
  const [token, setToken] = React.useState("")

  const [selected, setSelected] = React.useState(false)
  const [selectedPlan, setSelectedPlan] = React.useState()
  const [selectedTemplate, setSelectedTemplate] = React.useState()
  const [selectedPool, setSelectedPool] = React.useState()
  const [selectedNode, setSelectedNode] = React.useState()


  const history = createBrowserHistory(); 

  const handleClickChange = (id, hostname) => {

      setSelected({hostname, id})

  }

  const handlePlanClick = (details) => {
      setSelectedPlan(details)
  } 

  const handleTemplateClick = (details) => {
      setSelectedTemplate(details)
  }

  const handleNodeClick = (details) => {
    setSelectedNode(details)
  }

  const handlePoolClick = (details) => {
    setSelectedPool(details)
  }

  const checkToken = async (token) => {
    const response = await axios({
      method: 'get',
      url: 'https://hosnet.io/api/',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
  
    if (response.status === 200) {

      return true;

    } else if (response.status !== 200) {

      return false;

    }

  }

  const getUserData = async (token) => {
    const response = await getUserDetails(token);
    if (response.success === true ) {
      setUserData(response.data);
      setUserDataLoading(false)
      setUserDataSuccess(true)
    }
  }

  const notAuthenticated = (path) => {

    const reLocation = () => {
      if (window.location.pathname === "/register") {
        return "/register";
      } else if (window.location.pathname === "/reset") {
        return "/reset";
      } else if (window.location.pathname === "/login") {
        return '/login'
      } else {
        return "/"
      }
    }

    console.log("This function was run")
    console.log(reLocation())

    
    setRedirectTo(reLocation());
    setPathname(path ? path : reLocation())

  }

  const authenticator = (path) => {
    if (localStorage.getItem("x-token")) {
      
      const xtoken = localStorage.getItem("x-token");

      setToken(xtoken)
      
      if (checkToken(xtoken)) {

        getUserData(xtoken)

        setConfig({
        
          'content-type': 'application/json',
          'Authorization': `Token ${xtoken}`
        
        })

        setRedirectTo("/dashboard")
        setLoading(false)
        
      } else {

        notAuthenticated(path)
        setLoading(false)

      }
      
    } else {

      notAuthenticated(path)
      setLoading(false)

    }
  }

  React.useEffect(() => {

    authenticator()
    
  }, [])

  return (
    <div className="App_Wrapper" style={{display: "flex", flexDirection: "column", minHeight: "100vh", height: "fit-content", overflowX: "hidden", justifyContent: "center"}}>
      <BrowserRouter history={history}>

        {redirectTo && (
          <Redirect to={redirectTo} />
        )}

        {!loading ? (
          <Switch>

            <Route path="/" exact render={() => <LandingPage />}  />
            <Route path="/login" exact render={() => <Login />}  />
            <Route path="/register" exact render={() => <Register />}  />
            <Route path="/reset" exact render={() => <Reset />} />
            <Route path="/logout" exact render={() => <Logout />} />

            <Wrapper> 
              <Header config={config} userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} />

              <Route path="/dashboard" exact render={() => <Base config={token} handleClickChange={handleClickChange} />} />
              <Route path="/nodes" exact render={() => <Nodes userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} handleNodeClick={handleNodeClick} />} />
              <Route path="/pools" exact render={() => <Pools userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} handlePoolClick={handlePoolClick} />} />
              <Route path="/plans" exact render={() => <Plans userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} handlePlanClick={handlePlanClick} />} />
              <Route path="/create" exact render={() => <Create config={token}  />} />
              <Route path="/plans/:id" exact render={() => <Plan userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} details={selectedPlan} />} /> 
              <Route path="/templates" exact render={() => < Templates userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} handleTemplateClick={handleTemplateClick} />} />
              <Route path="/create/plan" exact render={() => <CreatePlan userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} />} />
              <Route path="/templates/:id" exact render={() => <Template userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} details={selectedTemplate} />} /> 
              <Route path="/create/template" exact render={() => <CreateTemplate userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} />} />
              <Route path="/services/:id/:hostname" exact render={() => <Service config={token} details={selected} />} /> 
              <Route path="/create/node" exact render={() => <CreateNode userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} />} />
              <Route path="/nodes/:id" exact render={() => <Node userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} details={selectedNode} />} /> 
              <Route path="/create/pool" exact render={() => <CreatePool userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} />} />

              <Footer />
              
            </Wrapper>

          </Switch>
        ) : (
          <span>Loading</span>
        )}
      </BrowserRouter>
    </div>
  );
}

const Wrapper = styled.div `
  min-height: 100vh;
  height: fit-content;
  padding-bottom: 130px;
`;

export default App;
