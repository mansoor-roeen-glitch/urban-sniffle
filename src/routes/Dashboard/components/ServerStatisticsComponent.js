// Importing Dependencies
import React from 'react';
import styled from 'styled-components';

// Importing Components
import Svg from '../../../components/icons/SvgIcon';


export default function ServerStatisticsComponent() {
    
    // JSX For Render
    return (
        
        <Wrapper>

            <Header>

                <HeadingWrapper>
                    <Heading>
                        Server Statistics
                    </Heading>
                </HeadingWrapper>

                <Dropdown>
                    <DropdownButton>

                        <DropdownButtonText>
                            - Local host -
                        </DropdownButtonText>

                        <DropdownButtonIcon>
                            <Svg width={14} height={14} path='/images/general/arrow-down-icon.svg' />
                        </DropdownButtonIcon>

                    </DropdownButton>
                </Dropdown>

            </Header>

        </Wrapper>

    )

}



const DropdownButtonIcon = styled.div `
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DropdownButtonText = styled.span `
    font-size: 14px;
    
    font-weight: normal;
    font-style: normal;
    align-items: center;
    display: flex;
    color: #CDD1D7;
`;

const DropdownButton = styled.button `
    width: 100%;
    height: 100%;
    padding: 0px 15px;

    background: transparent;
    justify-content: space-between;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Dropdown = styled.div `
    display: flex;
    background-color: #171D25;

    height: 32px;
    width: 360px;
`;

const Heading = styled.span `
    font-weight: 500;
    font-size: 16px;

    color: #CCD1D9;
`;

const HeadingWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
`;

const Header = styled.div `
    width: 96%;
    
    display: flex;
    justify-content: space-between;
    height: fit-content;
`;

const Wrapper = styled.div `
    width: 100%;
    height: 380px;
    border-radius: 7px;
    padding: 25px 0px 0px;

    background: #10151B;
    display: flex;
    justify-content: center;
`;
