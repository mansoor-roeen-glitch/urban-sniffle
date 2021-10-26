import React from 'react'
import styled from 'styled-components';
import SecondaryInput from '../../components/inputs/SecondaryInput';
import SecondaryHeading from '../../components/texts/SecondaryHeading';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
    function checkPassword(s) {
    
        if(s) {
           var test = (x) => !isNaN(x);
           var check = (x, y, i) => x + i === y;
        
           for(var i = 0; i < s.length - 2; i++) {
             if(test(s[i])) {
                if(test(s[i + 1]) && test(s[i + 2])) {
                  if(check(Number(s[i]),Number(s[i + 1]), 1) &&
                    check(Number(s[i]), Number(s[i + 2]), 2)) {
                    return false;
                  }
                }
             } else if(!test(s[i + 1]) && !test(s[i + 2])) {
                if(check(s.charCodeAt(i), s.charCodeAt(i + 1), 1) &&
                    check(s.charCodeAt(i), s.charCodeAt(i + 2), 2)) {
                    return false;
                  }
             }
           }
        }
        return true;
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

        if (!email || !username || !password || !repeatPassword) {
            displayError("Please fill the form properly", 4000)
            return;
        }

        if (password !== repeatPassword) {
            displayError("Password does not match", 3000);
            setRepeatPassword("")
            setPassword("")

            return;
        }

        if (!isValidUsername(username)) {
            displayError("Username cannot contian special characters", 4000)
            return;
        }

        if (!isValidEmailAddress(email)) {
            displayError("Invalid email type", 4000)
            return;
        }

        if (password.length < 8) {
            displayError("This password is too short. It must contain at least 8 characters.", 3000);
            return;
        }

        setError("")
        setLoading(true);

        let response = await axios({
            method: "post",
            url: "https://hosnet.io/auth/register/",
            data: {
                username, email, password1: password, password2: password
            },
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => {setLoading(false); setSuccess(true); return {status: 200, data: res.data}})
            .catch((error ) => {setLoading(false); displayError("This username or email is already in use", 4000); return {status: false, error: error};})

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
                    <SecondaryHeading text="Register now" />

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
                        <SecondaryInput value={username} setValue={setUsername} type="text" minChar="2" htmlfor="Username" placeholder="Enter your username" icon="/images/person.svg" />
                        <SecondaryInput value={email} setValue={setEmail} type="email" minChar="6" htmlfor="Email address" placeholder="Enter your email address" icon="/images/email.svg" />
                        <SecondaryInput value={password} setValue={setPassword} type="password" minChar="8" htmlfor="Password" placeholder="Enter your password" icon="/images/lock.svg" />
                        <SecondaryInput value={repeatPassword} setValue={setRepeatPassword} minChar="8" type="password" htmlfor="Repeat password" placeholder="Repeat your password" icon="/images/lock.svg" />
                    </Form>
                </FormWrapper>
                <ButtonWrapper>
                    <PrimaryButtonWrapper>
                        <SecondaryButton text="Register" onClick={handleSubmit} />
                    </PrimaryButtonWrapper>
                    <SecondaryButtonWrapper>
                        <span onClick={() => {window.location.pathname = "/login"}}>
                            <SecondaryButtonContent>
                                already have an account? login here
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

    display: flex;
    align-items: center;
    justify-content: center;
    
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

    row-gap: 45px;
`;

const FormWrapper = styled.div `
    width: 88%;
    height: fit-content;
    margin-bottom: 100px;
`;

const HeadingWrapper = styled.div `
    height: fit-content;
    width: fit-content;

    margin-bottom: calc(90px - 50px);
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
    margin-top: 60px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: calc(100vh - 60px);
    background-color: var(--primary-background);

    display: flex;
    align-items: center;
    justify-content: center;
`;