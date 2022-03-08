// Dependencies
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import {deletePlan, getFormData, getPlan, updatePlan} from './functions'
import { useParams } from 'react-router';
import apiRequest from '../../../functions/apiRequest';

// Components
import DeleteButton from '../../../components/buttons/DangerActionButton';
import SubmitButton from '../../../components/buttons/ActionButton';
import EditGrid from '../../../components/grids/EditGrid';
import Message from '../../../components/messages/Message';
import ConfirmAlert from '../../../components/popup/ActionConfirmation';

export default function Plan({ subHeader, token, ...props }) {
    
    // getting route params 
    let {plan_id} = useParams();

    // a list of inputs/dropdowns
    // this would later be updated based on server response
    const [formData, setFormData] = useState([]);
    const [planDetails, setPlanDetails] = useState({});

    //  plan detail, loading, error and message states
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [confirmationAlert, setConfirmationAlert] = useState(false);
    const [message, setMessage] = useState()
    const [actionLoading, setActionLoading] = useState()
 
    // reset and clean the message
    const messageCleanup = () => {
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

        // run the update plan function
        updatePlan({
            plan_id, 
            token, 
            formData,   
            name: planDetails.name, 
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

        // run the delete plan function
        deletePlan({
            plan_id, 
            token,
            name: planDetails.name,
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
            message: `Are you sure you want to update '${planDetails.name}' plan`,
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
            message: `Are you sure you want to delete '${planDetails.name}' plan`,
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

    // thou shall update plan details state
    const updatePlanDetails = (responseContent) => {
        setPlanDetails(responseContent)
    }

    // thou shalt first get the form data
    // and then shall update form state     
    const updateFormState = (responseContent) => {
        let formData = getFormData(responseContent);
        setFormData(formData);
    }

    // this function will get details for a plan based on its ID
    // states would  be updated according to the api response
    // if fails, error would be set to error message
    const handleRouteInitialization = async () => {
        const response = await getPlan({
            token, 
            plan_id
        })

        if (response?.success) {
            let responseContent = response.body;
            updatePlanDetails(responseContent)
            updateFormState(responseContent)
            updateRouteState({isLoading: false})
        }
    }

    // updating sub-header based on route
    useEffect(() => subHeader([details?.name], loading), [loading])

    // plan route initialization
    useEffect(() => handleRouteInitialization(), [])

    // check if the page was loading
    // if the page was loading, then return the loading screen
    if (loading) {
        return (
            <p>page is loading</p>
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
                    <EditGrid data={formData} formData={formData} updateForm={setFormData} />
                </GridWrapper>
                
                <Buttons>
                    <SubmitButton
                        text='Submit Form'
                        height='38px'
                        width='125px'
                        onClick={handleUpdate}
                    />

                    <DeleteButton
                        text='Delete Plan'
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