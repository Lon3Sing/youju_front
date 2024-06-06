<template>
  <div>
    <div>
      <h3 class="text-h5 font-weight-bold pb-4">相关帖子</h3>
      <v-divider></v-divider>
      <div>

        <v-row v-for="(post,index) in post_list" :key="index" class="py-2">
          <v-col cols="12">
            <v-card height="100%" flat>
              <v-img
                  :src="post.post_picture"
                  :aspect-ratio="16 / 9"
                  height="100%"
                  @click.native="goToDetailPage(post.post_id)"
                  class="hover-area"
              ></v-img>
            </v-card>
          </v-col>

          <v-col>
            <router-link :to="`/item/${post.post_id}`" style="text-decoration: none;">
              <div>


                <h3 class="text-h5 font-weight-bold primary--text">
                  {{ post.post_title }}
                </h3>
                <h6 class="text-sm-body-1  primary--text max_abstract">
                  {{ post.post_abstract }}
                </h6>
                <h3 class="text-sm-h6 font-weight-bold primary--text py-3">
                  发布时间:{{ post.post_time }}
                </h3>
              </div>
            </router-link>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import httpInstance from "@/utils/axios";

export default {
  props: {
    related_posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      post_list: [],
    }
  },
  methods: {
    goToDetailPage(postId) {
      this.$router.push(`/item/${postId}`);
    },
    loadPostMessage() {
      httpInstance.get('/forum/GetRelatePosts/', {
        params: {
          post_id: this.$route.params.id
        }
    })
        .then(response => {
          this.post_list = response.map(
              post => ({
                post_collect_Num: post.post_collect_Num,
                post_comNum: post.post_comNum,
                post_is_crawled: post.post_is_crawled,
                post_picture: post.picture.img_url,
                post_abstract: post.post_abstract,
                post_id: post.post_id,
                post_like: post.post_like,
                post_success: post.post_success,
                post_time: post.post_time,
                post_title: post.post_title,
                post_type: post.post_type,
                tags: post.tags,
                post_user: post.user,
              })
          )
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
    }
  },
  mounted() {
    this.loadPostMessage()
  },
  watch: {
    '$route'(to, from) {
      // 当路由发生变化，更新 gameId
      if (to.params.id !== from.params.id) {
        this.game_id = to.params.id;
        this.loadPostMessage();
      }
    }
  },
}
</script>

<style>
.hover-area {
  cursor: pointer;
}
.max_abstract {
  max-height: 140px;
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分使用省略号表示 */
}

</style>

