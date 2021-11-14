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
import CreatePlan from './Plans/components/CreatePlan';
import Templates from './templates/Templates';
import Template from './templates/components/Template'
import CreateTemplate from './templates/components/CreateTemplate';
import Logout from './Logout/Logout';
import styled from 'styled-components';

export default function Index({config}) {

    const [selected, setSelected] = React.useState(false)
    const [selectedPlan, setSelectedPlan] = React.useState()
    const [selectedTemplate, setSelectedTemplate] = React.useState()


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

    return (
        
        <Wrapper>
            <Router history={history}>            
                <Header config={config} />

                <Switch>
                
                    <Route path="/" exact render={() => <Base config={config} handleClickChange={handleClickChange} />} />
                    <Route path="/services/:id/:hostname" exact render={() => <Service config={config} details={selected} />} /> 
                    <Route path="/create" exact render={() => <Create config={config}  />} />
                    <Route path="/plans" exact render={() => <Plans config={config} handlePlanClick={handlePlanClick} />} />
                    <Route path="/plans/create" exact render={() => <CreatePlan config={config} />} />
                    <Route path="/plans/:id" exact render={() => <Plan config={config} details={selectedPlan} />} /> 
                    <Route path="/templates" exact render={() => <Templates config={config} handleTemplateClick={handleTemplateClick} />} />
                    <Route path="/templates/create" exact render={() => <CreateTemplate config={config} />} />
                    <Route path="/templates/:id" exact render={() => <Template config={config} details={selectedTemplate} />} /> 
                    <Route path="/auth/logout" exact render={() => <Logout />} />

                </Switch>

                <Footer />
            </Router>
        </Wrapper>
    )
}


const Wrapper = styled.div `
    min-height: 100vh;
    height: fit-content;
    padding-bottom: 130px;
`;