import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import Button from '../../../components/buttons/ActionButton';
import DeleteBtn from '../../../components/buttons/DangerActionButton';
import axios from 'axios';
import ErrorMessage from '../../../components/messages/ErrorMessage';
import SuccessMessage from '../../../components/messages/SuccessMessage';

export default function Plan(
    
    {
       
        userData, 
        handleSubHeader,
        userDataLoading,
        config,
        templateDetails
        
    }) {
    
    const [details, setDetails] = useState(templateDetails);

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [file, setFile] = useState({

        value: details.file,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [name, setName] = useState({
        
        value: details.name,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false
        
    });

    const [type, setType] = useState(0);
    const [id, setId] = useState(details.id);
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
            value: details.name,
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
            value: details.type,
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
            value: details.file,
            type: "input",
            htmlType: "text",
            inputValue: file.value,
            errorMes: file.errorMes,
            messageDur: file.messageDur,
            hasErrorMessage: file.hasErrorMessage,
            onChange: setFile
        }

    ]

    const checkForm = () => {

        let isFormValid = true;

        if (!file.value) {
            setFile(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Input field cannot be empty"
            }))

            isFormValid = false

        }

        if (!name.value) {
            setName(prevState => ({
                ...prevState,
                hasErrorMessage: true, 
                errorMes: "Input field cannot be empty"
            }))

            isFormValid = false

        }

        if (name.value === details.name && file === details.file && data[1].options[type].name === details.type) {
            
            setName(prevState => ({
                ...prevState,
                hasErrorMessage: true, 
                errorMes: "Cannot be same as inital"
            }));

            setFile(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Cannot be same as initial"
            }));

            isFormValid = false;

        }

        return isFormValid;
    }

    const handleClick = () => {
        
        setLoading(true);
        setError(false);

        let isFormValid = checkForm();

        if (!isFormValid) {
            setError(true)
            setLoading(false)

            return;
        }

        const reqData = {
            name: name.value,
            file: file.value,
            type: data[1].options[type].name
        }

        const conf = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': 'application/json'
            }
        }

        axios.put(`https://hosnet.io/api/templates/${details.id}/`, reqData, conf)

            .then((res) => {

                setSuccess(true)
                setError(false)
                setLoading(false)
                handleMessage("success", 5, "Template was updated successfully!")

                setTimeout(() => {
                    successRedirect();
                }, 2000)

            })

            .catch((err) => {

                setError(err)
                setSuccess(false)
                setLoading(false)
                handleMessage("error", 5, "Something went wrong, try again later")

            })

    }
    
    const handleDelete = () => {

        setLoading(true)
        setError(false)

        const conf = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': 'application/json'
            }
        }

        axios.delete(`https://hosnet.io/api/templates/${details.id}/`, conf)

        .then((res) => {

            setSuccess(true)
            setError(false)
            setLoading(false)
            handleMessage("success", 5, "Template was deleted successfully!")

            setTimeout(() => {
                successRedirect();
            }, 2000)

        })

        .catch((err) => {

            setError(err)
            setSuccess(false)
            setLoading(false)
            handleMessage("error", 5, "Something went wrong, try again later")
        
        })
    }

    // Updating Sub-Header based on route
    useEffect(() => {
        handleSubHeader([details.name], loading)
    }, [loading])

    if (userDataLoading) {
        return (
            <Wrapper>
            </Wrapper>
        )
    }

    // if (!userDataLoading && userData.is_staff === false) {
    //     return (
    //         <Redirect to="/" push={true} />
    //     )
    // }

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
                
                {/* <Content>
                    <Table data={data} heading="Update Template" rows={1} rows1={1} rows2={2} rows3={3} rowHeight={105} />
                </Content> */}
                
                <ButtonWrapper>
                    <Button height="45px" width="160px" text="Update Template" onClick={handleClick} />
                    <DeleteBtn height="45px" width="160px" text="Delete Template" onClick={handleDelete} />
                </ButtonWrapper>

            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    margin-top: 15px;

    display: flex;
    column-gap: 30px;
`;

const Content = styled.div `
`;

const InnerWrapper = styled.div `
    width: 93%;
    height: fit-content;
    padding-top: 15px;

    max-width: 1600px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;