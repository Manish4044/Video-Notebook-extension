import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import {CameraAltRounded} from '@mui/icons-material';
import { Service } from '../../../services';

const useStyles = makeStyles({
  container:{
    width:"100%",
    display:"flex",
    alignItems:'center',
    padding:'10px 5px 15px',
    backgroundColor:'#DDDDDD',
    borderBottomRightRadius:"8px",
    borderBottomLeftRadius:"8px"
  },
  input:{
    flex:1,
    fontSize:"16px",
    padding:"5px",
    border:'none',
    outline:'none',
  },
  clickableIcon:{
    fontSize:"10px",
    color:'grey',
    margin:'0 5px',
    border:"1px solid grey",
    boxSizing:'content-box',
    padding:"5px",
    borderRadius:"50%",
  }
});

function Input(props) {
    const classes = useStyles();
    const [input, setInput] = useState();
    const handleSubmit = (e) => {
      e.preventDefault();
        if(!input)
          return;
        // const time = (props.youtubeRef.getCurrentTime());
        const time = 8;
        const point = {
            text:input,
            time:time
        }
        Service.addNotePoint(props.note_id, point)
        .then(res => console.log(res));
        setInput('');
    }
  return (
    <form onSubmit={handleSubmit} className={classes.container}>
        <CameraAltRounded className={classes.clickableIcon}/>
        <input 
          className={classes.input} 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add Note'
      />
    </form>
  )
}

export default Input