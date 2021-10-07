import React from 'react'
import styled from 'styled-components'

export default function Header({path, pathName}) {
    return (
        <Wrapper>
            <InnerWrapper>
                <ContentWrapper>
                    <ProfileWrapper>
                        <StyledImage>
                            
                            <svg width="32" height="32" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 0C7.61175 0 0 7.61175 0 17C0 26.3882 7.61175 34 17 34C26.3882 34 34 26.3882 34 17C34 7.61175 26.3882 0 17 0ZM17 31.1667C12.5757 31.1667 8.62183 29.1252 6.02225 25.9392C6.38917 25.1062 7.1315 24.5296 8.66717 24.174C11.8462 23.4402 14.9841 22.7842 13.4739 20.0019C9.00433 11.7569 12.2003 7.08333 17 7.08333C21.7062 7.08333 24.9815 11.5841 20.5261 20.0019C19.0598 22.7673 22.0844 23.4246 25.3328 24.174C26.8657 24.5282 27.6137 25.1019 27.9834 25.9321C25.3824 29.1238 21.4271 31.1667 17 31.1667Z" fill="white" fill-opacity="0.85"/>
                            </svg>

                        </StyledImage>

                        <StyledUsernameWrapper>
                            <StyledUserName>
                                Hostler
                            </StyledUserName>
                        </StyledUsernameWrapper>

                        <StyledArrow>
                            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.33325 0.440417L10.7181 7L2.33325 13.5444L2.69434 14L11.6666 7L2.6885 0L2.33325 0.440417Z" fill="#84709C"/>
                            </svg>
                        </StyledArrow>

                    </ProfileWrapper>

                    {/* if Path */}
                    {path ? (
                        <PathWrapper>
                            <PathText>
                                {pathName}
                            </PathText>
                        </PathWrapper>
                    ) : null}

                </ContentWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const PathWrapper = styled.div `
    align-items: center;
    justify-content: center;
    margin-left: 20px;
`

const PathText = styled.span `
    font-style: normal;
    font-weight: normal;
    font-size: 1.22rem;
    line-height: 124%;
    /* or 8px */
    color: var(--primary-white);

    display: flex;
    align-items: center;
`;

const StyledArrow = styled.div `
    height: auto;
    width: auto;

    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledUsernameWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const StyledUserName = styled.span `
    color: var(--primary-purple);
    font-size: 1.35rem;
    font-weight: 300;
`;

const ContentWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    display: flex;
    align-items: center;
`;

const ProfileWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImage = styled.div `
    margin-right: 12px;

    * {

        fill: var(--primary-purple);
    }
`;

const Wrapper = styled.div `
    width: 100%;
    height: 70px;
    background: var(--secondary-background);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1400px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;