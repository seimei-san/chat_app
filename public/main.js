const app = Vue.createApp({
  data: () => ({
    user_name: "seimei",
    user_chat: "hoge hoge",
    chat_time: "",
    chat_id: "",
    user_id: "",
    user_chatted: "",
    chats: [
      {
        chat_id: "123445",
        chat_time: "10:10",
        user_id: "seimei",
        user_chatted: "hoge hoge hoge hoges"
     },  
     {
      chat_id: "4561894sdf",
      chat_time: "12:30",
      user_id: "hogehoge",
      user_chatted: "hoge hoge hoge hoges"
      }
    ]
    

  }),
  methods: {
    btn_send: function() {
      console.log('click btn')
      this.showChats();
    },
  showChats () {
    const chatsDOM = document.querySelector(".chat_list");
    try {
      // const { data: chats }= await axios.get("/api/v1/chats");
      // if (chats.length < 1) {
      //   chatsDOM.innerHTML = `<h5 class="empty-list">メモは、ありません。</h5>`;
      //   return
      // }
      const allChats = this.chats.map((chat) => {
        console.log(this.chats);
        console.log(chat);
        this.chat_id = chat.chat_id;
        console.log(this.chat_id);
        this.user_id = chat.user_id;
        this.chat_time = chat.chat_time;
        this.user_chatted = chat.user_chatted;
        if (this.user_id == this.user_name) {
          console.log('RIGHT');
        return `<li class="my_chat_left"><div class="chat_info"><span class="chat_time">${this.chat_time}</span><span class="user_id">${this.user_id}</span><span class="chat_id">${this.chat_id}</span></div><div class="chatted">${this.user_chatted}</div></li>` 
        } else {
          console.log('LEFT');
          return `<li class="others_chat_right"><div class="chat_info"><span class="chat_id">${this.chat_id}</span><span class="chat_time">${this.chat_time}</span><span class="user_id">${this.user_id}</span></div><div class="chatted">${this.user_chatted}</div></li>`
        }
      })
      .join("");
      console.log(allChats);
      chatsDOM.innerHTML = allChats;
    } catch (error) {
      console.log(error);
    }
  }


  }
})
app.mount("#app")
