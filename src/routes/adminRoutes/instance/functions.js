// Functions
import apiRequest from "../../../functions/apiRequest"
import { nodeFormData, planFormData, poolFormData, templateFormData } from "./instanceFormData"

// getting route options 
const getInstanceOptions = async (props) => {
    // getting token, id
    const {token, instance_id, instanceType} = props

    const response = await apiRequest ({
        token: token,
        method: 'options',
        endpoint: `/api/${instanceType}s/${instance_id}/`,
    })

    // sending response back
    return await response
}

// this function will see if form fields have been changed
// it returns true or false
const formValidation = ({formData}) => {
    let isFormValid = false;
    let isError = false;

    // map through all form fields, if form field is updated, then set is formValid to true
    formData.map((formItem) => {
        if (formItem.field === 'dropdown') {
            if (formItem.intialChoice !== formItem.options[formItem.selected]) {
                isFormValid = true
            }
        };
        
        if (formItem.inputValue != "" && formItem.inputValue != formItem.value && !formItem.errorMes) {
            isFormValid = true
        } 

        // this would return a error value
        else if (formItem.errorMes) isError = true;
    })

    if (isError) {
        return false;
    }

    return isFormValid;
}

// this function returns the plan details
const getInstance = async (props) => {

    // getting token
    const {token, instance_id, instanceType} = props

    const response = await apiRequest ({
        token: token,
        endpoint: `/api/${instanceType}s/${instance_id}/`,
    })

    // sending response back
    return await response
}

// update plan function
const updateInstance = async ({instance_id, token, showMessage, formData, instanceType}) => {
    // this will be the final data that we'll send to server
    let data = {};

    // go through all the formItems
    formData.map((formItem, index) => {
        // we'll initially see if it's number or float or string
        // if then we'll see if the value has changed or not
        if (formItem.field === 'number' || formItem.field === 'float' || formItem.field === 'string') {
            if (formItem.inputValue) data[formItem.for] = formItem.inputValue
            else data[formItem.for] = formData[index].value
        }

        else if (formItem.field === 'selector') {
            data[formItem.for] = formItem.options[formItem.selected].value
        }
    })   
    
    let successMessage = () => {
        showMessage({
            success: true,
            title: 'Task Completed',
            description: `${instance_id} ${instanceType} has been updated successfully`,
        })
    }

    let errorMessage = () => {
        showMessage({
            success: false,
            title: 'Task Failed',
            description: `failed to update ${instanceType} ${instance_id}`,
        })
    }

    // 'put' api request
    apiRequest({
        data,
        token, 
        method: 'put',
        endpoint: `/api/${instanceType}s/${instance_id}/`,
    })

    // if no error occurs, say it's done 
    // then redirect them to /plans
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

// delete plan function
const deleteInstance = async ({instance_id, token, showMessage, instanceType}) => {
    
    let successMessage = () => {
        showMessage({
            success: true,
            title: 'Task Completed',
            description: `${instance_id} ${instanceType} has been deleted successfully`,
        })
    }

    let errorMessage = () => {
        showMessage({
            success: false,
            title: 'Task Failed',
            description: `failed to delete ${instanceType} ${instance_id}`,
        })
    }

    // 'delete' api request
    apiRequest({
        token,
        method: 'delete',
        endpoint: `/api/${instanceType}s/${instance_id}/`,
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

    let response = await getInstanceOptions({instance_id, token, instanceType})
    if (response.success !== true) return [];

    let putOptions = response.body.actions.PUT;

    // this function loops through and returns dropdown field options 
    let mapChoices = (f) => putOptions[f].choices.map((e, i) => ({value: e.value, name: e.name, index: i}));
    // figure out which chioce has been selected, and then return the index
    let selectedChoice = (f) => putOptions[f].choices.map((e, i) => e.value === data[f] && i);

    if (instanceType === 'plan') return planFormData({data, putOptions, mapChoices, selectedChoice})
    else if (instanceType === 'node') return nodeFormData({data, putOptions, mapChoices, selectedChoice})
    else if (instanceType === 'template') return templateFormData({data, putOptions, mapChoices, selectedChoice})
    else if (instanceType === 'pool') return poolFormData({data, putOptions, mapChoices, selectedChoice})

    return [];
}


export {getInstance, updateInstance, deleteInstance, formValidation, getFormData}