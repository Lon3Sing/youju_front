<template>
  <div id="app">
    <vue-editor
        useCustomImageHandler
        @image-added="handleImageAdded"
        v-model="content"
        :editorToolbar="customToolbar"
    ></vue-editor>
    <v-file-input
        v-model="coverage"
        label="点击上传封面"
        accept="image/*"
    ></v-file-input>
    <!-- firstLevelTag:选择是[帖子]还是[资讯] -->
    <v-select
        v-model="firstLevelTag"
        :items="tagOptions"
        label="选择文章标签"
        solo
        outlined
        @change="openDialog"
    ></v-select>
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>选择标签</span>
          <v-btn icon @click="dialog = false">
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
                v-for="tag in selectedPredefinedTags"
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
            <v-chip-group
                v-model="selectedGameNameTags"
                multiple
                class="chip-group-wrap"
            >
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
            </v-chip-group>
          </div>
          <v-divider></v-divider>
          <div class="my-2">
            <span class="subtitle-1">固定的标签1:</span>
            <v-chip-group
                v-model="selectedPredefinedTags"
                multiple
                class="chip-group-wrap"
            >
              <v-chip
                  v-for="tag in predefinedTags"
                  :key="tag.name"
                  :value="tag.name"
                  :color="tag.selected ? 'blue' : 'grey'"
                  class="ma-1"
                  @click="togglePredefinedTag(tag)"
                  text-color="white"
              >
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="firstLevelTag === '帖子'" class="d-flex align-center">

    </div>
    <div v-if="firstLevelTag === '资讯'" class="d-flex align-center">
      <v-icon dark>mdi-feather</v-icon>
    </div>

    <v-btn @click="handleArticleUpload">提交文章</v-btn>
    <div>{{ content }}</div>
  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import axios from "axios";
import {postArticle} from "@/api/api";
import httpInstance from "@/utils/axios";

export default {
  components: {
    VueEditor
  },

  data: () => ({
    dialog: false,
    content: "<h1>此处编辑文章内容</h1>",
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
    firstLevelTag: null,  // Tag selected by the user
    tagOptions: ['资讯', '帖子'],  // Initial options for tags
    gameNameTags: [
      {name: '艾尔登法环', selected: false},
      {name: '马里奥', selected: false},
      {name: '原神', selected: false},
      {name: '塞尔达传说', selected: false},
      {name: '宝可梦', selected: false},
      {name: '魔兽世界', selected: false},
      {name: '我的世界', selected: false},
      {name: '堡垒之夜', selected: false},
      {name: '英雄联盟', selected: false},
      {name: '绝地求生', selected: false},
      {name: '荒野乱斗', selected: false},
      {name: '怪物猎人', selected: false},
      {name: '战地', selected: false},
      {name: '饥荒', selected: false},
      {name: '剑网3', selected: false},
      {name: '魔兽争霸', selected: false},
      {name: '皇室战争', selected: false},
      {name: '文明', selected: false},
      {name: '模拟人生', selected: false},
      {name: '辐射', selected: false},
      {name: '战争机器', selected: false},
      {name: '星露谷物语', selected: false},
      {name: '刺客信条', selected: false},
      {name: '使命召唤', selected: false},
      {name: '暗黑破坏神', selected: false},
      {name: '神秘海域', selected: false},
      {name: '生化奇兵', selected: false},
      {name: '怪物猎人世界', selected: false},
      {name: '荣耀战魂', selected: false},
      {name: '街头霸王', selected: false},
      {name: '真三国无双', selected: false},
      {name: '火焰纹章', selected: false},
      {name: '战神', selected: false},
      {name: '无主之地', selected: false},
      {name: '暗黑血统', selected: false},
      {name: '黑暗之魂', selected: false},
      {name: '忍者之印', selected: false},
      {name: '武士道', selected: false},
      {name: '鬼泣', selected: false},
      {name: '最终幻想', selected: false},
      {name: '巫师', selected: false},

    ],
    predefinedTags: [
      {name: 'PS4', selected: false},
      {name: 'PS5', selected: false},
      {name: 'Xbox', selected: false},
      {name: 'Switch', selected: false},
      {name: 'PC', selected: false},
      {name: 'VR', selected: false},

    ],
    selectedGameNameTags: [],
    selectedPredefinedTags: [],
  }),

  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('file', file)
      httpInstance.post(
          `http://localhost:8000/api/article/`,
          formData
      ).then(response => {
        //这两行是关键代码了。在鼠标位置插入图片，数据存的是url
        console.log(response);
        Editor.insertEmbed(cursorLocation, 'image', response.data)
        resetUploader()
      })
          .catch(err => {
            console.log(err)
          })
    },
    handleArticleUpload() {
      let cover = new FormData()
      let coverUrl = null;
      cover.append('picture', this.coverage)
      httpInstance.post(
          `http://localhost:8000/api/xxx`,
          cover
      ).then(response => {
        console.log(response)
        coverUrl = response.data;
      }) //上传封面

      httpInstance.post(
          `http://localhost:8000/api/xxx`,
          {
            cover: coverUrl,
            content: this.content,
          }
      ).then(response => {
        console.log(response)
      }) //上传文章
    },
    openDialog() { //点开标签选择窗口的逻辑
      if (this.firstLevelTag) {
        this.dialog = true;
      }
    },
    toggleGameNameTag(tag) { //点击标签的逻辑
      tag.selected = !tag.selected;  // Toggle the 'selected' property
      this.selectedGameNameTags = this.tags.filter(t => t.selected).map(t => t.name);
    },
    togglePredefinedTag(tag) { //点击标签的逻辑
      tag.selected = !tag.selected;  // Toggle the 'selected' property
      this.selectedGameNameTags = this.tags.filter(t => t.selected).map(t => t.name);
    }
  }
};

</script>

<style scoped>
.chip-group-wrap .v-chip-group {
  flex-wrap: wrap !important; /* 强制换行 */
  overflow: hidden !important; /* 防止滚动条出现 */
  width: 100%; /* 确保占满可用宽度 */
}

.chip-group-wrap .v-chip {
  margin: 4px !important; /* 确保标签之间有间隔 */
}
</style>