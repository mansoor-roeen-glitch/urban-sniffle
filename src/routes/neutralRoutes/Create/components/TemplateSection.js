import React from 'react'
import Template from './Template'
import styled from 'styled-components'

export default function TemplateSection({ templateList, handleTemplateClick, selectedTemplate }) {

    return (
        <TemplateSectionWrapper>
            <TemplateSectionHeader>
                <TemplateSectionHeading>
                    2. Choose a template
                </TemplateSectionHeading>
                <TemplateSectionSubHeading>
                    selected template: CentOs 8
                </TemplateSectionSubHeading>
            </TemplateSectionHeader>
            <TemplateSectionList>
                
                {templateList.map((template, index) => 
                    
                    <Template 
                    
                        key={index}
                        template={template}
                        templateIndex={index} 
                        selectedTemplate={selectedTemplate}
                        handleTemplateClick={handleTemplateClick} 
                    
                    />
                    
                )}

            </TemplateSectionList>
        </TemplateSectionWrapper>
    )
}

const TemplateSectionList = styled.ul `
    display: grid;
    height: fit-content;

    width: 100%;
    column-gap: 35px;
    padding-top: 20px;

    grid-template-columns: repeat(7, 1fr);
`;

const TemplateSectionSubHeading = styled.span `
    color: #a6aab1;
    font-weight: 300;
    font-size: 15px;
`;

const TemplateSectionHeading = styled.div `
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    display: flex;
    align-items: center;
    color: #caced5;
`;

const TemplateSectionHeader = styled.div `
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    height: 42px;
    margin-bottom: 10px;
    width: 100%;
`;

const TemplateSectionWrapper = styled.div `

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 45px;
    margin-bottom: 35px;

`;