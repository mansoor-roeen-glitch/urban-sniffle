import React from 'react'
import styled from 'styled-components'
import SvgIcon from '../icons/SvgIcon'

export default function PrimarySearchBar(props) {
    return (
        <Wrapper>
            
            <StyledInput value={props.value} onChange={(e) => {props.onChange(e.target.value); props.valueHasChanged(e.target.value)}} name={props.name} placeholder="Filter by records" className={props.className} id={props.id} />
            
            <StyledLabel htmlFor={props.name} >
                <SvgIcon path="/images/search.svg" alt="Search Svg" width="22px" height="22px" />
            </StyledLabel>

        </Wrapper>
    )
}

const Wrapper = styled.div `
    width: 300px;
    height: 42px;
    border-radius: 8px;
    background: transparent;
    border-width: 0.5px;
    border-color: var(--primary-purple);
    opacity: .6;
    border-style: solid;
    overflow: hidden;
`;

const StyledInput = styled.input ` 
    width: 220px;
    height: 100%;
    background: transparent;

    outline: none;
    margin-left: 50px;
    color: var(--primary-white);
    font-style: normal;
    font-size: 16px;

`;

const StyledLabel = styled.label `
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    padding-left: 15px;
    z-index: -1;

`;