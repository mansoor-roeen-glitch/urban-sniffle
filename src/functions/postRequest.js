import axios from 'axios';

export default async function postRequest({token, dataset, endpoint}) {
    
    const response = await axios (

        {
            
            data: dataset,
            method: 'post',
            url: `https://hosnet.io${endpoint}/`,
            
            headers: {

                'content-type': 'application/json',
                'Authorization': `Token ${token}`

            }

        }
    )

    .then((data) => ({

        body: data.data,
        status_code: data.status,
        success: true,

    }))

    .catch((error) => ({
        
        success: error.status || false,
        error_message: error.detail,
        status_code: error.status || 401,

    }))

    return await response;
    
}
