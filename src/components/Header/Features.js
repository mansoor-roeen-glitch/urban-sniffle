import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SvgIcon from '../icons/SvgIcon'

export default function Features({active}) {
    
    // Using static data for now
    // Features will be depending on the backend
    
    let features = [
        {
            name: "Services",
            to: "/dashboard",
            svg: "services.svg",
            width: "30px",
            height: "30px"
        },
        {
            name: "Plans",
            to: "/plans",
            svg: "services.svg",
            width: "30px",
            height: "30px"
        },
        {
            name: "Templates",
            to: "/templates",
            svg: "services.svg",
            width: "30px",
            height: "30px"
        },
        {
            name: "Pools",
            to: "/pools",
            svg: "services.svg",
            width: "30px",
            height: "30px"
        },
        {
            name: "Support",
            to: "/support",
            svg: "services.svg",
            width: "30px",
            height: "30px"
        }
    ]
    
    return (
        <Wrapper style={{display: active ? "flex" : "none"}}>
            <List>
                {features.map((feature, index) => {
                    return (
                    
                        <ListItem>
                            <Link style={{textDecoration: "none", display: "flex", alignItems: "center", padding: "0px 15px", columnGap: "3px", width: "100%"}} to={feature.to}>
                                <SvgIcon path={`/images/${feature.svg}`} alt={feature.name} width={feature.width} color="#FFFFFF" height={feature.height} />
                                <ItemText>{feature.name}</ItemText>
                            </Link>
                            {index !== features.length && <StyledSeperator></StyledSeperator>}
                        </ListItem>
                    
                    )
                })}
            </List>
        </Wrapper>
    )
}

const StyledSeperator = styled.div `
    position: absolute;
    width: 100%;
    height: 0.5px;
    background: var(--primary-white);
    bottom: 0px;
    opacity: .2;
`;

const ItemText = styled.span `
    font-size: 22px;
    text-decoration: none;
    font-weight: normal;
    font-style: normal;
    color: var(--primary-white);
    padding: 0px 10px;

    font-family: "Josefin Sans", "Roboto", sans-serif;

    width: 100%;
    height: 100%;
    
    &:hover {
        opacity: .8;
    }
`;

const List = styled.ul `
    width: 100%;
    list-style: none;
    gap: 10px;
`;

const ListItem = styled.li `
    height: fit-content;
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0px;

    &:nth-last-child() {
        display: none;
    }

`;

const Wrapper = styled.div `
    height: fit-content;
    width: 320px;

    top: calc(65px + 10px);
    background: white;
    position: absolute;
    right: calc(5% + 110px);
    background: var(--secondary-background);
    border: none;

    box-shadow: 0 3px 20px rgb(255 255 255 / 5%), 0 1px 2px rgb(0 0 0 / 5%), 0 0 0 1px rgb(255 255 255 / 10%);
    border-radius: 4px;
    z-index: 2;
`;