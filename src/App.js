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
import SubHeader from './components/Header/SubHeader';
import Navbar from "./components/navbar/Navbar";
import UpdateService from "./routes/UpdateService/UpdateService";


function App() {
  
  const params = new Map(window.location.search.slice(1).split('&').map(kv => kv.split('=')))

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
  
  const [subHeader, setSubHeader] = React.useState({

    path: "Hostler",
    subPaths: ["dashboard"],
    isLoading: loading

  })

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

  const handleSuccessRedirect = (defaultLocation) => {
    
    if ( params.has('redirect') ) {

      setRedirectTo( `/${params.get('redirect')}` )

      if (params.has('plan_id')) {
        
        setRedirectTo(prev => `${prev}?plan_id=${params.get('plan_id')}`)

      }

    } else {

      setRedirectTo(defaultLocation)

    }

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

        handleSuccessRedirect('/dashboard')
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

  const handleSubHeader = (subPaths, isLoading, ) => {
    
    if (!subPaths) {
      // Handle error
      return "sorry something went wrong";
    }

    setSubHeader((prevState) => ({
      
      ...prevState, 
      subPaths: subPaths,
      isLoading: isLoading
    
    }))

    return null;

  }

  React.useEffect(() => {

    authenticator()
    
  }, [])

  return (
    <div className="App_Wrapper" style={{display: "flex", overflow: "hidden", flexDirection: "column", minHeight: "100vh", height: "fit-content", justifyContent: "center"}}>
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

            <OuterWrapper>
              
              <Header config={config} userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} />
              <SubHeader loading={subHeader.isLoading} path={true} pathName={subHeader.subPaths[0]} />


              <Wrapper> 
                
                
                <NavBarWrapper>
                  <Navbar userDataLoading={userDataLoading} userData={userData} />
                </NavBarWrapper>

                <InnerWrapper>

                  <Route path="/dashboard" exact render={() => <Base handleSubHeader={handleSubHeader} config={token} handleClickChange={handleClickChange} />} />
                  <Route path="/nodes" exact render={() => <Nodes handleSubHeader={handleSubHeader} userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} handleNodeClick={handleNodeClick} />} />
                  <Route path="/pools" exact render={() => <Pools handleSubHeader={handleSubHeader} userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} config={token} handlePoolClick={handlePoolClick} />} />
                  <Route path="/plans" exact render={() => <Plans userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} handlePlanClick={handlePlanClick} />} />
                  <Route path="/create_service" exact render={() => <Create handleSubHeader={handleSubHeader} config={token}  />} />
                  <Route path="/plans/:id" exact render={() => <Plan userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} planDetails={selectedPlan} />} /> 
                  <Route path="/templates" exact render={() => < Templates userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} handleTemplateClick={handleTemplateClick} />} />
                  <Route path="/create/plan" exact render={() => <CreatePlan userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} />} />
                  <Route path="/templates/:id" exact render={() => <Template userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} templateDetails={selectedTemplate} />} /> 
                  <Route path="/create/template" exact render={() => <CreateTemplate userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} />} />
                  <Route path="/services/:id/:hostname" exact render={() => <Service handleSubHeader={handleSubHeader} config={token} details={selected} />} /> 
                  <Route path="/create/node" exact render={() => <CreateNode userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} />} />
                  <Route path="/nodes/:id" exact render={() => <Node userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} nodeDetails={selectedNode} />} /> 
                  <Route path="/create/pool" exact render={() => <CreatePool userDataLoading={userDataLoading} userDataSuccess={userDataSuccess} userData={userData} handleSubHeader={handleSubHeader} config={token} />} />
                  <Route path="/services/:id/:hostname/update" exact render={() => <UpdateService handleSubHeader={handleSubHeader} config={token} details={selected} />} /> 

                </InnerWrapper>
              </Wrapper>
            </OuterWrapper>

          </Switch>
        ) : (
          <span>Loading</span>
        )}
      </BrowserRouter>
    </div>
  );
}

const OuterWrapper = styled.div `
  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

const Wrapper = styled.div `
  height: fit-content;
  overflow: hidden;
  display: flex;
`;

const InnerWrapper = styled.div `
  width: 100%;
  max-height: calc(100vh - 82px);
  padding-bottom: 80px;
  overflow-y: scroll;
`;

const NavBarWrapper = styled.div `
  position: sticky;
  height: calc(100vh - 82px);
  width: 210px;
  background: #12171F;
  padding-top: 10px;
`;

export default App;
