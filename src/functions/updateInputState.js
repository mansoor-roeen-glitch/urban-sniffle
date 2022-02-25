export default updateInputStates = ({value, description, validationFunc}) => {
    return {
        value: value,
        errorMes: false,
        description,
        validationFunc,
    }
}       