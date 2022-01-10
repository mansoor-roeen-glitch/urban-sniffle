const handleOptionClick = (index, setSelectedOption) => {
    setSelectedOption(index)
}

const serviceNotActivated = (serviceInformation) => {
    if (serviceInformation.status === undefined) {
        return true;
    } else {
        return false;
    }
}

const updateScreenHeight = (setScreenHeight, screenHeight) => {
    setScreenHeight(screenHeight)
}

export {

    handleOptionClick,
    serviceNotActivated,
    updateScreenHeight

}   