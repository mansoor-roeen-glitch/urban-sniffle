// Importing Libraries

import React from 'react'
import styled from 'styled-components';

// Importing Components

import Details from './components/Details'
import Console from './components/Console';
import Billing from './components/Billing';
import Actions from './components/Actions';


export default function SelectPages() {
    
    return (

        <ContentWrapper screenHeight={screenHeight}>
                
            { (() => {

                switch(selectedOption) {
                    
                    case 0:
                        
                        return (
                        
                            <Details 
                            
                                data={serviceInformation} 
                                config={config}
                                userDetails={userDetails} 
                                serviceStatus={serviceStatus} 
                                
                            />
                            
                        )

                    case 1:
                        
                        return (
                            
                            <Console 
                                
                                data={serviceInformation} 
                                serviceConsole={serviceConsole} 
                                serviceNotActivated={serviceNotActivated} 
                                
                            />
                            
                        )
                    
                    case 2:
                        
                        return (
                        
                            <Billing 
                                
                                data={serviceInformation} 
                                userDetails={userDetails} 
                                
                            />
                            
                            )
                        
                    case 3:
                        
                        return (
                                
                                <Actions 
                                
                                    data={serviceInformation} 
                                    userDetails={userDetails} 
                                    setLoadingAnim={setActionLoading} 
                                    serviceNotActivated={serviceNotActivated} 
                                    config={config} 
                                
                                />
                                    
                        )
                        
                }

            })()}

        </ContentWrapper>
    )
}


const ContentWrapper = styled.div `
    width: 100%;
    height: fit-content;
`;