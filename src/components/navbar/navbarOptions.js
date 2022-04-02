export default function navbarOptions (user) {

    const clientAcessOptions = [
        {
            text: "Services",
            link: "/services",
            icon_path: "services.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Support",
            link: "/support",
            icon_path: "support.svg",
            width: "18px",
            height: "18px"
        }
    ]

    const adminAccessOptions = [
        {
            text: "Dashboard",
            link: "/",
            icon_path: "services.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Services",
            link: "/services",
            icon_path: "services.svg",
            width: "18px",
            height: "18px"
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
            link: "/ippools",
            icon_path: "plans.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Templates",
            link: "/templates",
            icon_path: "templates.svg",
            width: "18px",
            height: "18px"
        },
        {
            text: "Support",
            link: "/support",
            icon_path: "support.svg",
            width: "18px",
            height: "18px"
        }
    ]

    if (!user?.body || !user?.body?.is_staff) {
        return clientAcessOptions;
    }

    if (user?.body?.is_staff) {
        return adminAccessOptions;
    }

}