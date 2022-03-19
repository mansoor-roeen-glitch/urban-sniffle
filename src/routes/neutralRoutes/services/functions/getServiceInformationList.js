export default function getServiceInformationList ({ serviceInformation, ownerInformation }) {

    // Variables ^^

    const generalIconsPath = '/images/serviceInformationIcons/serviceGeneralInformation'
    const planIconsPath = '/images/serviceInformationIcons/servicePlanInformation'
    

    // List Data ^^

    let generalInformation = [

        {
            svg: generalIconsPath + '/profile_icon.svg',
            heading: "Owner",
            value: ownerInformation.username
        },

        {
            svg: generalIconsPath + '/template_icon.svg',
            heading: "Template",
            value: serviceInformation.service_plan.template
        },

        {
            svg: generalIconsPath + '/node_icon.svg',
            heading: "Node",
            value: serviceInformation.node
        },

        {
            svg: generalIconsPath + '/status_icon.svg',
            heading: "Status",
            value: serviceInformation.status
        },

        {
            svg: generalIconsPath + '/hostname_icon.svg',
            heading: "Hostname",
            value: serviceInformation.hostname
        },

        {
            svg: generalIconsPath + '/password_icon.svg',
            heading: "Passowrd",
            value: "********"
        },

        {
            svg: generalIconsPath + '/password_icon.svg',
            heading: "IP Address",
            value: "127.0.0.1"
        },

    ]

    let planInformation = [

        {
            svg: planIconsPath + '/plan_name_icon.svg',
            heading: "Plan Name",
            value: serviceInformation.plan
        },

        {
            svg: planIconsPath + '/ram_icon.svg',
            heading: "Service Ram",
            value: serviceInformation.service_plan.ram
        },

        {
            svg: planIconsPath + '/size_icon.svg',
            heading: "Service Size",
            value: serviceInformation.service_plan.size
        },

        {
            svg: planIconsPath + '/bandwidth_icon.svg',
            heading: "Service Bandwidth",
            value: serviceInformation.service_plan.bandwidth
        },

        {
            svg: planIconsPath + '/plan_period_icon.svg',
            heading: "Plan Period",
            value: "Monthly"
        },

        {
            svg: planIconsPath + '/cores_icon.svg',
            heading: "Service Cores",
            value: serviceInformation.service_plan.cores
        },

        {
            svg: planIconsPath + '/plan_type_icon.svg',
            heading: "Plan Type",
            value: serviceInformation.service_plan.type
        }


    ]

    return {
        planInformation,
        generalInformation,
    }

}