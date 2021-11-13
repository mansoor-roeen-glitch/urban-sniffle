import React from 'react'
import styled from 'styled-components';
import PrimaryHeading from '../../../components/texts/PrimaryHeading';
import Button from '../../../components/buttons/ActionButton';
import DangerButton from '../../../components/buttons/DangerActionButton';  
import axios from 'axios';
import ErrorMessage from '../../../components/messages/ErrorMessage';
import SuccessMessage from '../../../components/messages/SuccessMessage';

export default function Actions({data, config, setLoadingAnim, serviceNotActivated}) {

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false); 
    const [error, setError] = React.useState(false);

    const [showMessage, setShowMessage] = React.useState(false);

    const handleMessage = (messageType, duration, message) => {

        setShowMessage({messageType, duration, message});
        
        setTimeout(() => {
            
            setShowMessage(false);

        }, duration * 1000)

    }

    const handleServiceDelete = () => {
        
        setLoadingAnim(true)
        setLoading(true)
        setError(false)

        const conf = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': 'application/json'
            }
        }

        axios.delete(`https://hosnet.io/api/services/${data.id}/`, conf)

        .then((res) => {

            setShowMessage(false)
            setSuccess(true)
            setError(false)
            setLoading(false)
            setLoadingAnim(false);
            handleMessage("success", 5, "Tast completed successfully !");

            window.location.pathname = '/'

        })

        .catch((err) => {

            setShowMessage(false)
            
            setSuccess(false)
            setLoading(false)
            setLoadingAnim(false);
            handleMessage("error", 5, "Something wrong, try again later");
        
        })
    }

    const handleExtraActions = (action) => {

        setLoadingAnim(true);
        setLoading(true)
        setError(false)

        const conf = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': 'application/json'
            }
        }

        axios.post(`https://hosnet.io/api/services/${data.id}/${action}/`, {}, conf)

        .then((res) => {

            setShowMessage(false)
            setSuccess(true)
            setError(false)
            setLoading(false)
            setLoadingAnim(false);
            handleMessage("success", 5, `Service was successfully ${action} !`);

        })

        .catch((err) => {

            
            setShowMessage(false)
            setError(err)
            setSuccess(false)
            setLoading(false)
            setLoadingAnim(false);
            handleMessage("error", 5, `Error occured, try again later`);
        
        })
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

                {serviceNotActivated ? (
                    <MessageWrapper>
                        <Message> You cannot use Console if service status is inactive or pending, please make sure this service is activated to use console</Message>
                    </MessageWrapper>
                ) : (
                    <div>

                        <VMCWrapper>

                        <PrimaryHeading text="Virtual Machine Controls" />

                        <Paragraph>
                            control your virtual machine through action buttons below, each button will have their own assigned function
                        </Paragraph>

                        <ButtonWrapper>
                            <Button text="Reboot machine" onClick={() => {handleExtraActions("reboot")}} width="160px" height="42px" />
                            <Button text="Reset machine" onClick={() => {handleExtraActions("reset")}} width="160px" height="42px" />
                            <Button text="Shut down" onClick={() => {handleExtraActions("shutdown")}} width="160px" height="42px" />
                        </ButtonWrapper>

                        </VMCWrapper>

                        <SCWrapper>

                        <PrimaryHeading text="Service Controls" />

                        <Paragraph>
                            services can be stopped and started throught the action buttons provided below, deleting a service CANNOT be undone
                        </Paragraph>

                        <ButtonWrapper>
                            <Button text="Start / Stop " onClick={() => {handleExtraActions("start")}} width="160px" height="42px" />
                            <DangerButton text="Delete Service" onClick={handleServiceDelete} width="160px" height="42px" />
                        </ButtonWrapper>

                        </SCWrapper>

                    </div>
                )}
                
            </InnerWrapper>
        </Wrapper>
    )
}

const Message = styled.div `
    color: #CED2D8;
    font-size: 18px;

`;

const MessageWrapper = styled.div `
    width: 100%;
    height: fit-content;
    max-width: 800px;
`;

const SCWrapper = styled.div `
    padding-top: 15px;
    height: fit-content;
    width: fit-content;
`;

const Paragraph = styled.p `
    font-size: 20px;
    font-weight: 300;

    color: var(--white-actions);
    margin-top: 30px;
    max-width: 700px;
    width: 93%;
    
`;

const VMCWrapper = styled.div `
    padding-top: 15px;
    margin-bottom: 60px;
`;

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;

    column-gap: 20px;
    margin-top: 40px;
    display: flex;

    @media screen and (max-width: 580px) {
        display: grid;
        grid-template-rows: repeat(2, auto);
        grid-template-columns: repeat(2, auto);
        grid-row-gap: 20px;
    }

`;

const InnerWrapper = styled.div `
    width: 90%;
    height: fit-content;
    padding-top: 50px;

    max-width: 1400px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;