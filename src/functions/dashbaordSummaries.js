import apiRequest from './apiRequest'

const getDashboardSummaries = async ({token}) => {
    // make an api call to /dashboardsummaries/summary
    // let users = await apiRequest({token, endpoint: '/auth/users' })
    let summary = await apiRequest({token, endpoint: '/core/dashboardsummaries/summary/'})
    let ipList = await apiRequest({token, endpoint: '/core/ips/'})
    let userList = await apiRequest({token, endpoint: '/auth/users/'})

    return {summary, ipList, userList};
}

export {getDashboardSummaries}