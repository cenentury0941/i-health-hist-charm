import { useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import "./PDFViewer.css";
import { CChart } from '@coreui/react-chartjs';

const LineGraph = (props) => {
	return (
    <div className='PDFViewerContainer'>
    <div className='PDFDetails'>
    <h2 style={{color:"white", fontSize:"3.9vh"}}>{props.document.DocumentName}</h2>
        <div className='PDFDetailsContainer'><h3 style={{margin:"0",fontWeight:"lighter"}}>Date : </h3><h3 style={{margin:"0",fontWeight:"lighter"}}>{props.document.DisplayDate}</h3></div>
        <div className='PDFDetailsContainer'><h3 style={{margin:"0",fontWeight:"lighter"}}>Description : </h3><h3 style={{margin:"0",fontWeight:"lighter"}}>{props.document.DocumentDesc}</h3></div>
    </div>
    
<CChart
  className="PDFContainer"
  style={{ height:"unset", padding:"1vmin", boxSizing:"content-box", border:"2px solid #0000" }}
  type="line" 
  data={{
    labels: ["1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00"],
    datasets: [
      {
        label: "Heart Rate",
        backgroundColor: "teal",
        borderColor: "teal",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        pointBorderColor: "#fff",
        data: props.document.Value.split(',').map(value => parseInt(value, 10)), //60,61,62,63,64,65,70,72,73,74,72,70,66,64,63,60
      },
    ],
  }}
  options={{
    plugins: {
      legend: {
        labels: {
          color: "white",
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: "#aaa",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          color: "#00aaaa69",
        },
        ticks: {
          color: "white",
        },
      },
    },
  }}
/>

    </div>
    );
};

export default LineGraph;