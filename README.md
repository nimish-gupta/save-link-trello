# save-link-trello

This is a extension which is used to save the links to trello while clicking `alt + mouse left click`. 
This is a mono repo which provides two services
- Node server
- Firefox extension

## Development
1. `git clone https://github.com/nimish-gupta/save-link-trello.git`.
2. `cd save-link-trello`
3. `yarn install`
4. Copy `constants.example.js` file to `api/_config/constants.js` and fill the constants.js file with appropriate values.
5. `yarn start:dev` to start server.
6. `cd extension && web-ext run --verbose`

## Deployment Links
- [Node Server](https://save-link-trello.herokuapp.com)
- [Save Link Trello](https://addons.mozilla.org/en-US/firefox/addon/save-link-trello/?src=search)
