<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="px-2">
        <v-list dense>
          <v-list-item
              v-for="session in sessions"
              :key="session.session_id"
              @click="loadChat_and_jump(session.session_id, session)"
              :class="{ 'active-session': session.session_id === currentSessionId }"
          >
            <v-list-item-avatar>
              <img :src="session.user2.profile.img_url" alt="Avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ session.user2.user_nickName }}</v-list-item-title>
              <v-list-item-subtitle>{{ session.last_reply_content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="8">
        <v-card class="message-container" style="height: 500px; border: none; overflow-y: auto;" color="transparent">
          <div v-for="message in messages" :key="message.id" :class="['my-3', 'message-card', messageClass(message)]"
               :style="{ minLength: message.content.length }">

            <v-card-text :class="['message-content', message.isSender ? 'sender' : 'receiver']">
              <template v-if="message.isSender">
                {{ message.content }}
                <v-progress-circular v-if="message.loading" indeterminate color="primary" size="24"
                                     class="ml-2"></v-progress-circular>
                <v-avatar size="40" class="ml-2">
                  <img :src="senderAvatar" alt="Avatar">
                </v-avatar>
              </template>
              <template v-else>
                <v-avatar size="40" class="mr-2">
                  <img :src="receiverAvatar" alt="Avatar">
                </v-avatar>
                {{ message.content }}
              </template>
            </v-card-text>
          </div>
        </v-card>
        <v-card class="mt-8" style="border: none; box-shadow: none;" color="transparent" v-if="currentSessionId !== -1">
          <v-form @submit.prevent="sendNewMessage">
            <v-text-field
                v-model="newMessage"
                label="发送消息"
                outlined
                dense
                append-icon="mdi-send"
                @click:append="sendNewMessage"
            ></v-text-field>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import httpInstance from "@/utils/axios";

export default {
  data() {
    return {
      user_id: '',
      sessions: [],
      messages: [],
      currentSessionId: -1,
      curSession: null,
      newMessage: "",
      pollInterval: null,
      senderAvatar: '',
      receiverAvatar: '',
      switched: false,
    };
  },
  mounted() {
    if (!this.$cookies.isKey('user_id')) {
      alert('您还未登录!')
      this.$router.push('/login')
    }
    this.user_id = this.$cookies.get('user_id');
    //获取路由中的id参数

    this.fetchSessionList();
    this.startPolling();
    //延迟一秒后执行，确保sessions已经加载
    if (this.$route.params.id === '-1') {
      return;
    }
    setTimeout(() => {
      console.log("进来了");
      const chatUserId = parseInt(this.$route.params.id);
      let session = this.sessions.find(session => session.user2.user_id === chatUserId);
      console.log("session:", this.sessions);
      console.log("chatUserId:", chatUserId);
      if (session) {
        this.loadChat_and_jump(session.session_id, session);
      } else {
        alert('未找到对应的会话！'+chatUserId)
      }
    }, 1000);
    //在sessions中找到user2.user_id等于chatUserId的session

  },
  beforeDestroy() {
    this.stopPolling();
  },
  methods: {
    getMessageMinHeight(content) {
      // 根据内容长度计算最小高度，这里可以根据实际需要进行调整
      // 如果消息内容超过50个字符，使用自动高度
      return content.length > 50 ? 'auto' : '40px';
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$el.querySelector(".message-container");
        container.scrollTop = container.scrollHeight;
      });
    },
    async fetchSessionList() {
      await httpInstance.get('/people/message/GetSessionList/', {
        params: {
          user_id: this.user_id
        }
      }).then(response => {
        this.sessions = response; // 修正 sessions 数据结构
        // console.log('sessions:', this.sessions);
      });
    },
    loadChat_and_jump(sessionId, curSession) {
      this.switched = true;
      this.curSession = curSession;
      this.currentSessionId = sessionId;
      this.fetchChatDetails();
    },
    fetchChatDetails(shouldScroll = true) {
      console.log("fetching chat details...", {
        user_id: this.user_id,
        session_id: this.currentSessionId
      });
      httpInstance.get('/people/message/GetChatDetails/', {
        params: {
          user_id: this.user_id,
          session_id: this.currentSessionId
        }
      }).then(response => {
        let oldMessages = this.messages;
        let newMessages = response.chat.map(msg => ({
          ...msg,
          isSender: msg.sender.user_id.toString() === this.user_id
        })).reverse();

        //以下处理是否更新消息列表
        if (this.switched && response.oppo_user.user_id === this.curSession.user2.user_id) {
          this.messages = newMessages;
          this.senderAvatar = response.user.profile.img_url;
          this.receiverAvatar = response.oppo_user.profile.img_url;
          this.switched = false;
          console.log("chat fetched!(1)");
        } else if(response.oppo_user.user_id !== this.curSession.user2.user_id) {
          //如果接收消息的对方用户不是当前会话的对方用户，说明会话已经切换，不做处理
        }else {
          let oldLength = oldMessages.length;
          let newLength = newMessages.length;
          if (newLength > oldLength) {
            this.messages = newMessages;
            this.senderAvatar = response.user.profile.img_url;
            this.receiverAvatar = response.oppo_user.profile.img_url;
          } else if (oldLength === newLength) {
            if (oldLength > 0 && newLength > 0 && oldMessages[oldLength - 1].isSender !== newMessages[newLength - 1].isSender) {
              //最后一条消息的发送人不一样且长度相等，说明对方消息被插入但是我的消息未被插入
              let loadingMessages = oldMessages.filter(msg => msg.loading);
              this.messages = newMessages;
              this.senderAvatar = response.user.profile.img_url;
              this.receiverAvatar = response.oppo_user.profile.img_url;
              this.messages.push(...loadingMessages);
            } else {
              this.messages = newMessages;
              this.senderAvatar = response.user.profile.img_url;
              this.receiverAvatar = response.oppo_user.profile.img_url;
            }
          } else {
            //本地消息列表长度大于远程的，说明远程还未更新，不做处理
          }
          console.log("chat fetched!(3)");
        }

        //以下处理是否滚动
        if (shouldScroll || oldMessages.length !== this.messages.length) {
          this.scrollToBottom();
        }

      });
    },
    messageClass(message) {
      return message.isSender ? 'message-sender' : 'message-receiver';
    },
    sendNewMessage() {
      if (!this.newMessage) return;

      const newMessageObject = {
        content: this.newMessage,
        user1_id: this.user_id,
        user2_id: this.curSession.user2.user_id,
        isSender: true,
        loading: true,
      };
      this.messages.push(newMessageObject);
      this.scrollToBottom();

      httpInstance.post('/people/message/PostReplyMessage/', newMessageObject)
          .then(response => {
            this.newMessage = "";
            this.scrollToBottom();
            this.fetchChatDetails();
          }).catch(error => {
        console.error("发送消息失败: ", error);
      });
    },
    startPolling() {
      this.pollInterval = setInterval(() => {
        if (this.currentSessionId) {
          this.fetchChatDetails(false);
        }
        this.fetchSessionList();
      }, 5000);
    },
    stopPolling() {
      clearInterval(this.pollInterval);
    }
  }
};
</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-card {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.message-sender {
  justify-content: flex-end;
}

.message-receiver {
  justify-content: flex-start;
}

.sender {
  justify-content: flex-end;
}

.receiver {
  justify-content: flex-start;
}

.message-content {
  max-width: 60%; /* 最大宽度 */
  min-width: 100px; /* 最小宽度，确保卡片不会过于狭窄 */
  padding: 10px 12px;
  font-size: large;
  line-height: 1.6;
  display: inline-block; /* 修改为 inline-block 以便自适应宽度 */
  align-items: center;
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
  word-wrap: break-word; /* 增加这个属性以确保英文长单词能够换行 */
  word-break: break-all; /* 增加这个属性以确保长文本能够正确换行 */
  white-space: pre-wrap; /* 保留空格和换行符 */
}

.message-sender .message-content {
  background-color: #cce8ff;
  text-align: right;
  margin-left: auto;
}

.message-receiver .message-content {
  background-color: #f0f0f0;
  text-align: left;
  margin-right: auto;
}
.active-session {
  background-color: #cce8ff;
}
</style>
