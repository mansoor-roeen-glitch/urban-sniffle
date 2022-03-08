import handleStripeCheckout from "../../../functions/handleStripeCheckout";
import apiRequest from "../../../functions/apiRequest";

export default async function submitForm({data, token}) {

    let updatedDate = {

        "owner": data.owner,
        "hostname": data.hostname,
        "plan": data.plan,
        "node": "magus",
        "password": data.password,
        "template": data.template,
        "billing_type": 2

    }

    let response = await apiRequest({ 
        token: token, 
        dataset: updatedDate, 
        method: 'post',
        endpoint: "/api/services/"
    
    })

    if (response.status_code === 201) {

        let serviceDetails = response.body

        handleStripeCheckout({

            serviceId: serviceDetails.id,
            authToken: token

        })

    }

    return response;

}
