import React from 'react'
import styled from 'styled-components'
import Header from './components/Header';

export default function LandingPage() {
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

                        <PlanWrapper>

                            <PlanTitle>
                                Fast & Affordable Managed VPS
                            </PlanTitle>
                            
                            <PlanFeaturesList>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        100GB Ram
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        1024GB Bandwidth
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        4 Cores
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        1024GB Storage
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        Free Management
                                    </FeatureText>
                                </PlanFeature>

                            </PlanFeaturesList>

                            <PlanButton>
                                <PlanButtonText>900$ /month</PlanButtonText>
                            </PlanButton>

                        </PlanWrapper>

                        <PlanWrapper>

                            <PlanTitle>
                                Fast & Affordable Managed VPS
                            </PlanTitle>
                            
                            <PlanFeaturesList>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        100GB Ram
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        1024GB Bandwidth
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        4 Cores
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        1024GB Storage
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        Free Management
                                    </FeatureText>
                                </PlanFeature>

                            </PlanFeaturesList>

                            <PlanButton>
                                <PlanButtonText>900$ /month</PlanButtonText>
                            </PlanButton>

                        </PlanWrapper>

                        <PlanWrapper>

                            <PlanTitle>
                                Fast & Affordable Managed VPS
                            </PlanTitle>
                            
                            <PlanFeaturesList>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        100GB Ram
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        1024GB Bandwidth
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        4 Cores
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        1024GB Storage
                                    </FeatureText>
                                </PlanFeature>

                                <PlanFeature>
                                    <FeatureBefore />
                                    <FeatureText>
                                        Free Management
                                    </FeatureText>
                                </PlanFeature>

                            </PlanFeaturesList>

                            <PlanButton>
                                <PlanButtonText>900$ /month</PlanButtonText>
                            </PlanButton>

                        </PlanWrapper>


                    </PlansList>
                </PlansWrapper>

            </ContentWrapper>
        </Wrapper>
    )
}

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