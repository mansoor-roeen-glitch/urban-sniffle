import React from 'react'
import styled from 'styled-components';
import Svg from '../../components/icons/SvgIcon';

export default function FormElement({type, value, title, desc, placeholder, onChange, hasError}){

        const handleInputChange = (event) => {
            onChange({value: event.target.value})
        }

        return (
            <Wrapper>
                
                <ElementHeader>
                    <ElementHeading> {title} </ElementHeading>
                    <ElementDesc> {desc} </ElementDesc>
                </ElementHeader>

                <ElementWrapper>
                    <ElementInput hasError={hasError} placeholder={placeholder} value={value} onChange={handleInputChange} /> )
                    {/* {!isInput && 
                        (<ElementDropdown>
                            <ElementDropdownButton>
                                <ElementDropdownButtonText>
                                    {title}
                                </ElementDropdownButtonText>
                                <ElementDropdownSvg>
                                    <Svg path="/images/dropdown.svg" width={11} height={24} />
                                </ElementDropdownSvg>
                            </ElementDropdownButton>
                    </ElementDropdown> )} */}
                </ElementWrapper>

            </Wrapper>
        )
}

const ElementDropdownSvg = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    position: absolute;

    right: 20px;
    height: 100%;
`;

const ElementDropdownButtonText = styled.span `
    width: 100%;
    color: #ced0d4;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;

    display: flex;
    align-items: center;
`;

const ElementDropdownButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    
    width: 100%;
    height: 100%;
    background-color: #141923;
`;

const ElementDropdown = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 45px;
`;

const ElementInput = styled.input `
    width: 100%;
    height: 45px;
    padding-left: 20px;

    border: none;
    background-color: #141923;
    color: #ced0d4;

    &::placeholder {
        font-size: 16px;

        display: flex;
        align-items: center;
        color: #666F7B; 
    }
`;

const ElementWrapper = styled.div `
    height: 100%;

    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ElementDesc = styled.span `
    font-weight: 300;
    line-height: 22px;
    font-size: 15px;

    font-style: normal;
    display: flex;
    align-items: center;
    color: #848B95;
`;

const ElementHeading = styled.span `
    font-weight: 400;
    font-size: 18px;
    
    display: flex;
    align-items: center;
    font-style: normal;
    color: #c9ced5;
`;

const ElementHeader = styled.div `
    row-gap: 10px;
    
    display: flex;
    flex-direction: column;
    width: auto;
    height: fit-content;

`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: grid;
    column-gap: 20px;

    grid-template-columns: 1fr 1.2fr;
`;