<template>
  <div id="app">
    <div> 当前帖子id: {{ $route.params.id }}</div>
    <!-- 封面上传区域 -->
    <v-file-input
        v-model="coverage"
        label="点击上传封面"
        accept="image/*"
    ></v-file-input>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6" class="text-center">
          <v-img
              :src="oldCoverage"
              alt="以上是你之前的封面"
              max-width="100%"
              class="mx-auto"
          ></v-img>
          <p>这是你之前的封面</p>
        </v-col>
      </v-row>
    </v-container>
    <!-- 标题编辑区域 -->
    <v-text-field
        v-model="articleTitle"
        label="编辑文章标题"
        solo
        placeholder="请输入文章标题"
        class="mb-3"
    ></v-text-field>
    <!-- 摘要编辑区域 -->
    <v-textarea
        v-model="articleAbstract"
        label="编辑文章摘要"
        solo
        placeholder="请输入文章摘要"
        class="mb-3"
        rows="3"
        no-resize
    ></v-textarea>
    <vue-editor
        ref="myTextEditor"
        v-if="!isLoading"
        useCustomImageHandler
        @image-added="handleImageAdded"
        v-model="content"
        label="编辑文章摘要"
        :editorToolbar="customToolbar"
    ></vue-editor>
    <p></p>
    <v-divider></v-divider>
    <p></p>
    <!-- firstLevelTag:选择是[帖子]还是[资讯] -->
    <v-select
        v-model="postTypeTag"
        :items="tagOptions"
        label="选择发布类型"
        solo
        outlined
        @change="openDialog"
        @click="openDialog"
    ></v-select>
    <v-dialog v-model="dialog" persistent width="100%" max-width="800px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>选择标签</span>
          <v-btn icon @click="closeWithoutSaving">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div>
            <span class="subtitle-1">已选择的标签:</span>
            <v-chip
                v-for="tag in selectedGameNameTags"
                :key="tag"
                class="ma-1"
                color="blue"
                text-color="white"
            >
              {{ tag }}
            </v-chip>
            <v-chip
                v-for="tag in selectedPreDefinedTags"
                :key="tag"
                class="ma-1"
                color="blue"
                text-color="white"
            >
              {{ tag }}
            </v-chip>
          </div>
          <v-divider></v-divider>
          <div class="my-2">
            <span class="subtitle-1">游戏名标签:</span>
            <v-chip
                v-for="tag in gameNameTags"
                :key="tag.name"
                :value="tag.name"
                :color="tag.selected ? 'blue' : 'grey'"
                class="ma-1"
                @click="toggleGameNameTag(tag)"
                text-color="white"
            >
              {{ tag.name }}
            </v-chip>
          </div>
          <v-divider></v-divider>
          <div class="my-2">
            <span class="subtitle-1">固定的标签1:</span>
            <!--            <v-chip-group-->
            <!--                v-model="selectedPredefinedTags"-->
            <!--                multiple-->
            <!--            >-->
            <v-chip
                v-for="tag in preDefinedTags"
                :key="tag.name"
                :value="tag.name"
                :color="tag.selected ? 'blue' : 'grey'"
                class="ma-1"
                @click="togglePredefinedTag(tag)"
                text-color="white"
            >
              {{ tag.name }}
            </v-chip>
            <!--            </v-chip-group>-->
          </div>
          <v-divider></v-divider>
          <div>
            <span class="subtitle-1">已添加的自定义标签:</span>
            <v-chip
                v-for="tag in selectedSelfDefinedTags"
                :key="tag"
                class="ma-1"
                color="purple"
                text-color="white"
                @click="removeSelfDefinedTag(tag)"
            >
              {{ tag }}
            </v-chip>
          </div>
          <div class="my-2">
            <v-text-field
                v-model="newTag"
                label="添加自定义标签"
                solo
                dense
                hide-details
                append-icon="mdi-plus"
                @click:append="addSelfDefinedTag"
                @keyup.enter="addSelfDefinedTag"
            ></v-text-field>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="ensureAddTags">确认添加</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="alertNoGameTag" persistent max-width="300px">
      <v-card>
        <v-card-title class="text-h5">提示</v-card-title>
        <v-card-text>选择“资讯”或“攻略”时必须选择一个游戏名标签。</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="alertNoGameTag = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <v-row justify="space-between" align="center">
        <v-btn
            class="custom-btn primary-btn mr-2"
            @click="handleArticleUpload"
        >
          提交文章
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            class="custom-btn delete-btn"
            @click="deleteArticle"
        >
          删除文章
        </v-btn>
      </v-row>
    </v-container>

    <div>{{ content }}</div>
    <div>{{ selectedGameNameTags }}{{ selectedPreDefinedTags }}{{ selectedSelfDefinedTags }}</div>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import httpInstance from "@/utils/axios";
