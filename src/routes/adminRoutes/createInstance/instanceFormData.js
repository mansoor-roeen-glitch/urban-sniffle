import validator from 'validator'

// validation function for string inputs
const stringValidation = ({value, fieldData}) => {
    
    if (!fieldData.validationType) return {error: false};

    let {min, max} = fieldData?.minmax;
    let stringValidator = validator[fieldData.validationType]

    // check if ip is either version 4 or version 6
    // if neither then return false
    let ipValidator = () => {
        if (stringValidator(value, 4)) return true
        else if (stringValidator(value, 6)) return true
        else return false
    }

    // running the validation test on value
    let isStringValid = fieldData.validationType === 'isIP' 
        ? ipValidator() 
        : stringValidator(value, 'en-US', {ignore: fieldData.ignore});
 
    // if validation test passed then
    if (isStringValid) {
        
        // check if there's a minmax field
        if (min || max) {
            // check if length is more than or less than max and min
            if (!validator.isLength(value, {min, max})) 
                return {error: true, error_message: `must be ${min}-${max}`}
            else return {error: false, error_message: '' };
        }
        
        // else if, return with no error
        return {error: false, error_message: '' }       
    }

    if (!value) {
        return {error: false, error_message: '' }       
    }

    // else if, return with no error
    return {error: true, error_message: 'String must be alphanumeric' }
}

const nodeFormData = ({mapChoices}) => {
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
            ignore: ' -_',
            validationType: 'isAlphanumeric',
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

const planFormData = ({mapChoices}) => {
    return [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Please enter plan name)',
            label: 'Plan Name',   
            for: 'name',
            stringValidation, 
            ignore: ' -_',
            validationType: 'isAlphanumeric',
            field: 'string',
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

const templateFormData = ({mapChoices}) => {
    return [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter template name)',
            label: 'Template Name',   
            for: 'name',
            stringValidation, 
            ignore: ' -_',
            validationType: 'isAlphanumeric',
            field: 'string',
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
            ignore: '',
            validationType: 'isAlphanumeric',
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

const poolFormData = ({mapChoices}) => {
    return [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter IP Pool Name)',
            label: 'Pool Name',   
            for: 'name',
            stringValidation, 
            ignore: ' -_',
            validationType: 'isAlphanumeric',
            field: 'string',
            minmax: {max: 50, min: 2}
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter Network Address)',
            label: 'Pool Network',   
            for: 'network',
            stringValidation, 
            field: 'string',
            validationType: 'isIP',
            minmax: {max: 45, min: 7 }
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter Gateway Address)',
            label: 'Pool Gateway',   
            for: 'gateway',
            stringValidation, 
            field: 'string',
            validationType: 'isIP',
            minmax: {max: 45, min: 7 }
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter DNS Address)',
            label: 'Pool DNS',   
            for: 'dns',
            stringValidation, 
            field: 'string',
            validationType: 'isIP',
            minmax: {max: 45, min: 7 }
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter an interface)',
            label: 'Pool Interface',   
            for: 'interface',
            stringValidation, 
            field: 'string',
            ignore: ' -_',
            validationType: 'isAlphanumeric',
            minmax: false,
        },
        {
            value: '',
            inputValue: '',
            description: '',
            label: 'Pool Mask',   
            for: 'mask',
            field: 'number',
            minmax: {max: 1025, min: 0 }
        },
        {
            intialChoice: 0,
            selected: 0,
            description: '(select the type)',
            field: 'selector',
            for: 'type',
            label: 'Pool Type',    
            options: mapChoices('type')
        },
        {
            selected: 0,
            description: '(select true or false)',
            label: 'Internal',   
            for: 'internal',
            field: 'selector',
            options: [{value: 'true', index: 0, }, {value: 'false', index: 1}]
        }
    ]
}


const serviceFormData = ({mapChoices}) => {
    return [
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter VPS Hostname)',
            label: 'VPS Hostname',   
            for: 'hostname',
            stringValidation, 
            ignore: ' -_',
            validationType: 'isAlphanumeric',
            field: 'string',
            minmax: {max: 50, min: 2}
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(Enter strong password)',
            label: 'VPS Password',   
            for: 'password',
            stringValidation, 
            field: 'string',
            minmax: {max: 50, min: 6 }
        },
        {
            value: '',
            inputValue: '',
            errorMes: false,
            description: '(VPS Owner Username)',
            label: 'VPS Owner',   
            for: 'owner',
            stringValidation, 
            field: 'string',
            ignore: ' -_',
            validationType: 'isAlphanumeric',
            minmax: {max: 45, min: 1 }
        },
        {
            intialChoice: 'Basic',
            selected: 0,
            description: '(select a plan)',
            label: 'VPS Plan',   
            for: 'plan',
            field: 'selector',
            options: [{value: 'Basic', index: 0}, {value: 'Affordable', index: 1}, {value: 'Scalable', index: 2}]
        },
        {
            intialChoice: 'Ubuntu Focal',
            selected: 0,
            description: '(Select a template)',
            label: 'VPS Template',   
            for: 'template',
            field: 'selector',
            options: [{value: 'Ubuntu Focal', index: 0}, {value: 'CentOS 8', index: 1}, {value: 'Ubuntu Bionic', index: 2}]
        },
        {
            intialChoice: 'Magus',
            selected: 0,
            description: '(Select a node)',
            label: 'VPS Node',   
            for: 'node',
            field: 'selector',
            options: [{value: 'magus', index: 0}]
        },
        {
            intialChoice: 'Stripe',
            selected: 0,
            description: '(Select a billing type)',
            label: 'VPS Billing',   
            for: 'billing',
            field: 'selector',
            options: [{value: 'stripe', index: 0}]
        }
    ]
}

export {nodeFormData, planFormData, templateFormData, poolFormData, serviceFormData}