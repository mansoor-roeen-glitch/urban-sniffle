import React from 'react'
import Header from '../components/Base/sub-components/Header'
import { Router, Route, Link, Switch } from 'react-router-dom'
import BaseRoute from '../components/Base/Base'
import { createBrowserHistory } from 'history';

export default function Dashboard() {
    
    const history = createBrowserHistory();

    return (
        <Router history={history}>
            
            <Header />
            
            <Switch>
                <Route path="/" component={BaseRoute} />
            </Switch>
            

        </Router>
    )
}
