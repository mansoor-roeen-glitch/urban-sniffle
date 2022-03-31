import {apiRequest} from './apiRequest'

const getDashboardSummaries = async ({token}) => {
    // make an api call to /dashboardsummaries/summary
    let summary = await apiRequest({token, url: '/core/dashboardsummaries/summary/'})
    let users = await apiRequest({token, url: '/auth/users' })
    let ips = await apiRequest({token, url: '/core/ips/'})
}

export {getDashboardSummaries}