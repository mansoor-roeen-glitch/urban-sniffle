// Import Dependencies
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../../components/buttons/ActionButton'
import DangerButton from '../../../components/buttons/DangerActionButton'
import FormElement from '../../../components/forms/ServiceFormElement'
import PopupConfirmation from '../../../components/popup/PopupConfirmation'

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

    const [isPopupActive, setIsPopupActive] = useState(false)
    const [popupAction, setPopupAction] = useState()
    const [popupCallback, setPopupCallback] = useState()


    // Component Functions

    const confirmDelete = () => {
        console.log('action has been confirmed')
    }
 
    const activatePopup = (callback) => {

        setPopupAction('delete');
        setPopupCallback(callback)
        setIsPopupActive(true);

    }

    const handleDeleteClick = () => {

        activatePopup(confirmDelete)

    }

    // JSX For Render

    return (
        
        <Wrapper>

            {isPopupActive ? (
                
                <PopupWrapper>
                    <PopupConfirmation 
                    
                        hostname={serviceInformation.hostname}
                        callback={popupCallback}
                        action={popupAction}
                    
                    />
                </PopupWrapper>

            ) : null}

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
                        text="Delete Service"
                        height="40px"
                        width="170px"
                        onClick={handleDeleteClick}
                    />
                </ButtonsWrapper>

            </InnerWrapper>
        </Wrapper>

    )

}


const PopupWrapper = styled.div `
    
    position: fixed;
    top: 50%;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%, -50%);

    width: 100%; 
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 111;

    &::before {

        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);

        width: 100%; 
        height: 100%;
        background-color: #04060c;
        opacity: 0.8;

    }

`;

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
