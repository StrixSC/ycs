import VideoManager from './video-manager';
import PopupRenderer from './popup-renderer';

let videoId = null;

document.querySelector('.search-params-input').addEventListener('change', (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    PopupRenderer.searchTerms = target.value;
    document.getElementById('comments-container').innerHTML = '';
    PopupRenderer.hideLoadButton();
});

document.querySelector('.submit-button').addEventListener('click', async () => {
    // TODO: Validate search terms;
    const comments = await VideoManager.getCommentsByVideoId(videoId, PopupRenderer.searchTerms);
    const parentContainer = document.getElementById('comments-container');
    parentContainer.innerHTML = '';
    if (comments) {
        PopupRenderer.generateCommentSection(comments);
    }
});

document.querySelector('.load-more-button').addEventListener('click', async () => {
    const comments = await VideoManager.loadMore(videoId, PopupRenderer.searchTerms);
    if (comments) {
        PopupRenderer.generateCommentSection(comments);
    }
});

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    videoId = VideoManager.filterVideoId(tabs[0].url);
});
