import React, {useState} from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import PrimaryButton from '../../../components/buttons/PrimaryButton';

export default function Plan() {
    
    const [details, setDetails] = useState(
        
        {
            "id": 1,
            "name": "Ubuntu Focal",
            "type": "kvm",
            "file": "9004"
        }

    );

    const [file, setFile] = useState(details.file);
    const [type, setType] = useState(details.type);
    const [name, setName] = useState(details.name);
    const [id, setId] = useState(details.id);

    const data = [
        {
            heading: "name",
            value: details.name,
            type: "input",
            htmlType: "text",
            inputValue: name, 
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
            heading: "id",
            value: details.id,
            type: "input",
            htmlType: "text",
            inputValue: id,
            onChange: setId
        },
        {
            heading: "file",
            value: details.file,
            type: "input",
            htmlType: "text",
            inputValue: file,
            onChange: setFile
        }

    ]
    
    return (
        <Wrapper>
            <SubHeader path={true} pathName={details.name} />
            <InnerWrapper>
                <Content>
                    <Section data={data} heading="Update Template" rows={2} rowHeight={130} />
                </Content>
                <ButtonWrapper>
                    <PrimaryButton to="/" height="45px" width="180px" text="Update Template" />
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    height: fit-content;
    width: fit-content;
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