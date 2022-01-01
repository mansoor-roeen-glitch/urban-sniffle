import React from 'react'
import styled from 'styled-components';
import SvgIcon from '../../../components/icons/SvgIcon';

export default function Template(
    {

        template

    }) {

    const templateName = template.name
    let svgPath = "/images/ubontuBW.svg"
    let vmType = templateName.split(" ")[0].toLowerCase()
    

    if (vmType === "centos") {
        svgPath = "/images/centOsBW.svg"
    }

    return (
        <Wrapper>
           <InnerWrapper>
               <SvgWrapper>
                   <SvgIcon path={svgPath} width={50} height={50} />
               </SvgWrapper>
               <TextWrapper>
                   <Text> {templateName} </Text>
               </TextWrapper>
           </InnerWrapper>
        </Wrapper>
    )
}

const Text = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #D7DCE3;
`;

const TextWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
`;

const SvgWrapper = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const InnerWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    row-gap: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Wrapper = styled.div `
    width: auto;
    height: 140px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: solid 1px #1d2430;
    background-color: transparent;

    &:nth-child(1) {
        background-color: #12171F;
        border: none;
    }
`;
