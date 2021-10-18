import React from 'react';
import styled from 'styled-components';
import SvgIcon from '../icons/SvgIcon';

export default function SecondaryInput({placeholder, icon, htmlfor, type, value, setValue, minChar}) {
    return (
        <Wrapper>
            <Label htmlFor={htmlfor}>{htmlfor}</Label>
            <InputWrapper>
                <Input type={type} autoComplete="off" placeholder={placeholder} name={htmlfor} value={value} minLength={minChar} onChange={event => setValue(event.target.value)}  />
                <IconWrapper>
                    <SvgIcon width="24px" height="24px" path={icon} />
                </IconWrapper>
                <div className="Input_Line" style={{width: "100%", height: "1.5px", position: "absolute", bottom: "-5px", background: "#9FA9B9"}}></div>
                <div className="Input_Line_Overlay" style={{left: "0px", width: "0%", height: "1.5px", position: "absolute", bottom: "-5px", background: "#ba97e4"}}></div>
            </InputWrapper>
        </Wrapper>
    )
}

const InputWrapper = styled.div `
    height: 50px;
    display: flex;
    flex-direction: row-reverse;
    
`;

const IconWrapper = styled.div `
    width: 40px;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    display: flex;

    position: absolute;
    left: 8px;

`;

const Input = styled.input `
    width: 100%;

    padding-left: 48px;
    padding-right: 10px;

    background-color: transparent;
    outline: none;

    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;

    color: #B2C0D6;

    &:not(:focus):not(:placeholder-shown):valid ~ .Input_Line_Overlay {
        animation: lineAnim .6s ease forwards;
    }

    @keyframes lineAnim {
        0% {
            width: 0px;
        } 
        
        100% {
            width: 100%;
        }
    }

    &::placeholder {
        color: #9FA9B9;
        opacity: .7;
    }
`;

const Label = styled.label `
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;

    color: #9FA9B9;
    margin-bottom: 10px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: 75px;

    background-color: transparent;
`;