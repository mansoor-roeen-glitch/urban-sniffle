export default function handleNavbarOptions (isUserDataLoading, userData) {

    const clientAcessOptions = [
        {
            text: "Services",
            link: "/services",
            icon_path: "services.svg",
            width: "19px",
            height: "19px"
        },
        {
            text: "Support",
            link: "/support",
            icon_path: "support.svg",
            width: "19px",
            height: "19px"
        }
    ]

    const adminAccessOptions = [
        {
            text: "Dashboard",
            link: "/admin-dashboard",
            icon_path: "services.svg",
            width: "19px",
            height: "19px"
        },
        {
            text: "Services",
            link: "/services",
            icon_path: "services.svg",
            width: "19px",
            height: "19px"
        },
        {
            text: "Plans",
            link: "/plans",
            icon_path: "plans.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Nodes",
            link: "/nodes",
            icon_path: "plans.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Pools",
            link: "/pools",
            icon_path: "plans.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Templates",
            link: "/templates",
            icon_path: "templates.svg",
            width: "19px",
            height: "19px"
        },
        {
            text: "Support",
            link: "/support",
            icon_path: "support.svg",
            width: "19px",
            height: "19px"
        }
    ]

    if (isUserDataLoading || !userData || !userData.is_staff) {
        return clientAcessOptions;
    }

    if (!isUserDataLoading && userData.is_staff) {
        return adminAccessOptions;
    }

}