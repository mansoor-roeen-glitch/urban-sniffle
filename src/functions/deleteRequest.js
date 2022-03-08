// dependencies
import { loginRequest } from "./authenticator";
import apiRequest from "./apiRequest";

// first see if password is working
export default async function deleteRequest ({password, email, username, id, endpoint, token}) {
    let response = await loginRequest({password, email, username})

    // see if password was valid
    // we'll show message depending on server response
    if (response.success) {
        let deleteResponse = await apiRequest({
            token,
            method: 'delete',
            endpoint: `/api/${endpoint}/${id}/`,
        })

        if (!deleteResponse.status) {
            return 'delete_failed';
        }

        return 'delete_successful' } 

    return 'authentication_failed';
}
