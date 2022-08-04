    /*global chrome*/
import React,{useCallback, useEffect, useState} from 'react';
import './App.css';
import { makeStyles } from '@mui/styles';
import {Header} from './components/Header';
import NotebookBar from './components/NotebookBar';
import {NoteSection} from './components/NoteSection';
import { NotebookSection } from './components/NotebookSection';
import { Service } from './services';
import { connect } from 'react-redux';
import {youtubeIdParser, getVideoData} from './utils';
import { addVideoData } from './actions';

const EMAIL = "manishyadav4350@gmail.com";

const useStyles = makeStyles({
  container: {
    width:"300px",
    minHeight:"200px",
    backgroundColor:'white',
    borderRadius:"15px",
    boxShadow: '2px 4px 13px -11px rgba(0,0,0,0.75)',
    // margin:"100px",
  },
  buttonContainer:{
    width:"100%",
    background:'lightgrey',
    padding:"9px 10px",
    '& button':{
      cursor:"pointer",
      width:"100%",
      border:'none',
      padding:"6px 5px",
      fontSize:"16px"
    }
  }
});


function App(props) {

  
  const classes = useStyles();
  const ytApiKey = 'AIzaSyC4z8PtvUQqRXQQ3AubAAVHyxIEfIKT-Rc';


  const handleNoteAdd = (() => {
    console.log("In");
    if(props.note)
    return;
    
    if(Object.keys(props.current_notebook).length === 0 || Object.keys(props.videoData).length === 0)
    return;
    console.log("In 2");
    
    const {id} = props.current_notebook;
    const {thumbnail, title, videoURL} = props.videoData;
    const newObj = {notebook_id:id,thumbnail,title,points:[],captions:[], videoURL:videoURL}
    Service.addNote(id,newObj).then(res => {
      console.log(res);
      props.addNote(res);
    });

  });

  const [url,setUrl] = useState("NO URL");
  useEffect(() => {

    const queryInfo = {active: true, lastFocusedWindow: true};

    chrome.tabs.query(queryInfo, tabs => {
        const URL = tabs[0].url;
        console.log(url);
        setUrl(URL);
    });
}, []);

  const init = useCallback(async() => {
    // const currentURL = "https://www.youtube.com/watch?v=n4xtl19OH5M"
    const tabs = await chrome.tabs.query( {active: true, lastFocusedWindow: true});
    const currentURL = tabs[0].url;

    Service.checkNoteExists(currentURL).then(res => {
      if(res)
          props.addNote(res);

      const videoId = youtubeIdParser(currentURL);
      if(videoId === false)
      {
        props.errorMessage("Not a Youtube URL");
        return;
      }
      getVideoData(videoId,ytApiKey).then(res => {
        const title = res.items[0].snippet.title;
        const thumbnail = res.items[0].snippet.thumbnails.default;
        props.addVideoMetaDataInStore({title,thumbnail,videoURL:currentURL});
      });
    });
  }, []);

  const notebookInit = useCallback(() => {
    Service.getFullUserData(EMAIL).then(res => {
      const user = {
        email:res.email,
        name:res.name,
      }
      // console.log(res.notebooks);
      props.addUserDataInStore(user);
      props.addNotebooksInStore(res.notebooks);
    }).catch(err => console.log(err));
  },[])

  useEffect(() => {
    init();
    notebookInit();
  },[])
  
  const [openNoteSection,setOpenNoteSection] = useState(true);
  const handleToggeleSection = () => setOpenNoteSection(!openNoteSection);

  const renderBody = () => {
    return (openNoteSection ? 
        <NoteSection/>
      : 
        <NotebookSection/>)
  }

  return (
    <div className={classes.container}>
      <div style={{padding:"5px 10px"}}>
        <Header/>
        <NotebookBar
          toggle={handleToggeleSection}
        />
      </div>
      {url}
      {props.note ? 
        renderBody()
      : 
        <div className={classes.buttonContainer}>
          Do this
          {props.videoData?.title}
          <button onClick={handleNoteAdd}>+Make note on this video</button>
        </div>
      }
    </div>
  );
}
const mapStateToProps = state => {
  return ({
    note: state.note,
    error: state.error,
    current_notebook: state.current_notebook,
    videoData: state.videoData,
  })
}
const mapStateToDispatch = dispatch => {
  return ({
    errorMessage:(msg) => dispatch({type:"ADD_ERROR_MESSAGE",payload:msg}),
    addNote: (data) => dispatch({type:"ADD_NOTE",payload:data}),
    addVideoMetaDataInStore: (data) => dispatch(addVideoData(data)),
    addUserDataInStore: (data) => dispatch({type:"ADD_USER_DATA",payload:data}),
    addNotebooksInStore: (data) => dispatch({type:"ADD_NOTEBOOKS_DATA",payload:data}),
  })
}

export default connect(mapStateToProps, mapStateToDispatch)(App);
