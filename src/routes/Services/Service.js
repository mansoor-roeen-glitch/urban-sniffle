// Importing Libraries
import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

// Importing Components
import VPSDetails from './components/VPSDetails';
import Charts from './components/Charts';
import SelectSection from './components/SelectSection';
import SelectPages from './components/SelectPages';
import ConfirmAlert from '../../components/popup/ConfirmAlert';

// Importing Functions
import service from './functions/service';
import {

    actionConfirmed,
    handleOptionClick,
    serviceNotActivated,
    updateScreenHeight

} from './functions/extraFunctions'
import Message from '../../components/messages/Message';


export default function Service ({ token, subHeader, ...props}) {

    // Refactored Props
    const {id, hostname} = useParams();

    // Global Variables 
    var scrollHeight = document.body.scrollHeight;
    var scrollWidth = document.body.scrollWidth;
    
    // Connection status hooks and loading hook
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState() 
    const [error, setError] = React.useState([])

    // Information about service
    const [serviceStatus, setServiceStatus] = React.useState();
    const [serviceInformation, setServiceInformation] = React.useState()
    const [serviceConsole, setServiceConsole] = React.useState()
    
    // Information about user/owner
    const [userInformation, setUserInformation] = React.useState()
    
    // Extra Hooks
    const [screenHeight, setScreenHeight] = React.useState( scrollHeight );
    const [actionLoading, setActionLoading] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState(0)
    const [confirmAlert, setConfirmAlert] = React.useState(false)
    const [message, setMessage] = React.useState(false)
    const [update, setUpdate] = React.useState(false);
    

    // Functions ^^
    const messageCleanup = () => {
        setMessage(false)
    }

    const showMessage = ({...props}) => {
        setMessage({
            success: props.success,
            title: props.title,
            description: props.description,
            button: {
                label: 'Close',
                onClick: messageCleanup,
            }
        })
    }

    const alertCleanup = () => {
        setConfirmAlert(false)
    }

    const handleActionConfirmation = (action) => {
        actionConfirmed(action, alertCleanup, setActionLoading, showMessage);   
    }

    const handleAction = (action) => {

        const confirmedActionFunc = () => actionConfirmed(action)

        setConfirmAlert({
            title: 'Confirm Action',
            message: `Are you sure you want to ${action} ${hostname}`,
            buttons: [
                {   
                    label: 'Confirm',
                    isPrimary: true,
                    isDangerous: false,
                    onClick: confirmedActionFunc
                },
                {
                    label: 'Abort',
                    isPrimary: false,
                    isDangerous: false,
                    onClick: alertCleanup,
                }
            ]
        })
    }


    // Use Effect Hooks 
    useEffect( () => {

        console.log("use effect has been triggered")

        // Setting loading to true by default
        setLoading(true)

        // Resize Event Listener
        window.addEventListener( "resize", () => {

            updateScreenHeight(setScreenHeight)

        } ) 

        // Function to get service data from server
        service ({

            error,
            token: token,
            serviceId: id,

            setServiceConsole,
            setServiceInformation,
            setServiceStatus,
            setUserInformation,

            setLoading,
            setSuccess,
            setError,

        })

    }, [])


    // Sub Header Configuration
    useEffect(() => {

        subHeader([hostname], loading)

    }, [loading])


    // Rendering Componenet

    if (loading) {

        return (

            <Wrapper>
                {/* Empty */}
            </Wrapper>
        
        )

    }
    
    if ( error.length > 0 ) {

        let isAnyCriticalError = false;
        
        error.map((err) => {

            if (err.critical) {

                isAnyCriticalError = true

            }

        })

        if (isAnyCriticalError) {

            return (

                <Wrapper>
                    {/* Error Message */}
                </Wrapper>
            
            )

        }

    }

    return (

        <Wrapper>   
            
            {message ? (
                <Message 
                    button={message.button}
                    title={message.title}
                    success={message.success}
                    description={message.description}
                />
            ) : null}
            
            {confirmAlert ? (
                <ConfirmAlert 
                    buttons={confirmAlert.buttons}
                    title={confirmAlert.title}
                    message={confirmAlert.message}
                />
            ) : null}

            <VPSInformationWrapper>
            
                <VPSDetails
                    status={serviceStatus?.body?.status || 'inactive'}
                    hostname={'Hostname'}
                    handleAction={handleAction}
                />
                
                <Charts 
                    
                    serviceStatus={serviceStatus}
                
                />
            
            </VPSInformationWrapper>

            <SelectSection 

                selectedOption={selectedOption}
                handleOptionClick={handleOptionClick} 
                handleOptionClickProp={setSelectedOption}
                
            />


            <SelectPages

                token={token}
                user={userInformation}
                selectedOption={selectedOption}
                service={{
                    details: serviceInformation,
                    console: serviceConsole,
                    status: serviceStatus,
                }}

            />
            

        </Wrapper>
    )
}

const VPSInformationWrapper = styled.div `
    
    width: 93%;
    max-width: 1600px;
    padding-top: 35px;
    
    display: flex;
    height: fit-content;
    flex-direction: column;
`;

const CheckoutButton = styled.button `
    width: fit-content;
    height: fit-content;
    background: transparent;
    outline: none;
    color: #943134;
    text-decoration: underline;
    font-size: 16px;
    cursor: pointer;
`;

const ServiceNotActivatedWrapper = styled.div`
    width: 100%;
    height: fit-content;
    align-items: center;
    justify-content: center;
    display: flex;
    background: #1D1212;
    margin-bottom: 20px;
`;

const NoticeSvg = styled.div `
    width: fit-content;
    height: fit-content;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`; 

const ServiceNotActivatedMessage = styled.span `
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-align: right;

    color: #943134;
`;

const ServiceNotActivated = styled.div `
    display: flex;
    height: 50px;
    width: 93%;
    max-width: 1600px;
    align-items: center;
`


const StyledLine = styled.div `
    width: 100%;
    height: 1px;
    position: absolute;
    background: var(--primary-cyan);
    bottom: 0px;
`;
 
const ItemButton = styled.button `

    width: 100%;
    height: 100%;
    background: transparent;
    border: none;

    outline: none!important;

    &:hover {
        cursor: pointer;
    }

`;

const ItemText = styled.span `
    font-size: 1.1rem;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    color: ${props => !props.selected ? "#767f8b" : "#d1d5db"};
`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const Item = styled.li `
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        bottom: 0px;
        position: absolute;
        z-index: 2;
        content: "";
        width: 100%;
        height: 1px;
        background: #aebbce;

        display: ${props => !props.selected ? "none" : "initial"};
    }
`;

const List = styled.ul `
    list-style: none;
    height: auto;

    display: flex;
    flex-direction: row;
    height: 100%;
`;

const HeaderWrapper = styled.div `
    width: 100%;
    height: 62px;
    margin-top: 15px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 93%;
        height: 1px;
        background: #2c3038;
    }
`;

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1600px;
    height: 100%;

`;

