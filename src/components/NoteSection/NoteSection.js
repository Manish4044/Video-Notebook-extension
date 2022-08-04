import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import NotePoint from './components/NotePoint';
import Input from './components/Input';
import { connect } from 'react-redux';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const useStyles = makeStyles({
  container: {
    width:"100%",
    minHeight:"200px",
    backgroundColor:'white',
  },
});

 

function NoteSection(props) {
  const classes = useStyles();

  useEffect(() => {
    // Create the DB listener
    const unsubscribe = onSnapshot(doc(db, "notes",props.note.id), (doc) => {
      const {points=[]} = doc.data(); 
      props.updateNoteData({points:points})
    });

      return () => {
        unsubscribe();
      }
  }, [props.note]);
  
  return ( 
    <div className={classes.container}>
      {props.note && props.note.points.map(item => (
        <NotePoint key={Math.random()} note_id={props.note.id} text={item.text} time={item.time}/>
      ))}
      <Input note_id={props.note.id}/>
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    note: state.note,
    current_notebook: state.current_notebook,
    videoData: state.videoData,
  })
}
const mapStateToDispatch = dispatch => {
  return ({
    updateNoteData:(data) => dispatch({type:"UPDATE_NOTE_DATA",payload:data})
  })
}

export default connect(mapStateToProps,mapStateToDispatch)(NoteSection);