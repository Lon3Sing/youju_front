<template>
  <v-row>
    <v-col cols="2">
      <mb/>
    </v-col>
    <v-col cols="9" class="ml-16">
      <v-card
          class="message-contain"
          style="height: 500px; border: none; overflow-y: auto;"
          color="transparent"
      >
        <v-card
            v-for="message in message_list"
            :key="message.feedback_id"
            class="my-3 mx-3 d-flex message"
        >
          <v-card-text class="message-content align-center wrap-text text-lg-body-1"
                       style="background-color: #fffced; color: black"
          >
            您在&nbsp;{{message.user_report_id.report_time}}&nbsp;关于&nbsp;"{{message.user_report_id.report_text}}"&nbsp;对用户&nbsp;&nbsp;
            <router-link :to="`UserHome/${message.user_report_id.reported_user.user_id}`" style="text-decoration: none;">
              <v-avatar size="40">
                <v-img :src="message.user_report_id.reported_user.profile.img_url"></v-img>
              </v-avatar>
              {{message.user_report_id.reported_user.user_nickName}}&nbsp;&nbsp;
            </router-link>
            的举报管理员已收到。反馈消息是: "{{message.feedback_text}}"
          </v-card-text>
          <v-card-text class="message-content d-flex justify-end align-center wrap-text text-lg-body-2"
                         text-color="black"
                         style="background-color: #fffce9;"
          >
            反馈时间：{{message.feedback_time}}
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import httpInstance from "@/utils/axios";

export default {
  name: "system_information",
  methods: {},
  components: {
    mb: () => import("@/components/details/messagebar.vue"),
  },
  data() {
    return {
      user_id: '',
      message_list: [],
    }
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id')
    httpInstance.get('/people/message/GetSystemNotice/', {
      params: {
        user_id: this.user_id,
      }
    }).then(response => {
      this.message_list = response.map(
          item => ({
            feedback_id: item.feedback_id,
            user_report_id: item.user_report_id,
            feedback_text: item.feedback_text,
            feedback_time: item.feedback_time,
          })
      )
      console.log(this.message_list)
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.message-content {
  align-items: center;
  text-align: left;
}

.message {
  text-align: left;
  flex-wrap: wrap;
}
</style>
