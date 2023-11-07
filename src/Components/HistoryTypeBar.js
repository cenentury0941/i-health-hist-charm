import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton(props) {
  const [alignment, setAlignment] = React.useState('clinical');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    props.updateState(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="warning"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      fullWidth
      style={{position:"fixed",top:"15vh",margin:"25px",left:"24vw", maxWidth:"25vw",boxShadow:"0px 0px 15px 3px #00000099"}}
    >
      <ToggleButton value="clinical">Clinical Data</ToggleButton>
      <ToggleButton value="user">User Data</ToggleButton>
    </ToggleButtonGroup>
  );
}