import PopupRenderer from './popup-renderer';

export interface CommentThread {
    rootAuthorName: string;
    rootAuthorImage: string;
    comment: string;
    replies?: Comment[];
}

export interface Comment {
    authorName: string;
    authorImage: string;
    comment: string;
}

export let nextPageToken = '';

export default class VideoManager {
    public static baseApiUrl = 'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies';
    public static maxResultsQuery = 'maxResults=80';
    public static orderQuery = 'order=relevance';
    public static apiKey = 'AIzaSyBKy-9ns1O3Nj8c-TTQO42YRbzUen5sJtM';

    public static filterVideoId = (url: string): string => {
        // example link: https://www.youtube.com/watch?v=R-R0KrXvWbc
        const ytRegexp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/;
        const matches = url.match(ytRegexp);
        if (matches) return matches[2];
        return '';
    };

    public static getCommentsByVideoId = async (videoId: string, searchParam: string, url?: string): Promise<CommentThread[]> => {
        const apiURL =
            url ||
            `${VideoManager.baseApiUrl}&` +
                `${VideoManager.maxResultsQuery}&` +
                `${VideoManager.orderQuery}&` +
                `searchTerms=${searchParam}&` +
                `videoId=${videoId}&` +
                `&key=${VideoManager.apiKey}`;

        const response = await fetch(apiURL);
        const json = await response.json();
        console.log(json);

        if (json.nextPageToken) {
            nextPageToken = json.nextPageToken;
            PopupRenderer.showLoadButton();
        } else {
            nextPageToken = '';
            PopupRenderer.hideLoadButton();
        }

        if (!json) return [];

        return json.items.map((item: any) => ({
            rootAuthorName: item.snippet.topLevelComment.snippet.authorDisplayName,
            rootAuthorImage: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
            comment: item.snippet.topLevelComment.snippet.textDisplay,
            replies: item.replies
                ? item.replies.comments.map((comment: any) => ({
                      authorName: comment.snippet.authorDisplayName,
                      authorImage: comment.snippet.authorProfileImageUrl,
                      comment: comment.snippet.textDisplay,
                  }))
                : {},
        }));
    };

    public static loadMore = async (videoId: string, searchParam: string): Promise<CommentThread[]> => {
        if (nextPageToken) {
            const apiURL =
                `${VideoManager.baseApiUrl}&` +
                `${VideoManager.maxResultsQuery}&` +
                `${VideoManager.orderQuery}&` +
                `searchTerms=${searchParam}&` +
                `pageToken=${nextPageToken}&` +
                `videoId=${videoId}&` +
                `key=${VideoManager.apiKey}`;
            return VideoManager.getCommentsByVideoId(videoId, searchParam, apiURL);
        }
    };
}
