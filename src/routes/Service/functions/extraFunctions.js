import { ACTIVE_MACHINE_EXTRA_ACTIONS, INACTIVE_MACHINE_EXTRA_ACTIONS } from "../../../constants";

const checkMachineStatus = (status) => {
    if (status === 'inactive' || status === 'stopped') {
        return 'not_active'
    } else if (status === 'running') {
        return 'active';
    } else if (status === 'pending') {
        return 'pending'
    }
}

const getExtraActions = (status) => {
        
    const machineStatus = checkMachineStatus(status);

    if (machineStatus === 'active') {
        return ACTIVE_MACHINE_EXTRA_ACTIONS;
    } 

    return INACTIVE_MACHINE_EXTRA_ACTIONS;

} 

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
    updateScreenHeight,
    getExtraActions,
    checkMachineStatus
}   