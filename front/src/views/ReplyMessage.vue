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
            v-for="(message,index) in message_list" :key = index
            class="my-3 mx-3 d-flex message"
        >
          <v-card-text class="message-content align-center wrap-text text-lg-body-1"
                       style="background-color: #fffcd4; color: black"
          >
            <router-link :to="`UserHomeVisit/${message.user.user_id}`" style="text-decoration: none;">
              <v-avatar size="40">
                <v-img :src="message.user.profile.img_url"></v-img>
              </v-avatar>
              {{message.user.user_nickName}}
            </router-link>
            &nbsp;&nbsp;回复了你在&nbsp;
            <router-link :to="`item/${message.post.post_id}`" style="text-decoration: none;">
              "{{message.post_title}}"
            </router-link>
            &nbsp;的评论&nbsp;"{{message.ori_content}}"&nbsp;:&nbsp;{{message.content}}
          </v-card-text>
          <v-card-text class="message-content d-flex justify-end align-center wrap-text text-lg-body-2"
                         text-color="black"
                         style="background-color: #fffcd4;"
          >
            评论时间：{{message.comment_time}}
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import httpInstance from "@/utils/axios";

export default {
  name: "LikeMessage",
  methods: {
    key() {
      return key
    }
  },
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
    httpInstance.get('/people/message/GetReplyNotice/', {
      params: {
        user_id: this.user_id,
      }
    }).then(response => {
      this.message_list = response.map(
          item => ({
            user : item.user,
            post_title : item.post_title,
            content : item.content,
            comment_time : item.comment_time,
            ori_content : item.ori_content,
            ori_time : item.ori_time,
            post : item.post,
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
