<template>
  <div>
    <div>
      <h3 class="text-h5 font-weight-medium pb-4">为你推荐</h3>

      <v-divider></v-divider>

      <div>
        <v-row v-for="(post,index) in this.post_list" :key="index" class="py-2" >
          <v-col cols="12">
            <v-card height="100%"
                    flat
                    :to="`/item/${post.post_id}`"
            >
              <v-img
                  :src="post.post_picture"
                  :aspect-ratio="16 / 9"
                  class="elevation-2"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  height="100%"
                  style="border-radius: 16px"
              ></v-img>
            </v-card>
          </v-col>

          <v-col>
            <div>
              <div class="text-h5 font-weight-bold primary--text">
                {{ post.post_title }}
              </div>

              <div class="text-body-1 py-4 max_abstract">
                {{ post.post_abstract }}
              </div>

              <div class="d-flex align-center pt-5">
                <v-avatar color="accent" size="24">
                  <v-icon dark small>mdi-feather</v-icon>
                </v-avatar>

                <div class="pl-2">{{ post.post_user.user_nickName }} · {{ post.post_time }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <!--    <div class="pt-4">-->
    <!--      <h3 class="text-h5 font-weight-medium pb-4">Category</h3>-->

    <!--      <v-divider></v-divider>-->

    <!--      <v-card color="accent" dark flat v-for="i in 5" :key="i" class="my-4">-->
    <!--        <v-card-text-->
    <!--          class="d-flex justify-space-between align-center white&#45;&#45;text"-->
    <!--        >-->
    <!--          <h6 class="text-h6">Travel</h6>-->

    <!--          <div class="text-h6">47</div>-->
    <!--        </v-card-text>-->
    <!--      </v-card>-->
    <!--    </div>-->

    <!--    <div class="pt-4">-->
    <!--      <h3 class="text-h5 font-weight-medium pb-4">Top Authors</h3>-->

    <!--      <v-divider></v-divider>-->

    <!--      <div class="pt-4">-->
    <!--        <div class="d-flex align-center mb-6" v-for="i in 5" :key="i">-->
    <!--          <v-avatar color="accent" size="64">-->
    <!--            <v-icon dark x-large>mdi-feather</v-icon>-->
    <!--          </v-avatar>-->

    <!--          <div class="pl-2">-->
    <!--            <div class="text-h6">Yan Lee</div>-->
    <!--            <div class="text-subtitle-1">47 Articles</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="pt-4">
      <h3 class="text-h5 font-weight-medium pb-4">Tags</h3>

      <v-divider></v-divider>

      <v-row class="pt-4">
        <v-col v-for="(post, index) in post_list" :key="index" class="flex-shrink-0" cols="auto">
          <v-chip color="accent" v-for="(tag, tagIndex) in post.tags.GameNameTagList" :key="tagIndex">
            #{{ tag.content }}
          </v-chip>
        </v-col>
      </v-row>
    </div>

    <!--    <div class="pt-4">-->
    <!--      <h3 class="text-h5 font-weight-medium pb-4">Newsletter</h3>-->

    <!--      <v-divider></v-divider>-->

    <!--      <v-text-field-->
    <!--          label="Your email adress"-->
    <!--          solo-->
    <!--          type="email"-->
    <!--          outlined-->
    <!--          flat-->
    <!--          class="pt-4"-->
    <!--      ></v-text-field>-->
    <!--      <v-btn color="accent" block large>Subscrbe</v-btn>-->
    <!--    </div>-->
  </div>
</template>


<script>
import httpInstance from "@/utils/axios";

export default {
  name: "sidebar",
  data() {
    return {
      post_list: [],
      taglist: [],
      user_id: 2,
    }
  },
  mounted() {
    httpInstance.get('/home/GetInfoByOrder/', {
      opt: 0,
      k: 5,
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

          console.log("推荐！！！！！！！！")
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
  }
}
</script>

<style>
  .max_abstract {
    max-height: 140px;
    overflow: hidden;
    text-overflow: ellipsis; /* 超出部分使用省略号表示 */
  }
</style>