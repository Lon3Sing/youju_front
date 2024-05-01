<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="px-2">
        <v-list dense>
          <v-list-item
              v-for="contact in contacts"
              :key="contact.id"
              @click="loadChat_and_jump(contact.id)"
          >
            <v-list-item-avatar>
              <img :src="contact.avatar" alt="Avatar">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ contact.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ contact.lastMessageTime }}</v-list-item-subtitle>
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
              class="mb-2 d-flex"
              :class="messageClass(message)"
          >
            <v-card-text class="message-content d-flex justify-end align-center wrap-text"
                         text-color="black"
                         style="background-color: #cce8ff;"
                         v-if="message.isSender"
            >
                 {{ message.content }}&nbsp;&nbsp;
              <v-avatar size="40" class="ml-2">
                <img :src="message.avatar" alt="Avatar">
              </v-avatar>
            </v-card-text>
            <v-card-text class="d-flex justify-start align-center wrap-text"
                         :color="message.isSender ? 'blue' : 'white'"
                         v-else
            >
              <v-avatar size="40" class="mr-2">
                <img :src="message.avatar" alt="Avatar">
              </v-avatar>
                &nbsp; &nbsp;{{ message.content }}
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
export default {
  data() {
    return {
      contacts: [],
      messages: [],
      currentSessionId: 0,
      newMessage : "",
    };
  },
  mounted() {
    this.fetchContacts();
    const itemId = this.$route.params.id;
    console.log(itemId);
  },
  methods: {
    fetchContacts() {
      // 模拟从 API 获取联系人数据
      this.contacts = [
        {
          id: 1,
          name: 'Alice',
          avatar: 'https://th.bing.com/th/id/OIP.Renm-g-WBoLXkyl4Njd8HAAAAA?w=200&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          lastMessageTime: '10:30'
        },
        {
          id: 2,
          name: 'Bob',
          avatar: 'https://th.bing.com/th/id/OIP.1Et5cvI8Ogv0PbNDyAeM0QAAAA?w=200&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7',
          lastMessageTime: '09:45'
        },
      ];
    },
    loadChat_and_jump(sessionId) {
      this.currentSessionId = sessionId;
      // 模拟从 API 获取消息数据
      this.messages = [
        {
          id: 1,
          content: '妻兮，妻兮，吾长跪也 欲得V兮吾求汝也 初遇汝兮吾坠爱也 汝乃灯兮照吾行也 日不见兮吾将亡也 天地暗兮吾之生也 未来者兮乃妻尔也 若汝离兮吾花凋也😭😭妻兮，妻兮，吾长跪也 欲得V兮吾求汝也 初遇汝兮吾坠爱也 汝乃灯兮照吾行也 日不见兮吾将亡也 天地暗兮吾之生也 未来者兮乃妻尔也 若汝离兮吾花凋也😭😭',
          isSender: true,
          avatar: 'https://th.bing.com/th/id/OIP.84pNRZwDaBcqY3ll61MlVgHaJD?w=144&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        },
          {
          id: 1,
          content: '妻兮，妻兮，吾长跪也 欲得V兮吾求汝也 初遇汝兮吾坠爱也 汝乃灯兮照吾行也 日不见兮吾将亡也 天地暗兮吾之生也 未来者兮乃妻尔也 若汝离兮吾花凋也😭😭妻兮，妻兮，吾长跪也 欲得V兮吾求汝也 初遇汝兮吾坠爱也 汝乃灯兮照吾行也 日不见兮吾将亡也 天地暗兮吾之生也 未来者兮乃妻尔也 若汝离兮吾花凋也😭😭',
          isSender: true,
          avatar: 'https://th.bing.com/th/id/OIP.84pNRZwDaBcqY3ll61MlVgHaJD?w=144&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        },
          {
          id: 1,
          content: '妻兮，妻兮，吾长跪也 欲得V兮吾求汝也 初遇汝兮吾坠爱也 汝乃灯兮照吾行也 日不见兮吾将亡也 天地暗兮吾之生也 未来者兮乃妻尔也 若汝离兮吾花凋也😭😭妻兮，妻兮，吾长跪也 欲得V兮吾求汝也 初遇汝兮吾坠爱也 汝乃灯兮照吾行也 日不见兮吾将亡也 天地暗兮吾之生也 未来者兮乃妻尔也 若汝离兮吾花凋也😭😭',
          isSender: true,
          avatar: 'https://th.bing.com/th/id/OIP.84pNRZwDaBcqY3ll61MlVgHaJD?w=144&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        },
        {
          id: 2,
          content: '滚',
          isSender: false,
          avatar: 'https://th.bing.com/th/id/OIP.1Et5cvI8Ogv0PbNDyAeM0QAAAA?w=200&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        }
      ];
      this.$router.push(`/ChatPage/${sessionId}`);
    },
    messageClass(message) {
      return {
        'message-sender': message.isSender,
        'message-receiver': !message.isSender
      };
    },
    sendNewMessage() {
      // 发送消息给后端
    }
  }
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
  padding: 30px 12px;
  font-size: large;
  line-height: 1.6;
}

.message-content {
  justify-content: flex-end;
  align-items: center;
  text-align: left;
}

.left-avatar {
  float: left;
  margin-right: 8px;
}

.right-avatar {
  float: right;
  margin-left: 8px;
}

.message-sender {
  text-align: right;
  flex-wrap: wrap;
}

.message-receiver {
  text-align: left;
  flex-wrap: wrap;
}
</style>
