import React from "react";
import { Route, Router, Switch, Redirect, withRouter, useLocation } from "react-router";
import {createBrowserHistory} from 'history'
import Index from "./routes/Index";
import Register from "./routes/Register/Register";
import Login from './routes/Login/Login'
import Reset from "./routes/Reset/Reset";
import axios from "axios";

function App() {

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const [pathname, setPathname] = React.useState(window.location.pathname)
  const [redirectTo, setRedirectTo] = React.useState("")
  const [config, setConfig] = React.useState({})
  const [token, setToken] = React.useState("")

  const history = createBrowserHistory();

  const authswtich = () => {
    if (redirectTo === "/login") {
      redirectTo("/register")
    } else if (redirectTo === "/register") {
      redirectTo("/login")
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

  const notAuthenticated = (path) => {

    const reLocation = () => {
      if (window.location.pathname === "/register") {
        return "/register";
      } else if (window.location.pathname === "/reset") {
        return "/reset";
      } else {
        return "/login"
      }
    }

    
    setRedirectTo(reLocation());
    setPathname(path ? path : reLocation())
    history.push(path ? path : reLocation())

  }

  const authenticator = (path) => {
    if (localStorage.getItem("x-token")) {
      
      const xtoken = localStorage.getItem("x-token");

      setToken(xtoken)
      
      if (checkToken(xtoken)) {

        setConfig({
        
          'content-type': 'application/json',
          'Authorization': `Token ${xtoken}`
        
        })

        setRedirectTo("/")
        history.push("/")
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
    <div className="App_Wrapper" style={{display: "flex", flexDirection: "column", minHeight: "100vh", height: "fit-content", paddingBottom: "150px", overflowX: "hidden"}}>
      <Router history={history}>
        {!loading ? (
          <Switch>
            <Route path="/" exact render={() => <Index config={token} />} />
            <Route path="/login" exact render={() => <Login />}  />
            <Route path="/register" exact render={() => <Register />}  />
            <Route path="/reset" exact component={Reset} />
          </Switch>
        ) : (
          <span>Loading</span>
        )}
      </Router>
    </div>
  );
}

export default App;
