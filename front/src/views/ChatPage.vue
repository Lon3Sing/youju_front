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
        <v-card class="message-container"
                style="height: 500px; border: none; overflow-y: auto;"
                color="transparent"
        >
          <v-card
              v-for="message in messages"
              :key="message.id"
              :class="['mb-2', 'message-card', messageClass(message)]"
          >
            <v-card-text class="message-content">
              <template v-if="message.isSender">
                {{ message.content }}&nbsp;&nbsp;
                <v-avatar size="40" class="ml-2">
                  <img :src="message.sender.profile.img_url" alt="Avatar">
                </v-avatar>
                <v-progress-circular v-if="message.loading" indeterminate color="primary"></v-progress-circular>
              </template>
              <template v-else>
                <v-avatar size="40" class="mr-2">
                  <img :src="message.sender.profile.img_url" alt="Avatar">
                </v-avatar>
                &nbsp;&nbsp;{{ message.content }}
              </template>
            </v-card-text>
          </v-card>
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
        this.sessions = response;
        console.log('sessions:', this.sessions);
      });
    },
    loadChat_and_jump(sessionId, curSession) {
      this.curSession = curSession;
      this.currentSessionId = sessionId;
      this.fetchChatDetails();
    },
    fetchChatDetails(shouldScroll = true) {
      httpInstance.get('/people/message/GetChatDetails/', {
        params: {
          user_id: this.user_id,
          session_id: this.currentSessionId
        }
      }).then(response => {
        this.messages = response.map(msg => ({
          ...msg,
          isSender: msg.sender.user_id.toString() === this.user_id
        })).reverse();

        if (shouldScroll) {
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

      httpInstance.post('/people/message/PostReplyMessage/', newMessageObject)
          .then(response => {
            const index = this.messages.findIndex(msg => msg.loading);
            if (index !== -1) {
              this.messages[index] = {
                ...response.data,
                isSender: true,
                loading: false
              };
            }
            this.newMessage = "";
            this.scrollToBottom();
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
  flex-direction: row-reverse;
}

.message-receiver {
  justify-content: flex-start;
  flex-direction: row;
}

.message-content {
  max-width: 60%;
  padding: 10px 12px;
  font-size: large;
  line-height: 1.6;
  display: flex;
  align-items: center;
}

.message-sender .message-content {
  background-color: #cce8ff;
  text-align: right;
}

.message-receiver .message-content {
  background-color: #f0f0f0;
  text-align: left;
}
</style>
