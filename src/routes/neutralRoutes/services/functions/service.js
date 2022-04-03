// Importing functions
import apiRequest from '../../../../functions/apiRequest'

export default async function service ({ ...props }) {

    // Passed properties
    const { 

        token,
        serviceId,

        setServiceConsole,
        setServiceInformation,
        setServiceStatus,
        setUserInformation,

        setLoading,
        setSuccess,
        setError,
        error

    } = props


    const userInformation = await apiRequest({
        token: token,
        endpoint: `/auth/user/`
    })

    
    if ( userInformation.success === false ) {

        // Handle Error
        setError(error.push({
            errorMessage: userInformation.error_message,
            status_code: userInformation.status_code,
            is_critical: true
        }))

        setLoading( false )
        setSuccess( false )
        return false;

    }


    const serviceInformation = await apiRequest({
        token: token,
        endpoint: `/core/services/${serviceId}`
    })


    if ( serviceInformation.success === false ) {

        // Handle Error
        setError(error.push({
            errorMessage: serviceInformation.error_message,
            status_code: serviceInformation.status_code,
            is_critical: true
        }))

        setLoading( false )
        setSuccess( false )
        return false;

    }

    const serviceConsole = await apiRequest({
        token: token,
        method: 'post',
        endpoint: `/core/services/${serviceId}/console_login/`
    })


    if ( serviceConsole.success === false ) {

        // Handle Error
        setError(error.push({
            errorMessage: serviceConsole.error_message,
            status_code: serviceConsole.status_code,
            is_critical: false
        }))


    }

    const serviceStatus = await apiRequest({
        method: 'post',
        token: token,
        endpoint: `/core/services/${serviceId}/status/`
    })


    if ( serviceConsole.success === false ) {

        // Handle Error
        setError( error.push({
            errorMessage: serviceStatus.error_message,
            status_code: serviceStatus.status_code,
            is_critical: false
        }))


    }


    // Updating "Service" state
    setUserInformation( userInformation )
    setServiceInformation( serviceInformation )
    setServiceConsole( serviceConsole )
    setServiceStatus( serviceStatus )   


    // Updating loading and error
    setLoading( false )
    setSuccess( true )


    return {

        serviceStatus,
        serviceConsole,
        serviceInformation,

    }
    
}
