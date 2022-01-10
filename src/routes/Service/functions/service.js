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

        setLoading,
        setSuccess,
        setError,
        error

    } = props


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

    setServiceInformation( serviceInformation )
    
    setServiceConsole( serviceConsole )

    setServiceStatus( serviceStatus )


    // Updating loading and error

    setLoading( false )
    
    setSuccess( true )

    console.log(serviceInformation)
    return {

        serviceStatus,
        serviceConsole,
        serviceInformation,

    }
    
}
