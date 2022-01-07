import handleStripeCheckout from "../../../functions/handleStripeCheckout";
import postRequest from "../../../functions/postRequest";

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

    let response = await postRequest({ 
        
        token: token, 
        dataset: updatedDate, 
        endpoint: "/api/services"
    
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
