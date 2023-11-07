import * as React from "react";
import PersonIcon from '@mui/icons-material/Person';
import "./PatientListViewHolder.css";
import { Icon } from "@mui/material";

function PatientListViewHolder(props) {

return (
    <div onClick={()=>{props.setSelected(props.index)}} className={"ViewHolder "+( props.selected ? "SelectedViewHolder" : "" )} >
        <PersonIcon style={{fontSize: "1.75rem" }} />
        <h1 style={{fontSize:"110%"}}>{props.patientName}</h1>
    </div>
)

}

export default PatientListViewHolder;
