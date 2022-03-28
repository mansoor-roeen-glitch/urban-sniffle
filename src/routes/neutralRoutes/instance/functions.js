// Functions
import apiRequest from "../../../functions/apiRequest"
import {initializeForm} from './instanceFormData';

let successMessage = ({showMessage, instance_id, instanceType}) => {
    showMessage({
        success: true,
        title: 'Task Completed',
        description: `${instanceType} ID: ${instance_id} update completed`,
    })
}

let errorMessage = ({showMessage, instance_id, instanceType}) => {
    showMessage({
        success: false,
        title: 'Task Failed',
        description: `${instanceType} ID: ${instance_id} update failed`,
    })
}

const getRequestData = ({object}) => {
    // store result in this object
    let objectData = {};

    object.map((formItem) => {

        if (!formItem) return null;

        // map args destructured    
        let key = formItem.key;
        let formItemField = formItem.type;
        
        if (formItemField === 'select' || formItemField === 'foreginkey') {
            if (!formItem?.default) objectData[key] = formItem.choices[formItem.choice].value
            else {objectData[key] = formItem.choices[formItem.choice]?.value}
        }

        else if (formItemField === 'read_only') objectData[key] = formItem.value
        
        else if (formItemField === 'number' || formItemField === 'text') {

            let updatedValue = formItem.inputValue;
            let initialValue = formItem.value

            if (formItem.inputValue) objectData[key] = updatedValue; 
            else objectData[key] = initialValue
        }

    }) 

    // return request data
    return objectData
}

// getting route options 
const getInstanceOptions = async (props) => {
    // getting token, id
    const {token, instance_id, instanceType} = props

    const response = await apiRequest ({
        token: token,
        method: 'options',
        endpoint: `/core/${instanceType}s/${instance_id}/`,
    })

    // sending response back
    return await response
}

// this function will see if form fields have been changed
// it returns true or false
const formValidation = ({formData}) => {

    if (!Array.isArray(formData) || formData === []) return false;
    
    let isFormValid = false;
    let isError = false;

    const selectFieldValidation = (formItem) => {
        if (!formItem?.default) return null;
        else if (formItem.default !== formItem.choices[formItem.choice].label) isFormValid = true;
    }

    const textFieldValidation = (formItem) => {
        if (formItem.inputValue === '') return null;
        else if (formItem.inputValue !== '' && formItem.error) isError = true;
        else if (formItem.inputValue !== '' && formItem.inputValue == formItem.value) return null;
        else if (formItem.inputValue !== '' && formItem.inputValue != formItem.value) isFormValid = true;
    }

    // map through all form fields, if form field is updated, then set is formValid to true
    // if field type is select then run selectFieldValidation, or if text, then run textFieldValidation
    formData.map((formItem) => {
        if (formItem?.type === 'select' || formItem?.type === 'foreginkey') selectFieldValidation();
        else if (formItem?.type === 'text') textFieldValidation(formItem);
    })

    // if error occured then
    if (isError) return false;
    return isFormValid;
}

// this function returns the plan details
const getInstance = async (props) => {

    // getting token
    const {token, instance_id, instanceType} = props

    const response = await apiRequest ({
        token: token,
        endpoint: `/core/${instanceType}s/${instance_id}/`,
    })

    // sending response back
    return await response
}

// update plan function
const updateInstance = async ({instance_id, token, showMessage, formData, instanceType, nestedObjects}) => {
    // this will be the final data that we'll send to server
    let data = getRequestData({object: formData});
    let nestedObjectsData = [];

    if (Array.isArray(nestedObjects) && nestedObjects !== []) {
        // here we'll map through all the formItems for this object
        // and then update the objectData accordingly
        nestedObjects.map((object) => nestedObjectsData.push(getRequestData({object})))}
    
    // 'put' api request
    apiRequest({
        data,
        token, 
        method: 'put',
        endpoint: `/core/${instanceType}s/${instance_id}/`,
    })

    // if no error occurs, say it's done 
    // then redirect them to /plans
    .then((response) => {
        // if success
        if (response.success) successMessage({showMessage, instanceType, instance_id})
        // if failed
        else errorMessage({showMessage, instanceType, instance_id})
    })

    // if error occured, show this message
    .catch(() => {
        errorMessage({showMessage, instanceType, instance_id})
    })
    
}

// delete plan function
const deleteInstance = async ({instance_id, token, showMessage, instanceType}) => {

    // 'delete' api request
    apiRequest({
        token,
        method: 'delete',
        endpoint: `/core/${instanceType}s/${instance_id}/`,
    })

    // if no error occurs, say it's done 
    // then redirect them to /{instanceType}
    .then((response) => {
        // if success
        if (response.success) successMessage()
        // if failed
        else errorMessage()
    })

    // if error occured, show this message
    .catch(() => {
        errorMessage()
    })
    
}

// this function returns the form data
// the form data would be used to create form fields
const getFormData = async ({data, instance_id, token, instanceType}) => { 
    // get the instance options for form initialization
    let response = await getInstanceOptions({instance_id, token, instanceType})
    if (response.success == false) return [];

    // get the list of form fields with the options and data
    let results = initializeForm({data, options: response, token})
    return results;
}


export {getInstance, updateInstance, deleteInstance, formValidation, getFormData}