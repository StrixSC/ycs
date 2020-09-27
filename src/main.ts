import VideoManager from './video-manager';

chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
    const videoId = VideoManager.filterVideoId(tabs[0].url);
    const comments = await VideoManager.getCommentsByVideoId(videoId);
    if(comments) {
        const parentContainer = document.getElementById('comments-container');
        for(let i = 0; i < comments.length; i++) {
            const rootComment = createRootContainer(comments[i], i);
            parentContainer.appendChild(rootComment);
        }
    }
});

function createRootContainer(comment: any, index: number): Node {
    let newElement: HTMLDivElement = document.createElement('div');
    newElement.id = `${index}`;
    newElement.className = "snippet-container";
    
    let rootCommentContainer: HTMLDivElement = document.createElement('div');
    rootCommentContainer.id = `${index}`;
    rootCommentContainer.className = 'root-comment-container';

    let rootCommentAuthor: HTMLDivElement = document.createElement('div');
    rootCommentAuthor.className = 'root-comment-author-name';
    rootCommentAuthor.innerText += comment.rootAuthorName;
    
    let rootCommentText: HTMLDivElement = document.createElement('div');
    rootCommentText.className = 'root-comment-text';
    rootCommentText.innerHTML = comment.comment;
    rootCommentAuthor.appendChild(rootCommentText);
    
    let rootCommentAuthorImageContainer: HTMLDivElement = document.createElement('div');
    let rootCommentAuthorImage: HTMLImageElement = document.createElement('img');
    rootCommentAuthorImage.className = 'root-comment-author-image author-image';
    rootCommentAuthorImage.src = comment.rootAuthorImage;

    rootCommentContainer.appendChild(rootCommentAuthorImageContainer).appendChild(rootCommentAuthorImage);
    rootCommentContainer.appendChild(rootCommentAuthor);

    newElement.appendChild(rootCommentContainer);

    return newElement; 
}

