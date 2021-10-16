import React from 'react'
import styled from 'styled-components';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SubHeader from '../../components/Header/SubHeader';
import PrimaryInput from '../../components/inputs/PrimaryInput'
import Section from '../Service/components/Section';

export default function Create() {
    
    const staticdata = [
        {
            heading: "hostname",
            value: "example-hostname",
            type: "input",
            htmltype: "text"
        },
        {
            heading: "password",
            value: "your-password",
            type: "input",
            htmltype: "password"
        },
        {
            heading: "node",
            value: "Magus",
            type: "dropdown",
            options: [
                {
                    value: "Magus",
                    type: "option"
                },
                {
                    value: "Nasom",
                    type: "option"
                }
            ],
            selected: 0
        },
        {
            heading: "Plan Type",
            value: "Basic plan",
            type: "dropdown",
            options: [
                {
                    value: "Basic Plan",
                    pricing: "$15.00",
                    type: "option"
                },
                {
                    value: "Normal Plan",
                    pricing: "$30.00",
                    type: "option"
                },
                {
                    value: "Advance Plan",
                    pricing: "$50.00",
                    type: "option"
                }
            ],
            selected: 0
        },
        {
            heading: "template",
            value: "ubonto-focal",
            type: "dropdown",
            options: [
                {
                    value: "ubonto-focal",
                    type: "option"
                },
                {
                    value: "windows-20",
                    type: "option"
                },
                {
                    value: "windows-55",
                    type: "option"
                }
            ],
            selected: 0  
        }
        ,
        {
            heading: "billing type",
            value: "unknown",
            type: "dropdown",
            options: [
                {
                    value: "unknown...",
                    type: "option"
                }
            ],
            selected: 0  
        }

    ]
    
    return (
        <Wrapper>
            <SubHeader path={true} pathName="Create service" />
            <InnerWrapper>
                <Section data={staticdata} heading="Create new service" rows={2} rowHeight={130}  />
                <ButtonWrapper>
                    <PrimaryButton text="Create Service" to="/create" width="160px" height="45px" />
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InnerWrapper = styled.div `
    width: 93%;
    height: fit-content;
    max-width: 1400px;
    padding-top: 25px;

    margin-bottom: 60px;
`;
