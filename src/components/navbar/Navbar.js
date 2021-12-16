import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import handleNavbarOptions from '../../functions/handleNavbarOptions.js'
import IconRenderer from '../../components/icons/SvgIcon'

export default function Navbar({userDataLoading, userData}) {

    const [navbarOptions, setNavbarOptions] = React.useState([]); 
    const iconPath = '/images/'

    React.useEffect(() => {

        setNavbarOptions (
            handleNavbarOptions(userDataLoading, userData)
        )

    }, [userDataLoading, userData])

    if (navbarOptions.length < 1) {
        return null;
    }

    return (
        <Wrapper>
            <List>

                {navbarOptions.map((option, index) => {

                    return (
                        
                        <ListItemWrapper>
                            <Link to={option.link} style={{textDecoration: "none"}} >

                                <ListItem>
                                    <ListItemSvg>
                                        <IconRenderer width="20px" height="20px" path={iconPath + option.icon_path} />    
                                    </ListItemSvg>

                                    <ListItemText>
                                        {option.text}
                                    </ListItemText>
                                </ListItem>

                            </Link>
                        </ListItemWrapper>

                    )

                })}

            </List>
        </Wrapper>
    )
}

const ListItemText = styled.div `
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;

    color: #808791;
    text-decoration: none;
`;

const ListItemSvg = styled.div `
    width: fit-content;
    height: fit-content;
    margin-right: 10px;
`;

const ListItem = styled.div `
    width: 100%;
    display: flex;
`;

const ListItemWrapper = styled.li `
    padding-left: 20px;

    display: flex;
    align-items: center;
    list-style: none;
    width: 100%;
    height: 50px;

    &::after {

        left: 0px;
        content: "";
        position: absolute;
        bottom: 0px;
        height: 1px;
        width: 105%;
        background: linear-gradient(90deg, rgba(44, 46, 49, 0) -0.88%, #2C2E31 15.93%, #2C2E31 49.36%, #2C2E31 82.14%, rgba(44, 46, 49, 0) 100%);


    }
`;

const List = styled.ul `
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    list-style: none;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    background: transparent;
    align-items: center;
    display: flex;
    justify-content: center;
`;
