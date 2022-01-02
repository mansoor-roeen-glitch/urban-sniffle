import axios from "axios"

function fetchEndpoint ({endpoint}) {
    
    const response = axios.get(endpoint)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => ({
            
            error_message: error,

        }))

    console.log(response)

}
