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
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="500px">
                          <v-chip color="info" text-color="white" small style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>价格: {{ game.price }}</div>
                          <div>评分: {{ game.rating }}/5</div>
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
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="500px">
                          <v-chip color="info" text-color="white" small style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>价格: {{ game.price }}</div>
                          <div>评分: {{ game.rating }}/5</div>
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
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'" :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="500px">
                          <v-chip color="info" text-color="white" small style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>价格: {{ game.price }}</div>
                          <div>评分: {{ game.rating }}/5</div>
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
import httpInstance from "@/utils/axios";

export default {
  name: "Home",
  components: {
    ccbar: () => import("@/components/details/createcenterbar.vue"),
  },
  data() {
    return {
      selectedTab: "PC",
      PCGames: [],
      PSGames: [],
      NSGames: [],
    };
  },
  methods: {
    handleGameClick(game) {
      console.log(game)
      this.$router.push(`/GameDetails/${game.game_id}`)
    },
  },
  mounted() {
    httpInstance.get('/game/GetGamesByTag/',{
      params : {
        tag_name : "PC",
      }
    }).then(response => {
      this.PCGames = response.map(
          game => ({
            game_id : game.game_id,
            name : game.game_cn_name,
            nameEn : game.game_en_name,
            price : game.price,
            rating : 4.8,//修改
            previewImage : game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/game/GetGamesByTag/',{
      params : {
        tag_name : "PS",
      }
    }).then(response => {
      this.PSGames = response.map(
          game => ({
            game_id : game.game_id,
            name : game.game_cn_name,
            nameEn : game.game_en_name,
            price : game.price,
            rating : 4.8,//修改
            previewImage : game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/game/GetGamesByTag/',{
      params : {
        tag_name : "NS",
      }
    }).then(response => {
      this.NSGames = response.map(
          game => ({
            game_id : game.game_id,
            name : game.game_cn_name,
            nameEn : game.game_en_name,
            price : game.price,
            rating : 4.8,//修改
            previewImage : game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });
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
