// Dependencies
import axios from "axios"

export default async function fetchEndpoint ({endpoint, token}) {

    // response variable for response
    let response = {};

    // request url and request headers
    const requestUrl = `https://hosnet.io${endpoint}`;
    const requestHeaders = {
        'content-type': 'application/json',
        'Authorization': `Token ${token}`
    }

    // get request url
    response = await axios({
        method: 'get',
        url: requestUrl,
        headers: requestHeaders
    })

    // if request was successful do this 
    .then((data) => ({
        body: data.data,
        status_code: data.status,
        success: true,
    }))

    // if request failed do this
    .catch((error) => ({
        success: error.status || false,
        error_message: error.detail,
        status_code: error.status || 401,
    }))

    // return the response
    return await response;
}