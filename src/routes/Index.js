import React from 'react'
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

// Importing Components 
import Base from './Base';
import CreateService from './CreateService';
import Header from '../components/Header/Header';

export default function Index({authenticated}) {
    
    const [redirect, setRedirect] = React.useState(false)
    const [redirectTo, setRedirectTo] = React.useState("")

    const history = createBrowserHistory();

    if (authenticated && !redirectTo) {
    
        // We will redirect the user to Dashbaord
        setRedirectTo("/");
        setRedirect(true)
    
    } else if (!authenticated && !redirectTo) {

        // Redirect user to login page
        setRedirectTo("/login");
        setRedirect(true)
    
    }
    
    return (
        
        <Router history={history}>

            <Header />

            { redirect && redirectTo && <Redirect to={redirectTo} /> }

            <Switch>
            
                <Route path="/" exact component={Base} />
                <Route path="/create-service" exact component={CreateService} />
            
            </Switch>

        </Router>
    )
}
