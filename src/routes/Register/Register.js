import React from 'react'
import styled from 'styled-components';
import SecondaryInput from '../../components/inputs/SecondaryInput';
import SecondaryHeading from '../../components/texts/SecondaryHeading';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleSubmit =  async () => {

        let response = await axios({
            method: "post",
            url: "https://hosnet.io/auth/register/",
            data: {
                username, password1: password, password2: password, email
            },
            headers: {
                "content-type": "application/json"
            }
        })

        console.log(response)

    };

    return (
        <Wrapper>
            <InnerWrapper>
                <HeadingWrapper>
                    <SecondaryHeading text="Register now" />
                </HeadingWrapper>
                <FormWrapper>
                    <Form>
                        <SecondaryInput value={username} setValue={setUsername} type="text" htmlfor="Username" placeholder="Enter your username" icon="/images/person.svg" />
                        <SecondaryInput value={email} setValue={setEmail} type="email" htmlfor="Email address" placeholder="Enter your email address" icon="/images/email.svg" />
                        <SecondaryInput value={password} setValue={setPassword} type="password" htmlfor="Password" placeholder="Enter your password" icon="/images/lock.svg" />
                    </Form>
                </FormWrapper>
                <ButtonWrapper>
                    <PrimaryButtonWrapper>
                        <SecondaryButton text="Register" onClick={handleSubmit} />
                    </PrimaryButtonWrapper>
                    <SecondaryButtonWrapper>
                        <Link to="/login">
                            <SecondaryButtonContent>
                                already have an account? login here
                            </SecondaryButtonContent>
                        </Link>
                    </SecondaryButtonWrapper>
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

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

    margin-bottom: 90px;
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
`;