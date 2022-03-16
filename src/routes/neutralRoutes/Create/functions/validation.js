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

function validate () {
    return "shit"
}

module.exports = {validate}