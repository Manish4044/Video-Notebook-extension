export const makeYouTubeRef = (ref) => {
    return ({
        type:"ADD_YOUTUBE_REF",
        payload:ref,
    })
}

export const addVideoData = (data) => {
    return({
        type:"ADD_VIDEO_DATA",
        payload:data
    })
}