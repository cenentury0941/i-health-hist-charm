import React from "react";
import "./DocumentViewer.css";
import DescriptionIcon from '@mui/icons-material/Description';
import ExamplePDFViewer from "./PDFViewer";
import LineGraph from "./LineGraphViewer";
import BarGraph from "./BarGraphViewer";
import ImageViewer from "./ImageViewer";

function DocumentViewer(props) {

    return (<div className="DocumentViewer">
        
        { props.document? 
            ( props.document.Type === 1 ? <ExamplePDFViewer document={props.document}/> : props.document.Type === 2 ? <LineGraph document={props.document} /> : props.document.Type === 3 ? <BarGraph document={props.document} /> : <ImageViewer document={props.document}/> ) 
            : <div>
            <DescriptionIcon style={{scale:"3.9", marginLeft:"auto", marginRight:"auto"}} />
            <h4>Select A Document To View</h4>
        </div> }
    </div>)

}

export default DocumentViewer;