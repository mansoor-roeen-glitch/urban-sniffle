import validator from 'validator';
import apiRequest from '../../../functions/apiRequest';

// validation function for string inputs
const stringValidation = ({value, fieldData}) => {

    if (!fieldData.validationType) return {error: false};

    let min = fieldData?.validation?.min;
    let max = fieldData?.validation?.max;

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

    // else if, return with no error
    return {error: true, error_message: 'String must be alphanumeric' }
}

// get list of manytomany choices
const getManytomanyListsChoices = async ({endpoints, token}) => {
    let results = [];

    // if endpoints is not provided then return empty array
    if (!endpoints || !endpoints.plural || !endpoints.app) return [];

    // make a request 
    let response = await apiRequest({endpoint: `/${endpoints.app}/${endpoints.plural}/?no_page`, token});

    // process the request
    if (response.success) results = response.body.map(({id, name}, index) => ({value: id, label: name, index, isChecked: false}));

    return await results
}

// get list of foreignkey choices
const getForeignkeyChoices = async ({endpoints, token}) => {
    let results = [];

    // if endpoints is not provided then return empty array
    if (!endpoints || !endpoints.plural || !endpoints.app) return [];

    // make a request 
    let response = await apiRequest({endpoint: `/${endpoints.app}/${endpoints.plural}/?no_page`, token});

    // process the request
    if (response.success) results = response.body.map(({id, name, __str__}, index) => ({value: __str__, label: name, index, id}));

    return await results
}

// form field object initializer
const initializeFormFeild = (option) => {
    return {
        key: option.key,
        type: option.type,
        ui: option.ui,
    }
}

const newManyToManyFormField = async ({option, token}) => {
    // new form field initialized
    let formField = initializeFormFeild(option); 
    let choicesList = await getManytomanyListsChoices({endpoints: option.related_endpoint, token}); 

    formField.choices = choicesList;
    formField.validation = option.validation
    return formField;
}

const newForeignFormFeild = async ({option, token}) => {
    // new form field initialized
    let formField = initializeFormFeild(option); 
    let choicesList = await getForeignkeyChoices({endpoints: option.related_endpoint, token}); 

    let defaultValue = 0;
    let currentChoice = 0; 
    
    formField.choices = choicesList;
    formField.default = defaultValue;
    formField.choice = currentChoice;
    formField.validation = option.validation

    return formField;
}

// this function returns and object depending on field type
const newFormField = ({option}) => {
    // new form field initialized
    let formField = initializeFormFeild(option)

    // if it's only for display
    if (option.read_only) {
        formField.type = 'read_only'
        return formField
    }

    if (option.type === "select") {
        formField.choices = option.choices
        formField.default = 0
        formField.choice = 0

        // return the form field
        return formField
    }

    else if (option.type === "text" || option.type === "number") {
        formField.value = ''
        formField.inputValue = ''
        formField.validation = option.validation
        formField.inputError = false
        formField.validation.validator = stringValidation

        // return the form field
        return formField
    }

    return formField
}

// this function maps through list of options
const initializeForm = async ({options, token}) => {
    let formFields = [];

    // check if options.body is empty or is not an array
    if (!Array.isArray(options?.body) || options.body === []) return [];

    // map thorugh all the form fields
    // get the field data for the form
    console.log(options, token)
    formFields = await options.body.map( async (option, index) => {
        if (option.type === 'foreignkey') return await newForeignFormFeild({option, token, index})
        else if (option.type === 'manytomany-lists') return await newManyToManyFormField({option, token, index})
        else return newFormField({option})
    })

    return Promise.all(formFields).then(response => response)
}

export {initializeForm}