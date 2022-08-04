import React from 'react'
import { makeStyles } from '@mui/styles';
import {Folder, ExpandLess, ExpandMore} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const useStyles = makeStyles({
  bar: {
    width:"100%",
    fontSize:"25px",
    color:"grey",
    display:"flex",
    alignItems:'center',
    justifyContent:"space-between",
    margin:"10px 0",
    borderRadius:"10px",
    padding:"0px 10px",
    cursor:'pointer',
    // backgroundColor:'red',
    backgroundColor:"lightgrey",
    '&:hover':{
      backgroundColor:'grey'
    }
  },
  clickableIcon: {
    color: 'grey',
    '&:hover': {
    color: 'black',
    },
    cursor:'pointer',
  },
});

function NotebookBar(props) {

    const classes = useStyles();

    useEffect(() => {

      if(props.notebooks && props.notebooks.length === 0)
        return;
      
      if(props.note && Object.keys(props.note).length !== 0)
      {
        // console.log(props.notes);
        const filtered = props.notebooks.filter((item) => {
          return item.id === props.note.notebook_id;
        })
        props.addCurrentNotebook(filtered[0]);
      }
      else{
        const filtered = props.notebooks.filter((item) => {
          return item.title === 'Unfiled';
        })
        props.addCurrentNotebook(filtered[0]);
      }

    },[props.note,props.notebooks])

    return (
    <div className={classes.bar} onClick={props.toggle}>
        <div style={{display:"flex", alignItems:'center'}}>
            <Folder fontSize="inherit" color='error'/>
            <Typography sx={{ml:0.5}} fontSize="17px" color="black" variant="p">{props.current_notebook?.title}</Typography>
        </div>
        <div>
            <ExpandMore sx={{color:"black"}} fontSize="inherit"/>
        </div>
    </div>
    )
}

const mapStateToProps = state => {
  return ({
    note: state.note,
    current_notebook: state.current_notebook,
    notebooks: state.notebooks,
    videoData: state.videoData,
  })
}
const mapStateToDispatch = dispatch => {
  return ({
    addCurrentNotebook:(data) => dispatch({type:"ADD_CURRENT_NOTEBOOK",payload:data}),
  })
}

export default connect(mapStateToProps,mapStateToDispatch)(NotebookBar);