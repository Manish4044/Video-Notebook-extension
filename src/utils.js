export const getThumbnailLink = (video_id) => {
    if(!video_id) return null;

    return (`https://img.youtube.com/vi/${video_id}/sddefault.jpg`)
}

export const getVideoData = async(videoId, key) => {
    if(!videoId || !key) 
    return null;
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${key}&part=snippet&id=${videoId}`;
    const res = await fetch(url);
    return res.json();
}

export const youtubeIdParser = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length===11)? match[7] : false;
}