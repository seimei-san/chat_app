const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue, push } = require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  databaseURL: process.env.APP_DATABASE_URL,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SEND_ID,
  appId: process.env.APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function dataupdate () {
  var vue = this;
  const starCountRef = ref(database, 'chats');
  onValue(starCountRef, (snapshot) => {
    vue.chats = snapshot.val();
    console.log(snapshot.val())
  })
}
