import {React, useState} from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Home.css"
import "./PageContainer.css"
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WheelchairPickupIcon from '@mui/icons-material/WheelchairPickup';
import { CircularProgress } from "@mui/material";
import { useOktaAuth } from '@okta/okta-react';

function HomePage(props) {
    const { oktaAuth, authState } = useOktaAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const login = async () => oktaAuth.signInWithRedirect({redirectUri: "http://localhost:3000/iHealthHist/PatientPortal"});
    const login2 = async () => oktaAuth.signInWithRedirect({redirectUri: "http://localhost:3000/iHealthHist/DoctorPortal"});
    const logout = async () => oktaAuth.signOut('/');

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const loginDoc = () => {
        setLoading(true);
        setTimeout( () => {navigate("/DoctorPortal")} , 2000 )
    }
    const loginUser = () => {
        setLoading(true);
        setTimeout( () => {navigate("/PatientPortal")} , 2000 )
    }

    if(oktaAuth.isLoginRedirect())
    {
        console.log("Login Redirect")
        console.log(authState)
    }

    if(searchParams.get("state"))
    {
        navigate("/")
        return (<div></div>)
    }

    if(!authState) {
        return (
            <div className="PageContainer" style={{flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"3vw"}} >
            <div className="Container">
            <MonitorHeartIcon sx={{ display:'flex', scale:"6.9", marginBottom:"5vh"}} />
            <div style={{display:"flex",flexDirection:"column",gap:"0vw"}}>
            <h2 style={{margin:"0",marginTop:"1vh"}}>Welcome to</h2>
            <h1 style={{margin:"0"}}>iHealthHist</h1>
            </div>
            <div>
                <p style={{margin:"0"}}>iHealthHist is an integrated portal to view patient health history in an aesthetically pleasing graphical manner.
                </p>
                <p style={{margin:"0"}}>iHealthHist can be used by doctors to sort through and better understand vast amounts of patient health record information in a visual and intuitive manner.
                </p>
            </div>
            </div>
            <div className="VerticalDivider"/>
            
            {
                loading ? <div className="Container"><CircularProgress /></div> : 
                <div className="Container">
                    <h2 style={{margin:"0",marginTop:"1vh"}}>Notice</h2>
                    <p>You've been logged out! Please reload the page to sign back in.</p>
                </div>
            }
    
        </div>    
        )
      }
    else
    {
        console.log(authState)
    }
    

    return ( <div className="PageContainer" style={{flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"3vw"}} >
        <div className="Container">
        <MonitorHeartIcon sx={{ display:'flex', scale:"6.9", marginBottom:"5vh"}} />
        <div style={{display:"flex",flexDirection:"column",gap:"0vw"}}>
        <h2 style={{margin:"0",marginTop:"1vh"}}>Welcome to</h2>
        <h1 style={{margin:"0"}}>iHealthHist</h1>
        </div>
        <div>
            <p style={{margin:"0"}}>iHealthHist is an integrated portal to view patient health history in an aesthetically pleasing graphical manner.
            </p>
            <p style={{margin:"0"}}>iHealthHist can be used by doctors to sort through and better understand vast amounts of patient health record information in a visual and intuitive manner.
            </p>
        </div>
        </div>
        <div className="VerticalDivider"/>
        
        {
            loading ? <div className="Container"><CircularProgress /></div> : 
            <div className="Container">
                <p>Login to view Patient/Doctor portals</p>
                <div className="LoginButton" onClick={ () => { props.setUserType(1) ; login() }} ><WheelchairPickupIcon />Login Using Patient Credentials</div>
                <div className="LoginButton" onClick={ () => { props.setUserType(2) ; login2() }}><MedicalServicesIcon />Login Using Doctor Credentials</div>
            </div>
        }

    </div>
    )
}

export default HomePage;