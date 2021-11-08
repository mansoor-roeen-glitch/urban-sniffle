import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import ServiceItem from './ServiceItem'

export default function ServiceList({data, handleClickChange, type, handlePlanClick, handleTemplateClick}) {

    return (
        <StyledWrapper>
            <List>
                {data.length > 0 ? data.map((item, index) => {
                    switch (type) {

                        case "services": 
                            return (
                                <ServiceItem type="service" handleClickChange={handleClickChange} item={[
                                    item.id, item.hostname, item.plan, item.status, item.service_plan.ram
                                ]} redirectTo={`/services/${item.id}/${item.hostname}`} key={index} />
                            );

                        case "plans":
                            return (
                                <ServiceItem type="plan" handlePlanClick={handlePlanClick} details={item} item={[
                                    item.id, item.name, item.size, item.period, item.bandwidth
                                ]} redirectTo={`/plans/${item.id}`} key={index} />
                            );

                        case "templates":
                            return (
                                <ServiceItem handleTemplateClick={handleTemplateClick} details={item} type="template" item={[
                                    item.id, item.name, item.type, item.id, item.file
                                ]} redirectTo={`/templates/${item.id}`} key={index} />
                            );
                    }
                }) : (
                    <MessageWrapper>
                        <MessageInnerWrapper>
                            <Message>
                                You currently have no {type} set up, <Link to={type === 'services' ? '/create' : `/${type}/create`} style={{fontSize: '19px', color: '#ba97e4'}}>click here</Link> if you want to create a new {type}
                            </Message>
                        </MessageInnerWrapper>
                    </MessageWrapper>
                )}
            </List>
        </StyledWrapper>
    )
}

const MessageInnerWrapper = styled.div `
    max-width: 1400px;
    width: 92%;
`;

const Message = styled.p `
    color: var(--white);
    font-size: 19px;
    width: 500px;
`

const MessageWrapper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;

    padding-top: 25px;

`;

const List = styled.ul `
    list-style: none;
    display: flex;
    flex-direction: column;

    width: fit-content;
    height: fit-content;
    width: 100%;

`

const StyledWrapper = styled.div `
    width: 100%;
    padding-top: 10px;
    background: transparent;
    
    align-items: center;
    justify-content: center;
    display: flex;
`;

