import React, {useState} from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import Button from '../../../components/buttons/ActionButton';
import DeleteBtn from '../../../components/buttons/DangerActionButton';
import axios from 'axios';

export default function Plan(props) {
    
    const [details, setDetails] = useState(props.details);

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

        if (!file) {
            setFile(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Input field cannot be empty"
            }))

            isFormValid = false

        }

        if (!name) {
            setName(prevState => ({
                ...prevState,
                hasErrorMessage: true, 
                errorMes: "Input field cannot be empty"
            }))

            isFormValid = false

        }

        if (name === details.name && file === details.file) {
            
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
        
        let isFormValid = checkForm();

        const reqData = {
            name: name.value,
            file: file.value,
            type: data[1].options[type].name
        }

        const conf = {
            headers: {
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.put(`https://hosnet.io/api/templates/${details.id}/`, reqData, conf)

            .then((res) => {

                console.log(res)
                setSuccess(true)
                setError(false)
                setLoading(false)

            })

            .catch((err) => {

                setError(err)
                setSuccess(false)
                setLoading(false)

            })

    }
    
    const handleDelete = () => {

        const conf = {
            headers: {
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.delete(`https://hosnet.io/api/templates/${details.id}/`, conf)

        .then((res) => {

            if (res.status === 200) {

                setSuccess(true)
                setError(false)
                setLoading(false)
                
            }

        })

        .catch((err) => {

            setError(err)
            setSuccess(false)
            setLoading(false)
        
        })
    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName={details.name} />
            <InnerWrapper>
                <Content>
                    <Section data={data} heading="Update Template" rows={1} rows2={2} rows3={4} rowHeight={130} rows2={2} rows3={4} />
                </Content>
                <ButtonWrapper>
                    <Button height="45px" width="180px" text="Update Template" onClick={handleClick} />
                    <DeleteBtn height="45px" width="180px" text="Delete Template" onClick={handleDelete} />
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

    max-width: 1400px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;