import {MessageBox} from "element-ui";

export default {
  components: {
    VueEditor
  },

  data: () => ({
    user_id: '',
    post_id: null,
    isLoading: false,
    dialog: false,
    alertNoGameTag: false,
    content: "<h1></h1>",
    articleTitle: '',  // 文章标题
    articleAbstract: '',  // 文章摘要
    customToolbar: [
      ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
      ['blockquote', 'code-block'], //引用，代码块
      // [{'header': 1}, {'header': 2}], // 标题，键值对的形式；1、2表示字体大小
      [{'list': 'ordered'}, {'list': 'bullet'}], //列表
      [{'script': 'sub'}, {'script': 'super'}], // 上下标
      // [{'indent': '-1'}, {'indent': '+1'}], // 缩进
      // [{'direction': 'rtl'}], // 文本方向
      [{'size': ['small', false, 'large', 'huge']}], // 字体大小
      // [{'header': [1, 2, 3, 4, 5, 6, false]}], //几级标题
      // [{'color': []}, {'background': []}], // 字体颜色，字体背景颜色
      // [{'font': []}], //字体
      // [{'align': []}], //对齐方式
      // ['clean'], //清除字体样式
      ['image'],//上传图片
      // ['video'] // 上传视频
    ],
    coverage: null,
    oldCoverage: null,
    postTypeTag: null,  // Tag selected by the user
    tagOptions: ['资讯', '帖子', '新闻', '攻略'],  // Initial options for tags
    gameNameTags: [
      {name: '艾尔登法环', selected: false},
      {name: '马里奥', selected: false},
      {name: '原神', selected: false},

    ],
    preDefinedTags: [
      {name: 'PS4', selected: false},
      {name: 'PS5', selected: false},
      {name: 'Xbox', selected: false},

    ],
    selectedGameNameTags: [],
    selectedPreDefinedTags: [],
    newTag: '',  // 新标签输入
    selectedSelfDefinedTags: [],  // 已添加的自定义标签
    postData: null,
  }),

  mounted() {
    this.user_id = this.$cookies.get('user_id')
    this.fetchTags();  // 页面加载时获取标签
    this.fetchPostDetails();  // 获取帖子详情
  },

  methods: {
    fetchPostDetails() {
      const postId = this.$route.params.id;
      if (postId) {
        this.isLoading = true;
        httpInstance.get('/forum/GetForEditPost/', {
          params: {
            post_id: postId
          }
        })  // 确保这是获取帖子详情的正确API路径
            .then(response => {
              console.log(response)
              this.oldCoverage = response.picture.img_url;
              this.postData = response;
              this.post_id = response.post_id;
              this.articleTitle = response.post_title;
              this.articleAbstract = response.post_abstract;
              this.content = response.post_content;
              const foundTag = response.tags.TypeTagList.find(tag => tag.status === 1);
              this.postTypeTag = foundTag ? foundTag.content : '';

              this.gameNameTags = response.tags.GameNameTagList.map(tag => {
                return {name: tag.content, selected: tag.status === 1};
              });
              this.preDefinedTags = response.tags.PreDefinedTagList.map(tag => {
                return {name: tag.content, selected: tag.status === 1};
              });
              this.selectedSelfDefinedTags = response.tags.SelfDefinedTagList.map(tag => tag.content);
              this.selectedGameNameTags = this.gameNameTags.filter(t => t.selected).map(t => t.name);
              this.selectedPreDefinedTags = this.preDefinedTags.filter(t => t.selected).map(t => t.name);
              this.isLoading = false;

              // this.$nextTick(() => {
              //   this.$refs.myTextEditor.quill.root.innerHTML = this.content; // 直接操作 Quill 编辑器的根元素
              // });
              // 你可能还需要根据后端的具体返回数据结构来调整上面的赋值逻辑
            })
            .catch(error => {
              console.error('获取帖子详情失败:', error);
              this.isLoading = false;
            });
      }
    },
    fetchTags() {
      // 获取游戏名标签
      httpInstance.get('/typical/GetGameNameTag/')
          .then(response => {
            this.gameNameTags = response.map(tag => {
              return {name: tag.content, selected: false};
            });
          })
          .catch(error => {
            console.error('获取游戏名标签失败:', error);
          });

      // 获取预定义标签
      httpInstance.get('/typical/GetPredefineTag/')
          .then(response => {
            this.preDefinedTags = response.map(tag => {
              return {name: tag.content, selected: false};
            });
          })
          .catch(error => {
            console.error('获取预定义标签失败:', error);
          });
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //TODO 上传回显图片
      let formData = new FormData()
      formData.append('img', file)
      httpInstance.post(
          `/typical/StoreImage/`,
          formData
      ).then(response => {
        //这两行是关键代码了。在鼠标位置插入图片，数据存的是url
        console.log(response);
        Editor.insertEmbed(cursorLocation, 'image', response.img_url)
        resetUploader()
      })
          .catch(err => {
            console.log(err)
          })
    },
    setMaxWidth(imageUrl) {
      this.$nextTick(() => {
        const imgElement = this.$refs.myTextEditor.quill.root.querySelector(`img[src="${imageUrl}"]`);
        if (imgElement) {
          imgElement.style.maxWidth = '60%';
          console.log('设置图片宽度成功')
        }
      });
    },
    handleArticleUpload() {
      //TODO 上传文章
      let formData = new FormData()
      formData.append('user_id', this.user_id);
      formData.append('post_id', this.post_id);
      formData.append('picture', this.coverage);
      //TODO 未解决superuser添加标签的情况
      formData.append('PostTypeTag', this.postTypeTag);
      this.selectedGameNameTags.forEach(tag => {
        formData.append('GameNameTag', tag);
      });
      this.selectedPreDefinedTags.forEach(tag => {
        formData.append('PreDefinedTag', tag);
      });
      this.selectedSelfDefinedTags.forEach(tag => {
        formData.append('SelfDefinedTag', tag);
      });
      formData.append('post_title', this.articleTitle);
      formData.append('post_abstract', this.articleAbstract);
      formData.append('post_content', this.content);

      if (this.postTypeTag === '帖子') {
        formData.append('post_type', 0);
      } else { //发布文章的类型是资讯、新闻或攻略
        formData.append('post_type', 1);
      }

      httpInstance.post(
          `/forum/AssignOrEditPost/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
      ).then(response => {
        console.log(response)
        this.showSuccessMessage();
      }).catch(error => {
        console.error(error);
        // 处理错误情况
      });//上传文章
    },
    deleteArticle() {
      if (confirm("确定要删除这篇文章吗？")) {
        // 这里调用删除接口
        httpInstance.post('/people/DeletePost/', {
          post_id: this.post_id
        }).then(response => {
          console.log(response);
          this.$router.push('/Contribution');
        }).catch(error => {
          console.error('删除文章失败:', error);
        });
        // 可能还需要处理如重定向或更新列表等
      }
    },
    showSuccessMessage() {
      MessageBox.alert('上传成功', '成功', {
        confirmButtonText: '确定',
        type: 'success',
        callback: () => {
          this.$router.push('/Contribution');
        }
      });
    },
    openDialog() { //点开标签选择窗口的逻辑
      if (this.postTypeTag) {
        this.dialog = true;
      }
    },
    closeWithoutSaving() {
      this.dialog = false;
      this.postTypeTag = null;
    },
    ensureAddTags() {
      if (this.postTypeTag === '资讯' || this.postTypeTag === '攻略') {
        if (this.selectedGameNameTags.length === 0) {
          this.alertNoGameTag = true;
          return;
        }
      }
      this.dialog = false;
    },
    toggleGameNameTag(tag) {
      // 如果当前标签已被选中，则取消选择
      if (tag.selected) {
        tag.selected = false;
        this.selectedGameNameTags = [];
      } else {
        // 取消所有标签的选中状态
        this.gameNameTags.forEach(t => {
          t.selected = false;
        });
        // 选中当前标签
        tag.selected = true;
        // 更新selectedGameNameTags数组
        this.selectedGameNameTags = [tag.name];
      }
    },
    togglePredefinedTag(tag) { //点击标签的逻辑
      tag.selected = !tag.selected;  // Toggle the 'selected' property
      this.selectedPreDefinedTags = this.preDefinedTags.filter(t => t.selected).map(t => t.name);
    },
    addSelfDefinedTag() {
      if (this.newTag.trim() !== '' && !this.selectedSelfDefinedTags.includes(this.newTag.trim())) {
        this.selectedSelfDefinedTags.push(this.newTag.trim());
        this.newTag = '';  // 清空输入框
      }
    },
    removeSelfDefinedTag(tag) {
      this.selectedSelfDefinedTags = this.selectedSelfDefinedTags.filter(t => t !== tag);
    }
  }
};

</script>

<style>
.custom-btn {
  font-weight: bold;
  border-radius: 8px;
  padding: 15px 30px; /* 增大内边距 */
  font-size: 18px; /* 增大字体 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.primary-btn {
  background-color: #1976d2;
  color: white;
  border: 1px solid #1976d2;
}

.primary-btn:hover {
  background-color: #115293;
  border-color: #115293;
}

.delete-btn {
  background-color: #e53935;
  color: white;
  border: 1px solid #e53935;
}

.delete-btn:hover {
  background-color: #b71c1c;
  border-color: #b71c1c;
}

.v-btn {
  margin: 10px;
}
</style>