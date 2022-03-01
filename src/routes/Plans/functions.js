// Functions
import fetchEndpoint from "../../functions/fetchAnEndpoint"

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

// validation function for integers
const integerValidation = (value, max, min, float) => {

    // running regex to test value
    let isWholeNumber = /^\d+$/.test(value);
    let isFloatNumber = /[+-]?([0-9]*[.])?[0-9]+/.test(value);
    let isStringValid = float ? isFloatNumber : isWholeNumber;

    // parsing the value depending on "float" prop
    let parseValue = (value) => {
        if (float) return parseFloat(value);
        return parseInt(value)
    }

    // checks if the string is integer 
    if (isStringValid) {
        // checks if max or min values have been passed
        if (max || min) {
            // if failed, we'll set error to true and send a message
            if (parseValue(isStringValid) > max || parseValue(isStringValid) < min) {
                return {error: true, error_message: `must be ${min}-${max}`};}
            else { return {error: false, error_message: ''}}
        }

        return {error: false, error_message: ''}
    }

    return {error: true, error_message: `must be integer`}
}

// this function returns the form data
// the form data would be used to create form fields
const getFormData = (data) => { 

    let formData = [
        {
            value: data.name,
            inputValue: '',
            errorMes: false,
            description: '(Please enter plan name)',
            label: 'Plan Name',   
            stringValidation, 
            field: 'string',
            regex: /^[A-Za-z0-9 ]+$/,
            minmax: {
                max: 50,
                min: 2,
            }
        },
        {
            value: data.price,
            description: '(in USD)',
            label: 'Price',   
            field: 'float',
            minmax: false,
        },
        {
            value: data.ram,
            inputValue: '',
            description: '(in megabytes)',
            label: 'Ram',   
            field: 'number',
            minmax: {
                max: 1073741824,
                min: 100,
            }
        },
        {
            value: data.storage,
            inputValue: '',
            description: '(in megabytes)',
            label: 'Storage',   
            field: 'number',
            minmax: {
                max: 1073741824,
                min: 100,
            }
        },
        {
            value: data.bandwidth,
            inputValue: '',
            description: '(in megabytes)',
            label: 'Bandwidth',   
            field: 'number',
            minmax: {
                max: 1073741824,
                min: 100,
            }
        },
        {
            value: data.cores,
            inputValue: '',
            description: '(no. of cores)',
            label: 'No. Cores',   
            field: 'number',
            minmax: {
                max: 8,
                min: 1,
            }
        },
        {
            value: data.cpu_units,
            inputValue: '',
            description: '(no. of units)',
            label: 'Storage',   
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: data.cpu_limit,
            description: '',
            label: 'CPU Limit',   
            field: 'float',
            minmax: false,
        },
        {
            value: data.swap,
            inputValue: '',
            description: '(in megabytes)',
            label: 'Swap',   
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: data.internal_ips,
            inputValue: '',
            description: '(no. of IPs)',
            label: 'Internal IPs',   
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: data.ipv4_ips,
            inputValue: '',
            description: '(no. of IPs)',
            label: 'IPv4 IPs',   
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: data.ipv6_ips,
            inputValue: '',
            description: '(no. of IPs)',
            label: 'IPv6 IPs',   
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            value: data.term,
            inputValue: '',
            description: '(no. of Terms)',
            label: 'Terms',   
            field: 'number',
            minmax: {
                max: 1,
                min: 10,
            }
        },
        {
            selected: 0,
            description: '(select a node)',
            label: 'Node',   
            field: 'selector',
            options: [
                {
                    value: 'Magus',
                    index: 0,
                },
                {
                    value: 'Magus',
                    index: 0,
                },
                {
                    value: 'Magus',
                    index: 0,
                }
            ]
            
        },
        // {
        //     value: data.price,
        //     errorMes: false,
        //     label: 'Price',
        //     field: 'float',
        //     integerValidation,
        // },
        // {
        //     value: data.size,
        //     errorMes: false,
        //     label: 'Storage',
        //     integerValidation,
        //     field: 'number',
        // }
    ]

    return formData;
}

// this function returns the plan details
const getPlan = async (props) => {

    // getting token
    const {token, plan_id} = props

    const response = await fetchEndpoint({
        options: true,
        token: token,
        endpoint: '/api/plans/' + plan_id,
    })

    // sending response back
    return await response
}

// const validateForm = (props) => {

//     let {
//        name,
//        setName,
//        price,
//        setPrice,
//        size, 
//        setSize,
//        cores, 
//        setCores,
//        ram,
//        setRam,
//        bandwidth, 
//        setBandwidth,
//        cpuLimit,
//        setCpuLimit,
//        cpuUnits,
//        setCpuUnits,
//        swap,
//        setSwap,
//        ipv4,
//        setIpv4,
//        setIpv6,
//        internalIps,
//        setInternalIps,
//     }

//     let isFormValid = true;

//     if (!name.value || name.value.length < 2 || name.value.length > 20) {
//         setName(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be between 1-20 char long"
//         }))

//         isFormValid = false
//     }

//     if (!/^\d+(?:[.,]\d+)*$/.test(price.value) || !price.value) {
//         setPrice(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must only be int or float"
//         }))

//         isFormValid = false
//     }

//     if (!size.value || !/^\d+$/.test(size.value)) {
//         setSize(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must only be int only"
//         }))

//         isFormValid = false
//     }

//     if (!cores.value || !/^\d+$/.test(cores.value)) {
//         setCores(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!ram.value || !/^\d+$/.test(ram.value)) {
//         setRam(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!bandwidth.value || !/^\d+$/.test(bandwidth.value)) {
//         setBandwidth(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!cpuLimit.value || !/^\d+(?:[.,]\d+)*$/.test(cpuLimit.value)) {
//         setCpuLimit(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!swap.value || !/^\d+$/.test(swap.value)) {
//         setSwap(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!cpuUnits.value || !/^\d+(?:[.,]\d+)*$/.test(cpuUnits.value)) {
//         setCpuUnits(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int or float only"
//         }))

//         isFormValid = false
//     }

//     if (!ipv4.value || !/^\d+$/.test(ipv4.value)) {
//         setIpv4(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!ipv6.value || !/^\d+$/.test(ipv6.value)) {
//         setIpv6(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!internalIps.value || !/^\d+$/.test(internalIps.value)) {
//         setInternalIps(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     if (!term.value || !/^\d+$/.test(term.value)) {
//         setTerm(prevState => ({
//             ...prevState,
//             hasErrorMessage: true,
//             errorMes: "must be int only"
//         }))

//         isFormValid = false
//     }

//     return isFormValid;

// }

export {getPlan, getFormData}