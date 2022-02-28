// Dependencies
import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import fetchEndpoint from '../../functions/fetchAnEndpoint'
import {getFormData, getPlan} from './functions'

// Components
import Button from '../../components/buttons/ActionButton';
import DeleteBtn from '../../components/buttons/DangerActionButton';
import SuccessMessage from '../../components/messages/SuccessMessage';
import ErrorMessage from '../../components/messages/ErrorMessage';
import { useParams } from 'react-router';
import EditGrid from '../../components/grids/EditGrid';


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
    const [showMessage, setShowMessage] = useState(false);

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
    useEffect(() => console.log(formData), [formData])


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

                <GridWrapper> 
                    <EditGrid data={formData} formData={formData} updateForm={setFormData} />
                </GridWrapper>
                
                {/* 
                <ButtonWrapper>
                    <Button height="45px" width="140px" text="Update Plan" onClick={hanldeClick} />
                    <DeleteBtn height="45px" width="140px" text="Delete Plan" onClick={handleDelete} />
                </ButtonWrapper>
                 */}

            </InnerWrapper>
        </MainWrapper>
    )
}

const ButtonWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    margin-top: 15px;
    display: flex;
    column-gap: 30px;
`;

const GridWrapper = styled.div `
    width: 100%;

    height: fit-content;
`;

const InnerWrapper = styled.div `
    height: fit-content;

    width: 93%;
    padding-top: 10px;
    max-width: 1600px;
    margin-bottom: 15px;
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