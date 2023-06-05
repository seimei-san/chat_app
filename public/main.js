
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved, onValue } 
from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
import env from "./env.js";

const firebaseConfig = {
  apiKey: env.firebaseConfigEnv.apiKey,
  authDomain: env.firebaseConfigEnv.authDomain,
  databaseURL: env.firebaseConfigEnv.databaseURL,
  projectId: env.firebaseConfigEnv.projectId,
  storageBucket: env.firebaseConfigEnv.storageBucket,
  messagingSenderId: env.firebaseConfigEnv.messagingSenderId,
  appId: env.firebaseConfigEnv.appId
};

const firebaseApp = initializeApp(firebaseConfig);
const db  = getDatabase(firebaseApp); //RealtimeDBに接続
const dbRef = ref(db,"chats"); //RealtimeDB内の"chat"を使う

const app = Vue.createApp({
  data: () => ({
    user_name: "",
    user_chat: "",
    chat_id: "",
    chat_time: "",
    chat_user_name: "",
    chat_user_chat: "",
    chats: [],

  }),
  mounted: function () {
    onValue(dbRef, (chatting) => {
      // this.chats = JSON.parse(chatting.val());
      this.chats = chatting.val();
      let html = ""
      for (const key in this.chats) {
          this.chat_id = key;
          this.chat_user_name = this.chats[key].chat_user_name;
          this.chat_user_chat = this.chats[key].chat_user_chat;
          this.chat_time = this.chats[key].chat_time;
          if (this.chat_user_name === this.user_name) {
            html += `<li class="my_chat_left"><div class="chat_info"><span class="chat_time">${this.chat_time}</span><span class="chat_user_name">${this.chat_user_name}</span><span class="chat_id">${this.chat_id}</span></div><div class="chat_my_chat">${this.chat_user_chat}</div></li>`
          } else {
            html += `<li class="others_chat_right"><div class="chat_info"><span class="chat_id">${this.chat_id}</span><span class="chat_time">${this.chat_time}</span><span class="chat_user_name">${this.chat_user_name}</span></div><div class="chat_others_chat">${this.chat_user_chat}</div></li>`
          }
      }
      const chatListDOM = document.querySelector(".chat_list");
      chatListDOM.innerHTML = html;
      chatListDOM.scrollTo = chatListDOM.scrollHeight;
    });
  },

  methods: {
    btn_send: function() {
      const now = new Date();
      const chatting = {
        chat_user_name: this.user_name,
        chat_user_chat: this.user_chat,
        chat_time: now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      }
      const newPostRef = push(dbRef);
      set(newPostRef, chatting);
    },
  }
})
app.mount("#app")