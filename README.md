# note-sharing-app
Note sharing app is a platform for students to easily store and share their notes from lectures. Users can easily create new notes for themselves and others to see and even include images to them. Not only that, users can have a chat between themselves about notes, to comment on their quality.

Note sharing app is powered by Express Node.js application framework and MongoDB. Registering and authentication with help of Password.js is easy and secure. Note sharing app is also made responsive, so you can use it also on your mobile device.
## Application
[https://note-sharing-app.paas.datacenter.fi/](https://note-sharing-app.paas.datacenter.fi/)
## Local development
Clone the repository and run `npm install`. Fill .env_example file with your local MongoDB configurations. You also need to fill in your Password.js secrect and set IS_PROD variable to false. Finally rename .env_example to .env.
### Commands
```
npm start
Start server and nodemon.

npm run watch
Start gulp to watch front-end assets

npm run generate-doc
Generate new API documentation
```

## API documentation
[https://jamiamikko.github.io/note-sharing-app/](https://jamiamikko.github.io/note-sharing-app/)