import React from "react";
import { Route, Router, Switch, Redirect } from "react-router";
import {createBrowserHistory} from 'history'
import Index from "./routes/Index";
import Register from "./routes/Register/Register";
import Login from './routes/Login/Login'
import Reset from "./routes/Reset/Reset";

function App() {

  const [redirect, setRedirect] = React.useState(false)
  const [authenticated, setAuthenticated] = React.useState(false)
  const [redirectTo, setRedirectTo] = React.useState("")

  const history = createBrowserHistory();

  const authswtich = () => {
    if (redirectTo === "/login") {
      redirectTo("/register")
    } else if (redirectTo === "/register") {
      redirectTo("/login")
    }
  }

  if (authenticated && !redirectTo) {
      
      // We will redirect the user to Dashbaord
      setRedirectTo("/");
      setRedirect(true)

  } else if (!authenticated && !redirectTo) {

      // Redirect user to login page
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
      setRedirect(true)

  }

  return (
    <div className="App_Wrapper" style={{display: "flex", flexDirection: "column", minHeight: "100vh", height: "fit-content", paddingBottom: "60px", overflowX: "hidden"}}>
      <Router history={history}>
      { redirect && redirectTo && <Redirect to={redirectTo} /> }
        <Switch>

          <Route path="/" exact component={Index} />
          <Route path="/reset" exact component={Reset} />
          <Route path="/login" exact component={Login} authswtich={authswtich} />
          <Route path="/register" exact component={Register} authswtich={authswtich} />
        
        </Switch>
      </Router>
    </div>
  );
}

export default App;
