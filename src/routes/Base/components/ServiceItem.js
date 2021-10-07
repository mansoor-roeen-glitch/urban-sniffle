import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export default function ServiceItem({service}) {
    return (
        <Link style={{textDecoration: "none", outline: "none"}} to={`/service/${service.id}/${service.hostname}`}>
            <StyledWrapper id={service.id} >
                <StyledGrid>

                    <ServiceHostname>
                        <ServiceHostnameText>
                            {service.hostname}
                        </ServiceHostnameText>
                    </ServiceHostname>

                    <ServiceDetail>
                        <ServiceDetailText>
                            {service.plan}
                        </ServiceDetailText>
                    </ServiceDetail>

                    <ServiceDetail>
                        <ServiceDetailText>
                            {service.status}
                        </ServiceDetailText>
                    </ServiceDetail>

                    <ServiceDetail>
                        <ServiceDetailText>
                            {service.service_plan.ram}
                        </ServiceDetailText>
                    </ServiceDetail>

                </StyledGrid>
            </StyledWrapper>
        </Link>
    )
}

const ServiceDetailText = styled.span `
    font-family: "Josefin Sans";
    font-style: normal;
    font-weight: 300;
    font-size: 1.22rem;
    line-height: 124%;
    color: var(--white);
    text-transform: capitalize;
`;

const ServiceDetail = styled.div ` 

`;

const ServiceHostname = styled.div `

`;

const ServiceHostnameText = styled.span `
    font-style: normal;
    font-weight: 300;
    font-size: 1.296rem;
    line-height: 124%;
    color: var(--white);
    opacity: .9;
`;

const StyledGrid = styled.div `
    width: 93%;
    height: auto;

    max-width: 1400px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 40px 40px 40px;
    column-gap: 60px;

    &:hover {
        opacity: .8;
    }
`;

const StyledWrapper = styled.li `
    width: 100%;
    height: 75px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    border: none;
    list-style: none;
    border-bottom-width: 0.3px;
    border-bottom-color: rgba(216, 211, 230, 0.12);
    border-bottom-style: solid;

`;

