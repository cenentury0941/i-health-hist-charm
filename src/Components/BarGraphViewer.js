import { useState } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import "./PDFViewer.css";
import { CChart } from '@coreui/react-chartjs';

const BarGraph = (props) => {
	return (
    <div className='PDFViewerContainer'>
    <div className='PDFDetails'>
    <h2 style={{color:"white", fontSize:"3.9vh"}}>{props.document.DocumentName}</h2>
        <div className='PDFDetailsContainer'><h3 style={{margin:"0",fontWeight:"lighter"}}>Date : </h3><h3 style={{margin:"0",fontWeight:"lighter"}}>{props.document.DisplayDate}</h3></div>
        <div className='PDFDetailsContainer'><h3 style={{margin:"0",fontWeight:"lighter"}}>Description : </h3><h3 style={{margin:"0",fontWeight:"lighter"}}>{props.document.DocumentDesc}</h3></div>
    </div>

    <CChart
    className='PDFContainer'
    style={{ height:"unset", padding:"1vmin", boxSizing:"content-box", border:"2px solid #0000" }}
  type="bar"
  data={{
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Steps',
        backgroundColor: 'cyan',
        data: props.document.Value.split(',').map(value => parseInt(value, 10)),
      },
    ],
  }}
  labels="months"
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
          color: "teal",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        grid: {
          color: "teal",
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

export default BarGraph;



