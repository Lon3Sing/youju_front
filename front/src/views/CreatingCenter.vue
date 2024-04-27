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
        label="选择封面"
        accept="image/*"
    ></v-file-input>
    <v-btn @click="handleArticleUpload">提交文章</v-btn>
  </div>


</template>

<script>
import {VueEditor} from "vue2-editor";
import axios from "axios";
import {postArticle} from "@/api/api";

export default {
  components: {
    VueEditor
  },

  data: () => ({
    content: "<h1>从这里开始编辑</h1>",
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
  }),

  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData()
      formData.append('file', file)
      axios.post(
          `http://localhost:8000/api/xxx`,
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
      cover.append('file', this.coverage)
      axios.post(
          `http://localhost:8000/api/xxx`,
          cover
      ).then(response => {
        console.log(response)
        coverUrl = response.data;
      }) //上传封面

      axios.post(
          `http://localhost:8000/api/xxx`,
          {
            cover: coverUrl,
            content: this.content,
          }
      ).then(response => {
        console.log(response)
      }) //上传文章
    }
  }
};

</script>
