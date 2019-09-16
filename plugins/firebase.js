import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp({
      apiKey: "AIzaSyD7Yw_sok-AkFGMrLoDlidsxG35UNO4qTU",
      authDomain: "exursii.firebaseapp.com",
      databaseURL: "https://exursii.firebaseio.com",
      projectId: "exursii",
      storageBucket: "exursii.appspot.com",
      messagingSenderId: "378888820830",
      appId: "1:378888820830:web:4924b520cb7a7fd8"
    })
}
