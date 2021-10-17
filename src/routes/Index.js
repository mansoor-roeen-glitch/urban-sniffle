import React from 'react'
import { Route, Redirect, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';

// Importing Components 
import Base from './Base/Base';
import Service from './Service/Service';
import Create from './Create/Create';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer'

export default function Index({config}) {

    const [selected, setSelected] = React.useState(false)
    const history = createBrowserHistory();
 
    const handleClickChange = (id, hostname) => {

        setSelected({id, hostname})

    }

    return (
        
        <Router history={history}>            
            <Header config={config} />
            <Switch>
            
                <Route path="/" exact render={() => <Base config={config} handleClickChange={handleClickChange} />} />
                <Route path="/service/:id/:hostname" render={() => <Service config={config} details={selected} />} /> 
                <Route path="/create" exact render={() => <Create />} />
            
            </Switch>
            <Footer />
        </Router>
    )
}
