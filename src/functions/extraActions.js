// functions
import apiRequest from "./apiRequest"

const action = async ({...props}) => {
        
    // destructurization of component props
    let {name, service_id, action, alertCleanup, setActionLoading, showMessage, token, dataset} = props

    // reset and remove the alert message
    // set action loading to true
    alertCleanup()
    setActionLoading(true)
    
    // push request to endpoint/action
    let result = await apiRequest({
        method: 'post',
        endpoint: `/api/services/${service_id}/${action}/`,
        token: token,
        dataset,
    })

    // if succeeds then show a success message
    if (result.success) {
        showMessage({
            success: true,
            title: 'Task completed',
            description: `"${name}" ${action} succeeded`
        })

    } 
    
    // otherwise show an error message
    else if  (!result.success) {
        showMessage({
            success: false,
            title: 'Task failed',
            description: `"${name}" ${action} failed`
        })
    }
    
    // loading completed
    setActionLoading(false)

}

const deleteAction = async ({...props}) => {
        
    // destructurization of component props
    let {name, endpoint, action, alertCleanup, setActionLoading, showMessage, token, dataset} = props

    // reset and remove the alert message
    // set action loading to true
    alertCleanup()
    setActionLoading(true)
    
    // push request to endpoint/action
    let result = await apiRequest({
        endpoint: `/api/${endpoint}/${action}`,
        token: token,
        dataset
    })

    // if succeeds then show a success message
    if (result.success) {
        showMessage({
            success: true,
            title: 'Task completed',
            description: `"${name}" ${action} succeeded`
        })

    } 
    
    // otherwise show an error message
    else if  (!result.success) {
        showMessage({
            success: false,
            title: 'Task failed',
            description: `"${name}" ${action} failed`
        })
    }
    
    // loading completed
    setActionLoading(false)

}

export {
    action  
}