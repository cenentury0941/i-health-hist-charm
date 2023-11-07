import {React, useEffect} from "react";
import "./PatientInfo.css";
import PatientHistory from './YourHistory';
import { useState } from "react";
import DoctorListViewHolder from "./DoctorListViewHolder";
import DataAccessModificationDialog from "./AccessModifier";
import { onSnapshot, collection  } from "firebase/firestore";
import { Doctors, db} from "../Db";
import FloatingActionButtons from "./FloatingAction";
import FormDialog from "./Form";
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate, useSearchParams } from "react-router-dom";

function PatientPortal() {

    const [selectedPatient , setSelectedPatient] = useState(0);
    const [ Access , setAccess ] = useState( [ false , true , false ] )

    const navigate = useNavigate()

    const { oktaAuth, authState } = useOktaAuth();
    console.log("AUTH STATE")
    console.log(authState)
    useEffect( () => {
      onSnapshot(collection(db, "iHealthHist", "PatientList","Patients","Patient 1","Access"), (doc) => {
        var Access = [];
        doc.forEach( document => {  Access.push( document.data() ) });
        console.log("Triggered : ", Access );
        setAccess(Access);
      });
    } , [] )

    const [searchParams, setSearchParams] = useSearchParams()

    if(!searchParams.get("code"))
    {
      navigate("/")
      return (
        <div className='PatientInfoDivider'>
        </div>
    )
    }
    else
    {
      return (
        <div className='PatientInfoDivider'>
        <div className='PatientList'>
          <h1 style={{userSelect:"none", fontWeight:"bold", alignSelf:"start", marginLeft:"10%", fontSize:"150%"}}>Your Doctors :</h1>
          {Doctors.map( (element, index) => { return <DoctorListViewHolder index={index} key={index} doctorID={index+1} patientName={element.DoctorName} setSelected={setSelectedPatient} hasAccess={ Access[index] }/>
          } )}
        </div>
        <PatientHistory PatientName="Patient 1"/>
        <DataAccessModificationDialog/>
        <FormDialog patientName="Patient 1"/>
      </div>
    )
    }
}

export default PatientPortal;