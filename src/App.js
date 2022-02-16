// Dependencies
import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {authenticatedRedirect, authenticator, notAuthenticatedRedirect} from './functions/authenticator';
import { useNavigate } from "react-router";

// Components
import Login from './routes/Login/Login'
import Register from "./routes/Register/Register";
import Reset from "./routes/Reset/Reset";
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
import Nodes from "./routes/Nodes/Nodes";
import CreateNode from "./routes/Nodes/components/CreateNode";
import Node from './routes/Nodes/components/Node';
import Pools from './routes/Pools/Pools';
import CreatePool from './routes/Pools/components/CreatePool';
import LandingPage from "./routes/LandingPage/LandingPage";
import SubHeader from './components/Header/SubHeader';
import Navbar from "./components/navbar/Navbar";
import UpdateService from "./routes/UpdateService/UpdateService";
import Dashboard from './routes/Dashboard/Dashboard'


export default function App () {

  // const params = new Map(window.location.search.slice(1).split('&').map(kv => kv.split('=')));
  const locationPathname = window.location.pathname;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [userDetails, setUserDetails] = useState()
  const [authenticated, setAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('x-token'))

  const [selectedTemplate, setSelectedTemplate] = useState()
  const [selectedPlan, setSelectedPlan] = useState()
  const [selectedPool, setSelectedPool] = useState()
  const [selectedNode, setSelectedNode] = useState()
  const [selected, setSelected] = useState(false)

  const [subHeaderDetails, setSubheaderDetails] = useState({
    path: "Hostler",
    subPaths: ["dashboard"],
    isLoading: loading
  })

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

  const redirectUserTo = (pathname) => {
    navigate(pathname)
  }

  // Checking whether userDetails is logged in or not
  // If token fails or did not exist, userDetails would be redirected to /login...
  // If token works, userDetails would be redirected to /...
  const authentication = async () => {

    let response = await authenticator(token, setToken, setUserDetails);

    if (response === 'authenticated') {

      setAuthenticated(true)
      authenticatedRedirect(redirectUserTo)

    } else if (response === 'not_authenticated') {

      setAuthenticated(false)
      notAuthenticatedRedirect(redirectUserTo)

    }

    setLoading(false)

  }

  // this function can be used to update the sub-header
  // updating sub-header depending on state and pathname 
  const subHeader = (subPaths, isLoading, ) => {

    if (!subPaths) {
      // Handle error
      return "sorry something went wrong";
    }

    setSubheaderDetails((prevState) => ({
      ...prevState,
      subPaths: subPaths,
      isLoading: isLoading

    }))

    return null;

  }

 useEffect(() => {
    authentication()
  }, [])


  if (loading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>error occured</div>
  }

  if (!authenticated) {
    return (
      <Routes>
        <Route path="/" exact element={<LandingPage />}  />
        <Route path="/login" exact element={<Login />}  />
        <Route path="/register" exact element={<Register />} />
        <Route path="/reset" exact element={<Reset />} />
      </Routes>
    )
  }

  return (

    <MainAppWrapper>
      
      <Header token={token} userDetails={userDetails} />
      <SubHeader loading={subHeaderDetails.isLoading} path={true} pathName={subHeaderDetails.subPaths[0]} />

      <AppContentWrapper>

        <NavBarWrapper>
          <Navbar />
        </NavBarWrapper>

        <AppContent>
          <Routes>

            <Route path="/" exact element={<Dashboard token={token} subHeader={subHeader} />} />
            <Route path="/services/:id/:hostname" exact element={<Service token={token} subHeader={subHeader} />} />
            <Route path="/services" exact element={<Base token={token} subHeader={subHeader} />} />
            <Route path="/logout" exact element={<Logout />} />
            
          </Routes>
        </AppContent>

      </AppContentWrapper>

    </MainAppWrapper>

  );
}

const AppContentWrapper = styled.div `
  display: flex;

  width: 100%;
  height: 100%;
`;

const MainWrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const MainAppWrapper = styled.div `
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const AppContent = styled.div `
  overflow-y: scroll;

  width: 100%;
  max-height: calc(100vh - 82px);
`;

const NavBarWrapper = styled.div `
  position: sticky;
  background: #12171F;

  width: 185px;
  height: calc(100vh - 82px);
  padding-top: 10px;
`;
