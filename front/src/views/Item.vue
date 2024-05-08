<template>
  <div>
    <v-row>
      <v-col cols="12" lg="8" xl="8">
        <div>
          <div>
            <v-card flat color="transparent">
              <v-img
                  src="https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0"
                  :aspect-ratio="16 / 9"
                  gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                  style="border-radius: 16px"
              ></v-img>

              <v-card-text>
                <div>
                  当前帖子id:{{ $route.params.id }}
                  <v-btn color="accent">ANIMAL</v-btn>
                </div>

                <div class="text-h4 font-weight-bold primary--text pt-4">
                  <h4>{{ title }}</h4>
                </div>

                <div class="text-body-1 py-4">
                  {{ abstract }}
                </div>

                <div class="d-flex align-center justify-space-between">
                  <div class="d-flex align-center">
                    <v-avatar color="accent" size="36">
                      <v-icon dark>mdi-feather</v-icon>
                    </v-avatar>

                    <div class="pl-2 text-body-1">Yan Lee · 22 July 2019</div>
                  </div>

                  <div class="d-flex align-center">
                    <div>
                      <v-chip small color="transparent">
                        <v-icon left>mdi-eye</v-icon>
                        1.4k
                      </v-chip>

                      <v-chip small color="transparent">
                        <v-icon left>mdi-comment-outline</v-icon>
                        7 Comment
                      </v-chip>
                    </div>
                  </div>
                </div>

                <v-divider class="my-4"></v-divider>

                <div class="transparent" v-html="content"/>

                <div class="d-flex align-center justify-space-between mt-8">
                  <div>
                    <v-row>
                      <v-col class="flex-shrink-0" cols="auto">
                        <v-chip color="accent">#Animalis</v-chip>
                      </v-col>

                      <v-col class="flex-shrink-0" cols="auto">
                        <v-chip color="accent">#Travel</v-chip>
                      </v-col>

                      <v-col class="flex-shrink-0" cols="auto">
                        <v-chip color="accent">#Birds</v-chip>
                      </v-col>
                    </v-row>
                  </div>

                  <div class="text-h5">
                    Share >
                    <v-btn icon large>
                      <v-icon large color="primary">mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn icon large>
                      <v-icon large color="primary">mdi-twitter</v-icon>
                    </v-btn>

                    <v-btn icon large>
                      <v-icon large color="primary">mdi-linkedin</v-icon>
                    </v-btn>

                    <v-btn icon large>
                      <v-icon large color="primary">mdi-instagram</v-icon>
                    </v-btn>
                  </div>
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
                    <span>收藏</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="onToggleFollow">
                        <v-icon>{{ isFollowing ? 'mdi-account-check' : 'mdi-account-plus' }}</v-icon>
                      </v-btn>
                    </template>
                    <span>关注作者</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn icon v-bind="attrs" v-on="on" @click="onLike">
                        <v-icon>{{ hasLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}</v-icon>
                      </v-btn>

                    </template>
                    <span>点赞</span>
                  </v-tooltip>
                </div>


                <div class="text-h4 py-2">评论</div>

                <div>
                  <v-textarea outlined v-model="commentText" label="Leave a comment..."></v-textarea>
                  <v-btn color="primary" @click="submitComment">Submit Comment</v-btn>
                </div>


                <!-- Comments Section -->
                <div v-for="comment in comments" :key="comment.id" class="my-2">
                  <v-card outlined class="mb-3">
                    <v-card-text>
                      <div class="d-flex justify-space-between">
                        <div class="d-flex">
                          <router-link :to="`/user/${comment.id}`">
                            <v-avatar size="64">
                              <img :src="comment.avatar" alt="Avatar"> <!-- 显示用户头像 -->
                            </v-avatar>
                          </router-link>
                          <div class="ml-2">
                            <div class="font-weight-bold text-subtitle-1">
                              <router-link :to="`/user/${comment.id}`" style="text-decoration: none;">{{
                                  comment.user
                                }}
                              </router-link>
                            </div>
                            <div v-html="linkify(comment.text, comment.id)">{{ comment.text }}</div>
                          </div>

                        </div>
                        <v-btn text icon @click="toggleReplyInput(comment.id)">
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
                                <router-link :to="`/user/${reply.id}`">
                                  <v-avatar size="32">
                                    <img :src="reply.avatar" alt="Avatar"> <!-- 显示用户头像 -->
                                  </v-avatar>
                                </router-link>
                                <div class="ml-2">
                                  <div class="font-weight-bold text-subtitle-1">
                                    <router-link :to="`/user/${reply.id}`" style="text-decoration: none;">{{
                                        reply.user
                                      }}
                                    </router-link>
                                  </div>
                                  <div v-html="linkify(reply.text, reply.id)">{{ reply.text }}</div>
                                </div>

                              </div>
                              <v-btn text icon @click="toggleReplyInput(reply.id, reply.user)">
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

<!--                <div class="my-8">-->
<!--                  <div class="d-flex align-center">-->
<!--                    <v-avatar color="accent" size="128">-->
<!--                      <v-icon dark size="100">mdi-feather</v-icon>-->
<!--                    </v-avatar>-->

<!--                    <div class="pl-4">-->
<!--                      <div class="text-h5 primary&#45;&#45;text font-weight-bold">-->
<!--                        Written by-->
<!--                        <span class="accent&#45;&#45;text">Yan Lee</span>-->
<!--                      </div>-->

<!--                      <div class="text-subtitle-1 my-2">-->
<!--                        Congue mauris rhoncus aenean vel elit. Elit scelerisque mauris pellentesque pulvinar-->
<!--                        pellentesque habitant. Aliquet nec-->
<!--                        ullamcorper sit amet risus nullam eget felis.-->
<!--                      </div>-->

<!--                      <div class="text-subtitle-1">-->
<!--                        Get in touch >-->
<!--                        <v-btn icon>-->
<!--                          <v-icon>mdi-facebook</v-icon>-->
<!--                        </v-btn>-->

<!--                        <v-btn icon>-->
<!--                          <v-icon>mdi-twitter</v-icon>-->
<!--                        </v-btn>-->

<!--                        <v-btn icon>-->
<!--                          <v-icon>mdi-youtube</v-icon>-->
<!--                        </v-btn>-->

<!--                        <v-btn icon>-->
<!--                          <v-icon>mdi-instagram</v-icon>-->
<!--                        </v-btn>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

                <div>
                  <v-row justify="space-between">
                    <v-col cols="12" md="6" lg="4">
                      <div class="d-flex align-center">
                        <div>
                          <v-icon>mdi-arrow-left</v-icon>
                        </div>

                        <div class="text-h6 primary--text pl-2">
                          <div class="text-subtitle-1">Previous Post</div>
                          Photos of Jeep models that will change
                          your mood
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6" lg="4">
                      <div class="d-flex align-center text-right">
                        <div class="text-h6 primary--text pr-2">
                          <div class="text-subtitle-1">Next Post</div>
                          What do I need to know to start learning
                          JavaScript?
                        </div>

                        <div>
                          <v-icon>mdi-arrow-right</v-icon>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </div>
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
      title: "测试标题",
      abstract: "测试概要",
      image: "https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0",
      time: "2024.1.1",
      content: `
                <div>
                  <p class="text-subtitle-1 primary--text font-weight-medium">
                    Dignissim cras tincidunt lobortis feugiat vivamus at. Amet luctus venenatis lectus magna fringilla. Nibh tellus molestie nunc non blandit.
                    Et magnis dis parturient montes nascetur ridiculus mus mauris vitae. Amet massa vitae tortor condimentum lacinia quis vel eros. Eros
                    in cursus turpis massa tincidunt dui ut ornare. Est ante in nibh mauris cursus mattis molestie. Nec ullamcorper sit amet risus nullam
                    eget felis eget. Tincidunt praesent semper feugiat nibh sed. Et leo duis ut diam quam nulla pottitor massa id. Convallis convallis tellus id
                    interdum velit laoreet id. Enim ut sem viverra aliquet eget sit. Mollis aliquam ut porttitor leo a diam. Eleifend donec pretium vulputate
                    sapien nec sagittis aliquam. Velit egestas dui id ornares.
                  </p>
                </div>

                <div class="py-4">
                  <v-alert
                    class="font-italic text-h6 text-center"
                    border="left"
                    colored-border
                    color="accent"
                  >
                    Srem Ipsum is simply dummy text of the printing and typesetting industry. Lorem lpsum has been
                    the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply .
                  </v-alert>
                </div>
          <div class="text-h5 primary--text font-weight-bold">
                  Ultricies mi quis hendrerit dolor
                  <p class="text-subtitle-1 primary--text font-weight-medium mt-5">
                    Quam adipiscing vitae proin sagittis nisl rhoncus. Integer vitae justo eget magna fermentum iaculis eu non. Vitae congue mauris
                    rhoncus aenean vel elit. Nibh mauris cursus mattis molestie. Etiam sit amet nisl purus. At auctor urna nunc id cursus metus. Diam in arcu
                    cursus euismod quis viverra nibh cras.
                  </p>
                </div>

                <div class="my-4">
                  <v-row>
                    <v-col cols="6">
                      <v-card>
                        <v-img
                          src="https://th.bing.com/th/id/R.208cf4ebcad01f1716c41f15cafedbba?rik=2p4aXm7g7Oaihw&riu=http%3a%2f%2fi1.073img.com%2f220224%2f17598537_110535_1.jpg&ehk=0RsAEwIBcl8eTiXkvzpcFalefO2k4bAIsf3CJrquvww%3d&risl=&pid=ImgRaw&r=0"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        ></v-img>
                      </v-card>
                    </v-col>

                    <v-col cols="6">
                      <v-card>
                        <v-img
                          src="https://th.bing.com/th/id/R.208cf4ebcad01f1716c41f15cafedbba?rik=2p4aXm7g7Oaihw&riu=http%3a%2f%2fi1.073img.com%2f220224%2f17598537_110535_1.jpg&ehk=0RsAEwIBcl8eTiXkvzpcFalefO2k4bAIsf3CJrquvww%3d&risl=&pid=ImgRaw&r=0"
                          :aspect-ratio="16 / 9"
                          gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        ></v-img>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>

                <div class="text-h5 primary--text font-weight-bold">
                  Nibh tellus molestie nunc non blandit massa enim
                  <div class="text-subtitle-1 primary--text font-weight-medium mt-5">
                    <ul>
                      <li class="my-2">
                        Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Malesuada bibendum arcu vitae elementum curabitur vitae
                        nunc sed. Urna porttitor rhoncus dolor purus non enim praesent elementum facilisis.
                      </li>

                      <li class="my-2">
                        Proin libero nunc consequat interdum varius. Amet luctus venenatis lectus magna fringillal urna porttitor. Enim tortor at auctor
                        urna nunc id cursus.
                      </li>

                      <li class="my-2">
                        Volutpat maecenas volutpat blandit aliquam. Adipiscing enim eu turpis egestas pretium aenean pharetra magna Morbi leo
                        urna molestie at elementum eu.
                      </li>
                    </ul>

                    <p>
                      Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Semper auctor neque vitae tempus. Magnis dis
                      parturient montes nascetur ridiculus mus. A condimentum vitae sapien pellentesque habitant morbi tristique. Duis ut diam quam nulla
                      porttitor.
                    </p>
                  </div>
                  <img src="https://youju-1316987049.cos.ap-beijing.myqcloud.com/20240507143459065-f1bea4157c5d4914c62524bd73d97c7b01613389.jpg">
                </div>
                    `,
      related_posts: [
        {
          id: 3,
          title: "艾尔登法环",
          abstract: "艾尔登法环艾尔登法环艾尔登法环艾尔登法环艾尔登法环",
          image: "https://th.bing.com/th/id/R.bae9e662270fd9864c034b3c7bf24563?rik=GLvf79TcpQXsZA&riu=http%3a%2f%2fimage.9game.cn%2f2019%2f3%2f26%2f62569740.jpg&ehk=dJDxPPOwDaS3q%2ffCIRVaN77K%2brs8NsP1w%2bdOfGlUoqM%3d&risl=1&pid=ImgRaw&r=0",
          time: "2024.1.1"
        },
        {
          id: 4,
          title: "傻逼原神",
          abstract: "傻逼原神傻逼原神傻逼原神傻逼原神傻逼原神傻逼原神",
          image: "https://webstatic.mihoyo.com/upload/static-resource/2021/11/08/02959a0f179436853c244dfc8b88e4e4_5824090375749016325.jpg",
          time: "2024.1.1",
        }
      ],
      isFavorite: false,
      isFollowing: false,
      hasLiked: false,
      replyingToId: null, // 控制哪个评论的回复输入框显示
      likesCount: 99,
      commentText: '',
      showReportDialog: false, // 控制对话框显示的状态
      reportContent: '', // 用户输入的举报内容
      comments: [
        {
          id: 1,
          user: "John_Doe",
          text: "Great post!",
          newReply: "", // 初始化空字符串
          avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7",
          replies: [
            {
              id: 3,
              user: "Jane Doe",
              text: "@John_Doe: Thanks!",
              newReply: "", // 初始化空字符串
              avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C.pL9aeO50HMujMSzGcOPhKwAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7",
            },
            {
              id: 4,
              user: "OTTO",
              text: "说的道理",
              newReply: "", // 初始化空字符串
              avatar: "https://tse1-mm.cn.bing.net/th/id/OIP-C.m--751RSKkOTO8ZxoEK4WQAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7",
            }
          ]
        },
        {
          id: 2,
          user: "Jane Doe",
          text: "I love this!",
          newReply: "", // 初始化空字符串
          avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.qcssiqIxJl_5KTHne8ntWAAAAA?w=200&h=200&c=7&r=0&o=5&dpr=2&pid=1.7",
          replies: []
        }
      ] // 假设这是从API加载的评论列表
    }
  },
  mounted() {
    console.log('Component is now mounted!');
    httpInstance.get('/home/GetInfoByOrder/')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
  },
  methods: {
    linkify(commentText, userId) {
      return commentText.replace(/@(\w+)/g, `<a href="/user/${userId}" style="text-decoration: none;">@$1</a>`);
    },
    onToggleFavorite() {
      this.isFavorite = !this.isFavorite;
      // 处理收藏逻辑
    },
    onToggleFollow() {
      this.isFollowing = !this.isFollowing;
      // 处理关注逻辑
    },
    onLike() {
      if (this.hasLiked) {
        // 如果用户已经点过赞，再次点击则取消点赞
        this.likesCount -= 1;
      } else {
        // 如果用户尚未点赞，点击则添加点赞
        this.likesCount += 1;
      }
      this.hasLiked = !this.hasLiked; // 切换点赞状态
      // 根据this.hasLiked的值来进行点赞或取消点赞的逻辑处理
    },
    submitComment() {
      if (this.commentText.trim() === '') return;
      const newComment = {
        id: Date.now(), // 临时ID
        user: "CurrentUser",
        text: this.commentText
      };
      this.comments.push(newComment);
      this.commentText = ''; // 清空输入框
      // 你可以在这里添加逻辑来将评论提交到服务器
    },
    submitReport() {
      if (!this.reportContent) {
        alert("请输入举报理由。");
        return;
      }
      // 在这里处理举报逻辑，比如发送举报内容到服务器
      console.log("举报内容:", this.reportContent);
      this.showReportDialog = false; // 提交后关闭对话框
      this.reportContent = ''; // 清空输入
    },
    toggleReplyInput(commentId, replyUserName = '') {
      this.replyingToId = this.replyingToId === commentId ? null : commentId;

      if (replyUserName && this.replyingToId) {
        this.$nextTick(() => { // 使用nextTick等待DOM更新
          const comment = this.comments.find(c => c.id === commentId || (c.replies && c.replies.some(r => r.id === commentId)));
          if (comment) {
            if (comment.id === commentId) { // 一级评论的回复
              comment.newReply = `@${replyUserName} : `;
            } else { // 二级评论的回复
              const reply = comment.replies.find(r => r.id === commentId);
              if (reply) {
                reply.newReply = `@${replyUserName} : `;
              }
            }
          }
        });
      }
    },
    submitReply(comment) {
      if (!comment.newReply || comment.newReply.trim() === '') {
        alert("Please enter a reply.");
        return;
      }
      const newReply = {
        id: Date.now(),
        user: "CurrentUser", // 这应该是实际的用户名称
        text: comment.newReply,
      };
      if (!comment.replies) {
        this.$set(comment, 'replies', []); // 确保replies数组存在
      }
      comment.replies.push(newReply);
      comment.newReply = ''; // 清空输入框
      this.replyingToId = -1; // 关闭回复框
    },
    submitReplyToReply(parentComment, reply) {
      // 这里可以添加对二级评论的回复处理逻辑
      // 逻辑类似于submitReply，但你可能需要调整以适应你的数据结构
    },
  },
};
</script>

