import React from 'react'
import styled from 'styled-components'
import Header from './components/Header';
import {Link} from 'react-router-dom'

export default function LandingPage() {

    let plansList = [
        {
            id: 13,
            price: 1.0,
            currencty: "usd",
            period: "monthly",
            name: "test_plan_2",

            plan_features: [
                
                {
                    feature_name: "size",
                    feature_value: "1024 GB"
                },
                {
                    feature_name: "ram",
                    feature_value: "1024 GB"
                },
                {
                    feature_name: "cores",
                    feature_value: 4
                },
                {
                    feature_name: "bandwidth",
                    feature_value: "1024 GB"
                }

            ]
        },
        {
            id: 15,
            price: 1.0,
            currencty: "usd",
            period: "monthly",
            name: "test_plan_1",

            plan_features: [
                
                {
                    feature_name: "size",
                    feature_value: "1024 GB"
                },
                {
                    feature_name: "ram",
                    feature_value: "1024 GB"
                },
                {
                    feature_name: "cores",
                    feature_value: 4
                },
                {
                    feature_name: "bandwidth",
                    feature_value: "1024 GB"
                }

            ]
        },
        {
            id: 14,
            price: 1.0,
            currencty: "usd",
            period: "monthly",
            name: "test_plan_1",

            plan_features: [
                
                {
                    feature_name: "size",
                    feature_value: "1024 GB"
                },
                {
                    feature_name: "ram",
                    feature_value: "1024 GB"
                },
                {
                    feature_name: "cores",
                    feature_value: 4
                },
                {
                    feature_name: "bandwidth",
                    feature_value: "1024 GB"
                }

            ]
        }
    ]

    const handleClick = () => {
        console.log("something")
    }

    return (
        <Wrapper>
            <Header />
            <ContentWrapper>
                
                <Content>
                    <HeadingWrapper>
                        <Heading>Private Server Hosting Solution</Heading>
                    </HeadingWrapper>
                    <ParagraphWrapper>
                        <Paragraph>We provide you with an unrivaled hosting experience, delivering 99.999% uptime & 24/7 access to the Most Helpful Humans in Hosnet.io</Paragraph>
                    </ParagraphWrapper>
                </Content>

                <PlansWrapper>
                    <PlansList>

                        {plansList.map((plan, index) => {
                            return (

                                <PlanWrapper>

                                    <PlanTitle>
                                        {plan.name}
                                    </PlanTitle>
                                    
                                    <PlanFeaturesList>

                                        {plan.plan_features.map((plan_feature) => {
                                            return (

                                                <PlanFeature>
                                                    <FeatureBefore />
                                                    <FeatureText>
                                                        {plan_feature.feature_value} {plan_feature.feature_name}
                                                    </FeatureText>
                                                </PlanFeature>
                                                
                                            )
                                        })}

                                    </PlanFeaturesList>

                                    <Link to={`/register?redirect=create_service&plan_id=${plan.id}`}>
                                        <PlanButton>
                                            <PlanButtonText>900$ /month</PlanButtonText>
                                        </PlanButton>
                                    </Link>

                                </PlanWrapper>


                            )
                        })}

                    </PlansList>
                </PlansWrapper>

            </ContentWrapper>
        </Wrapper>
    )
}

const PrimaryPlanButtonText = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: center;

    color: black;
`;

const PrimaryPlanButton = styled.div `
    width: 100%;
    height: 45px;
    background: transparent;
    border: solid 1px #c4c4c4;
    background: #C4C4C4;

    margin-top: auto;
    align-self: baseline;

    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;

    transition: .3s ease background, .3s ease color;

    :hover {
        background: transparent;
        span {
            color: #C4C4C4;
        }
    }
`;

const PlanButtonText = styled.span `

    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #C4C4C4;

`;

const PlanButton = styled.div `
    width: 100%;
    height: 45px;
    background: transparent;
    border: solid 1px #616C6C;

    margin-top: auto;
    align-self: baseline;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition: .3s ease opacity;

    :hover {
        opacity: .7;
    }
`;

const FeatureText = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 300;
    font-size: 16px;

    display: flex;
    align-items: center;

    color: #BFCBCB;
`;

const FeatureBefore = styled.div `
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: white;
`;

const PlanFeature = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

const PlanFeaturesList = styled.div `
    display: flex;
    flex-direction: column;
    height: fit-content;
    row-gap: 7px;
    width: 100%;
`;

const PlanTitle = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #E2EFEF;
    margin-bottom: 35px; 
`;

const PlanWrapper = styled.div `
    width: 220px;
    height: 350px;
    background: #0A0D0F;

    display: flex;
    align-items: center;
    flex-direction: column;

    padding: 25px 20px 20px;
`;

const PlansList = styled.ul `
    list-style: none;
    display: flex;
    grid-column-gap: 40px;
`;

const PlansWrapper = styled.div `
    margin-top: 100px;
    width: 100%;
    max-width: 700px;
    height: fit-content;

`;

const Paragraph = styled.p `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    text-align: center;

    color: #BFCBCB;

`;

const ParagraphWrapper = styled.div `
    width: 100%;
    max-width: 540px;
    height: fit-content;
`;

const Heading = styled.h1 `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 34px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #E9F3F3;
`;

const HeadingWrapper = styled.div `
    width: 100%;
    height: fit-content;
    margin-bottom: 35px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ContentWrapper = styled.div `
    width: 93%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 120px;
`;

const Wrapper = styled.div `
    width: 100%;
    min-height: 100vh;
    background: #000101;
    display: flex;
    flex-direction: column;
    align-items: center;
`;