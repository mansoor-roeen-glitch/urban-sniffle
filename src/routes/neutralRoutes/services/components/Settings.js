// Import Dependencies
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

// components
import PrimaryButton from '../../../../components/buttons/ActionButton'
import DangerButton from '../../../../components/buttons/DangerActionButton'
import FormElement from '../../../../components/forms/ServiceFormElement'
import Message from '../../../../components/messages/Message'
import DeleteConfirmation from '../../../../components/popup/DeleteConfirmation'
import apiRequest from '../../../../functions/apiRequest'

export default function Settings ({service, user, token}) {
    
    const currentHostname = service.body.hostname
    let inputType = 'input'

    // React State Hooks ^^ 
    const [updatedHostname, setUpdatedHostname] = useState('')
    const [updatedPassword, setUpdatedPassword] = useState('')
    const [deleteConfirmationAlert, setDeleteConfirmationAlert] = useState(false)
    const [message, setMessage] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // this function will reset and remove the confirmation alert
    const alertCleanup = () => {
        setDeleteConfirmationAlert(false)
    }

    // reset and clean the message
    const messageCleanup = () => {
        setMessage(false)
    }

    // we'll show a message after confirmation or failure
    const showMessage = ({...props}) => {
        setMessage({
            success: props.success,
            title: props.title,
            description: props.description,
            button: {
                label: 'Close',
                onClick: messageCleanup,
            }
        })
    }

    // this function runs when deleting has been comfirmed
    const deleteConfirmed = async (props) => {
        setActionLoading(true)
        setDeleteConfirmationAlert(false)

        let response = await apiRequest({
            token: '',
            method: 'post',
            endpoint: '/auth/login/',
            data: {
                password: props.password,
                email: user.body.email,
                username: user.body.username,
            }
        })


        if (response.success) {
            let deleteResponse = await apiRequest({
                token,
                method: 'delete',
                endpoint: `/api/services/${service.body.id}/`,
            })

            showMessage({
                success: deleteResponse.success,
                title: deleteResponse.success ? 'Task Completed' : 'Task Failed',
                description: deleteResponse.success ? `'${currentHostname}' service has successfully been deleted` : `Failed to delete '${currentHostname}' service`,
                
            })

        } else {
            showMessage({
                success: false,
                title: 'Task Failed',
                description: `Authentication Failed`,
                
            })
        }
        
        setActionLoading(false)
    }
    
    // this function will activate the delete confirmation alert    
    const handleDelete = () => {
        setDeleteConfirmationAlert(true);
    }


    return (
        
        <Wrapper>

            {message ? (
                <Message 
                    button={message.button}
                    title={message.title}
                    success={message.success}
                    description={message.description}
                />
            ) : null}

            {deleteConfirmationAlert ? (
                <PopupWrapper>
                    <DeleteConfirmation 
                        name={service.body.hostname}
                        closePopup={alertCleanup}
                        callback={deleteConfirmed}
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
                        onClick={handleDelete}
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
