// Import Dependencies
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../../components/buttons/ActionButton'
import DangerButton from '../../../components/buttons/DangerActionButton'
import FormElement from '../../../components/forms/ServiceFormElement'

export default function Settings ({serviceInformation}) {
    
    // Component Functions

    const {

        currentHostname,
        currentPassword

    } = serviceInformation

    let inputType = 'input'

    // React State Hooks ^^ 

    const [updatedHostname, setUpdatedHostname] = useState('')
    const [updatedPassword, setUpdatedPassword] = useState('')
    

    // Component Functions


    // JSX For Render

    return (
        
        <Wrapper>
            <InnerWrapper>
                <GeneralSettingsWrapper>
                    

                    {/* Input For Hostname */}
                    <FormElement 

                        type={inputType}
                        value={updatedHostname}
                        placeholder={currentHostname}
                        
                        title='Update Hostname'
                        desc='only contain alphabets, numberss and dashes'

                        onChange={setUpdatedHostname}

                    />

                    {/* Input For Password */}
                    <FormElement 

                        type={inputType}
                        value={updatedHostname}

                        title='Update Password'
                        placeholder='ex: BTag6WG_1!_5la'
                        desc='only contain alphabets, numberss and dashes'

                        onChange={setUpdatedHostname}

                    />

                </GeneralSettingsWrapper>

                <ButtonsWrapper>
                    <PrimaryButton 
                        to="/"
                        text="Submit Changes"
                        height="40px"
                        width="170px"
                    />

                    <DangerButton
                        to="/"
                        text="Delete Service"
                        height="40px"
                        width="170px"
                    />
                </ButtonsWrapper>

            </InnerWrapper>
        </Wrapper>

    )

}

const ButtonsWrapper = styled.div `
    
    display: flex;
    column-gap: 25px;
    margin-top: 50px;
    margin-bottom: 20px;

`;

const GeneralSettingsWrapper = styled.div `
  
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    row-gap: 35px;
    width: 70%;

`;

const InnerWrapper = styled.div `

    width: 93%;
    max-width: 1500px;
    height: fit-content;

`;

const Wrapper = styled.div `

    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

`;
