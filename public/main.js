
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, remove, onValue } 
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
    local_store_name: 'chatdaze',
    user_name: "",
    user_chat: "",
    chat_id: "",
    chat_time: "",
    chat_user_name: "",
    chat_user_chat: "",
    chats: [],
    chat_box: false,
    user_register_box: true,
    a_chat: false,
    key_code: ""
  }),
  mounted: function () {
    if (!localStorage.chatdaze) {
      this.user_register_box = true
      this.chat_box = false
      this.a_chat = false
    } else {
      this.user_name = localStorage.chatdaze;
      this.user_register_box = false
      this.chat_box = true
      this.a_chat = true
      
      onValue(dbRef, (chatting) => {
        // this.chats = JSON.parse(chatting.val());
        playSound('gun2.mp3')
        this.chats = chatting.val();
        let html = ""
        for (const key in this.chats) {
            this.chat_id = key;
            this.chat_user_name = this.chats[key].chat_user_name;
            this.chat_user_chat = this.chats[key].chat_user_chat;
            this.chat_time = this.chats[key].chat_time;
            if (this.chat_user_name === this.user_name) {
              html += `<li class="my_chat_left" v-if="a_chat"><div class="chat_info"><span class="chat_time">${this.chat_time}</span><span class="chat_user_name">${this.chat_user_name}</span><span class="chat_id">${this.chat_id}</span></div><div class="chat_my_chat">${this.chat_user_chat}</div></li>`
            } else {
              html += `<li class="others_chat_right" v-if="a_chat"><div class="chat_info"><span class="chat_id">${this.chat_id}</span><span class="chat_time">${this.chat_time}</span><span class="chat_user_name">${this.chat_user_name}</span></div><div class="chat_others_chat">${this.chat_user_chat}</div></li>`
            }
        }
        const chatListDOM = document.querySelector(".chat_list");
        chatListDOM.innerHTML = html;
        chatListDOM.scrollTo = chatListDOM.scrollHeight;
      });
    };
  },

  methods: {
    onKeyDown(event) {
      this.key_code = event.keyCode
      if (this.key_code === 13) {
        if (this.user_chat === "") {
          alert("チャットしろ！")
          playSound('booo.mp3')
          return
  
        }
        playSound('gun.wav')
        const now = new Date();
        const chatting = {
          chat_user_name: this.user_name,
          chat_user_chat: this.user_chat,
          chat_time: now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
        }
        const newPostRef = push(dbRef);
        set(newPostRef, chatting);
  
        this.user_chat = ""      
      }

    },
    btn_send: function() {
      if (this.user_chat === "") {
        alert("チャットしろ！")
        playSound('booo.mp3')
        return

      }
      playSound('gun.wav')
      const now = new Date();
      const chatting = {
        chat_user_name: this.user_name,
        chat_user_chat: this.user_chat,
        chat_time: now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
      }
      const newPostRef = push(dbRef);
      set(newPostRef, chatting);

      this.user_chat = ""
    },
    btn_register: function () {
      if (this.user_name === "") {
        playSound('booo.mp3')
        alert("挑戦者名を入力しろ！")
      } else {
        localStorage.setItem(this.local_store_name, this.user_name);
        playSound('register.mp3')
        this.user_register_box = false,
        this.chat_box = true
      }
      setTimeout(() => {window.location.reload()}, 1500)
      

    },
    btn_remove: function () {
      localStorage.removeItem('chatdaze')
      playSound('escape.mp3')
      this.user_register_box = true
      this.chat_box = false
      this.a_chat = false
      this.user_name = ""
      setTimeout(() => {window.location.reload()}, 800)

    },
    btn_trash: function () {
      remove(dbRef).then(() => {
        alert("Database Removed")
      })

    }

  }
})
app.mount("#app")

function playSound (voice) { 
  let sound = new Audio('media/' + voice);
  sound.play();
}