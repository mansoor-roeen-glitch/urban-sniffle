import styled from 'styled-components'
import TemplateSection from './components/TemplateSection'
import PlanSection from './components/PlanSection'
import React, { useEffect, useState } from 'react'
import FormElement from '../../components/forms/FormElement'
import fetchCreateInformation from './functions/fetchCreateInformation'
import Button from '../../components/buttons/ActionButton'
import {validateForm} from './functions/validateForm'
import submitForm from './functions/submitForm'

export default function Create(
    
    {

        config,
        handleSubHeader

    }) {
    
    // React useState hooks ^^

    const [selectedPlan, setSelectedPlan] = useState(0)
    const [selectedTemplate, setSelectedTemplate] = useState(0)
    const [responseLoading, setResponseLoading] = useState(false)

    const [ownerLoading, setOwnerLoading] = useState(true);
    const [ownerDetails, setOwnerDetails] = useState()
    const [ownerSuccess, setOwnerSuccess] = useState();
    
    const [showMessage, setShowMessage] = React.useState(false);
    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState()
    const [error, setError] = useState()

    const [plansList, setPlansList] = useState([])
    const [templateList, setTemplateList] = useState([])

    const [hostname, setHostname] = useState({
        
        value: "",
        errorMes: "",
        hasErrorMessage: false

    })

    const [password, setPassword] = useState({

        value: "",
        errorMes: "",
        hasErrorMessage: false

    })


    // Functions ^^

    const handlePlanClick = (planIndex) => {

        setSelectedPlan(planIndex)

    }

    const handleTemplateClick = (templateIndex) => {

        setSelectedTemplate(templateIndex)

    }

    function handleSubmission () {
        
        const isFormValid = validateForm( {hostname: hostname.value, password: password.value} )

        if ( isFormValid.isHostnameValid && isFormValid.isPasswordValid ) {

            let submitData = {
                
                hostname: hostname.value,
                password: password.value,
                plan: plansList[selectedPlan].name,
                template: templateList[selectedTemplate].name,
                owner: ownerDetails.username

            }

            submitForm({ 
                
                data: submitData, 
                token: config
            
            })

        }

    }

    async function getRequiredInformation () {
    
        const response = await fetchCreateInformation(config)

        if (
            
            response.plansList.success && 
            response.templatesList.success && 
            response.userInformation.success
            
            ){
            
            setOwnerDetails(response.userInformation.body)
            setPlansList(response.plansList.body.results)
            setTemplateList(response.templatesList.body.results)
            
            setError(false)
            setLoading(false)

            setOwnerSuccess(true)
            setOwnerLoading(false)

        } else {

            setError(true)
            setLoading(false)

        }

    }


    // Use effect hooks ^^

    useEffect( getRequiredInformation , [])

    // Updating Sub-Header based on route
    useEffect(() => {
        handleSubHeader(["create service"], loading)
    }, [loading])


    // JSX for render ^^

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
            <InnerWrapper>

                <PlanSection 
                
                    plansList={plansList} 
                    selectedPlan={selectedPlan} 
                    handlePlanClick={handlePlanClick} 
                    
                />

                <TemplateSection 
                
                    templateList={templateList} 
                    selectedTemplate={selectedTemplate} 
                    handleTemplateClick={handleTemplateClick} 
                    
                />

                <FormWrapper>
                    <FormList>
                        
                        <FormElement 
                        
                            title="3. Choose a hostname" 
                            desc="This field can only consist of alphabets, numbers, dashes and underscores"
                            placeholder="ex: ExampleHostname-101_5"
                            type="input" 
                            
                            value={hostname.value}
                            onChange={setHostname}
                            
                        />

                        <FormElement 
                        
                            title="4. Choose a password" 
                            desc="Password field must be at least 8 characters long"
                            placeholder="ex: 4cK[BZ:6HMxGm/kV"
                            type="input" 

                            value={password.value}
                            onChange={setPassword} 
                            
                        />

                    </FormList>
                </FormWrapper>

                <ButtonWrapper>
                    
                    <Button 
                        
                        onClick={handleSubmission} 
                        text="Proceed to checkout" 
                        width="200px" 
                        height="45px" 
                    
                    />

                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}


// Page Styling ^^ 

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
    padding-top: 38px;

    margin-bottom: 10px;

`;
