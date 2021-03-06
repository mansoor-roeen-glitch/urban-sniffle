import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function TableAItem({index, details, redirectTo, item, type,}) {

    // Component variables
    const navigate = useNavigate();

    // Function to redirect user based on click
    const handleClick = () => {
        navigate(redirectTo);
    }

    return (
        
        <Link onClick={handleClick} style={{textDecoration: "none", outline: "none"}} to={redirectTo}>
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
    font-weight: 400;
    font-size: 1rem;
    color: var(--white);

    text-transform: capitalize;
`;

const ServiceDetail = styled.div ` 
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ServiceHostname = styled.div `

`;

const ServiceHostnameText = styled.span `
    font-weight: 400;
    font-size: 1rem;
    color: var(--white);
`;

const StyledGrid = styled.div `
    width: 95%;
    height: auto;

    max-width: 2000px;
    display: grid;
    justify-content: space-between;
    grid-template-columns: 1fr 85px 85px 85px;
    column-gap: 40px;

    &:hover {
        opacity: .8;
    }
    
`;

const StyledWrapper = styled.li `
    width: 100%;
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${props => props.isOdd ? "#0f141c" : "transparent"};
    border: none;
    list-style: none;

`;

