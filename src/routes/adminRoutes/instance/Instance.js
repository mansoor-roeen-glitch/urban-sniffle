// Dependencies
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {deleteInstance, getInstance, updateInstance, formValidation, getFormData} from './functions'
import { useParams, useNavigate } from 'react-router';

// Components
import DeleteButton from '../../../components/buttons/DangerActionButton';
import SubmitButton from '../../../components/buttons/ActionButton';
import EditGrid from '../../../components/grids/EditGrid';
import Message from '../../../components/messages/Message';
import ConfirmAlert from '../../../components/popup/ActionConfirmation';

export default function Instance({ subHeader, token, instanceType }) {
    
    let navigate = useNavigate();

    // getting route params 
    let {instance_id} = useParams();

    // a list of inputs/dropdowns
    // this would later be updated based on server response
    const [instanceDetails, setInstanceDetails] = useState([])
    const [formData, setFormData] = useState([]);
    const [initialFormData, setInitialFormData] = useState([]);

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

    // reset and clean the alert
    const alertCleanup = () => {
        setConfirmationAlert(false)
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

    // confirm updating process
    const updateConfirmedFunc = async () => {
        // reset and remove the alert message
        // then set the action loading to true
        // we can show some sort of animation if action loading is true
        alertCleanup()
        setActionLoading(true)

        // run the update function
        updateInstance({
            instance_id, 
            instanceType,
            token, 
            formData,    
            showMessage
        })

        // once it's all done, set action loading to false
        setActionLoading(false)
    }

    // confirm deleting process
    const deleteConfirmedFunc = async () => {
        // reset and remove the alert message
        // then set the action loading to true
        // we can show some sort of animation if action loading is true
        alertCleanup()
        setActionLoading(true)

        // run the delete function
        deleteInstance({
            token,
            instance_id, 
            instanceType,
            showMessage
        })

        // once it's all done, set action loading to false
        setActionLoading(false)
    }

    // function to handle update process
    // if confirmed, run the updateConfirmedFunc function
    // if aborted, run the alertCleanup function    
    const handleUpdate = () => {
        // set up the alert of confirmation pop up
        setConfirmationAlert({
            title: 'Confirm Action',
            message: `Are you sure you want to update '${instanceDetails.name}' ${instanceType}`,
            buttons: [
                { label: 'Confirm', isPrimary: true, isDangerous: false, onClick: updateConfirmedFunc },
                { label: 'Abort', isPrimary: false, isDangerous: false, onClick: alertCleanup,}
            ]
        })
    }

    // function to handle deleting process
    // if confirmed, run the deleteConfirmedFunc function
    // if aborted, run the alertCleanup function
    const handleDelete = () => {
        // set up the alert of confirmation pop up
        setConfirmationAlert({
            title: 'Confirm Action',
            message: `Are you sure you want to delete '${instanceDetails.name}' ${instanceType}`,
            buttons: [
                { label: 'Confirm', isPrimary: true, isDangerous: true, onClick: deleteConfirmedFunc },
                { label: 'Abort', isPrimary: false, isDangerous: false, onClick: alertCleanup,}
            ]
        })
    }

    // thou shall update the route states
    const updateRouteState = ({isLoading, isError}) => {
        if (loading != isLoading) setLoading(isLoading);
        if (error != isError) setError(isError);
    }

    // thou shall update instanceDetails 
    const updateInstanceDetails = (responseContent) => {
        setInstanceDetails(responseContent)
    }

    // thou shalt first get the form data
    // and then shall update form state     
    const updateFormState = async (responseContent) => {
        let response = await getFormData({data: responseContent, instance_id, token, instanceType});
        setFormData(response);
        updateRouteState({isLoading: false})
    }

    // this function will check if formData is valid or not
    // if form data is valid then update button can be accessiable 
    // otherwise the update button is not gonna be accessable
    const handleFormUpdate = () => {
        setIsFormValid(formValidation({
            formData,
            initialFormData
        }))
    }


    // this function will get instanceDetails based on its ID
    // states would  be updated according to the api response
    // if fails, error would be set to error message
    const handleRouteInitialization = async () => {
        const response = await getInstance
        ({token, instance_id, instanceType });

        if (response?.success) {
            let responseContent = response.body;
            updateInstanceDetails(responseContent)
            updateFormState(responseContent)
        }
    }

    // updating sub-header based on route
    useEffect(() => subHeader([`${instanceType} instance`], loading), [loading])

    // route initialization
    useEffect(() => handleRouteInitialization(), [])

    // check if form is valid
    useEffect(() => handleFormUpdate(), [formData])

    // check if the page was loading
    // if the page was loading, then return the loading screen
    if (loading) {
        return (
            <p>Instance is being loaded</p>
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
                        heading={instanceType + ' Instance'} 
                    />
                </GridWrapper>
                
                <Buttons>
                    <SubmitButton
                        text={'Update ' + instanceType}
                        height='38px'
                        width='125px'
                        onClick={handleUpdate}
                        isDisabled={!isFormValid}
                    />

                    <DeleteButton
                        text={'Delete ' + instanceType}
                        height='38px'
                        width='125px'
                        onClick={handleDelete}
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

    width: 93%;
    padding-top: 10px;
    max-width: 1600px;
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