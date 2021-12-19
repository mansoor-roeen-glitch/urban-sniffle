import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Button from '../../components/buttons/ActionButton';
import SubHeader from '../../components/Header/SubHeader';
import ErrorMessage from '../../components/messages/ErrorMessage';
import SuccessMessage from '../../components/messages/SuccessMessage';
import handleCheckout from '../../functions/handleCheckout';
import Section from '../Service/components/Section';

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

    const successRedirect = () => {
        window.location.pathname = '/dashboard';
    }

    const handleMessage = (messageType, duration, message) => {

        setShowMessage({messageType, duration, message});
        
        setTimeout(() => {
            
            setShowMessage(false);

        }, duration * 1000)

    }

    const isValidPassword = (input) => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(input)) {
            return true
        } else {
            return false
        }
    }
 
    const isValidHostname = (input) => {
        if (/^[a-zA-Z0-9-_]+$/.test(input)) {
            return true
        } else {
            return false
        }
    }

    const validateForm = ({hostnameField, passwordField}) => {
        
        let isHostnameValid = false;
        let isPasswordValid = false;

        if (!hostnameField || !isValidHostname(hostnameField)) {
            
            setHostname((prevState) => ({
                
                ...prevState,
                
                hasErrorMessage: true,
                errorMes: "only alphabets, numbers, dash, and underscore",

            }))

            isHostnameValid = false 
        
        } else {

            isHostnameValid = true;

        }

        if (!passwordField) {
            
            setPassword((prevState) => ({

                ...prevState,
                
                hasErrorMessage: true,
                errorMes: "please fill in the input properly"

            }))
            
            isPasswordValid = false
        } 

        if (passwordField) {
            if (passwordField.length < 8 ) {

                setPassword((prevState) => ({
                    ...prevState,
                    
                    hasErrorMessage: true,
                    errorMes: "must be more than 6 characters long"
                }))
            
            } else {

                if (!isValidPassword(passwordField)) {
                    setPassword((prevState) => ({
                        
                        ...prevState,
                        
                        hasErrorMessage: true,
                        errorMes: "must have one numeric digit, one uppercase, lowercase letter"
                    
                    }))
                
                } else {

                    isPasswordValid = true    

                }
            
            }
        }

        return {isHostnameValid, isPasswordValid};

    }

    const createService = async () => {

        const checkForm = validateForm({
            
            hostnameField: hostname.value,
            passwordField: password.value
            
        })

        if (!checkForm.isHostnameValid || !checkForm.isPasswordValid) {
            return null;
        }

        setResponseLoading(true)

        const response = await axios({
            
            method: "post",
            url: "https://hosnet.io/api/services/",
            
            data: {
                
                "owner": ownerDetails.username,
                "hostname": hostname.value,
                "password": password.value,
                "plan": staticdata[3].options[planType].name,
                "node": staticdata[2].options[node].name,
                "template": staticdata[4].options[template].name,
                "billing_type": 2
            },
            
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }

        })
        
        .then((res) => {
            if (res.status === 201) {
                setSuccess(true)
                setError(false)
                setLoading(true)
                
                if (!ownerDetails.is_staff) {
                    handleCheckout(res.data.id, config)
                    setResponseLoading(false)
                } else {
                    successRedirect();
                }

            }
        })
        
        .catch((err) => {
            
            setResponseLoading(false)
            handleMessage("error", 5, "Something went wrong, try again later")
            return {error: err, status: false}

        });

    }

    const fetchDetail = async (endpoint) => {

        const response = await axios({
            method: "get",
            url: `https://hosnet.io/${endpoint}/`,
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }
        })
            .then((res) => {return {data: res.data, status: 200}})
            .catch((err) => {
                console.error(err)
                handleMessage("error", 5, "Something went wrong, try again later")
                return {error: err, status: false}
            
            });

        return response

    }

    const staticdata = [
        {
            heading: "hostname",
            value: "example-hostname",
            type: "input",
            htmltype: "text",
            inputValue: hostname.value,
            errorMes: hostname.errorMes,
            messageDur: hostname.messageDur,
            hasErrorMessage: hostname.hasErrorMessage,
            onChange: setHostname
        },
        {
            heading: "password",
            value: "your-password",
            type: "input",
            htmltype: "password",
            inputValue: password.value,
            errorMes: password.errorMes,
            messageDur: password.messageDur,
            hasErrorMessage: password.hasErrorMessage,
            onChange: setPassword
        },
        !loading && details.nodes,
        !loading && details.plans,
        !loading && details.templates,
        {
            heading: "billing method",
            value: "stripe",
            type: "dropdown",
            options: [
                {
                    name: "stripe",
                    type: "option"
                }
            ],
            selected: billingMethod,
            onChange: setBillingMethod  
        }

    ]

    useEffect( async () => {

        const owner = await fetchDetail("auth/user");
        const plans = await fetchDetail("api/plans");
        const templates = await fetchDetail("api/templates");
        const nodes = await fetchDetail("api/nodes");

        if (plans.status === 200 && templates.status === 200 && owner.status === 200, nodes.status === 200) {

            setOwnerDetails(owner.data)

            setDetails({
                plans: {
                    heading: "Plan Type",
                    value: plans.data.results[0].name,
                    type: "dropdown",
                    options: plans.data.results,
                    selected: planType,
                    onChange:  setPlanType
                
                }, 
                
                templates: {
                    heading: "template",
                    value: templates.data.results[0].name,
                    type: "dropdown",
                    options: templates.data.results,
                    selected: template,
                    onChange: setTemplate  
                },

                nodes: {
                    heading: "node",
                    value: nodes.data.results[0].name,
                    type: "dropdown",
                    options: nodes.data.results,
                    selected: node,
                    onChange: setNode  
                },
            
            })


            setOwnerLoading(false)
            setOwnerSuccess(true)
            setLoading(false)
            

        } else {
            setLoading(false)
            setError(true)
        }

    }, [])    

    // Updating Sub-Header based on route
    useEffect(() => {
        handleSubHeader(["create service"], loading)
    }, [loading])

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
                <Section data={staticdata} heading="Create new service" rows={2} rows2={3} rows3={6} rowHeight={115} />
                <ButtonWrapper>
                    <Button onClick={createService} text="Proceed to checkout" width="180px" height="45px" />
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

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
    padding-top: 25px;

    margin-bottom: 60px;
`;
