const handleOptionClick = (index) => {
    setSelectedOption(index)
}

const serviceNotActivated = () => {
    if (details.status === undefined) {
        return true;
    } else {
        return false;
    }
}

const updateScreenHeight = (setScreenHeight) => {
    setScreenHeight(screenHeight)
}

export {

    handleOptionClick,
    serviceNotActivated,
    updateScreenHeight

}