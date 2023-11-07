import React, { useEffect } from "react";
import "./PatientHistory.css";
import LeftAlignedTimeline from "./TimeLine";
import DocumentViewer from "./DocumentViewer";
import ColorToggleButton from "./HistoryTypeBar";
import { useState } from "react";
import { getClinical, getUserData } from "../Db";

function PatientHistory(props) {

    const [ selectedDocument , setSelectedDocument ] = useState(null);
    const [ history, setHistory ] = useState('clinical');

    var Clinical = null;
    var UserData = null;

    const [ clinical , setClinical ] = useState(null);
    const [userData , setUserData] = useState(null)

    useEffect( () => {

        const func = async () => {
            console.log("LOADING")
            setClinical(null);
            setUserData(null);
            setSelectedDocument(null);
            Clinical = await getClinical( props.Patient ? props.Patient.PatientName : "Patient 1" );
            UserData = await getUserData( props.Patient ? props.Patient.PatientName : "Patient 1" );
            //console.log(Clinical)
            //console.log(UserData)
            setClinical(Clinical);
            setUserData(UserData);
        }
        func();

    } , [props] );

    return (
        <div className="HistoryContainer">
            <div className="FixedTitle">Patient {props.Patient?.PatientName} History</div>
            <ColorToggleButton updateState={setHistory} style={{zIndex:"5000"}}/>
            <LeftAlignedTimeline selectDoc={setSelectedDocument} data={ history==="clinical"?clinical:userData }/>
            <DocumentViewer document={selectedDocument}/>
        </div>
    )
}

export default PatientHistory;