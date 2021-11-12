import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default async function handleCheckout (serviceId, authToken) {

    // Call your backend to create the Checkout Session
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

    .then(function(result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        if (result.error) {
            alert(result.error.message);
        }
    });
}