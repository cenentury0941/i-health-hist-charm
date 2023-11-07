
import { initializeApp } from "firebase/app";
import { doc, updateDoc, setDoc, collection, getFirestore } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { getDatabase, set, ref } from "firebase/database";
import { getStorage, ref as storeref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";



var Patients = [];
var Doctors = [];
var Access = [];

const firebaseConfig = {
  apiKey: "AIzaSyDNFPbEh-IGXcu-ei2z4G_Tt3Q_OR2qJSg",
  authDomain: "combined-hackathon-services.firebaseapp.com",
  projectId: "combined-hackathon-services",
  storageBucket: "combined-hackathon-services.appspot.com",
  messagingSenderId: "151604687446",
  appId: "1:151604687446:web:ef22919571302190e801f7",
  measurementId: "G-NP9FLZ40GH"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

var date = new Date();

set(ref(database, 'iHealthHist/' + Math.floor(Math.random()*10240) ), {
  ts: date.toString(),
});


const unsub1 = onSnapshot(collection(db, "iHealthHist", "PatientList","Patients"), (doc) => {
    Patients = [];
    doc.forEach( document => {  Patients.push( document.data() ) });
    console.log("Current data: ", Patients);
});


const unsub3 = onSnapshot(collection(db, "iHealthHist", "PatientList","Patients","Patient 1","Access"), (doc) => {
  Access = [];
  doc.forEach( document => {  Access.push( document.data() ) });
  //console.log("Current data: ", Access );
});

const unsub2 = onSnapshot(collection(db, "iHealthHist", "DoctorsList","Doctors"), (doc) => {
  Doctors = [];
  doc.forEach( document => { Doctors.push( document.data() ) });
  //console.log("Current data: ", Doctors);
});

function updateAccess( AccessIndex , Value ){
  const AccessRef = doc(db,"iHealthHist","PatientList","Patients","Patient 1","Access", "Access"+AccessIndex);
  //console.log(AccessRef);
  //console.log( AccessIndex , Value );
  updateDoc(AccessRef, { Access : Value });  
}

async function getClinical(PatientName){
  const q = query(collection(db,"iHealthHist","PatientList","Patients",PatientName,"Clinical"));
  var data = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  });
  return data;
}

function formdb(e){

  e.preventDefault()
  return ;

}

async function getUserData(PatientName){
  const q = query(collection(db,"iHealthHist","PatientList","Patients",PatientName,"UserData"));
  var data = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    data.push(doc.data())
  });


  return data;
}


export {app, storage, Patients, getClinical, getUserData, updateAccess , Doctors, Access, db, formdb};

