import React from 'react'

export default function UpdateService() {
    
    // React State Hooks

    const [success, setSuccess] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState();

    const [plan, setPlan] = React.useState(0)
    const [status, setStatus] = React.useState(0)
    const [node, setNode] = React.useState(0)
    const [template, setTemplate] = React.useState(0)
    const [planType, setPlanType] = React.useState(0)
    const [pool, setPool] = React.useState(0)
    
    const [dropdownDetailsLoading, setDropdownDetailsLoading] = React.useState(true);
    const [dropdownDetailsSuccess, setDropdownDetailsSuccess] = React.useState();
    const [dropdownDetailsError, setDropdownDetailsError] = React.useState();
    const [dropdownDetails, setDropdownDetails] = React.useState();
    
    return (
        <div>
            
        </div>
    )
}
c