import VideoManager from './video-manager';
import PopupRenderer from './popup-renderer';

let searchTerms = '';
var videoId = null;

document.querySelector('.search-params-input').addEventListener('change', (event: InputEvent) => {
    let target = event.target as HTMLInputElement;
    searchTerms = target.value;
    document.getElementById('comments-container').innerHTML = '';
    PopupRenderer.hideLoadButton();
});

document.querySelector('.submit-button').addEventListener('click', async () => {
    // TODO: Validate search terms;
    console.log(searchTerms);
    const comments = await VideoManager.getCommentsByVideoId(videoId, searchTerms);
    const parentContainer = document.getElementById('comments-container');
    parentContainer.innerHTML = '';
    if(comments) {
        PopupRenderer.generateCommentSection(comments);
    }
});

document.querySelector('.load-more-button').addEventListener('click', async () => {
    const comments = await VideoManager.loadMore(videoId, searchTerms);
    if(comments) {
        PopupRenderer.generateCommentSection(comments);
    }
})

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
