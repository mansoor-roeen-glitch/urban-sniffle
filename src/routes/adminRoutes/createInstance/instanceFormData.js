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

const nodeFormData = ({putOptions, mapChoices, selectedChoice}) => {
    return [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Please enter node name)',
            label: 'Node name',   
            for: 'name',
            stringValidation, 
            field: 'string',
            regex: /^[A-Za-z0-9 ]+$/,
            minmax: {max: 50, min: 2}
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Ram',   
            for: 'ram',
            field: 'number',
            minmax: {max: 1073741824,}
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Storage',   
            for: 'size',
            field: 'number',
            minmax: {max: 1073741824,}
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Bandwidth',   
            for: 'bandwidth',
            field: 'number',
            minmax: {max: 1073741824,}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of cores)',
            label: 'No. Cores',   
            for: 'cores',
            field: 'number',
            minmax: {max: 8,}
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Swap', 
            for: 'swap',
            field: 'number',
            minmax: {max: 10,}
        },
        {
            intialChoice: 'hosnet',
            selected: 0,
            description: '(select a cluster)',
            label: 'Cluster',   
            for: 'cluster',
            field: 'selector',
            options: [{value: 1, index: 0}]
            
        },
        {
            intialChoice: '',
            selected: 0,
            description: '(select the type)',
            label: 'Node Type',    
            options: mapChoices('type')
        }
    ]
}

const planFormData = ({data, putOptions, mapChoices, selectedChoice}) => {
    return [
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
            minmax: {max: 50, min: 2}
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
            minmax: {max: 1073741824}
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Storage',   
            for: 'size',
            field: 'number',
            minmax: {max: 1073741824}
        },
        {
            value: '',
            inputValue: '',
            description: '(in megabytes)',
            label: 'Bandwidth',   
            for: 'bandwidth',
            field: 'number',
            minmax: {max: 1073741824}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of cores)',
            label: 'No. Cores',   
            for: 'cores',
            field: 'number',
            minmax: {max: 8}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of units)',
            label: 'No. Cpu Units',   
            for: 'cpu_units',
            field: 'number',
            minmax: {max: 10}
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
            minmax: {max: 10}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of IPs)',
            label: 'Internal IPs',   
            for: 'internal_ips',
            field: 'number',
            minmax: {max: 10}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of IPs)',
            label: 'IPv4 IPs',   
            for: 'ipv4_ips',
            field: 'number',
            minmax: {max: 10}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of IPs)',
            label: 'IPv6 IPs', 
            for: 'ipv6_ips',    
            field: 'number',
            minmax: {max: 10}
        },
        {
            value: '',
            inputValue: '',
            description: '(no. of Terms)',
            label: 'Terms',   
            for: 'terms',
            field: 'number',
            minmax: {max: 10}
        },
        {
            selected: 0,
            description: '(select a period)',
            label: 'Period',   
            for: 'period',
            field: 'selector',
            options: [{value: 'month', index: 0, }, {value: 'year', index: 1}]
        }
    ]
}

const templateFormData = ({data, putOptions, mapChoices, selectedChoice}) => {
    return [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter template name)',
            label: 'Template Name',   
            for: 'name',
            stringValidation, 
            field: 'string',
            regex: /^[A-Za-z0-9 ]+$/,
            minmax: {max: 50, min: 2}
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter template file)',
            label: 'Template File',   
            for: 'file',
            stringValidation, 
            field: 'string',
            regex: /^[A-Za-z0-9 ]+$/,
            minmax: {max: 50, min: 1}
        },
        {
            intialChoice: 0,
            selected: 0,
            description: '(select the type)',
            field: 'selector',
            for: 'type',
            label: 'Template Type',    
            options: mapChoices('type')
        },
    ]
}

export {nodeFormData, planFormData, templateFormData}