import React from 'react'
import styled from 'styled-components';
import Plan from './Plan'

export default function PlanSection({ plansList, handlePlanClick, selectedPlan }) {

    return (
        <PlanSectionWrapper>
            <PlanSectionHeader>
                <PlanSectionHeading>
                    1. Choose your plan
                </PlanSectionHeading>
                <PlanSectionSubHeading>
                    selected plan: test_plan_1
                </PlanSectionSubHeading>
            </PlanSectionHeader>
            <PlanSectionList>
            
                {plansList.map((plan, index) =>  
                
                    <Plan 
                        
                        key={index}
                        plan={plan} 
                        planIndex={index}
                        selectedPlan={selectedPlan}
                        handlePlanClick={handlePlanClick} 
                        
                    /> 
                
                )}
            
            </PlanSectionList>
        </PlanSectionWrapper>
    )
}


const PlanSectionList = styled.ul `
    display: grid;
    height: fit-content;

    width: 100%;
    column-gap: 50px;
    padding-top: 20px;

    grid-template-columns: repeat(5, 1fr);
`;

const PlanSectionSubHeading = styled.span `
    color: #a6aab1;
    font-weight: 300;
    font-size: 15px;
`;

const PlanSectionHeading = styled.div `
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    display: flex;
    align-items: center;
    color: #caced5;
`;

const PlanSectionHeader = styled.div `
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    height: 42px;
    margin-bottom: 10px;
    width: 100%;
`;

const PlanSectionWrapper = styled.div `

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

`;
