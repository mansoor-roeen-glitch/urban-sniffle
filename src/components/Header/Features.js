import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SvgIcon from '../icons/SvgIcon'

export default function Features({active, userDataLoading, userData, setActive, setProfileBtn}) {
    
    // Using static data for now
    // Features will be depending on the backend
    
    if (active) {
        setProfileBtn(false)
    }
    
    let userFeatures = [
        {
            name: "Services",
            to: "/",
            svg: "services.svg",
            width: "19px",
            height: "19px"
        },
        {
            name: "Support",
            to: "/support",
            svg: "support.svg",
            width: "19px",
            height: "19px"
        }
    ]

    let adminFeatures = [
        {
            name: "Services",
            to: "/",
            svg: "services.svg",
            width: "19px",
            height: "19px"
        },
        {
            name: "Plans",
            to: "/plans",
            svg: "plans.svg",
            width: "18px",
            height: "18px"
        },
        {
            name: "Templates",
            to: "/templates",
            svg: "templates.svg",
            width: "19px",
            height: "19px"
        },
        {
            name: "Support",
            to: "/support",
            svg: "support.svg",
            width: "19px",
            height: "19px"
        }
    ]

    const isAdmin = !userDataLoading && userData.is_staff ;
    const features = userDataLoading ? userFeatures : isAdmin ? adminFeatures : userFeatures;

    return (
        <Wrapper style={{display: active ? "flex" : "none"}}>
            <List>
                {features.map((feature, index) => {
                    return (
                    
                        <ListItem key={index}>
                            <Link onClick={() => {setActive(false)}} ref={(elem) => {if (elem) {elem.style.setProperty("outline", "none", "important")}}} style={{textDecoration: "none", display: "flex", alignItems: "center", padding: "0px 19px", columnGap: "8px", width: "100%"}} to={feature.to}>
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
    font-size: 16px;
    text-decoration: none;
    font-weight: 300;
    font-style: normal;
    color: var(--white);
    padding: 0px 10px;

    font-family: "Roboto", sans-serif;

    width: 100%;
    height: 100%;
    
    opacity: .9;
    outline: none!important;

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
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 0px;

    &:nth-last-child() {
        display: none;
    }

    outline: none!important;
`;

const Wrapper = styled.div `
    height: fit-content;
    width: 180px;

    top: calc(65px + 10px);
    background: white;
    position: absolute;
    right: 5%;
    background: var(--secondary-background);
    border: none;

    box-shadow: 0 3px 20px rgb(255 255 255 / 5%), 0 1px 2px rgb(0 0 0 / 5%), 0 0 0 1px rgb(255 255 255 / 10%);
    z-index: 10;
`;