import * as React from "react";
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {DoctorPortalPageContainer, PatientPortalPageContainer} from './Components/PageContainer';
import HomePage from "./Components/Home";
import ResponsiveAppBar from './Components/ResponsiveAppBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Db.js"
import { SecureRoute, Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useNavigate } from 'react-router-dom';
import LoginHandler from "./Components/LoginHandler";
import LogoutRedirect from "./Components/LogoutRedirect";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-59558883.okta.com/oauth2/default',
  clientId: '0oad478u09NXaMxZM5d7',
  redirectUri: "http://localhost:3000/iHealthHist/PatientPortal"
});

function App() {

  const navigate = useNavigate();
  const [ userType , setUserType ] = React.useState(0);

  React.useEffect( () => {
    console.log("USER TYPE : " + userType);
  } , [] )

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    console.log( _oktaAuth )
    navigate("/PatientPortal");
  };

  return (
    <div className="App">
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />    
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage setUserType={setUserType}/>}/>
        <Route path="/DoctorPortal/*" element={<DoctorPortalPageContainer />} />
        <Route path="/PatientPortal/*" element={<PatientPortalPageContainer />} />
        <Route path="/PatientPortal" element={<PatientPortalPageContainer />} />
        <Route path="PatientPortal" element={<PatientPortalPageContainer />} />
        <Route path="*" element={<div style={{backgroundColor:"white", fontSize:"5rem", color:"black"}} >404</div>} />
        <Route path='/login/callback' element={<LoginHandler UserType={userType}/>} />
        <Route path='/logout' element={<LogoutRedirect/>} />
      </Routes>
    </Security>
    </ThemeProvider>
    </div>
  );
}

export default App;
