// Functions
import apiRequest from "../../../functions/apiRequest"
import {initializeForm} from './instanceFormData';

let successMessage = ({showMessage}) => {
    showMessage({
        success: true,
        title: 'Task Completed',
        description: `new instance created successfully`,
    })
}

let errorMessage = ({showMessage}) => {
    showMessage({
        success: false,
        title: 'Task Failed',
        description: `failed to create new instance`,
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

        else if (formItemField === 'manytomany-lists') {
            let result = []
            formItem.choices.map(({isChecked, value}) => {isChecked && result.push(value)});

            objectData[key] = result;
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
    const {token, instanceType} = props

    const response = await apiRequest ({
        token: token,
        method: 'options',
        endpoint: `/core/${instanceType}s/`,
    })

    // sending response back
    return await response
}

// this function will see if form fields have been changed
// it returns true or false
const formValidation = ({formData}) => {
    if (!Array.isArray(formData) || formData === []) return false;
    
    let isFormValid = true;
    let isError = false;

    // this function will see if at least one of many to many options have been selected
    // if not then error would be set to true
    const manyToManyFieldValidation = (formItem) => {
        let isFieldValid = false;

        if (formItem.validation.required) formItem.choices.map(({isChecked}) => isChecked ? isFieldValid = true : null)    
        !isFieldValid ? isError = true : isError = isError;
    }

    // check if select field is valid or not
    // no validation since there is none required
    const selectFieldValidation = () => {
        return null;
    }

    // checks if string is neither empty nor invalid
    const textFieldValidation = (formItem) => {
        if (formItem.inputValue === '' && formItem.validation.required) isFormValid = false;
        else if (formItem.inputValue !== '' && formItem.error) isError = true;
    }

    // checks if no number has been entered
    // if no number has been entered then form will not be valid anymore
    const numberFieldValidation = (formItem) => {if (formItem.inputValue === '') isFormValid = false};

    // map through all form fields, if form field is updated, then set is formValid to true
    // if field type is select then run selectFieldValidation, or if text, then run textFieldValidation
    formData.map((formItem) => {
        if (formItem?.type === 'text' ) textFieldValidation(formItem);
        else if (formItem?.type === 'number') numberFieldValidation(formItem)
        else if (formItem?.type === 'manytomany-lists') manyToManyFieldValidation(formItem)
        else if (formItem?.type === 'select' || formItem?.type === 'foreginkey') selectFieldValidation(formItem)
    })

    // if error occured then
    if (isError) return false;
    return isFormValid;
}

// update plan function
const createInstance = async ({token, showMessage, formData, instanceType}) => {
    // this will be the final data that we'll send to server
    let data = getRequestData({object: formData});
    
    // 'put' api request
    apiRequest({
        data,
        token, 
        method: 'post',
        endpoint: `/core/${instanceType}s/`,
    })

    // if no error occurs, say it's done 
    // then redirect them to /plans
    .then((response) => {
        // if success
        if (response.success) successMessage({showMessage, instanceType})
        // if failed
        else errorMessage({showMessage, instanceType})
    })

    // if error occured, show this message
    .catch(() => {
        errorMessage({showMessage, instanceType})
    })
    
}

// this function returns the form data
// the form data would be used to create form fields
const getFormData = async ({data, token, instanceType}) => { 
    // get the instance options for form initialization
    let response = await getInstanceOptions({token, instanceType})
    
    if (response.success == false) return [];

    // get the list of form fields with the options and data
    let results = initializeForm({data, options: response, token})
    return results;
}


export {formValidation, getFormData, createInstance}