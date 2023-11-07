import * as React from "react";
import { useRef } from "react";
import DoctorPortal from "./DoctorPortal.js";
import "./PageContainer.css";
import PatientPortal from "./PatientPortal.js";

function DoctorPortalPageContainer() {

    const containerRef = useRef(null);

    return ( <div className="PageContainer" id="Cont" ref={containerRef}>
        <DoctorPortal container={containerRef}/>
    </div>
    )
}

function PatientPortalPageContainer() {

    const containerRef = useRef(null);

    return ( <div className="PageContainer" id="Cont" ref={containerRef}>
        <PatientPortal container={containerRef}/>
    </div>
    )
}

export {DoctorPortalPageContainer, PatientPortalPageContainer};