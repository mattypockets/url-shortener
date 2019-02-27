import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCCcX1pB7rFgyL963A18dMVzYGWt8_fNdw",
    authDomain: "foundry-url-shortener.firebaseapp.com",
    databaseURL: "https://foundry-url-shortener.firebaseio.com",
    projectId: "foundry-url-shortener",
    storageBucket: "foundry-url-shortener.appspot.com",
    messagingSenderId: "438087726274"
};
firebase.initializeApp(config);

export default firebase