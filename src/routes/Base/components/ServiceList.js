import React from 'react'
import styled from 'styled-components'
import ServiceItem from './ServiceItem'

export default function ServiceList({data, handleClickChange, type}) {
    
    return (
        <StyledWrapper>
            <List>
                {data && data.map((item, index) => {
                    switch (type) {

                        case "services": 
                            return (
                                <ServiceItem type="service" handleClickChange={handleClickChange} item={[
                                    item.id, item.hostname, item.plan, item.status, item.service_plan.ram
                                ]} redirectTo={`/services/${item.id}/${item.hostname}`} key={index} />
                            );

                        case "plans":
                            return (
                                <ServiceItem type="plan" item={[
                                    item.id, item.name, item.size, item.period, item.bandwidth
                                ]} redirectTo={`/plans/${item.id}`} key={index} />
                            );

                        case "templates":
                            return (
                                <ServiceItem type="template" item={[
                                    item.id, item.name, item.type, item.id, item.file
                                ]} redirectTo={`/templates/${item.id}`} key={index} />
                            );
                    }
                })}
            </List>
        </StyledWrapper>
    )
}

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

