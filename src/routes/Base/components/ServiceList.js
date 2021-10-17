import React from 'react'
import styled from 'styled-components'
import ServiceItem from './ServiceItem'

export default function ServiceList({services, handleClickChange}) {
    
    return (
        <StyledWrapper>
            <List>
                {services && services.map((service, index) => {
                    return (
                        <ServiceItem handleClickChange={handleClickChange} service={service} key={index} />
                    )
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

