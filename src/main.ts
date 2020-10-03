import VideoManager from './video-manager';
import PopupRenderer from './popup-renderer';

let videoId = null;

document.querySelector('.search-params-input').addEventListener('change', (event: InputEvent) => {
    const target = event.target as HTMLInputElement;
    PopupRenderer.searchTerms = target.value;
    document.getElementById('comments-container').innerHTML = '';
    PopupRenderer.hide('.load-more-button');
});

document.querySelector('.submit-button').addEventListener('click', async () => {
    // TODO: Validate search terms;
    PopupRenderer.toggle('.spinner');
    PopupRenderer.hide('.alert');

    const comments = await VideoManager.getCommentsByVideoId(videoId, PopupRenderer.searchTerms);
    const parentContainer = document.getElementById('comments-container');
    parentContainer.innerHTML = '';

    if (comments.length === 0) {
        PopupRenderer.show('.alert');
        PopupRenderer.toggle('.spinner');
        return;
    }

    PopupRenderer.generateCommentSection(comments);
    PopupRenderer.toggle('.spinner');
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
