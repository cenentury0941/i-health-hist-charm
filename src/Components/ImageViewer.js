import { useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import "./PDFViewer.css";
import { CChart } from '@coreui/react-chartjs';

const ImageViewer = (props) => {
	return (
    <div className='PDFViewerContainer'>
    <div className='PDFDetails'>
    <h2 style={{color:"white", fontSize:"3.9vh"}}>{props.document.DocumentName}</h2>
        <div className='PDFDetailsContainer'><h3 style={{margin:"0",fontWeight:"lighter"}}>Date : </h3><h3 style={{margin:"0",fontWeight:"lighter"}}>{props.document.DisplayDate}</h3></div>
        <div className='PDFDetailsContainer'><h3 style={{margin:"0",fontWeight:"lighter"}}>Description : </h3><h3 style={{margin:"0",fontWeight:"lighter"}}>{props.document.DocumentDesc}</h3></div>
   </div>

    <img className="PDFContainer" src={props.document.URL} />

    </div>
    );
};

export default ImageViewer;



