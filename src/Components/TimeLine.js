import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import DescriptionIcon from '@mui/icons-material/Description';
import "./TimeLine.css";

import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import { CircularProgress } from '@mui/material';

export default function LeftAlignedTimeline(props) {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >

      {props.data?  props.data.sort( (e1 , e2) => { return e1.DocumentDate.localeCompare(e2.DocumentDate) } ).map( (element, index) => { 
      return <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        {element.DocumentDate}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        { props.data.length-1!==index ? <TimelineConnector /> : <div></div> }
      </TimelineSeparator>
      <TimelineContent className='ZoomOnHover' onClick={ () => { props.selectDoc(element)} }>{element.DocumentName}</TimelineContent>
    </TimelineItem>
      } )
      : <div style={{ display:"flex", height:"50%", width:"150%" , alignItems:"center", justifyContent:"center" }}><CircularProgress style={{scale:"2"}} /></div>
    }

      
      
    
    
    </Timeline>
  );
}