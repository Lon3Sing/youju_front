<template>
  <div>
    

    <v-row>
      <v-col cols="12">
        <div>
          <div class="pt-16">
            <!-- <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2> -->
            <el-button-group class="mb-4">
                <el-button :type="selectedTab === 'PC' ? 'primary' : 'default'" @click="selectedTab = 'PC'" text style="font-size: 20px;">PC</el-button>
                <el-button :type="selectedTab === 'PS' ? 'primary' : 'default'" @click="selectedTab = 'PS'" style="font-size: 20px;">PS</el-button>
                <el-button :type="selectedTab === 'NS' ? 'primary' : 'default'" @click="selectedTab = 'NS'" style="font-size: 20px;">NS</el-button>
            </el-button-group>
            <div v-if="selectedTab === 'PC'" class="d-flex align-center">
              <v-row justify="center">
                <v-col v-for="(game, index) in PCGames" :key="index" cols="12" sm="6" md="4" lg="3" >
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="500px">
                          <v-chip color="info" text-color="white" small style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/10
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>价格: {{ game.price }}</div>
                          <div>评分: {{ game.rating }}/10</div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
            </div>
            <div v-if="selectedTab === 'PS'" class="d-flex align-center">
              <v-row justify="center">
                <v-col v-for="(game, index) in PSGames" :key="index" cols="12" sm="6" md="4" lg="3" >
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="500px">
                          <v-chip color="info" text-color="white" small style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/10
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>价格: {{ game.price }}</div>
                          <div>评分: {{ game.rating }}/10</div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
            </div>
            <div v-if="selectedTab === 'NS'" class="d-flex align-center">
              <v-row justify="center">
                <v-col v-for="(game, index) in NSGames" :key="index" cols="12" sm="6" md="4" lg="3" >
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="500px">
                          <v-chip color="info" text-color="white" small style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/10
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>价格: {{ game.price }}</div>
                          <div>评分: {{ game.rating }}/10</div>
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

    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      selectedTab: "PC",
      PCGames: [{
        name: '游戏1',
        nameEn: 'Game 1',
        price: 49.99,
        rating: 8.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏2',
        nameEn: 'Game 2',
        price: 59.99,
        rating: 9.0,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏3',
        nameEn: 'Game 3',
        price: 69.99,
        rating: 9.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      },
        {
        name: '游戏4',
        nameEn: 'Game 1',
        price: 49.99,
        rating: 8.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏5',
        nameEn: 'Game 2',
        price: 59.99,
        rating: 9.0,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      },{
          name: '游戏6',
          nameEn: 'Game 2',
          price: 59.99,
          rating: 9.0,
          previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
        },],
      PSGames: [{
        name: '游戏1',
        nameEn: 'Game 1',
        price: 49.99,
        rating: 8.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏2',
        nameEn: 'Game 2',
        price: 59.99,
        rating: 9.0,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏3',
        nameEn: 'Game 3',
        price: 69.99,
        rating: 9.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      },
        {
        name: '游戏4',
        nameEn: 'Game 1',
        price: 49.99,
        rating: 8.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏5',
        nameEn: 'Game 2',
        price: 59.99,
        rating: 9.0,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      },{
          name: '游戏6',
          nameEn: 'Game 2',
          price: 59.99,
          rating: 9.0,
          previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
        },],
      NSGames: [{
        name: '游戏1',
        nameEn: 'Game 1',
        price: 49.99,
        rating: 8.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏2',
        nameEn: 'Game 2',
        price: 59.99,
        rating: 9.0,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏3',
        nameEn: 'Game 3',
        price: 69.99,
        rating: 9.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      },
        {
        name: '游戏4',
        nameEn: 'Game 1',
        price: 49.99,
        rating: 8.5,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      }, {
        name: '游戏5',
        nameEn: 'Game 2',
        price: 59.99,
        rating: 9.0,
        previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
      },{
          name: '游戏6',
          nameEn: 'Game 2',
          price: 59.99,
          rating: 9.0,
          previewImage: 'https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg',
        },],
    };
  },
  methods: {
    async fetchGames() {
      try {
        const response = await axios.get('/api/games'); // Adjust the endpoint as needed
        this.games = response.data;
      } catch (error) {
        console.error('There was an error fetching the games:', error);
      }
    },
  },
  mounted() {
    this.fetchGames(); // 当组件挂载到DOM上时调用fetchPosts方法
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
