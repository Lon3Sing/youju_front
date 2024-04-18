<template>
  <div id="app">
    <vue-editor
        useCustomImageHandler
        @image-added="handleImageAdded"
        v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  components: {
    VueEditor
  },

  data: () => ({
    content: "<h1>Some initial content</h1>"
  }),

  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //formDta是个对象，用来模拟表单的
      let formData = new FormData()
      formData.append('file', file)
      //axios这块别一股脑复制，看你们自己是怎么封装的
      axios({
        url:`xxxxx`,
        method: 'POST',
        data: formData
      })
          .then(res => {
            //这两行是关键代码了。在鼠标位置插入图片，数据存的是url
            Editor.insertEmbed(cursorLocation, 'image', res.data.url)
            resetUploader()
          })
          .catch(err => {
            console.log(err)
          })
    },
  }
};
</script>