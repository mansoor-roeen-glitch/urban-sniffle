import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '../../components/buttons/ActionButton';
import ErrorMessage from '../../components/messages/ErrorMessage';
import SuccessMessage from '../../components/messages/SuccessMessage';
import handleCheckout from '../../functions/handleCheckout';
import Plan from './components/Plan';
import Template from './components/Template'
import FormElement from '../../components/forms/FormElement';

export default function Create(
    
    {

        config,
        handleSubHeader

    }) {
    
    const [node, setNode] = useState(0)
    const [planType, setPlanType] = useState(0)
    const [template, setTemplate] = useState(0)
    const [billingMethod, setBillingMethod] = useState(0)
    const [responseLoading, setResponseLoading] = useState(false)

    const [hostname, setHostname] = useState({
        
        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    })

    const [password, setPassword] = useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    })

    const [ownerLoading, setOwnerLoading] = useState(true);
    const [ownerDetails, setOwnerDetails] = useState()
    const [ownerSuccess, setOwnerSuccess] = useState();

    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState()
    const [error, setError] = useState()

    const [showMessage, setShowMessage] = React.useState(false);

    const templateTypes = [
        {
            name: "Ubontu Focal",
            type: "kvm"
        },
        {
            name: "CentOs 8",
            type: "kvm"
        },
        {
            name: "Ubontu Bionic",
            type: "kvm"
        }
    ]

    if (loading) {

        return (
            <Wrapper>
                {/* Loading will be included below this */}
            </Wrapper>
        )

    }

    if (error) {
        
        return (
            <Wrapper>
                {/* Error will be included below this */}
                <h1>Something went wrong, try again later</h1>
            </Wrapper>
        )

    }

    return (
        <Wrapper>

            {showMessage && 

                showMessage.messageType === "success" && (

                        <SuccessMessage message={showMessage.message} duration={showMessage.duration} isVisible={true} />

                    )
                }

            {showMessage && 

                showMessage.messageType === "error" && (

                    <ErrorMessage message={showMessage.message} duration={showMessage.duration} isVisible={true} />

                )
            }

            <InnerWrapper>
                
                <PlanSection>
                    <PlanSectionHeader>
                        <PlanSectionHeading>
                            Select plan type
                        </PlanSectionHeading>
                    </PlanSectionHeader>
                    <PlanSectionList>
                        {/* {planTypes.map((plan) =>  <Plan plan={plan} /> )} */}
                    </PlanSectionList>
                </PlanSection>

                <TemplateSection>
                    <TemplateSectionHeader>
                        <TemplateSectionHeading>
                            Select template 
                        </TemplateSectionHeading>
                    </TemplateSectionHeader>
                    <TemplateSectionList>
                        {/* {templateTypes.map((template) => <Template template={template} /> )} */}
                    </TemplateSectionList>
                </TemplateSection>

                <FormWrapper>
                    <FormList>
                        
                        <FormElement 
                        
                            title="Service Hostname" 
                            desc="This field can only consist of alphabets, numbers, dashes and underscores"
                            placeholder="ex: ExampleHostname-101_5"
                            type="input" 
                            
                        />

                        <FormElement 
                        
                            title="Service Password" 
                            desc="Password field must be at least 8 characters long"
                            placeholder="ex: 4cK[BZ:6HMxGm/kV"
                            type="input" 
                            
                        />

                        <FormElement 
                        
                            title="Service Node" 
                            desc="Select node type from the options"
                            placeholder="Magus"
                            type="choice" 
                            
                        />


                    </FormList>
                </FormWrapper>

                <ButtonWrapper>
                    {/* <Button onClick={createService} text="Proceed to checkout" width="180px" height="45px" /> */}
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const FormList = styled.ul `
    list-style: none;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 40px;
`;

const FormWrapper = styled.div `
    margin-top: 70px;
    margin-bottom: 50px;
    width: 100%;

    max-width: 1000px;
`;

const TemplateSectionList = styled.ul `
    display: grid;
    height: fit-content;

    width: 100%;
    column-gap: 35px;
    padding-top: 20px;

    grid-template-columns: repeat(7, 1fr);
`;

const TemplateSectionHeading = styled.div `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 22px;

    display: flex;
    align-items: center;
    color: #caced5;
`;

const TemplateSectionHeader = styled.div `
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 42px;
    width: 100%;

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #2e343e;
        bottom: 0px;
    }
`;

const TemplateSection = styled.div `

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 45px;
    margin-bottom: 35px;

`;

const PlanSectionList = styled.ul `
    display: grid;
    height: fit-content;

    width: 100%;
    column-gap: 35px;
    padding-top: 20px;

    grid-template-columns: repeat(5, 1fr);
`;

const PlanSectionHeading = styled.div `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 22px;

    display: flex;
    align-items: center;
    color: #caced5;
`;

const PlanSectionHeader = styled.div `
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 42px;
    width: 100%;

    &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #2e343e;
        bottom: 0px;
    }
`;

const PlanSection = styled.div `

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

`;

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;
    margin-top: 15px;

    
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
    max-width: 1600px;
    padding-top: 50px;

    margin-bottom: 10px;

`;
