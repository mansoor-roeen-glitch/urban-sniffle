// Importing Libraries
import React from 'react'
import InputFieldClass from './functions/InputFieldClass'

export default function UpdateService({ ...props }) {  

    // Refactored Props
    const {id, hostname} = props.details

    // React State Hooks ^^
    const hostnam = new InputFieldClass ()
    hostnam.handleValueChange("poop")
    
    return (
        
        <div>
            shit goes here
        </div>

    )
}
