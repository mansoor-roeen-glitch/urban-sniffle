import { ACTIVE_MACHINE_EXTRA_ACTIONS, INACTIVE_MACHINE_EXTRA_ACTIONS } from "../../../constants";
import postRequest from "../../../functions/postRequest";

const actionConfirmed = async (id, hostname, action, alertCleanup, setActionLoading, showMessage, token) => {
        
    alertCleanup()
    setActionLoading(true)
    
    let result = await postRequest({

        endpoint: `/api/services/${id}/${action}`,
        token: token,
        dataset: {}

    })
            
    if (result.success) {
        showMessage({
            success: true,
            title: 'Task completed',
            description: `"${hostname}" ${action} succeeded`
        })

    } else if  (!result.success) {
        showMessage({
            success: false,
            title: 'Task failed',
            description: `"${hostname}" ${action} failed`
        })
    }
    
    setActionLoading(false)

}

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
    checkMachineStatus,
    actionConfirmed
}   