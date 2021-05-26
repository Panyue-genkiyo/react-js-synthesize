import React from "react"
import './hello.css'
import Welcome from "../welcome/Welcome";

export default function Hello(){
    return(
        <div>
            <h1 className="title">Hello,React</h1>
            <Welcome/>
        </div>
    )
}

