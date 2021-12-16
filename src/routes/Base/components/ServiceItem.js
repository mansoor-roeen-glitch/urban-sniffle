import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export default function ServiceItem({
    
    handleTemplateClick, 
    handlePlanClick, 
    handleNodeClick, 
    handleClickChange, 
    handlePoolClick, 

    index,
    details, 
    redirectTo, 
    item, 
    type

    }) {

    return (
        
        <Link onClick={() => {

            if (type === "service") {
                handleClickChange(item[0], item[1])
            } else if (type === "plan") {
                handlePlanClick(details)
            } else if (type === "template") {
                handleTemplateClick(details)
            } else if (type === "node") {
                handleNodeClick(details)
            } else if (type === "pool") {
                handlePoolClick(details)
            }

        }} style={{textDecoration: "none", outline: "none"}} to={redirectTo}>
            <StyledWrapper id={item[0]} isOdd={index % 2 === 0 ? false : true} >
                <StyledGrid>

                    <ServiceHostname>
                        <ServiceHostnameText>
                            {item[1]}
                        </ServiceHostnameText>
                    </ServiceHostname>

                    <ServiceDetail>
                        <ServiceDetailText>
                            {item[2]}
                        </ServiceDetailText>
                    </ServiceDetail>

                    <ServiceDetail>
                        <ServiceDetailText>
                            {item[3] === undefined ? 'inactive' : item[3]}
                        </ServiceDetailText>
                    </ServiceDetail>

                    <ServiceDetail>
                        <ServiceDetailText>
                            {item[4]}
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
    font-size: 1.15rem;
    line-height: 124%;
    color: var(--white);
    text-transform: capitalize;

    @media screen and (max-width: 600px) {
        font-size: 1.1rem;
    }
`;

const ServiceDetail = styled.div ` 
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ServiceHostname = styled.div `

`;

const ServiceHostnameText = styled.span `
    font-style: normal;
    font-weight: 300;
    font-size: 1.15rem;
    line-height: 124%;
    color: var(--white);
    opacity: .9;

    @media screen and (max-width: 600px) {
        font-size: 1rem;
    }
`;

const StyledGrid = styled.div `
    width: 93%;
    height: auto;

    max-width: 1600px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 70px 70px 70px;
    column-gap: 40px;

    &:hover {
        opacity: .8;
    }
    
`;

const StyledWrapper = styled.li `
    width: 100%;
    height: 67px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${props => props.isOdd ? "#0f141c" : "transparent"};
    border: none;
    list-style: none;
    border-bottom-width: 0.3px;
    border-bottom-color: rgb(21 28 39);
    border-bottom-style: solid;

`;

