import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDD4hji9p8ZjJkcV-Y3Cwh3c-DBFkEd0WE",
    authDomain: "wunderrussia.firebaseapp.com",
    databaseURL: "https://wunderrussia.firebaseio.com",
    projectId: "wunderrussia",
    storageBucket: "wunderrussia.appspot.com",
    messagingSenderId: "1067834071887",
    appId: "1:1067834071887:web:9239ac7d9a9368d819033a"
  })
}

export const db = firebase.firestore()