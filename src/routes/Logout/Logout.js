import React, { useEffect } from 'react'

export default function Logout() {
    
    useEffect(() => {

        localStorage.removeItem("x-token");
        window.location.href = window.location.href

    })

    return ( null )
}
