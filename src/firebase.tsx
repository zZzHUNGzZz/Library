import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBNczM-Pi8tAEILVjpnpTl5vWHQxrP6Q7Q",
    authDomain: "library-19de3.firebaseapp.com",
    databaseURL: "https://library-19de3-default-rtdb.firebaseio.com",
    projectId: "library-19de3",
    storageBucket: "library-19de3.appspot.com",
    messagingSenderId: "123459615687",
    appId: "1:123459615687:web:43280d5d9765087b5877e2",
    measurementId: "G-4ZPXBNTGPF"
};
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var storage = firebase.storage();

export { database, storage };