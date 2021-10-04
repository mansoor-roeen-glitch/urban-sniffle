import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default function Footer() {
    
    const links = [
        {
            to: "/privacy-policy",
            text: "Privacy"
        }, 
        {
            to: "/terms-of-services",
            text: "Terms Of Services"
        },
        {
            to: "/cookies",
            text: "Cookies"
        },
        {
            to: "/",
            text: "© Hosnet"
        }
    ]
    
    return (
        <StyledWrapper>
            <List>
                {links.map((link, index) => {
                    return (
                        <Item key={index}>
                            <Link style={{textDecoration: "none", font: "inherit"}} to={link.to} >
                                <LinkText>{link.text}</LinkText>
                            </Link>
                        </Item>
                    )
                })}
            </List>
        </StyledWrapper>
    )
}


const LinkText = styled.span `
    font-size: 16px;
    color: var(--primary-white);
    font-style: normal;
    font-weight: 300;
`;

const Item = styled.li `
    width: fit-content;
    height: fit-content;

    opacity: .6;

    &:hover {
        opacity: 1;
    }
`;

const List = styled.ul `

    width: 95%;
    max-width: 1400px;
    display: flex;
    justify-content: flex-end;
    list-style: none;
    column-gap: 35px;
`;  

const StyledWrapper = styled.div `
    width: 100%;
    height: 65px;
    align-self: flex-end;

    position: absolute;
    bottom: 0px;

    display: flex;
    align-items: center;
    justify-content: center;
    
    border-top-color: var(--footer-line);
    border-top-width: 0.5px;
    border-top-style: solid;

`;
