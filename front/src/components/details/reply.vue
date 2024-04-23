<template>
  <v-card class="pa-3 mb-2">
    <v-row align="center">
      <v-col cols="auto">
        <v-avatar size="40">
          <v-img :src="avatarUrl"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <span class="text-subtitle-1">{{ nickname }}&nbsp;于&nbsp;{{time}}&nbsp;&nbsp;</span>
        <span>回复了您在</span>
<!--        <v-btn text :href="articleUrl" target="_blank">{{ articleTitle }}</v-btn>-->
        <router-link :to="articleUrl" style="text-decoration: none;">
          {{articleTitle}}
        </router-link>
        <span>：</span>
        <span>{{ commentContent }}</span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'ReplyComponent',
  props: {
    avatarUrl: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true
    },
    articleTitle: {
      type: String,
      required: true
    },
    articleUrl: {
      type: String,
      required: true
    },
    commentContent: {
      type: String,
      required: true
    },
    time : {
      type : String,
      required: true
    }
  }
}
</script>
