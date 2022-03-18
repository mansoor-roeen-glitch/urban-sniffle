// Functions
import apiRequest from "../../../functions/apiRequest"
import {planFormData, nodeFormData, templateFormData, poolFormData, serviceFormData} from './instanceFormData' 

// getting route options 
const getInstanceOptions = async (props) => {
    // getting token, id
    const {token, instanceType} = props

    const response = await apiRequest ({
        token: token,
        method: 'options',
        endpoint: `/api/${instanceType}s/`,
    })

    // sending response back
    return await response
}

const createInstanceData = (formData) => {
    // this will be the final data that we'll send to server
    let data = {};

    // go through all the formItems
    formData.map((formItem, index) => {
        if (formItem.field === 'number' || formItem.field === 'float' || formItem.field === 'string') {
            data[formItem.for] = formItem.inputValue
        }

        else if (formItem.field === 'selector') {
            data[formItem.for] = formItem.options[formItem.selected].value
        }
    })   

    return data;
}

// this function will see if all fields are filled
// it returns true or false
const formValidation = ({formData}) => {
    let isFormValid = true;

    formData.map((formItem) => {
        if (formItem.field === 'number' || formItem.field === 'float' || formItem.field === 'string') {
            if (formItem.inputValue == "" && !formItem.errorMes) isFormValid = false;
        }
    })

    return isFormValid;
}

// create instance function
const createInstance = async ({token, showMessage, formData, instanceType, optionalAction}) => {

    let data = createInstanceData(formData)

    let successMessage = () => {
        showMessage({
            success: true,
            title: 'Task Completed',
            description: `${instanceType} has been created successfully`,
        })
    }

    let errorMessage = () => {
        showMessage({
            success: false,
            title: 'Task Failed',
            description: `Failed to create new ${instanceType}`,
        })
    }

    // 'put' api request
    return apiRequest({
        data,
        token, 
        method: 'post',
        endpoint: `/api/${instanceType}s/`,
    })

    // if no error occurs, say it's done 
    .then((response) => {
        if (optionalAction) {
            return response;
        }

        // if success
        if (response.success) {successMessage(); return response}
        // if failed
        else {errorMessage(); return response} 
    })

    // if error occured, show this message
    .catch((error) => {
        errorMessage();
        return error;
    })
}

// this function returns the form data
// the form data would be used to create form fields
const getFormData = async ({data, instance_id, token, instanceType}) => { 

    let response = await getInstanceOptions({instance_id, token, instanceType})
    if (response.success !== true) return [];
    let putOptions = response.body.actions.POST;
    
    // this function loops through and returns dropdown field options 
    let mapChoices = (f) => putOptions[f].choices.map((e, i) => ({value: e.value, name: e.name, index: i}));

    if (instanceType === 'plan') return planFormData({mapChoices})
    else if (instanceType === 'node') return nodeFormData({mapChoices})
    else if (instanceType === 'template') return templateFormData({mapChoices})
    else if (instanceType === 'pool') return poolFormData({mapChoices})
    else if (instanceType === 'service') return serviceFormData({mapChoices})

    return [];
}

export {getFormData, formValidation, createInstance}