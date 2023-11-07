import {useState, React, useEffect} from 'react';
import "./PatientInfo.css";
import PatientListViewHolder from './PatientListViewHolder';
import PatientHistory from './PatientHistory';
import { Patients, db } from '../Db';
import Bot from './bot/verify-bot';
import FormDialog from './Form';
import { collection, onSnapshot } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';

function DoctorPortal(props) {

  const [selectedPatient , setSelectedPatient] = useState(0);
  const [clinicalData, setClinicalData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [patientList , setPatientList] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  useEffect( () => {
    onSnapshot(collection(db, "iHealthHist", "PatientList","Patients"), (doc) => {
      var Patients = [];
      doc.forEach( document => {  Patients.push( document.data() ) });
      console.log("Current data: ", Patients);
      setPatientList(Patients);
    });
  } , [] );
  
  if(!searchParams.get("code"))
    {
      navigate("/" , {replace : true})
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
            <h1 style={{userSelect:"none", fontWeight:"bold", alignSelf:"start", marginLeft:"10%", fontSize:"150%"}}>Patients List :</h1>
            {patientList?.map( (element, index) => { return <PatientListViewHolder index={index} key={index} patientName={element.PatientName} setSelected={setSelectedPatient} selected={index===selectedPatient}/>
            } )}
          </div>
          <PatientHistory Patient={ Patients? Patients[selectedPatient] : null} />
          <Bot />
          <FormDialog patientName={patientList && patientList[selectedPatient] ? patientList[selectedPatient].PatientName : "Patient 1"}/>
        </div>
      )
    }

}


export default DoctorPortal;