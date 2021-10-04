import React from 'react'

export default function Profile({path, width, height, alt, color}) {
    return (
        <div>
            <img width={width} height={height} src={path} alt={alt} ></img>
        </div>
    )
}
