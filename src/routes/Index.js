import React from 'react'
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

// Importing Components 
import Base from './Base/Base';
import Service from './Service/Service';
import Create from './Create/Create';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'
import Plans from './Plans/Plans';
import Plan from './Plans/components/Plan';
import Templates from './templates/Templates';
import Template from './templates/components/Template'

export default function Index({config}) {

    const [selected, setSelected] = React.useState(false)
    const history = createBrowserHistory();
 
    const handleClickChange = (id, hostname) => {

        setSelected({hostname, id})

    }

    return (
        
        <Router history={history}>            
            <Header config={config} />
            <Switch>
            
                <Route path="/" exact render={() => <Base config={config} handleClickChange={handleClickChange} />} />
                <Route path="/services/:id/:hostname" render={() => <Service config={config} details={selected} />} /> 
                <Route path="/create" exact render={() => <Create config={config}  />} />
                <Route path="/plans" exact render={() => <Plans config={config} />} />
                <Route path="/plans/:id" render={() => <Plan config={config} />} /> 
                <Route path="/templates" exact render={() => <Templates config={config} />} />
                <Route path="/templates/:id" render={() => <Template config={config} />} /> 
            
            </Switch>
            <Footer />
        </Router>
    )
}
