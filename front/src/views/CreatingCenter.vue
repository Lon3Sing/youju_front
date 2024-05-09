<template>
  <div id="app">
    <!-- 封面上传区域 -->
    <v-file-input
        v-model="coverage"
        label="点击上传封面"
        accept="image/*"
    ></v-file-input>
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

    <v-btn @click="handleArticleUpload">提交文章</v-btn>
    <div>{{ content }}</div>
    <div>{{ selectedGameNameTags }}{{ selectedPreDefinedTags }}{{ selectedSelfDefinedTags }}</div>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import httpInstance from "@/utils/axios";

export default {
  components: {
    VueEditor
  },

  data: () => ({
    user_id : 5,
    dialog: false,
    alertNoGameTag : false,
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
    postTypeTag: null,  // Tag selected by the user
    tagOptions: ['资讯', '帖子', '新闻', '攻略'],  // Initial options for tags
    gameNameTags: [
      {name: '艾尔登法环', selected: false},
      {name: '马里奥', selected: false},
      {name: '原神', selected: false},
      {name: '塞尔达传说', selected: false},
      {name: '宝可梦', selected: false},
      {name: '魔兽世界', selected: false},
      {name: '我的世界', selected: false},
      {name: '怪物猎人', selected: false},
      {name: '战地', selected: false},
      {name: '饥荒', selected: false},
      {name: '战神', selected: false},
      {name: '无主之地', selected: false},
      {name: '暗黑血统', selected: false},
      {name: '黑暗之魂', selected: false},
      {name: '鬼泣', selected: false},
      {name: '最终幻想', selected: false},
      {name: '巫师', selected: false},

    ],
    preDefinedTags: [
      {name: 'PS4', selected: false},
      {name: 'PS5', selected: false},
      {name: 'Xbox', selected: false},
      {name: 'Switch', selected: false},
      {name: 'PC', selected: false},
      {name: 'VR', selected: false},

    ],
    selectedGameNameTags: [],
    selectedPreDefinedTags: [],
    newTag: '',  // 新标签输入
    selectedSelfDefinedTags: [],  // 已添加的自定义标签
  }),

  mounted() {
    this.fetchTags();  // 页面加载时获取标签
  },

  methods: {
    fetchTags() {
      // 获取游戏名标签
      httpInstance.get('/typical/GetGameNameTag/')
          .then(response => {
            this.gameNameTags = response.map(tag => {
              return {name: tag.content, selected : false};
            });
          })
          .catch(error => {
            console.error('获取游戏名标签失败:', error);
          });

      // 获取预定义标签
      httpInstance.get('/typical/GetPredefineTag/')
          .then(response => {
            this.preDefinedTags = response.map(tag => {
              return {name: tag.content, selected : false};
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
    handleArticleUpload() {
      //TODO 上传文章
      let formData = new FormData()
      formData.append('user_id', this.user_id)
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

      if(this.postTypeTag === '帖子') {
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
      }) //上传文章
    },
    openDialog() { //点开标签选择窗口的逻辑
      if (this.postTypeTag) {
        this.dialog = true;
      }
    },
    closeWithoutSaving() {
      this.dialog = false;
      this.postTypeTag = null;
      this.gameNameTags.forEach(t => t.selected = false)
      this.preDefinedTags.forEach(t => t.selected = false)
      this.selectedGameNameTags = [];
      this.selectedPreDefinedTags = [];
      this.selectedSelfDefinedTags = [];
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
