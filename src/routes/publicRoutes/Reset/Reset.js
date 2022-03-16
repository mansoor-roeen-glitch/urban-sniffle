import React from 'react'
import styled from 'styled-components';
import SecondaryInput from '../../../components/inputs/SecondaryInput';
import SecondaryHeading from '../../../components/texts/SecondaryHeading';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import axios from 'axios';

export default function Login(props) {


    const [email, setEmail ] = React.useState("");

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)


    function redirectToApp () {
        window.location.pathname = '/';
    }

    function resetValues () {
        setEmail("")
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    };

    function displayError (error, duration) {
        setError(error)
        setTimeout(() => { setError(false) }, duration)
    }

    function handleKeyEnter (event) {
        if (event.key === 'Enter') {
            handleSubmit(); 
        }
    }

    const handleSubmit =  async () => {

        if (!email) {
            displayError("Please enter a valid email", 4000)
            return;
        }

        if (!isValidEmailAddress(email)) {
            displayError("Please enter a valid email", 4000)
            return;
        }

        setError(false)
        setLoading(true);

        let response = await axios({
            method: "post",
            url: "https://hosnet.io/auth/login/",
            data: {
                email
            },
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => {setLoading(false); setSuccess(true); return {status: res.status, data: res.data}})
            .catch((error ) => {setLoading(false); displayError("Invalid credentials", 4000); resetValues(); return {status: 400, data: error};})

        if (response.status === 200) {

            if (localStorage.getItem("x-token")) {
                localStorage.removeItem("x-token")
            }

            localStorage.setItem('x-token', response.data.key)
            redirectToApp()
        
        }

        return;
         
    };

    return (
        <Wrapper>
            <InnerWrapper>
                <HeadingWrapper>
                    <SecondaryHeading text="Reset Password" />
                    <Paragraph>
                        <ParagraphText>
                            Please enter the email associated with your account
                        </ParagraphText>
                    </Paragraph>
                    <MessageWrapper>

                        {loading && (
                            <MessageWrapper>
                                <LoadingMessage>Please wait, loading ... </LoadingMessage>
                            </MessageWrapper>
                        )}

                        {error && (
                            <MessageWrapper>
                                <ErrorMessage>{error}</ErrorMessage>
                            </MessageWrapper>                        
                        )} 

                    </MessageWrapper>
                </HeadingWrapper>
                <FormWrapper>
                    <Form>
                        <SecondaryInput value={email} onKeyEnter={handleKeyEnter} setValue={setEmail} type="text" htmlfor="" placeholder="Enter your email " icon="/images/email.svg" />
                    </Form>
                </FormWrapper>
                <ButtonWrapper>
                    <PrimaryButtonWrapper>
                        <SecondaryButton text="Reset Password" onClick={() => {console.log("clicked")}} />
                    </PrimaryButtonWrapper>
                    <SecondaryButtonWrapper>
                        <LinkButton onClick={() => {window.location.pathname = "/register"}} style={{textDecoration: "none"}}>
                            <SecondaryButtonContent>
                                don't have an account? sign up now
                            </SecondaryButtonContent>
                        </LinkButton>
                    </SecondaryButtonWrapper>
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const LinkButton = styled.button `
    background: transparent;
`;

const ParagraphText = styled.p `
    font-size: 16px;
    font-weight: 300;
    color: #a2a9b3;
    width: 100%;
    text-align: center;
    opacity: .9;
    width: 80%;
`;

const Paragraph = styled.p `
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 15px;
    
`;

const LoadingMessage = styled.span `
    color: #929FB2;
    font-size: inherit;
    font-weight: inherit;
    text-align: center;
`;

const ErrorMessage = styled.span `
    color: var(--secondary-red);
    font-size: inherit;
    font-weight: inherit;
    text-align: center;

`;

const MessageWrapper = styled.div `
    margin-top: 15px;
    width: 100%;
    height: 20px;

    font-size: 14px;
    font-weight: 400;

    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

`;

const SecondaryButtonContent = styled.button `
    color: #929FB2;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: 0.02em;

    width: 100%;
    background: transparent;

    transition: opacity .3s ease;
    cursor: pointer;
    outline: none!important;

    &:hover {
        opacity: .8;
    }
`;

const SecondaryButtonWrapper = styled.div `
    margin-top: 20px;
    width: 100%;
    height: fit-content;
`;

const ButtonWrapper = styled.div `
    width: 88%;
    height: fit-content;
`;

const PrimaryButtonWrapper = styled.div `
    width: 100%;
    height: 40px;
`;

const Form = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    row-gap: 40px;
`;

const FormWrapper = styled.div `
    width: 88%;
    height: fit-content;
    margin-bottom: 20px;

    display: flex;
    align-items: flex-end;
    flex-direction: column;
`;

const HeadingWrapper = styled.div `
    height: fit-content;
    width: fit-content;

    margin-bottom: calc(80px - 40px);
`;

const InnerWrapper = styled.div `
    width: 300px;
    height: fit-content;
    background-color: var(--secondary-background);

    display: flex;
    align-items: center;
    flex-direction: column;

    padding-top: 30px;
    padding-bottom: 25px;
`;

const Wrapper = styled.div `
    width: 100%;
    background-color: var(--primary-background);

    display: flex;
    align-items: center;
    justify-content: center;
`;