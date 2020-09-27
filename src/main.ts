import VideoManager from './video-manager';
import PopupRenderer from './popup-renderer';

var videoId = null;

document.querySelector('.submit-button').addEventListener('click', async () => {
    let searchTerms = document.querySelector('input').value;
    // TODO: Validate search terms;
    const comments = await VideoManager.getCommentsByVideoId(videoId, searchTerms);
    console.log(comments);

    if(comments) {
        const parentContainer = document.getElementById('comments-container');
        parentContainer.innerHTML = '';
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

chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    videoId = VideoManager.filterVideoId(tabs[0].url);
});