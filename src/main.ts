import VideoManager from './video-manager';
import PopupRenderer from './popup-renderer';

chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    const videoId = VideoManager.filterVideoId(tabs[0].url);
    const comments = await VideoManager.getCommentsByVideoId(videoId);
    if(comments) {
        const parentContainer = document.getElementById('comments-container');
        for(let i = 0; i < comments.length; i++) {
            const rootComment = PopupRenderer.createRootContainer(comments[i], i);
            if(comments[i].replies) {
                const replyContainer = document.createElement('div');
                replyContainer.className = 'reply-main-container';
                for(let j = 0; j < comments[i].replies.length; j++) {
                    replyContainer.appendChild(PopupRenderer.createChildContainer(comments[i].replies[j], j));
                }
                rootComment.appendChild(replyContainer);
            }

            parentContainer.appendChild(rootComment);
        }
    }
});