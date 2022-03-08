import apiRequest from '../../../functions/apiRequest'

export default async function fetchCreateInformation (token) {

    const plansList = await apiRequest({endpoint: '/api/plans', token})
    const templatesList = await apiRequest({endpoint: '/api/templates', token})
    const userInformation = await apiRequest({endpoint: '/auth/user', token})

    return {

        plansList,
        templatesList,
        userInformation

    }

}