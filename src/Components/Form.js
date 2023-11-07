import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '@mui/material';
import { formdb, storage, app } from '../Db';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [docFile, setDocFile] = React.useState("Upload File");
  const [docDesc , setDocDesc] = React.useState("");
  const [docName, setDocName] = React.useState("");
  var url_start = "";
  const inputFile = React.useRef(null) 

  async function handleFileSelected(event)
  {
      inputFile.current.click();
  }


  const handleSubmit =(event) => {

      console.log("New file :");
      console.log(event.target.files[0]);

      var file = event.target.files[0];
      
      const storageRef = ref(storage, file.name);

      uploadBytes(storageRef, file).then( async (snapshot) => {
      console.log('Uploaded a blob or file!');
      console.log(storageRef.fullPath);
      console.log("FILE : " + file);
      setDocFile(storageRef.fullPath);
    });

    }

  const handleUploadDoc = async () => {

    if( docFile === "Upload File" ){
      return;
    }

    const db = getFirestore(app);

    var date = new Date();
    var id = (Math.floor(Math.random()*10024));
    //db.collection("iHealthHist").doc("PatientList").collection("Patients").doc("props.patientName").collection("Clinical").("Doc"+id).
    
    await setDoc( doc(db , "iHealthHist" , "PatientList" , "Patients" , props.patientName , "Clinical" , ("Doc"+id) ) , {
      DisplayDate: date.toString(),
      DocumentDate: (date.getMonth()+1)+"/"+(date.getFullYear()%100),
      DocumentDesc: ""+docDesc,
      DocumentID: id,
      DocumentName: ""+docName,
      Loc: "Doc"+id,
      Type: 1,
      URL: "https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/"+docFile.replaceAll(" ","%20")+"?alt=media"
    }).then(function() {
      console.log("Doc Created");
    });
    

    handleClose();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box sx={{ '& > :not(style)': { m: 1 } , position:"absolute" , left:"53%" , bottom:"2%" }}>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
    </Box>
      <Dialog open={open} onClose={handleClose}>
        <form  onSubmit={handleSubmit}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fil in the form to upload a document. Currently only PDF clinical data is supported, but we're working on expanding functionality!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label=""
            type="text"
            fullWidth
            variant="standard"
            value={props.patientName}
            contentEditable= "false"
            suppressContentEditableWarning={true}
            name='username'
        />
        <TextField
            autoFocus
            margin="dense"
            id="docName"
            label="Document Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {setDocName(e.target.value); console.log(e.target.value)}}
            suppressContentEditableWarning={true}
            name='docname'/>
          <TextField
            autoFocus
            margin="dense"
            id="docDesc"
            label="Document Description"
            type="text"
            fullWidth
            variant="standard"
            suppressContentEditableWarning={true}
            onChange={(e) => {setDocDesc(e.target.value); console.log(e.target.value)}}
            name='desc'/>
            <input type='file' id='file' onChange={handleSubmit} ref={inputFile} style={{display: 'none'}}/>
         <TextField
            autoFocus
            margin="dense"
            id="id"
            label=""
            type="text"
            fullWidth
            variant="standard"
            value={docFile}
            contentEditable= "false"
            suppressContentEditableWarning={true}
            name='username'
            onClick={ handleFileSelected }
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUploadDoc}>Add</Button>
        </DialogActions>
      </form>
      </Dialog>
    </div>
  );
}