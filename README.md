# Teeny Url - Your Own Personal URL Shortener

This project was created as a coding challenge for [Foundry](https://www.foundrymakes.com/)

Simply sign up or log in, paste your long url into the field, and click Create URL.

![](/screenshots/urlCreate.gif)

Anyone will be able to use your shortened URLs, but only you can see the list of URLs you have shortened and their hit counts.

![](/screenshots/redirect.gif)

## Run it yourself

After cloning the project, cd into the project directory and install dependencies with either

`npm install`  
`yarn install`

You'll also need to create a new project on [Firebase](https://firebase.google.com/) and add the config to firebase.js

![](/screenshots/firebaseConfig.gif)

After that, just run the app

`node start`  
`yarn start`

Then you're good to go!

### Technologies used
[Create React App](https://github.com/facebook/create-react-app)  
[Firebase](https://firebase.google.com/)  
[React-Router](https://github.com/ReactTraining/react-router)  
[React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap)  
[shortid](https://github.com/dylang/shortid)
