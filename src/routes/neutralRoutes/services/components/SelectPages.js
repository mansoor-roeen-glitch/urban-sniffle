// Dependencies
import React from 'react'
import styled from 'styled-components';

// Components
import Details from './Details'
import Console from './Console';
import Billing from './Billing';
import Settings from './Settings'

// Functions
import { serviceNotActivated } from '../functions/extraFunctions';


export default function SelectPages ({...props}) {
    
  const {

      token,
      service,
      user,
      selectedOption,

  } = props;


  return (

    <ContentWrapper>
            
      { (() => {

        switch(selectedOption) {
            
          case 0:
            return (
                <Details 
                    service={service.details} 
                    status={service.status} 
                    user={user} 
                    token={token}
                />
            )

          case 1:
            return (
                <Console 
                    service={service.details} 
                    terminalData={service.console} 
                    status={service.status}
                    token={token}
                />
            )
          
          case 2:
              
            return (
                <Billing  
                    service={service.details} 
                    status={service.status}
                    user={user} 
                    token={token}
                />
              )
              
          case 3:
              
            return (
                <Settings
                    service={service.details}
                    user={user}
                    token={token}
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