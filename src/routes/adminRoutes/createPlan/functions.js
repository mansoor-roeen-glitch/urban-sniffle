// Functions
import { token } from "proxmox-client"
import apiRequest from "../../../functions/apiRequest"

// create plan function
const createPlan = async ({token, showMessage, formData}) => {
    // this will be the final data that we'll send to server
    let data = {};

    // go through all the formItems
    formData.map((formItem, index) => {
        // we'll initially see if it's number or float or string
        // if then we'll see if the value has changed or not
        // if the value had changed then update data as the changed value
        // otherwise use the inital value provided by server
        if (formItem.field === 'number' || formItem.field === 'float' || formItem.field === 'string') {
            data[formItem.for] = formItem.inputValue
        }

        else if (formItem.field === 'selector') {
            data[formItem.for] = formItem.options[formItem.selected].value
        }
    })   
    
    // set ip pools
    data.ip_pools = [3]

    let successMessage = () => {
        showMessage({
            success: true,
            title: 'Task Completed',
            description: `Plan has been created successfully`,
        })
    }

    let errorMessage = () => {
        showMessage({
            success: false,
            title: 'Task Failed',
            description: `Failed to create new plan`,
        })
    }

    // 'put' api request
    apiRequest({
        data,
        token, 
        method: 'post',
        endpoint: `/api/plans/`,
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

// validation function for string inputs
const stringValidation = (value, max, min, regex) => {

    // running regex to test value
    let isStringValid = regex ? regex?.test(value) : /^[a-zA-Z0-9]{2,40}$/.test(value)

    // check if regex test passed
    if (isStringValid) {
        // check if min or max have been mentioned 
        if (max || min) {
            // check if length is more than or less than max and min
            if (value.length > max || value.length < min) {
                return {error: true, error_message: `must be ${min}-${max}`};}
            else { return {error: false, error_message: '' }}
        }
        
        // else if, return with no error
        return {error: false, error_message: '' }       
    }

    // else if, return with no error
    return {error: false, error_message: '' }
}

// this function returns the form data
// the form data would be used to create form fields
const getFormData = () => { 

    let formData = [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Please enter plan name)',
            label: 'Plan Name',   
            for: 'name',
            stringValidation, 
            field: 'string',
            regex: /^[A-Za-z0-9 ]+$/,
            minmax: {
                max: 50,
                min: 2, 
            }
        },
        {
            value: '',
            description: '(in USD)',
            label: 'Price',   
            for: 'price',
            field: 'float',
            minmax: false,
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Ram',   
            for: 'ram',
            field: 'number',
            minmax: {
                max: 1073741824,
                min: 0,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Storage',   
            for: 'size',
            field: 'number',
            minmax: {
                max: 1073741824,
                min: 0,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Bandwidth',   
            for: 'bandwidth',
            field: 'number',
            minmax: {
                max: 1073741824,
                min: 0,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of cores)',
            label: 'No. Cores',   
            for: 'cores',
            field: 'number',
            minmax: {
                max: 8,
                min: 1,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of units)',
            label: 'No. Cpu Units',   
            for: 'cpu_units',
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: '',
            description: '',
            label: 'CPU Limit',   
            for: 'cpu_limit',
            field: 'float',
            minmax: false,
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Swap', 
            for: 'swap',
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of IPs)',
            label: 'Internal IPs',   
            for: 'internal_ips',
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of IPs)',
            label: 'IPv4 IPs',   
            for: 'ipv4_ips',
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of IPs)',
            label: 'IPv6 IPs', 
            for: 'ipv6_ips',    
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of Terms)',
            label: 'Terms',   
            for: 'terms',
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            selected: 0,
            description: '(select a period)',
            label: 'Period',   
            for: 'period',
            field: 'selector',
            options: [
                {value: 'month', index: 0, },
                {value: 'year', index: 1,}
            ]
            
        }
    ]

    return formData;
}


export {getFormData, createPlan}