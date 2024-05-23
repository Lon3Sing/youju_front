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
               :style="{ minLength: 'auto' }">

          <v-card-text :class="['message-content', message.isSender ? 'sender' : 'receiver']">
              <template v-if="message.isSender">
                {{ message.content }}
                <v-progress-circular v-if="message.loading" indeterminate color="primary" size="24" class="ml-2"></v-progress-circular>
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
        <v-card class="mt-8" style="border: none; box-shadow: none;" color="transparent">
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
      currentSessionId: 0,
      curSession: null,
      newMessage: "",
      pollInterval: null,
      senderAvatar: '',
      receiverAvatar: ''
    };
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id');
    this.fetchSessionList();
    this.startPolling();
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
    fetchSessionList() {
      httpInstance.get('/people/message/GetSessionList/', {
        params: {
          user_id: this.user_id
        }
      }).then(response => {
        this.sessions = response; // 修正 sessions 数据结构
        console.log('sessions:', this.sessions);
      });
    },
    loadChat_and_jump(sessionId, curSession) {
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
        this.messages = response.chat.map(msg => ({
          ...msg,
          isSender: msg.sender.user_id.toString() === this.user_id
        })).reverse();
        this.senderAvatar = response.user.profile.img_url;
        this.receiverAvatar = response.oppo_user.profile.img_url;
        if (shouldScroll || oldMessages !== this.messages) {
          this.scrollToBottom();
        }
        console.log("chat fetched!");
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
            // const index = this.messages.findIndex(msg => msg.loading);
            // if (index !== -1) {
            //   this.messages[index] = {
            //     ...response,
            //     isSender: true,
            //     loading: false
            //   };
            // }
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

.message-content {
  max-width: 60%;
  padding: 10px 12px;
  font-size: large;
  line-height: 1.6;
  display: flex;
  align-items: center;
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
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

.sender {
  justify-content: flex-end;
}

.receiver {
  justify-content: flex-start;
}
</style>
