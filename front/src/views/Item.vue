<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div>
            <v-card flat color="transparent">
              <v-img
                  :src="image"
                  :aspect-ratio="16 / 9"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  style="border-radius: 16px"
              ></v-img>

              <v-card-text>

                <div class="text-h4 font-weight-bold primary--text pt-4">
                  <h4>{{ title }}</h4>
                </div>

                <div class="text-body-1 py-4">
                  {{ abstract }}
                </div>

                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <router-link :to="`/UserHomeVisit/${author.user_id}`">
                      <v-avatar color="accent" size="36">
                        <v-img :src="author.profile.img_url"></v-img>
                      </v-avatar>
                    </router-link>
                    <div class="pl-2 text-body-1">{{ author.user_nickName }} · {{ time }}</div>
                  </div>

                  <div class="d-flex align-center">
                    <div>
                      <v-chip small color="transparent">
                        <v-icon left>mdi-eye</v-icon>
                        {{ this.browseNum }}
                      </v-chip>

                      <v-chip small color="transparent">
                        <v-icon left>mdi-comment-outline</v-icon>
                        {{ comments.length }} 楼
                      </v-chip>
                    </div>
                  </div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="transparent" v-html="content"/>

                <div class="d-flex align-center justify-space-between mt-8">
                  <div>
                    <v-row>
                      <v-col v-for="tag in showTags" :key="tag.id" class="flex-shrink-0" cols="auto">
                        <v-chip color="accent">#{{ tag.name }}</v-chip>
                      </v-col>
                    </v-row>
                  </div>

                  <!--                  <div class="text-h5">-->
                  <!--                    Share >-->
                  <!--                    <v-btn icon large>-->
                  <!--                      <v-icon large color="primary">mdi-facebook</v-icon>-->
                  <!--                    </v-btn>-->

                  <!--                    <v-btn icon large>-->
                  <!--                      <v-icon large color="primary">mdi-twitter</v-icon>-->
                  <!--                    </v-btn>-->

                  <!--                    <v-btn icon large>-->
                  <!--                      <v-icon large color="primary">mdi-linkedin</v-icon>-->
                  <!--                    </v-btn>-->

                  <!--                    <v-btn icon large>-->
                  <!--                      <v-icon large color="primary">mdi-instagram</v-icon>-->
                  <!--                    </v-btn>-->
                  <!--                  </div>-->
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="d-flex align-center justify-space-around">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="showReportDialog = true">
                        <v-icon>mdi-flag</v-icon>
                      </v-btn>
                    </template>
                    <span>举报</span>
                  </v-tooltip>
                  <!-- 举报对话框 -->
                  <v-dialog v-model="showReportDialog" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5">举报内容</v-card-title>
                      <v-card-text>
                        <v-textarea
                            v-model="reportContent"
                            label="请输入举报理由"
                            rows="3"
                        ></v-textarea>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="showReportDialog = false">取消</v-btn>
                        <v-btn color="primary" text @click="submitReport">提交</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="onToggleFavorite">
                        <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ isFavorite ? '取消收藏':'收藏' }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="onToggleFollow">
                        <v-icon>{{ isFollowing ? 'mdi-account-check' : 'mdi-account-plus' }}</v-icon>
                      </v-btn>
                    </template>
                    <span>{{isFollowing ? '取消关注' : '关注作者'}}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="onLike">
                        <v-icon>{{ hasLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}</v-icon>
                      </v-btn>

                    </template>
                    <span>{{ hasLiked ? '取消点赞' : '点赞' }}</span>

                  </v-tooltip>
                </div>

                <div class="text-h4 py-2">评论</div>

                <!--- 提交一级评论的框框 --->
                <div>
                  <v-textarea outlined v-model="commentText" label="Leave a comment..."></v-textarea>
                  <v-btn color="primary" @click="submitComment">Submit Comment</v-btn>
                </div>


                <!-- 评论显示区 -->
                <div v-for="(comment,index) in comments" :key="index" class="my-2">
                  <v-card outlined class="mb-3">
                    <v-card-text>
                      <div class="d-flex justify-space-between">
                        <div class="d-flex">
                          <router-link :to="`/UserHomeVisit/${comment.user_id}`">
                            <v-avatar size="64">
                              <img :src="comment.avatar" alt="Avatar"> <!-- 显示用户头像 -->
                            </v-avatar>
                          </router-link>
                          <div class="ml-2">
                            <div class="font-weight-bold text-subtitle-1">
                              <!-- TODO  url-->
                              <router-link :to="`/UserHomeVisit/${comment.user_id}`" style="text-decoration: none;">{{
                                  comment.user
                                }}
                              </router-link>
                            </div>
                            <div v-html="linkify(comment.text, comment.id)"></div>
                          </div>

                        </div>
                        <v-btn text icon @click="toggleL1ReplyInput(comment.id)">
                          <v-icon>mdi-reply</v-icon>
                        </v-btn>
                      </div>

                      <!-- 回复输入框 -->
                      <v-row v-if="replyingToId === comment.id" class="mt-2">
                        <v-col cols="12">
                          <v-text-field
                              label="Write a reply..."
                              v-model="comment.newReply"
                              dense
                              outlined
                              size="small"
                          ></v-text-field>
                          <v-btn small @click="submitReply(comment)">Reply</v-btn>
                        </v-col>
                      </v-row>

                      <!-- 二级评论展示，使用递归组件或直接在这里渲染 -->
                      <v-col cols="12" class="ml-4" v-for="reply in comment.replies" :key="reply.id">
                        <v-card outlined class="mb-2">
                          <v-card-text>
                            <div class="d-flex justify-space-between">
                              <div class="d-flex">
                                <router-link :to="`/UserHomeVisit/${reply.id}`">
                                  <v-avatar size="32">
                                    <img :src="reply.avatar" alt="Avatar"> <!-- 显示用户头像 -->
                                  </v-avatar>
                                </router-link>
                                <div class="ml-2">
                                  <div class="font-weight-bold text-subtitle-1">
                                    <router-link :to="`/UserHomeVisit/${reply.id}`" style="text-decoration: none;">{{
                                        reply.user
                                      }}
                                    </router-link>
                                  </div>
                                  <div v-html="linkify(reply.text, reply.id)"></div>
                                </div>

                              </div>
                              <v-btn text icon @click="toggleL2ReplyInput(reply.id, reply.user, comment)">
                                <v-icon>mdi-reply</v-icon>
                              </v-btn>
                            </div>
                            <!-- 回复二级评论的输入框 -->
                            <v-row v-if="replyingToId === reply.id" class="mt-2">
                              <v-col cols="12">
                                <v-text-field
                                    label="Write a reply..."
                                    v-model="reply.newReply"
                                    dense
                                    outlined
                                    size="small"
                                ></v-text-field>
                                <v-btn small @click="submitReplyToReply(comment, reply)">Reply</v-btn>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-card-text>
                  </v-card>
                </div>


                <v-divider class="my-8"></v-divider>

                <!--                <div>-->
                <!--                  <v-row justify="space-between">-->
                <!--                    <v-col cols="12" md="6" lg="4">-->
                <!--                      <div class="d-flex align-center">-->
                <!--                        <div>-->
                <!--                          <v-icon>mdi-arrow-left</v-icon>-->
                <!--                        </div>-->

                <!--                        <div class="text-h6 primary&#45;&#45;text pl-2">-->
                <!--                          <div class="text-subtitle-1">Previous Post</div>-->
                <!--                          Photos of Jeep models that will change-->
                <!--                          your mood-->
                <!--                        </div>-->
                <!--                      </div>-->
                <!--                    </v-col>-->

                <!--                    <v-col cols="12" md="6" lg="4">-->
                <!--                      <div class="d-flex align-center text-right">-->
                <!--                        <div class="text-h6 primary&#45;&#45;text pr-2">-->
                <!--                          <div class="text-subtitle-1">Next Post</div>-->
                <!--                          What do I need to know to start learning-->
                <!--                          JavaScript?-->
                <!--                        </div>-->

                <!--                        <div>-->
                <!--                          <v-icon>mdi-arrow-right</v-icon>-->
                <!--                        </div>-->
                <!--                      </div>-->
                <!--                    </v-col>-->
                <!--                  </v-row>-->
                <!--                </div>-->
              </v-card-text>
            </v-card>


          </div>

        </div>
      </v-col>

      <v-col>
        <div class="pt-16" style="position:sticky; top:0;">
          <re_bar :related_posts="related_posts"/>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="showCommentErrorDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">评论失败</v-card-title>
        <v-card-text>
          帖子审核未通过!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showCommentErrorDialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import httpInstance from "@/utils/axios";

export default {
  name: "ItemPage",
  components: {
    re_bar: () => import("@/components/details/relatedpostbar.vue")
  },
  data() {
    return {
      post_id: '',
      user_id: '',
      user_name: "",
      post_success: 2, //1:通过 2:审核中 3:审核不通过
      title: "测试标题",
      post_user_id: '',
      abstract: "测试概要",
      image: "https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0",
      time: "2024.1.1",
      content: '',
      related_posts: [],
      isFavorite: false,
      isFollowing: false,
      hasLiked: false,
      replyingToId: null, // 控制哪个评论的回复输入框显示
      likesCount: 99,
      commentText: '',
      showReportDialog: false, // 控制对话框显示的状态
      reportContent: '', // 用户输入的举报内容
      showCommentErrorDialog: false, // 控制评论错误对话框显示状态
      comments: [], // 假设这是从API加载的评论列表
      author: {profile: {img_url: 'https://pic4.zhimg.com/v2-efd4f4517d5bdb43858a04f7e4ff5f7f_r.jpg'}},
      browseNum: '',
      showTags: [
        {
          id: 1,
          name: "Animalis"
        },
        {
          id: 2,
          name: "Travel"
        },
        {
          id: 3,
          name: "Birds"
        }
      ],
    }
  },
  mounted() {
    this.user_id = this.$cookies.get('user_id');
    this.post_id = this.$route.params.id
    console.log("post_id:", this.post_id, "user_id:", this.user_id)
    this.load()
  },
  watch: {
    '$route'(to, from) {
      // 当路由变化时调用
      if (to.params.id !== from.params.id) {
        this.load()
      }
    }
  },
  methods: {
    load() {
      httpInstance.get('/forum/GetAllComments/', {
        params: {
          post_id: this.$route.params.id
        }
      }).then(response => {
        console.log(response);
        this.comments = response.map(comment => ({
          id: comment.comment_id,
          user: comment.user.user_nickName,
          user_id: comment.user.user_id,
          text: comment.content,
          avatar: comment.user.profile.img_url,
          replies: comment.replies.map(reply => ({
            id: reply.comment_id,
            user: reply.user.user_nickName,
            text: reply.content,
            avatar: reply.user.profile.img_url
          }))
        }));
      }).catch(error => {
        console.log(error);
      })

      httpInstance.get('/forum/GetPostInfo/', {
        params: {
          user_id: this.user_id,
          post_id: this.$route.params.id
        }
      }).then(response => {
        console.log(response)
        this.title = response.post_title
        this.abstract = response.post_abstract
        this.image = response.picture.img_url
        this.time = response.post_time
        this.content = response.post_content
        this.likesCount = response.post_like
        this.post_success = response.post_success
        this.author = response.user
        this.post_user_id = response.user.user_id
        this.browseNum = response.browseNum
        this.isFavorite = response.collected === 1
        this.isFollowing = response.followed === 1
        this.hasLiked = response.liked === 1
        this.showTags = [
          ...response.tags.PreDefinedTagList.map(tag => ({id: tag.tag_id, name: tag.content})),
          ...response.tags.GameNameTagList.map(tag => ({id: tag.tag_id, name: tag.content})),
          ...response.tags.SelfDefinedTagList.map(tag => ({id: tag.tag_id, name: tag.content}))
        ];
      }).catch(error => {
        console.log(error);
      });
      this.$nextTick(() => {
        // 找到所有的图片
        const images = document.querySelectorAll('img');

        // 遍历所有图片并设置样式
        images.forEach(img => {
          img.style.maxWidth = '50%'; // 设置最大宽度
          img.style.height = 'auto';   // 保持宽高比
          // 可以继续添加其他样式，如border-radius
          img.style.borderRadius = '8px';
        });
      });
    },
    linkify(commentText, userId) {
      return commentText.replace(/@(\w+)/g, `<a href="/user/${userId}" style="text-decoration: none;">@$1</a>`);
    },
    onToggleFavorite() {
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      this.isFavorite = !this.isFavorite;
      const formData = new FormData()
      formData.append('post_id', this.post_id)
      formData.append('user_id', this.user_id)
      httpInstance.post('/typical/FavOrUnFav/', formData)
          .then(response => {
            alert(response.sign === 1 ? '收藏成功!' : '收藏失败，请重试')
          })
          .catch(error => {
            console.log(error)
          })
      // 处理收藏逻辑
    },
    async onToggleFollow() {
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      const formData = new FormData();
      formData.append('user_id', this.user_id);
      formData.append('target_id', this.post_user_id);
      await httpInstance.post('/typical/FollowOrCancel/', formData).then(response => {
        console.log(response);
      }).catch(error => {
        console.error('Error following:', error);
      });
      this.isFollowing = !this.isFollowing;
      // 处理关注逻辑
    },
    async onLike() {
      let sign = 0;
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      await httpInstance.post('/forum/LikeOrCancel/', {
        user_id: this.user_id,
        post_id: this.$route.params.id,
      }).then(response => {
        sign = response.sign;
      }).catch(error => {
        console.error('Error liking:', error);
      });
      this.hasLiked = (sign === 1); // 切换点赞状态
      if (this.hasLiked) {
        this.likesCount += 1;
      } else {
        this.likesCount -= 1;
      }
      // 根据this.hasLiked的值来进行点赞或取消点赞的逻辑处理
    },
    submitComment() {
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      if (this.post_success !== 1) {
        this.showCommentErrorDialog = true;
        this.commentText = ''; // 清空输入框
        return;
      }
      let newCommentId = null;
      if (this.commentText.trim() === '') return;
      // 你可以在这里添加逻辑来将评论提交到服务器
      httpInstance.post('/forum/AssignL1Comment/', {
        post_id: this.$route.params.id,
        user_id: this.user_id,
        content: this.commentText
      }).then(response => {
        console.log('Comment posted:', response);
        const newCommentId = response.comment_id; // 确保这里的响应体结构与服务器实际返回的结构一致

        // 构建新评论对象
        let newComment = {
          id: newCommentId,
          user: this.user_name,
          text: this.commentText
          //TODO: avatar
        };
        console.log(newComment);
        // 添加评论到本地数组
        this.comments.push(newComment);
        this.commentText = ''; // 清空输入框
      }).catch(error => {
        console.error('Error posting comment:', error);
      });
    },
    submitReport() {
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      if (!this.reportContent) {
        alert("请输入举报理由。");
        return;
      }
      // 在这里处理举报逻辑，比如发送举报内容到服务器
      const formData = new FormData();
      formData.append('user_id', this.user_id);
      formData.append('reported_user_id', this.post_user_id);
      formData.append('report_text', this.reportContent);
      httpInstance.post('/typical/ReportUser/', formData)
          .then(response => {
            alert('举报成功！');
            console.log('Report submitted:', response);
            this.showReportDialog = false; // 提交后关闭对话框
            this.reportContent = ''; // 清空输入
          })
          .catch(error => {
            alert('举报失败，请重试。');
            console.error('Error submitting report:', error);
          });
      console.log("举报内容:", this.reportContent);
    },
    toggleL1ReplyInput(commentId) {
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      this.replyingToId = this.replyingToId === commentId ? null : commentId;
    },
    toggleL2ReplyInput(commentId, replyUserName, comment) {
      if (this.user_id === null) {
        alert('请先登录！')
        this.$router.push('/login')
        return;
      }
      this.replyingToId = this.replyingToId === commentId ? null : commentId;


      // 二级评论的回复
      const reply = comment.replies.find(r => r.id === commentId);
      if (reply) {
        reply.newReply = `@${replyUserName} : `;
      }


    },
    submitReply(comment) {

      if (!comment.newReply || comment.newReply.trim() === '') {
        alert("Please enter a reply.");
        return;
      }
      let replyId = null;
      httpInstance.post('/forum/AssignL2Recall/', {
        user_id: this.user_id,
        content: comment.newReply,
        commented_id: comment.id,
      }).then(response => {
        console.log('Reply posted:', response);
        const replyId = response.comment_id;
        const newReply = {
          id: replyId,
          user: this.user_name, // 这应该是实际的用户名称
          text: comment.newReply,
          newReply: "",
          //TODO avatar
        };
        if (!comment.replies) {
          this.$set(comment, 'replies', []); // 确保replies数组存在
        }
        comment.replies.push(newReply);
        comment.newReply = ''; // 清空输入框
        this.replyingToId = -1; // 关闭回复框
      }).catch(error => {
        console.error('Error posting reply:', error);
      });

    },
    submitReplyToReply(comment, reply) {
      // 这里可以添加对二级评论的回复处理逻辑
      // 逻辑类似于submitReply，但你可能需要调整以适应你的数据结构
      if (!reply.newReply || reply.newReply.trim() === '') {
        alert("Please enter a reply.");
        return;
      }
      let replyId = null;
      httpInstance.post('/forum/AssignL2Recall/', {
        user_id: this.user_id,
        content: reply.newReply,
        commented_id: comment.id,
      }).then(response => {
        console.log('Reply posted:', response);
        replyId = response.comment_id;
        const newReply = {
          id: replyId,
          user: this.user_name, // 这应该是实际的用户名称
          text: reply.newReply,
          newReply: "",
          //TODO avatar
        };
        if (!comment.replies) {
          this.$set(comment, 'replies', []); // 确保replies数组存在
        }
        comment.replies.push(newReply);
        reply.newReply = ''; // 清空输入框
        this.replyingToId = -1; // 关闭回复框
      }).catch(error => {
        console.error('Error posting reply:', error);
      });

    },
  },
};
</script>

<style>
.rich-text-images-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.we-article-cont-img-single {
  width: 100%;
  max-width: 800px;
  margin: auto;
  border-radius: 8px;
  overflow: hidden; /* 确保图片不会溢出容器 */
}

.we-article-cont-img img {
  width: 100%; /* 图片宽度自适应容器 */
  height: auto; /* 高度自动，保持图片原有比例 */
  display: block; /* 去除图片下方的空白间隙 */
}

img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}

.left-content {
  position: fixed;
}

</style>