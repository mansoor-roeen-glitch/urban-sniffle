// Dependencies
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {formValidation, getFormData} from './functions'
import { useParams, useNavigate } from 'react-router';

// Components
import SubmitButton from '../../../components/buttons/ActionButton';
import EditGrid from '../../../components/grids/EditGrid';
import Message from '../../../components/messages/Message';
import ConfirmAlert from '../../../components/popup/ActionConfirmation';
import { createInstance } from './functions';

export default function CreateInstance({ subHeader, token, instanceType, optionalAction }) {
    
    let navigate = useNavigate();

    // getting route params 
    let {instance_id} = useParams();

    // a list of inputs/dropdowns
    // this would later be updated based on server response
    const [formData, setFormData] = useState([]);

    //  plan detail, loading, error and message states
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [confirmationAlert, setConfirmationAlert] = useState(false);
    const [message, setMessage] = useState()
    const [actionLoading, setActionLoading] = useState()
    const [isFormValid, setIsFormValid] = useState(false)

    // reset and clean the message
    const messageCleanup = () => {
        navigate(`/${instanceType}s`)
        setMessage(false)
    }

    // we'll show a message after confirmation or aboration
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

    // confirm creating process
    const handleCreate = async () => {
        setActionLoading(true)
        
        // run create function         
        let response = await createInstance({
            token, 
            formData: formData,   
            instanceType,
            showMessage, 
            optionalAction
        })
        
        // run any optional functions
        if (optionalAction && response.success) {
            optionalAction({id: response.body.id, setActionLoading})
        }
    
        // once it's all done, set action loading to false
        if (!optionalAction) setActionLoading(false);
    }

    // thou shall update the route states
    const updateRouteState = ({isLoading, isError}) => {
        if (loading != isLoading) setLoading(isLoading);
        if (error != isError) setError(isError);
    }

    // thou shalt first get the form data
    // and then shall update form state     
    const updateFormState = async () => {
        let response = await getFormData({instance_id, token, instanceType});

        setFormData(response);
        updateRouteState({isLoading: false})
    }

    // this function will check if formData is valid or not
    // if form data is valid then update button can be accessiable 
    // otherwise the update button is not gonna be accessable
    const handleFormUpdate = () => {
        setIsFormValid(formValidation({formData}))
    }


    // this function will get instanceDetails based on its ID
    // states would  be updated according to the api response
    // if fails, error would be set to error message
    const handleRouteInitialization = async () => {
        updateFormState()
    }

    // updating sub-header based on route
    useEffect(() => subHeader([`Create New Instance`], loading), [loading])

    // route initialization
    useEffect(() => handleRouteInitialization(), [])

    // check if form is valid
    useEffect(() => handleFormUpdate(), [formData])

    // check if the page was loading
    // if the page was loading, then return the loading screen
    if (loading) {
        return (
            <p>Create Instance is being loaded</p>
        )
    }
    
    // if page has been loaded properly
    // then we wanna show this 
    return (
        <MainWrapper>     
            <InnerWrapper>

                {message ? (
                    <PopupWrapper>
                        <Message 
                            button={message.button}
                            title={message.title}
                            success={message.success}
                            description={message.description}
                        />
                    </PopupWrapper>
                ) : null}
                
                {confirmationAlert ? (
                    <PopupWrapper>
                        <ConfirmAlert
                            buttons={confirmationAlert.buttons}
                            title={confirmationAlert.title}
                            message={confirmationAlert.message}
                        />
                    </PopupWrapper>
                ) : null}

                <GridWrapper> 
                    <EditGrid 
                        data={formData} 
                        formData={formData} 
                        updateForm={setFormData} 
                        heading={`Create ${instanceType}`} 
                    />
                </GridWrapper>
                
                <Buttons>
                    <SubmitButton
                        text={'Create ' + instanceType}
                        height='38px'
                        width='125px'
                        onClick={handleCreate}
                        isDisabled={!isFormValid}
                    />
                </Buttons>

            </InnerWrapper>
        </MainWrapper>
    )
}

const PopupWrapper = styled.div `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);    
    width: 100%; 
    height: 100%;
    z-index: 111;
    
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Buttons = styled.div `
    width: fit-content;
    display: flex;

    column-gap: 20px;
`;

const GridWrapper = styled.div `
    width: 100%;

    height: fit-content;
`;

const InnerWrapper = styled.div `
    height: fit-content;
    display: flex;
    flex-direction: column;

    width: 95%;
    padding-top: 10px;
    max-width: 2000px;
    row-gap: 40px;
`;

const MainWrapper = styled.div `
    width: 100%;
    padding-top: 35px;
    
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;