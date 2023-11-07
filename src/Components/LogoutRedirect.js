import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientInfo.css";

function LogoutRedirect(){
    const navigate = useNavigate()
    
    useEffect( () => {
        navigate("/")
    } , [] )

    return (<div className='PatientInfoDivider'>
    </div>)
}

export default LogoutRedirect