import VideoManager from './video-manager';

chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    const videoId = VideoManager.filterVideoId(tabs[0].url);
    const comments = await VideoManager.getCommentsByVideoId(videoId);
    if(comments) {
        console.log(comments);
    }
});

