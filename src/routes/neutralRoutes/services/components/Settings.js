// // Import Dependencies
// import React, {useState, useEffect} from 'react'
// import styled from 'styled-components'
// import EditGrid from '../../../../components/grids/EditGrid'

// // components
// import Message from '../../../../components/messages/Message'
// import DeleteConfirmation from '../../../../components/popup/DeleteConfirmation'
// import { clientServiceFormData } from '../../../adminRoutes/instance/instanceFormData'
// import SubmitButton from '../../../../components/buttons/ActionButton'
// import DeleteButton from '../../../../components/buttons/DangerActionButton'
// import {deleteInstance, updateInstance} from '../../../adminRoutes/instance/functions'

// export default function Settings ({service, user, token}) {
    
//     const currentHostname = service.body.hostname
//     let inputType = 'input'

//     // React State Hooks ^^ 
//     const [deleteConfirmationAlert, setDeleteConfirmationAlert] = useState(false)
//     const [message, setMessage] = useState(false);
//     const [actionLoading, setActionLoading] = useState(false);
//     const [formData, setFormData] = useState(clientServiceFormData({data: service.body}))

//     // this function will reset and remove the confirmation alert
//     const alertCleanup = () => {
//         setDeleteConfirmationAlert(false)
//     }

//     // reset and clean the message
//     const messageCleanup = () => {
//         setMessage(false)
//     }

//     // we'll show a message after confirmation or failure
//     const showMessage = ({...props}) => {
//         setMessage({
//             success: props.success,
//             title: props.title,
//             description: props.description,
//             button: {
//                 label: 'Close',
//                 onClick: messageCleanup,
//             }
//         })
//     }

//     // confirm updating process
//     const updateConfirmedFunc = async () => {
//         // reset and remove the alert message
//         // then set the action loading to true
//         // we can show some sort of animation if action loading is true
//         alertCleanup()
//         setActionLoading(true)

//         // run the update function
//         updateInstance({
//             instance_id: service.body.id, 
//             instanceType: 'service',
//             token, 
//             formData,    
//             showMessage
//         })

//         // once it's all done, set action loading to false
//         setActionLoading(false)
//     }

//     // confirm deleting process
//     const deleteConfirmedFunc = async () => {
//         // reset and remove the alert message
//         // then set the action loading to true
//         // we can show some sort of animation if action loading is true
//         alertCleanup()
//         setActionLoading(true)

//         // run the delete function
//         deleteInstance({
//             token,
//             instance_id, 
//             instanceType,
//             showMessage
//         })

//         // once it's all done, set action loading to false
//         setActionLoading(false)
//     }

//     // function to handle update process
//     // if confirmed, run the updateConfirmedFunc function
//     // if aborted, run the alertCleanup function    
//     const handleUpdate = () => {
//         // set up the alert of confirmation pop up
//         setConfirmationAlert({
//             title: 'Confirm Action',
//             message: `Are you sure you want to update '${instanceDetails.name}' ${instanceType}`,
//             buttons: [
//                 { label: 'Confirm', isPrimary: true, isDangerous: false, onClick: updateConfirmedFunc },
//                 { label: 'Abort', isPrimary: false, isDangerous: false, onClick: alertCleanup,}
//             ]
//         })
//     }

//     // function to handle deleting process
//     // if confirmed, run the deleteConfirmedFunc function
//     // if aborted, run the alertCleanup function
//     const handleDelete = () => {
//         // set up the alert of confirmation pop up
//         setConfirmationAlert({
//             title: 'Confirm Action',
//             message: `Are you sure you want to delete '${instanceDetails.name}' ${instanceType}`,
//             buttons: [
//                 { label: 'Confirm', isPrimary: true, isDangerous: true, onClick: deleteConfirmedFunc },
//                 { label: 'Abort', isPrimary: false, isDangerous: false, onClick: alertCleanup,}
//             ]
//         })
//     }


//     return (
        
//         <Wrapper>

//             {message ? (
//                 <Message 
//                     button={message.button}
//                     title={message.title}
//                     success={message.success}
//                     description={message.description}
//                 />
//             ) : null}

//             {deleteConfirmationAlert ? (
//                 <PopupWrapper>
//                     <DeleteConfirmation 
//                         name={service.body.hostname}
//                         closePopup={alertCleanup}
//                         callback={deleteConfirmed}
//                     />
//                 </PopupWrapper>
//             ) : null}

//             <InnerWrapper>
//                 <GridWrapper> 
//                     <EditGrid 
//                         data={formData} 
//                         formData={formData} 
//                         updateForm={setFormData} 
//                         heading={'Update Service'} 
//                     />
//                 </GridWrapper>
                
//                 <Buttons>
//                     <SubmitButton
//                         text={'Update Servuce'}
//                         height='38px'
//                         width='125px'
//                         onClick={handleUpdate}
//                         isDisabled={!isFormValid}
//                     />

//                     <DeleteButton
//                         text={'Delete Service'}
//                         height='38px'
//                         width='125px'
//                         onClick={handleDelete}
//                     />
//                 </Buttons>
//             </InnerWrapper>
//         </Wrapper>

//     )

// }

// const Buttons = styled.div `
//     width: fit-content;
//     display: flex;

//     column-gap: 20px;
// `;

// const GridWrapper = styled.div `
//     width: 100%;

//     height: fit-content;
// `;

// const PopupWrapper = styled.div `
    
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     /* bring your own prefixes */
//     transform: translate(-50%, -50%);

//     width: 100%; 
//     height: 100%;

//     display: flex;
//     align-items: center;
//     justify-content: center;

//     z-index: 111;

//     &::before {

//         content: '';
//         position: fixed;
//         top: 50%;
//         left: 50%;
//         /* bring your own prefixes */
//         transform: translate(-50%, -50%);

//         width: 100%; 
//         height: 100%;
//         background-color: #04060c;
//         opacity: 0.8;

//     }

// `;

// const ButtonsWrapper = styled.div `
    
//     display: flex;
//     column-gap: 25px;
//     margin-top: 50px;
//     margin-bottom: 20px;

// `;

// const GeneralSettingsWrapper = styled.div `
  
//     padding-top: 25px;
//     display: flex;
//     flex-direction: column;
//     row-gap: 35px;
//     width: 70%;

// `;

// const InnerWrapper = styled.div `

//     width: 93%;
//     max-width: 1500px;
//     height: fit-content;

// `;

// const Wrapper = styled.div `

//     width: 100%;
//     height: fit-content;
//     display: flex;
//     align-items: center;
//     justify-content: center;

// `;
