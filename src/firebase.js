import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCDxsiTPfd7IPiYIL3vCL35dYkltZiQ9ic",
  authDomain: "clone-513f7.firebaseapp.com",
  databaseURL: "https://clone-513f7.firebaseio.com",
  projectId: "clone-513f7",
  storageBucket: "clone-513f7.appspot.com",
  messagingSenderId: "310603740526",
  appId: "1:310603740526:web:af0bd43496231c96c3fd7f",
  measurementId: "G-TFVWDE0D8Z",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
