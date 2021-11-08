import axios from "axios";

export default async function getUserDetails (token) {

    const response = await axios({
        method: 'get',
        url: 'https://hosnet.io/auth/user/',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    
    .then((res) => {
        console.log(res)
        return {success: true, data: res.data, status: res.status};
    })
    
    .catch((err) => {
        console.log(err)
        return {success: false, data: err, status: 500};
    })

    return response;

}