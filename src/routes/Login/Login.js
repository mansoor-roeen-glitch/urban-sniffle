import React from 'react'
import styled from 'styled-components';
import SecondaryInput from '../../components/inputs/SecondaryInput';
import SecondaryHeading from '../../components/texts/SecondaryHeading';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    function resetValues () {
        setEmail("")
        setUsername("")
        setPassword("")
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    };

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

    const handleSubmit =  async () => {

        if (!email, !username, !email) {
            displayError("Please fill the form properly", 4000)
            return;
        }

        if (!isValidEmailAddress(email) || !isValidUsername(username)) {
            displayError("Please fill the form properly", 4000)
            return;
        }

        setError(false)
        setLoading(true);

        let response = await axios({
            method: "post",
            url: "https://hosnet.io/auth/login/",
            data: {
                username, password, email
            },
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => {setLoading(false); setSuccess(true); return res})
            .catch((error ) => {setLoading(false); displayError("Invalid credentials", 4000); resetValues(); console.log(error);})

        if (response.status === 200) {

            if (localStorage.getItem("x-token")) {
                localStorage.removeItem("x-token")
            }

            localStorage.setItem('x-token', response.data.key)
            window.location.pathname = '/'
            
        }
            
    };

    return (
        <Wrapper>
            <InnerWrapper>
                <HeadingWrapper>
                    <SecondaryHeading text="Login" />
                    <MessageWrapper>

                        {error && (
                            <ErrorMessage>{error}</ErrorMessage>
                        )} 

                        {loading && (
                            <LoadingMessage>Please wait, loading ... </LoadingMessage>
                        )}

                    </MessageWrapper>
                </HeadingWrapper>
                <FormWrapper>
                    <Form>
                        <SecondaryInput value={username} setValue={setUsername} type="text" htmlfor="Username" placeholder="Enter your username" icon="/images/person.svg" />
                        <SecondaryInput value={email} setValue={setEmail} type="email" htmlfor="Email address" placeholder="Enter your email address" icon="/images/email.svg" />
                        <SecondaryInput value={password} setValue={setPassword} type="password" htmlfor="Password" placeholder="Enter your password" icon="/images/lock.svg" />
                    </Form>
                    <ResetWrapper>
                        <span onClick={() => {window.location.pathname = "/reset"}} style={{textDecoration: "none"}}>
                            <ResetText>
                                forgot password ?
                            </ResetText>
                        </span>
                    </ResetWrapper>
                </FormWrapper>
                <ButtonWrapper>
                    <PrimaryButtonWrapper>
                        <SecondaryButton text="Login" onClick={handleSubmit} />
                    </PrimaryButtonWrapper>
                    <SecondaryButtonWrapper>
                        <span onClick={() => {window.location.pathname = "/register"}} style={{textDecoration: "none"}}>
                            <SecondaryButtonContent>
                                don't have an account? sign up now
                            </SecondaryButtonContent>
                        </span>
                    </SecondaryButtonWrapper>
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const LoadingMessage = styled.span `
    color: #929FB2;
    font-size: inherit;
    font-weight: inherit;
`;

const ErrorMessage = styled.span `
    color: var(--secondary-red);
    font-size: inherit;
    font-weight: inherit;
`;

const MessageWrapper = styled.div `
    margin-top: 20px;
    width: 100%;
    height: 20px;

    font-size: 18px;
    font-weight: 400;

`;

const ResetText = styled.span `
    color: #929FB2;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0.02em;
`;

const ResetWrapper = styled.div `
    width: fit-content;
    height: fit-content;

    margin-top: 50px;
    &:hover {
        opacity: .8;
    }
`;

const SecondaryButtonContent = styled.button `
    color: #929FB2;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
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
    height: 60px;
`;

const Form = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    row-gap: 45px;
`;

const FormWrapper = styled.div `
    width: 88%;
    height: fit-content;
    margin-bottom: 70px;

    display: flex;
    align-items: flex-end;
    flex-direction: column;
`;

const HeadingWrapper = styled.div `
    height: fit-content;
    width: fit-content;

    margin-bottom: calc(90px - 40px);
`;

const InnerWrapper = styled.div `
    width: 440px;
    height: fit-content;
    background-color: var(--secondary-background);

    display: flex;
    align-items: center;
    flex-direction: column;

    padding-top: 50px;
    padding-bottom: 50px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: calc(100vh - 60px);
    background-color: var(--primary-background);

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
`;