const TABLE_LABELS_DATA = {
    service: ["hostname", "plan", "status", "ram"],
    plan: ["name", "size", "period", "bandwidth"],
    node: ["name", "size", "period", "bandwidth"],
    template: ["name", "type", "id", "file"],
}

const ACTIVE_MACHINE_EXTRA_ACTIONS = [
    {
        file: "reboot_button.svg",
        label: "Reboot Machine",
        action: 'reboot',
    },
    {
        file: "stop_button.svg",
        label: 'Stop Machine',
        action: 'stop',

    },
    {
        file: "power_button.svg",
        label: "Shutdown",
        action: "shutdown",
    },
]

const INACTIVE_MACHINE_EXTRA_ACTIONS = [
    {
        file: "reboot_button.svg",
        label: "Reboot Machine",
        action: 'reboot',
    },
    {
        file: "stop_button.svg",
        label: 'Start Machine',
        action: 'start',

    },
    {
        file: "power_button.svg",
        label: "Shutdown",
        action: "shutdown",
    },
]

export {
    ACTIVE_MACHINE_EXTRA_ACTIONS,
    INACTIVE_MACHINE_EXTRA_ACTIONS,
    TABLE_LABELS_DATA
}