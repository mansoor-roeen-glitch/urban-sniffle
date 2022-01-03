import fetchEndpoint from '../../../functions/fetchAnEndpoint'

export default async function fetchCreateInformation (token) {

    const plansList = await fetchEndpoint({endpoint: '/api/plans', token})
    const templatesList = await fetchEndpoint({endpoint: '/api/templates', token})
    const userInformation = await fetchEndpoint({endpoint: '/auth/user', token})

    return {

        plansList,
        templatesList,
        userInformation

    }

}