<template>
  <div>

    <div class="pt-4">

      <h3 class="text-h5 font-weight-medium pb-4">
        <v-icon color="black" midium> mdi-account-edit </v-icon>
        创作中心
      </h3>

      <v-divider></v-divider>

      <div class="d-flex justify-center">
        <div class="text-center" style="margin-right: 80px; margin-bottom: 10px; margin-top: 30px;">
          <v-icon color="orange" size="48"> mdi-note-edit </v-icon>
          <h4 class="text-h6 font-weight-medium pb-4">
            发布资讯
          </h4>
        </div>
        <div class="text-center" style="margin-right: 80px; margin-bottom: 10px; margin-top: 30px;">
          <v-icon color="green" size="48"> mdi-gamepad-square </v-icon>
          <h4 class="text-h6 font-weight-medium pb-4">
            创作攻略
          </h4>
        </div>
        <div class="text-center" style="margin-bottom: 10px; margin-top: 30px;">
          <v-icon color="pink" size="48"> mdi-microsoft-xbox-controller-battery-unknown </v-icon>
          <h4 class="text-h6 font-weight-medium pb-4">
            发布提问
          </h4>
        </div>
      </div>

<!--      <v-text-field-->
<!--          label="Your email adress"-->
<!--          solo-->
<!--          type="email"-->
<!--          outlined-->
<!--          flat-->
<!--          class="pt-4"-->
<!--      ></v-text-field>-->
      <v-btn color="accent" block large to="/CreatingCenter">
        <h3 class="font-weight-medium">进入创作中心</h3>
        <v-icon color="white" midium> mdi-arrow-right </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
</script>