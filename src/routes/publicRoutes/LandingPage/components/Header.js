import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Header() {
    return (
        <HeaderWrapper>
            <LogoWrapper>
                <Link style={{

                    width: "fit-content", 
                    justifyContent: "center",
                    height: "fit-content", 
                    alignItems: "center",
                    display: "flex"
                    
                    }} to="/">

                    <div>
                        <StyledLogo src="/images/favicon.ico"></StyledLogo>
                    </div>
                    <div>
                        <StyledTitle spellCheck="false">Hosnet.io</StyledTitle>
                    </div>

                </Link>
            </LogoWrapper>
            <NavWrapper>
                <Nav>
                    <NavList>
                        <NavItem>
                            
                            <Link to="/support" style={{

                                textDecoration: "none"    

                                }}>

                                <NavItemText>Support</NavItemText>
                            </Link>
                        </NavItem>

                        <SeperatorWrapper>
                            <Seperator></Seperator>
                        </SeperatorWrapper>

                        <NavItem>
                            
                            <Link to="/support" style={{

                                textDecoration: "none"    

                                }}>

                                <NavItemText style={{color: "#D9E6E6"}}>Products</NavItemText>
                            </Link>
                        </NavItem>

                        <SeperatorWrapper>
                            <Seperator></Seperator>
                        </SeperatorWrapper>

                        <NavItem>
                            
                            <Link to="/support" style={{

                                textDecoration: "none"     

                                }}>

                                <NavItemText>Policies</NavItemText>
                            </Link>
                        </NavItem>
                    </NavList>
                </Nav>
            </NavWrapper>

            <ButtonWrapper>
                
                <Link to="/login" style={{

                        textDecoration: "none"

                    }}>

                    <LoginButtonWrapper>
                        <LoginButtonText>
                            Login
                        </LoginButtonText>
                    </LoginButtonWrapper>
                </Link>
                

                <Link to="/register" style={{

                        textDecoration: "none"

                    }}>
    
                    <RegisterButtonWrapper>
                        <RegisterButtonText>
                            Register
                        </RegisterButtonText>
                    </RegisterButtonWrapper>
                
                </Link>
            </ButtonWrapper>

        </HeaderWrapper>
    )
}

const StyledTitle = styled.span `
    font-size: 1.1rem;
    line-height: normal;
    text-decoration: none;
    font-family: "Open Sans", "Roboto", sans-serif;
    font-weight: 400;
    color: var(--primary-white);
    margin-left: 12px;
    text-decoration: "none";
    

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const RegisterButtonText = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
`;

const RegisterButtonWrapper = styled.div `
    width: 120px;
    height: 40px;
    background: transparent;
    border: solid 1px #445656;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    :hover{
        opacity: .8;
    }
`;

const LoginButtonText = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
`;

const LoginButtonWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 40px;
    cursor: pointer;
    :hover {
        opacity: .8;
    }
`

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;
    display: flex;
    column-gap: 20px;
`;

const StyledLogo = styled.img `
    width: 35px;
    height: 30px;
`;

const NavItemText = styled.div `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    /* or 22px */

    display: flex;
    align-items: center;
    text-align: center;
    color: #91A8A8;

`;

const NavItem = styled.div `
    width: fit-content;
    height: fit-content;
    :hover {
        opacity: .8;
    }
`;

const Seperator = styled.div `
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #91A8A8;
`;

const SeperatorWrapper = styled.div `
    width: fit-content;
    height: 100%;
    margin: 0px 20px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavList = styled.div `
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Nav = styled.div `
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavWrapper = styled.div `
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    height: fit-content;
    width: 240px;
`;

const HeaderWrapper = styled.div `
    width: 93%;
    max-width: 1700px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-top: 40px;

`;