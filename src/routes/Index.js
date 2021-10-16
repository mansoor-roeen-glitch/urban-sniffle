import React from 'react'
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

// Importing Components 
import Base from './Base/Base';
import Service from './Service/Service';
import Create from './Create/Create';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'

export default function Index() {
    
    const history = createBrowserHistory();

    return (
        
        <Router history={history}>            
            <Header />
            <Switch>
            
                <Route path="/" exact component={Base} />
                <Route path="/service/:id/:hostname" component={Service} /> 
                <Route path="/create" exact component={Create} />
            
            </Switch>
            <Footer />
        </Router>
    )
}
