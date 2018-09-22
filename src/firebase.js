import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB52dL-25GPxX6S6ewrfgB0vd84XyaTtq8",
  authDomain: "timeboxer-app.firebaseapp.com",
  databaseURL: "https://timeboxer-app.firebaseio.com",
  projectId: "timeboxer-app",
  storageBucket: "",
  messagingSenderId: "667424789085"
}
firebase.initializeApp(config)

export default firebase
