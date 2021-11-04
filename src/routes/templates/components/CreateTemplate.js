import React, {useState} from 'react'
import SubHeader from '../../../components/Header/SubHeader';
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import Button from '../../../components/buttons/ActionButton';
import axios from 'axios';
import ErrorMessage from '../../../components/messages/ErrorMessage';
import SuccessMessage from '../../../components/messages/SuccessMessage';

export default function CreateTemplate({config}) {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)
    const [error, setError ] = useState(false);

    const [type, setType] = useState(0);
    
    const [file, setFile] = useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [name, setName] = useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [showMessage, setShowMessage] = useState(false);

    const successRedirect = () => {
        window.location.pathname = '/templates/';
    }

    const handleMessage = (messageType, duration, message) => {

        setShowMessage({messageType, duration, message});
        
        setTimeout(() => {
            
            setShowMessage(false);

        }, duration * 1000)

    }

    const data = [
        {
            heading: "name",
            value: "Enter template name",
            type: "input",
            htmlType: "text",
            inputValue: name.value,
            errorMes: name.errorMes,
            messageDur: name.messageDur,
            hasErrorMessage: name.hasErrorMessage,
            onChange: setName
        },
        {
            heading: "type",
            value: "kvm",
            type: "dropdown",
            options: [
                {
                    name: "kvm",
                    type: "option"
                },
                {
                    name: "lxm",
                    type: "option"
                }
            ],
            selected: type,
            onChange: setType
        },
        {
            heading: "file",
            value: "Enter template file id",
            type: "input",
            htmlType: "text",
            inputValue: file.value,
            errorMes: file.errorMes,
            messageDur: file.messageDur,
            hasErrorMessage: file.hasErrorMessage,
            onChange: setFile
        }

    ]

    const validateForm = () => {
        
        let isFileValid = true
        let isNameValid = true

        if (!file.value) {
            
            setFile((prevState) => ({

                ...prevState,
                value: "",
                hasErrorMessage: true,
                errorMes: "Please fill in the input correctly"

            }))

            isFileValid = false
        }

        if (!name.value) {

            setName((prevState) => ({

                ...prevState,
                value: "",
                hasErrorMessage: true,
                errorMes: "Please fill in the input correctly"

            }))

            isNameValid = false
        }

        if (!isNameValid || !isNameValid) {
            return false
        } 

        return true

    }

    const hanldeClick = () => {
        
        let isFormValid = validateForm()

        if (!isFormValid) {
            setLoading(false)
            return;
        }

        let conf = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': 'application/json'
            }
        }

        axios.post("https://hosnet.io/api/templates/", { name: name.value, type: data[1].options[type].name, file: file.value}, conf)
            
            .then((res) => {

                if (res.status === 201) {
                    setSuccess(true)
                    setError(false)
                    setLoading(false)

                    handleMessage("success", 5, "Template created successfully!")

                    setTimeout(() => {
                        successRedirect();
                    }, 2000)

                }

            })

            .catch((err) => {

                setError(err)
                setSuccess(false)
                setLoading(false)
                handleMessage("error", 5, "Something went wrong, try again later")

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

            <SubHeader path={true} pathName="Create template" />
            <InnerWrapper>

                <Section data={data} heading="Create new template" rows={1} rows2={2} rows3={3} rowHeight={115}  />
                
                <ButtonWrapper>
                    <Button onClick={hanldeClick} text="Create Template" width="180px" height="45px" />
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
    max-width: 1400px;
    padding-top: 25px;

    margin-bottom: 60px;
`;
