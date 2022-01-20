// Importing functions
import fetchEndpoint from '../../../functions/fetchAnEndpoint'
import postRequest from '../../../functions/postRequest'


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


    const userInformation = await fetchEndpoint({

        token: token,
        endpoint: `/auth/user/`
        
    })

    
    if ( userInformation.success === false ) {

        // Handle Error
        
        setError( error.push( {

            errorMessage: userInformation.error_message,
            status_code: userInformation.status_code,
            is_critical: true

        } ) )

        setLoading( false )

        setSuccess( false )

        return false;

    }


    const serviceInformation = await fetchEndpoint({

        token: token,
        endpoint: `/api/services/${serviceId}`
        
    })


    if ( serviceInformation.success === false ) {

        // Handle Error
        
        setError( error.push( {

            errorMessage: serviceInformation.error_message,
            status_code: serviceInformation.status_code,
            is_critical: true

        } ) )

        setLoading( false )

        setSuccess( false )

        return false;

    }

    const serviceConsole = await postRequest({

        token: token,
        endpoint: `/api/services/${serviceId}/console_login`

    })


    if ( serviceConsole.success === false ) {

        // Handle Error

        setError( error.push( {

            errorMessage: serviceConsole.error_message,
            status_code: serviceConsole.status_code,
            is_critical: false

        } ) )


    }

    const serviceStatus = await postRequest({

        token: token,
        endpoint: `/api/services/${serviceId}/status`

    })


    if ( serviceConsole.success === false ) {

        // Handle Error

        setError( error.push( {

            errorMessage: serviceStatus.error_message,
            status_code: serviceStatus.status_code,
            is_critical: false

        } ) )


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
