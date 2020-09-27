# YouTube Comment Searcher

### What?

Web Extension for quickly searching through a YouTube video\'s comments without needing to leave the video.

### Why?

I often hear songs in videos that I want to know the name of and it's not currently possible to search through youtube's comments for specific keywords such as "Song name" or "Artist" etc.

### How?

Using the YouTube API, it\'s possible to get a list of the comments for a specific video. The rest is simply to query on the list based on the user\'s search parameters.


### Contributors

1. Fork the repo and clone it onto your local machine
2. From Chrome, go to chrome://extensions
3. Enable developer mode
4. Click on Load Unpacked
5. Select the cloned repository
6. (Optional) Pin the extension onto your searchbar for ease of access

The extension should reload automatically if the files have been changed locally.
## Project setup
```
npm install
```

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Todo

- [X] Change to TypeScript
- [X] Get videoId on popup
- [X] Get comments for a single video
- [X] Display comments & replies on popup click
- [X] Filter comments by user search param
- [ ] Implement 'Load More Comments' feature
- [ ] Implement Cloud Functions (*)
- [ ] Implement checkboxes for filtering based on Relevance, Order, etc.
