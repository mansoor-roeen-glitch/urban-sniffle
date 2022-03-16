import React from 'react'
import styled from 'styled-components';

export default function Plan(
    {

        plan,
        planIndex,
        selectedPlan,
        handlePlanClick,

    }) {

    const handleClick = () => {
        handlePlanClick(planIndex)
    }

    return (
        <Wrapper selected={selectedPlan} onClick={handleClick}>
            <Header>
                <Heading> {plan.name} </Heading>
                <Price> ${plan.price} / mo </Price>
            </Header>
            <InnerWrapper>
                <FeaturesList>
                    <Feature>
                        <FeatureValue>{plan.cpu_limit}</FeatureValue>
                        <FeatureName>CPUs</FeatureName>
                    </Feature>
                    <Feature>
                        <FeatureValue>{plan.ram}</FeatureValue>
                        <FeatureName>MB Memory</FeatureName>
                    </Feature>
                    <Feature>
                        <FeatureValue>{plan.size}</FeatureValue>
                        <FeatureName>MB Disk</FeatureName>
                    </Feature>
                    <Feature>
                        <FeatureValue>{plan.bandwidth}</FeatureValue>
                        <FeatureName>MB Bandwidth</FeatureName>
                    </Feature>
                </FeaturesList>
            </InnerWrapper>
        </Wrapper>
    )
}

const FeatureName = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;

    display: flex;
    align-items: center;

    color: #bfc1c5;
`;

const FeatureValue = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;

    display: flex;
    align-items: center;

    color: #e7e7e7;
`;

const Feature = styled.div `
    display: flex;
    column-gap: 5px;
`;

const FeaturesList = styled.ul `
    list-style: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    row-gap: 7px;
`;

const InnerWrapper = styled.div `
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: fit-content;
`;

const Price = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 17px;

    display: flex;
    align-items: center;

    color: #b5b9c1;
`;

const Heading = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    display: flex;
    align-items: center;

    color: #e7e7e7;
`;

const Header = styled.div `
    width: 90%;
    height: 55px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    &::after {
        content: "";
        position: absolute;
        background-color: #222C3D;
        width: 110%;
        height: 1px;
        
        left: -5%;
        bottom: 0px;
    }
`;

const Wrapper = styled.button `
    width: auto;
    height: 200px;

    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;

    border: solid 1px #1d2430;
    background: transparent;
    cursor: pointer;

    transition: transform .2s ease;

    &:hover {
        transform: scale(1.01);
    }
    
    &:nth-child(${props => props.selected + 1}) {
        border: none;
        background-color: #12171F;
    }
`;
