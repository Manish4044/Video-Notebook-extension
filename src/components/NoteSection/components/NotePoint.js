import React from 'react'
import { makeStyles } from '@mui/styles';
import {IconButton} from '@mui/material';
import { secondsToHms } from '../utils';
import { Delete, PlayArrowOutlined } from '@mui/icons-material';
import { Service } from '../../../services';

const useStyles = makeStyles({
  container:{
    width:"100%",
    borderTop:"1px solid grey",
    display:"flex",
    justifyContent:'space-between',
    alignItems:'center',
    padding:'8px 5px',
  },
  timestamp:{
    display:"flex",
    alignItems:'center',
    color:'red',
    borderRadius:"10px",
    width:'fit-content',
    padding:'0 10px',
    cursor:'pointer',
    border:'1px solid lightgrey'
  }
});

function NotePoint(props) {
    const classes = useStyles();

    const handlePlayTime = (time) => {
      console.log(time);
      // props.youtubeRef.seekTo(Number(time));
    }
    const handleDeletePoint = (point) => {
      console.log("delete")
      console.log(point)
      Service.deleteNotePoint(props.note_id,point);
    }
    
  return (
    <div className={classes.container}>
      <div>
        <p className={classes.message_text}> {props.text} </p>
        <p className={classes.timestamp} onClick={() => handlePlayTime(props.time)}>
            <PlayArrowOutlined/>
            {secondsToHms(props.time)}
        </p>
      </div>
      <div>
        <IconButton onClick={() => handleDeletePoint({text:props.text,time:props.time})}>
          <Delete/>
        </IconButton>
      </div>
    </div>
  )
}

export default NotePoint