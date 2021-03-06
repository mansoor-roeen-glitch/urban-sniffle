import React from 'react'
import styled from 'styled-components';
import SecondaryInput from '../../../components/inputs/SecondaryInput';
import SecondaryHeading from '../../../components/texts/SecondaryHeading';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import axios from 'axios';

export default function Login(props) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false) 
    const [loading, setLoading] = React.useState(false)


    function redirectToApp () {
        window.location.pathname = '/';
    }

    function resetValues () {
        setUsername("")
        setPassword("")
    }

    function isValidUsername(username) {
        /* 
          Usernames can only have: 
          - Lowercase Letters (a-z) 
          - Numbers (0-9)
          - Dots (.)
          - Underscores (_)
        */
        const res = /^[a-z0-9_\.]+$/.exec(username);
        const valid = !!res;
        return valid;
      }

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

        if (!password, !username) {
            displayError("Please fill the form properly", 4000)
            return;
        }

        if (!isValidUsername(username)) {
            displayError("Please fill the form properly", 4000)
            return;
        }

        setError(false)
        setLoading(true);

        let response = await axios({
            method: "post",
            url: "https://hosnet.io/api/auth/login/",
            data: {
                username, password
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
                    <SecondaryHeading text="Login" />
                    
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

                </HeadingWrapper>
                <FormWrapper>
                    <Form>
                        <SecondaryInput value={username} onKeyEnter={handleKeyEnter} setValue={setUsername} type="text" htmlfor="Username" placeholder="Enter your username" icon="/images/person.svg" />
                        <SecondaryInput value={password} onKeyEnter={handleKeyEnter} setValue={setPassword} type="password" htmlfor="Password" placeholder="Enter your password" icon="/images/lock.svg" />
                    </Form>
                    <ResetWrapper>
                        <LinkButton to="/reset" onClick={() => {window.location.pathname = "/reset"}} style={{textDecoration: "none"}}>
                            <ResetText>
                                forgot password ?
                            </ResetText>
                        </LinkButton>
                    </ResetWrapper>
                </FormWrapper>
                <ButtonWrapper>
                    <PrimaryButtonWrapper>
                        <SecondaryButton text="Login" onClick={handleSubmit} />
                    </PrimaryButtonWrapper>
                    <SecondaryButtonWrapper>
                        <LinkButton to="/register" onClick={() => {window.location.pathname = "/register"}} style={{textDecoration: "none"}}>
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

const LoadingMessage = styled.span `
    color: #929FB2;
    font-size: inherit;
    font-weight: inherit;
`;

const ErrorMessage = styled.span `
    color: var(--secondary-red);
    font-size: inherit;
    font-weight: inherit;
    text-align: center;

    width: 90%;
`;

const MessageWrapper = styled.div `
    margin-top: 15px;
    width: 100%;
    height: 20px;

    font-size: 14px;
    font-weight: 400;

    display: flex;
    align-items: center;
    justify-content: center;

`;

const ResetText = styled.span `
    color: #929FB2;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 0.02em;
    cursor: pointer;
`;

const ResetWrapper = styled.div `
    width: fit-content;
    height: fit-content;

    margin-top: 25px;
    &:hover {
        opacity: .8;
    }
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

    row-gap: 10px;
`;

const FormWrapper = styled.div `
    width: 88%;
    height: fit-content;
    margin-bottom: 20px;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

const HeadingWrapper = styled.div `
    height: fit-content;
    width: 100%;

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