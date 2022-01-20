// Importing Libraries

import React from 'react'
import styled from 'styled-components';

// Importing Components

import Details from './Details'
import Console from './Console';
import Billing from './Billing';
import Settings from './Settings'

// Importing Function

import { serviceNotActivated } from '../functions/extraFunctions';


export default function SelectPages (props) {
    
    const {

        serviceInformation,
        userInformation,
        serviceConsole,
        serviceStatus,

        setActionLoading,
        selectedOption,
        config,

    } = props

    return (

        <ContentWrapper>
                
            { (() => {

                switch(selectedOption) {
                    
                    case 0:
                        
                        return (
                        
                            <Details 
                            
                                data={serviceInformation} 
                                config={config}
                                userDetails={userInformation} 
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
                                userDetails={userInformation} 
                                
                            />
                            
                            )
                        
                    case 3:
                        
                        return (
                                
                            <Settings

                                config={config}
                                serviceInformation={{currentHostname: serviceInformation.hostname}}
                                userInformation={userInformation}

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