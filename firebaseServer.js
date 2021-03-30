const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBOUccZYUFrSmm5CiiDBA9Ly8y4bI8bMt8",
  authDomain: "a-safe-city-project.firebaseapp.com",
  databaseURL: "https://a-safe-city-project.firebaseio.com",
  projectId: "a-safe-city-project",
  storageBucket: "a-safe-city-project.appspot.com",
  messagingSenderId: "811481716825",
  appId: "1:811481716825:web:6131c99f10ba5a6e66b948",
  measurementId: "G-3F5E8K4Y4V",
};

const  Firebase=firebase.initializeApp(firebaseConfig);
module.exports=Firebase