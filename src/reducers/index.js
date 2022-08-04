const initialState = { 
    videoData:{},
    note:null,
    notebooks:[],
    current_notebook:{},
    youtubeRef:null,
}

const noteReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_NOTE":
      return {...state, note:action.payload};
    case "ADD_VIDEO_DATA":
        return {...state, videoData:action.payload};
    case "ADD_ERROR_MESSAGE":
        return {...state, error:action.payload};
    case "UPDATE_NOTE_DATA":
        return {...state, note:{...state.note,...action.payload}};
    case "ADD_USER_DATA":
        return {...state, user:{...state.user,...action.payload}};
    case "ADD_NOTEBOOKS_DATA":
        return {...state, notebooks:action.payload};
    case "ADD_CURRENT_NOTEBOOK":
        return {...state, current_notebook:action.payload};
    case "ADD_YOUTUBE_REF":
        return {...state, youtubeRef:action.payload};
    default:
        return state;
  }
}

export default noteReducer;