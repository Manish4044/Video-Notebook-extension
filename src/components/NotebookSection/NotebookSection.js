import React from 'react'
import { makeStyles } from '@mui/styles';
import NoteAdd from '@mui/icons-material/NoteAdd';
import { Button } from '@mui/material';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  container: {
    width:"100%",
    padding:"10px",
},
item:{
    border:'1px solid lightgrey',
    borderRadius:'5px',
    padding:"2px 5px",
    cursor:"pointer",
    display:'flex',
    alignItems:"center",
  }
});

const Item = ({children, ...props}) => {

    const classes = useStyles();
    
    return (
        <p className={classes.item}>
            {children}
        </p>
    )
}

function NotebookSection(props) {
    const classes = useStyles();

  return (
    <div className={classes.container}>
        <div>
            {props.notebooks?.map(notebook => {
              if(notebook.id === props.current_notebook.id) return null;
              return( 
                <Item key={notebook.id} data-id={notebook.id}>{notebook.title}</Item>
              )
            })}
            <Item>
                <NoteAdd color='error'/>
                Add to new notebook
            </Item>
        </div>
        <div style={{marginTop:"20px"}}>
            <Button color='error' sx={{fontSize:"12px", fontWeight:"bold"}} variant="text">Video name</Button>
            <Item>{props.videoData?.title}</Item>
        </div>
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    notebooks: state.notebooks,
    current_notebook: state.current_notebook,
    videoData: state.videoData,
  })
}
// const mapStateToDispatch = dispatch => {
//   return ({
//     addNote: (data) => dispatch({type:"ADD_NOTE",payload:data}),
//     addVideoMetaDataInStore: (data) => dispatch(addVideoData(data)),
//     addUserDataInStore: (data) => dispatch({type:"ADD_USER_DATA",payload:data}),
//     addNotebooksInStore: (data) => dispatch({type:"ADD_NOTEBOOKS_DATA",payload:data}),
//   })
// }

export default connect(mapStateToProps)(NotebookSection);
