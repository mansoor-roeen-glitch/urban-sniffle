import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import SvgIcon from '../icons/SvgIcon'

export default function Profile({active, userDataLoading, userData, setActive}) {
    
    // Using static data for now
    // options will be depending on the backend
    
    let options = [
        {
            name: "Account",
            to: "/",
            svg: "profile.svg",
            width: "19px",
            height: "19px"
        },
        {
            name: "Logout",
            to: "/logout",
            svg: "logout.svg",
            width: "19px",
            height: "19px"
        }
    ]

    return (
        <Wrapper style={{display: active ? "flex" : "none"}}>
            <List>
                {options.map((option, index) => {
                    return (
                        <ListItem key={index}>
                            <Link onClick={() => {setActive(false)}} ref={(elem) => {if (elem) {elem.style.setProperty("outline", "none", "important")}}} style={{textDecoration: "none", display: "flex", alignItems: "center", padding: "0px 19px", columnGap: "8px", width: "100%"}} to={option.to}>
                                <SvgIcon path={`/images/${option.svg}`} alt={option.name} width={option.width} color="#FFFFFF" height={option.height} />
                                <ItemText>{option.name}</ItemText>
                            </Link>
                            {index !== options.length && <StyledSeperator></StyledSeperator>}
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