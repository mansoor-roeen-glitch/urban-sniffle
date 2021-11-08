import React, { useEffect } from 'react'

export default function Logout() {
    
    useEffect(() => {

        localStorage.removeItem("x-token");
        window.location.pathname = '/'
        window.location.href = window.location.href

    })

    return ( <h1>Logging out ... </h1> )
}
