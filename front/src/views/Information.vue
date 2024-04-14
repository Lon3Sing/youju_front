<template>
  <div>
    

    <v-row>
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div class="pt-16">
            <!-- <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2> -->
            <el-button-group class="mb-4">
                <el-button :type="selectedTab === '关注' ? 'primary' : 'default'" @click="selectedTab = '关注'" text style="font-size: 20px;">关注</el-button>
                <el-button :type="selectedTab === '推荐' ? 'primary' : 'default'" @click="selectedTab = '推荐'" style="font-size: 20px;">推荐</el-button>
                <el-button :type="selectedTab === '热榜' ? 'primary' : 'default'" @click="selectedTab = '热榜'" style="font-size: 20px;">热榜</el-button>
                <el-button :type="selectedTab === '最新' ? 'primary' : 'default'" @click="selectedTab = '最新'" style="font-size: 20px;">最新</el-button>
                <el-button :type="selectedTab === '其他' ? 'primary' : 'default'" @click="selectedTab = '其他'" style="font-size: 20px;">其他</el-button>
            </el-button-group>
            <div v-if="selectedTab === '关注'">
                <v-row>
                <v-col v-for="i in 30" :key="i" cols="12" lg="4" md="6">
                    <v-hover
                        v-slot:default="{ hover }"
                        close-delay="50"
                        open-delay="50"
                    >
                    <div>
                        <v-card
                            :color="hover ? 'white' : 'transparent'"
                            :elevation="hover ? 12 : 0"
                            flat
                            hover
                            to="/detail"
                        >
                        <v-img
                            :aspect-ratio="16 / 9"
                            class="elevation-2"
                            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                            height="200px"
                            src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                            style="border-radius: 16px"
                        >
                            <v-card-text>
                            <v-btn color="accent" to="category">新闻</v-btn>
                            </v-card-text>
                        </v-img>

                        <v-card-text>
                            <div class="text-h5 font-weight-bold primary--text">
                            How to write an awesome blog post in 5 steps
                            </div>

                            <div class="text-body-1 py-4">
                            Ultrices sagittis orci a scelerisque. Massa placerat
                            duis ultricies lacus sed turpis
                            </div>

                            <div class="d-flex align-center">
                            <v-avatar color="accent" size="36">
                                <v-icon dark>mdi-feather</v-icon>
                            </v-avatar>

                            <div class="pl-2">Yan Lee · 22 July 2019</div>
                            </div>
                        </v-card-text>
                        </v-card>
                    </div>
                    </v-hover>
                </v-col>
                </v-row>
            </div>
            <div v-else-if="selectedTab === '推荐'">
                <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" lg="4" md="6">
                    <v-hover
                        v-slot:default="{ hover }"
                        close-delay="50"
                        open-delay="50"
                    >
                    <div>
                        <v-card
                            :color="hover ? 'white' : 'transparent'"
                            :elevation="hover ? 12 : 0"
                            flat
                            hover
                            to="/detail"
                        >
                        <v-img
                            :aspect-ratio="16 / 9"
                            class="elevation-2"
                            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                            height="200px"
                            src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                            style="border-radius: 16px"
                        >
                            <v-card-text>
                            <v-btn color="accent" to="category">攻略</v-btn>
                            </v-card-text>
                        </v-img>

                        <v-card-text>
                            <div class="text-h5 font-weight-bold primary--text">
                            How to write an awesome blog post in 5 steps
                            </div>

                            <div class="text-body-1 py-4">
                            Ultrices sagittis orci a scelerisque. Massa placerat
                            duis ultricies lacus sed turpis
                            </div>

                            <div class="d-flex align-center">
                            <v-avatar color="accent" size="36">
                                <v-icon dark>mdi-feather</v-icon>
                            </v-avatar>

                            <div class="pl-2">Yan Lee · 22 July 2019</div>
                            </div>
                        </v-card-text>
                        </v-card>
                    </div>
                    </v-hover>
                </v-col>
                </v-row>
            </div>
            <div v-else-if="selectedTab === '热榜'">
                <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" lg="4" md="6">
                    <v-hover
                        v-slot:default="{ hover }"
                        close-delay="50"
                        open-delay="50"
                    >
                    <div>
                        <v-card
                            :color="hover ? 'white' : 'transparent'"
                            :elevation="hover ? 12 : 0"
                            flat
                            hover
                            to="/detail"
                        >
                        <v-img
                            :aspect-ratio="16 / 9"
                            class="elevation-2"
                            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                            height="200px"
                            src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                            style="border-radius: 16px"
                        >
                            <v-card-text>
                            <v-btn color="accent" to="category">资讯</v-btn>
                            </v-card-text>
                        </v-img>

                        <v-card-text>
                            <div class="text-h5 font-weight-bold primary--text">
                            How to write an awesome blog post in 5 steps
                            </div>

                            <div class="text-body-1 py-4">
                            Ultrices sagittis orci a scelerisque. Massa placerat
                            duis ultricies lacus sed turpis
                            </div>

                            <div class="d-flex align-center">
                            <v-avatar color="accent" size="36">
                                <v-icon dark>mdi-feather</v-icon>
                            </v-avatar>

                            <div class="pl-2">Yan Lee · 22 July 2019</div>
                            </div>
                        </v-card-text>
                        </v-card>
                    </div>
                    </v-hover>
                </v-col>
                </v-row>
            </div>
            <div v-else-if="selectedTab === '最新'">
                <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" lg="4" md="6">
                    <v-hover
                        v-slot:default="{ hover }"
                        close-delay="50"
                        open-delay="50"
                    >
                    <div>
                        <v-card
                            :color="hover ? 'white' : 'transparent'"
                            :elevation="hover ? 12 : 0"
                            flat
                            hover
                            to="/detail"
                        >
                        <v-img
                            :aspect-ratio="16 / 9"
                            class="elevation-2"
                            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                            height="200px"
                            src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                            style="border-radius: 16px"
                        >
                            <v-card-text>
                            <v-btn color="accent" to="category">新闻</v-btn>
                            </v-card-text>
                        </v-img>

                        <v-card-text>
                            <div class="text-h5 font-weight-bold primary--text">
                            How to write an awesome blog post in 5 steps
                            </div>

                            <div class="text-body-1 py-4">
                            Ultrices sagittis orci a scelerisque. Massa placerat
                            duis ultricies lacus sed turpis
                            </div>

                            <div class="d-flex align-center">
                            <v-avatar color="accent" size="36">
                                <v-icon dark>mdi-feather</v-icon>
                            </v-avatar>

                            <div class="pl-2">Yan Lee · 22 July 2019</div>
                            </div>
                        </v-card-text>
                        </v-card>
                    </div>
                    </v-hover>
                </v-col>
                </v-row>
            </div>
            <div v-else-if="selectedTab === '其他'">
                <v-row>
                <v-col v-for="i in 6" :key="i" cols="12" lg="4" md="6">
                    <v-hover
                        v-slot:default="{ hover }"
                        close-delay="50"
                        open-delay="50"
                    >
                    <div>
                        <v-card
                            :color="hover ? 'white' : 'transparent'"
                            :elevation="hover ? 12 : 0"
                            flat
                            hover
                            to="/detail"
                        >
                        <v-img
                            :aspect-ratio="16 / 9"
                            class="elevation-2"
                            gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                            height="200px"
                            src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                            style="border-radius: 16px"
                        >
                            <v-card-text>
                            <v-btn color="accent" to="category">新闻</v-btn>
                            </v-card-text>
                        </v-img>

                        <v-card-text>
                            <div class="text-h5 font-weight-bold primary--text">
                            How to write an awesome blog post in 5 steps
                            </div>

                            <div class="text-body-1 py-4">
                            Ultrices sagittis orci a scelerisque. Massa placerat
                            duis ultricies lacus sed turpis
                            </div>

                            <div class="d-flex align-center">
                            <v-avatar color="accent" size="36">
                                <v-icon dark>mdi-feather</v-icon>
                            </v-avatar>

                            <div class="pl-2">Yan Lee · 22 July 2019</div>
                            </div>
                        </v-card-text>
                        </v-card>
                    </div>
                    </v-hover>
                </v-col>
                </v-row>
            </div>

          </div>

        </div>
      </v-col>

      <v-col>
        <div class="pt-16" style="position:sticky; top:0;">
          <ccbar/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      selectedTab: "关注",
      concern:[]
    };
  },
  methods: {
    async fetchConcerns() {
      try {
        const response = await axios.get('/Info/GetPostOfConcern/', { params: { sign: '1' } });
        this.posts = response.data;
      } catch (error) {
        console.error('There was an error fetching the posts:', error);
      }
    },
  },
  mounted() {
    this.fetchConcerns(); // 当组件挂载到DOM上时调用fetchPosts方法
  },
};
</script>

<style scoped>
.text-button {
  background-color: transparent;
  color: #1a1a1a; /* Button text color */
  border: none;
  border-bottom: 2px solid transparent; /* Bottom border */
  border-radius: 0;
  font-weight: 500;
}

/* When button is active or on hover, the border color changes */
.text-button--active,
.text-button:hover {
  border-bottom: 2px solid #0B5FFF; /* Active/Hover border color */
}

.v-btn--active {
  background-color: transparent !important;
}
</style>
