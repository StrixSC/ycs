import { CommentThread, Comment } from './video-manager';
export default class PopupRenderer {
    public static searchTerms: string;

    public static generateCommentSection(comments: CommentThread[]): void {
        const parentContainer = document.getElementById('comments-container');
        for (let i = 0; i < comments.length; i++) {
            const rootComment = PopupRenderer.createRootContainer(comments[i], i);
            if (comments[i].replies) {
                const replyContainer = document.createElement('div');
                replyContainer.className = 'reply-main-container';
                for (let j = 0; j < comments[i].replies.length; j++) {
                    replyContainer.appendChild(PopupRenderer.createChildContainer(comments[i].replies[j], j));
                }
                rootComment.appendChild(replyContainer);
            }

            parentContainer.appendChild(rootComment);
        }
    }

    public static createRootContainer(comment: CommentThread, index: number): Node {
        const newElement: HTMLDivElement = document.createElement('div');
        newElement.id = `${index}`;
        newElement.className = 'snippet-container';

        const rootCommentContainer: HTMLDivElement = document.createElement('div');
        rootCommentContainer.id = `${index}`;
        rootCommentContainer.className = 'root-comment-container';

        const rootCommentAuthor: HTMLDivElement = document.createElement('div');
        rootCommentAuthor.className = 'root-comment-author-name';
        rootCommentAuthor.innerText += comment.rootAuthorName;

        const rootCommentText: HTMLDivElement = document.createElement('div');
        rootCommentText.className = 'root-comment-text';
        rootCommentText.innerHTML = this.boldMatch(comment.comment);
        rootCommentAuthor.appendChild(rootCommentText);

        const rootCommentAuthorImageContainer: HTMLDivElement = document.createElement('div');
        const rootCommentAuthorImage: HTMLImageElement = document.createElement('img');
        rootCommentAuthorImage.className = 'root-comment-author-image author-image';
        rootCommentAuthorImage.src = comment.rootAuthorImage;

        rootCommentContainer.appendChild(rootCommentAuthorImageContainer).appendChild(rootCommentAuthorImage);
        rootCommentContainer.appendChild(rootCommentAuthor);

        newElement.appendChild(rootCommentContainer);

        return newElement;
    }

    public static createChildContainer(reply: Comment, index: number): Node {
        const newElement: HTMLDivElement = document.createElement('div');
        newElement.id = `${index}`;
        newElement.className = 'replies-container';

        const replyCommentContainer: HTMLDivElement = document.createElement('div');
        replyCommentContainer.id = `${index}`;
        replyCommentContainer.className = 'reply-comment-container';

        const replyCommentAuthor: HTMLDivElement = document.createElement('div');
        replyCommentAuthor.className = 'reply-comment-author-name';
        replyCommentAuthor.innerText += reply.authorName;

        const replyCommentText: HTMLDivElement = document.createElement('div');
        replyCommentText.className = 'reply-comment-text';
        replyCommentText.innerHTML = this.boldMatch(reply.comment);
        replyCommentAuthor.appendChild(replyCommentText);

        const replyCommentAuthorImageContainer: HTMLDivElement = document.createElement('div');
        const replyCommentAuthorImage: HTMLImageElement = document.createElement('img');
        replyCommentAuthorImage.className = 'reply-comment-author-image author-image';
        replyCommentAuthorImage.src = reply.authorImage;

        replyCommentContainer.appendChild(replyCommentAuthorImageContainer).appendChild(replyCommentAuthorImage);
        replyCommentContainer.appendChild(replyCommentAuthor);

        newElement.appendChild(replyCommentContainer);

        return newElement;
    }

    private static boldMatch(comment: string): string {
        comment = comment.replace(new RegExp(`(${PopupRenderer.searchTerms})`, 'gmi'), '<b>$1</b>');
        return comment;
    }

    public static show(className: string): void {
        const button = document.querySelector(`${className}`) as HTMLElement;
        button.style.display = 'block';
    }

    public static hide(className: string): void {
        const button = document.querySelector(`${className}`) as HTMLElement;
        button.style.display = 'none';
    }

    public static toggle(className: string): void {
        const spinner = document.querySelector(`${className}`) as HTMLElement;
        const style = getComputedStyle(spinner);
        spinner.style.display = style.display === 'none' ? 'block' : 'none';
    }
}
