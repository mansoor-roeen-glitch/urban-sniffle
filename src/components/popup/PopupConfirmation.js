// Import Dependencies
import React from 'react'
import styled from 'styled-components'

// Import Components
import Icon from '../icons/SvgIcon'

export default function PopupConfirmation() {
    
    return (
        
        <ComponentWrapper>

            <Header>
    
                <Heading>
                    Are you absolutely sure?
                </Heading>

                <CancelSvg>
                    <Icon path='/images/popupConfirmation/cancel.svg' width={16} height={16} />
                </CancelSvg>
    
            </Header>

            <DescriptionWrapper>
                <Description>
                    NOTE: Please note that this action <BoldText>cannot</BoldText> be undone. This will permanently delete the <BoldText>test_hostname_1</BoldText> service
                </Description>
            </DescriptionWrapper>

            <PasswordInputFieldWrapper>
                <PasswordLabel for='delete-confirmation-password' >Please enter your password to delete <BoldText>test_hostname_1</BoldText></PasswordLabel>
                <PasswordInputField name='delete-confirmation-password' type='password' placeholder='' />
            </PasswordInputFieldWrapper>

            <ConfirmationButtonWrapper>
                <ConfirmationButton>
                    I understand the consequences, delete this service
                </ConfirmationButton> 
            </ConfirmationButtonWrapper>

        </ComponentWrapper>

    )

}

const ConfirmationButton = styled.button `
    
    width: 100%;
    height: 100%;

    background: transparent;
    border: solid 1px #30363d;
    border-radius: 6px;

    color: #6b2b2a;
    font-weight: 400;
    font-size: 14px;

`;

const ConfirmationButtonWrapper = styled.div `
    
    width: 90%;
    height: 34px;
    margin-top: 10px;

`; 

const PasswordInputField = styled.input `

    width: 100%;
    height: 34px;

    background: transparent;
    border: solid 1px #30363d;
    border-radius: 6px;

    color: white;
    font-weight: 300;
    font-size: 14px;

    padding: 0px 12px;
    outline-color: #212a36;

`;

const PasswordLabel = styled.span `
    
    font-size: 14px;
    font-weight: 300; 
    color: #aaadb5;

`;

const PasswordInputFieldWrapper = styled.div `
    
    width: 90%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    row-gap: 12px;

`;

const BoldText = styled.span `
    font-size: 14px;
    font-weight: 600;
    color: #aaadb5;
`;

const Description = styled.span `
    font-size: 14px;
    font-weight: 300; 
    color: #aaadb5;
`;

const DescriptionWrapper = styled.div `

    width: 90%;
    height: fit-content;

    margin-bottom: 20px

`;

const CancelSvg = styled.div `
    
    height: fit-content;
    width: fit-content;
    
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

`;

const Heading = styled.span `
    font-size: 14px;
    font-weight: 600; 
    color: white;
`;

const Header = styled.div `

    width: 90%;
    height: 45px;

    display: flex;
    align-items: center;
    justify-content: space-between;

`;

const ComponentWrapper = styled.div `

    width: 450px;
    
    height: fit-content;
    background: #0d1117;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 10px;
    padding: 10px 0px 25px 0px;
    outline: solid 1px #1c1d28;
    
`