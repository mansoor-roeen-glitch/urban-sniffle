const isValidPassword = (input) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(input)) {
        return true
    } else {
        return false
    }
}

const isValidHostname = (input) => {
    if (/^[a-zA-Z0-9-_]+$/.test(input)) {
        return true
    } else {
        return false
    }
}

export const validateForm = ({hostname, password}) => {
    
    let isHostnameValid = true
    let isPasswordValid = true

    if (!hostname || !isValidHostname(hostname)) {
        isHostnameValid = false;
    }

    if (!password || !isValidPassword(password)) {
        isPasswordValid= false
    }

    return {isHostnameValid, isPasswordValid};

}
