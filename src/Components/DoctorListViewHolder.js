import * as React from "react";
import PersonIcon from '@mui/icons-material/Person';
import "./PatientListViewHolder.css";
import KeyOffIcon from '@mui/icons-material/KeyOff';
import KeyIcon from '@mui/icons-material/Key';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateAccess } from "../Db";

function DoctorListViewHolder(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

return (
    <div style={{position:"relative"}} onClick={()=>{props.setSelected(props.index)}} className={"ViewHolder "+( props.selected ? "SelectedViewHolder" : "" )} >
        <PersonIcon style={{fontSize: "1.75rem" }} />
        <h1 style={{fontSize:"110%"}}>{props.patientName}</h1>
        <div className="AccessModifierButtonContainer" onClick={handleClickOpen}>
            {
                props.hasAccess.Access ? <KeyIcon  style={{}} color="success"/> : <KeyOffIcon color="warning" />
            }
        </div>

        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {"Data Access Modification"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You're about to {props.hasAccess.Access?"REVOKE":"GRANT"} access to your data by {props.patientName}. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => { updateAccess(props.doctorID, props.hasAccess.Access?false:true); handleClose()}} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>

    </div>
)

}

export default DoctorListViewHolder;
