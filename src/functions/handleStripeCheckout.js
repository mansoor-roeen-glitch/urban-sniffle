import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default async function handleStripeCheckout ({serviceId, authToken}) {

    // handle checkout with stripe
    axios.get(`https://hosnet.io/api/services/${serviceId}/billing/`, {

        headers: {
            "Authorization": `Token ${authToken}`
        }

    })
    
    .then( async function(session) {

        const stripePromise = loadStripe(session.data.key);
        const stripe = await stripePromise;

        return stripe.redirectToCheckout({ sessionId: session.data.sessionid });
    })

    .catch((error) => {
        return {success: false, error: "something went wrong, try again later"}    
    })

}