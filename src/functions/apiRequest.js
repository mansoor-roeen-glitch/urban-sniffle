// Dependencies
import axios from "axios"

export default async function request ({endpoint, token, method, data}) {

    // response variable for response
    let response = {};

    // request url and request headers
    let requestUrl = `https://hosnet.io/api${endpoint}`;   
    let requestHeaders = {
        'content-type': 'application/json',
        'Authorization': `Token ${token}`,}

    let authRequestHeaders = {
        'content-type': 'application/json',
    }

    // will check if endpoint contains auth in it
    if (endpoint.includes('/auth/login') || endpoint.includes('/auth/register') || endpoint.includes('/auth/reset')) {
        requestHeaders = authRequestHeaders
    }

    // axios API request
    response = await axios({
        method: method || 'get',
        data: data || {},
        url: requestUrl,
        headers: requestHeaders,
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