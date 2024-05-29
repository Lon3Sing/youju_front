<template>
  <div>


    <v-row>
      <v-col cols="12">
        <div>
          <div class="pt-16">
            <!-- <h2 class="text-h4 font-weight-bold pb-4">新闻       攻略       资讯</h2> -->
            <div class="mb-4">
              <v-btn
                  :color="selectedTab === 'PC' ? '#ebd4ff' : 'default'"
                  @click="change_volume('PC')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('PC')}"
                  class="borderless"
              >PC
              </v-btn>
              <v-btn
                  :color="selectedTab === 'PS4' ? '#ebd4ff' : 'default'"
                     @click="change_volume('PS4')"
                     :style="{'font-size': '20px','font-weight': 'bold',color : textColor('PS4')}"
                  class="borderless"
              >PS4
              </v-btn>
              <v-btn
                  :color="selectedTab === 'PS5' ? '#ebd4ff' : 'default'"
                  @click="change_volume('PS5')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('PS5')}"
                  class="borderless"
              >PS5
              </v-btn>
              <v-btn
                  :color="selectedTab === 'NS' ? '#ebd4ff' : 'default'"
                  @click="change_volume('NS')"
                  :style="{'font-size': '20px','font-weight': 'bold',color : textColor('NS')}"
                  class="borderless"
              >NS
              </v-btn>
            </div>

<!--            <el-button-group class="mb-4">-->
<!--              <el-button :type="selectedTab === 'PC' ? 'primary' : 'default'" @click="change_volume('PC')"  text-->
<!--                         style="font-size: 20px;">PC-->
<!--              </el-button>-->
<!--              <el-button :type="selectedTab === 'PS4' ? 'primary' : 'default'" @click="change_volume('PS4')"-->
<!--                         style="font-size: 20px;">PS4-->
<!--              </el-button>-->
<!--              <el-button :type="selectedTab === 'PS5' ? 'primary' : 'default'" @click="change_volume('PS5')"-->
<!--                         style="font-size: 20px;">PS5-->
<!--              </el-button>-->
<!--              <el-button :type="selectedTab === 'NS' ? 'primary' : 'default'" @click="change_volume('NS')"-->
<!--                         style="font-size: 20px;">NS-->
<!--              </el-button>-->
<!--            </el-button-group>-->
            <div v-if="selectedTab === 'PC'" class="d-flex align-center">
              <v-row justify="center">
                <v-col v-for="(game, index) in PCGames_now" :key="index" cols="12" sm="6" md="4" lg="4">
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'"
                              :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="300px">
                          <v-chip color="info" text-color="white" small
                                  style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>评分: {{ game.rating }}/5</div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
            </div>
            <div v-if="selectedTab === 'PS4'" class="d-flex align-center">
              <v-row justify="center">
                <v-col v-for="(game, index) in PS4Games_now" :key="index" cols="12" sm="6" md="4" lg="4">
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'"
                              :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="300px">
                          <v-chip color="info" text-color="white" small
                                  style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>评分: {{ game.rating }}/5</div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
            </div>
            <div v-if="selectedTab === 'PS5'" class="d-flex align-center">
              <v-row justify="center">
                <v-col v-for="(game, index) in PS5Games_now" :key="index" cols="12" sm="6" md="4" lg="4">
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'"
                              :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="300px">
                          <v-chip color="info" text-color="white" small
                                  style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
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
                <v-col v-for="(game, index) in NSGames_now" :key="index" cols="12" sm="6" md="4" lg="4">
                  <v-hover v-slot:default="{ hover }">
                    <div>
                      <v-card @click="handleGameClick(game)" :color="hover ? 'white' : 'transparent'"
                              :elevation="hover ? 12 : 0" flat hover>
                        <v-img :src="game.previewImage" :aspect-ratio="16 / 9" class="elevation-2" height="300px">
                          <v-chip color="info" text-color="white" small
                                  style="position: absolute; right: 10px; bottom: 10px;">
                            {{ game.rating }}/5
                          </v-chip>
                          <v-card-text>
                            <v-btn color="accent">游戏</v-btn>
                          </v-card-text>
                        </v-img>
                        <v-card-text>
                          <div class="text-h5 font-weight-bold primary--text">{{ game.name }}</div>
                          <div class="text-body-1 py-4">{{ game.nameEn }}</div>
                          <div>评分: {{ game.rating }}/5</div>
                        </v-card-text>
                      </v-card>
                    </div>
                  </v-hover>
                </v-col>
              </v-row>
            </div>

          </div>
          <v-pagination v-model="currentPage" :length="Math.ceil(totalItems / itemsPerPage)" @input="handlePageChange"/>
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
      PCGames_now: [],

      PS4Games: [],
      PS4Games_now: [],

      PS5Games: [],
      PS5Games_now: [],

      NSGames: [],
      NSGames_now: [],

      currentPage: 1, //当前页数
      itemsPerPage: 12, // 每页显示的项目数量
      totalItems: 0, // 总项目数
    };
  },
  methods: {
    textColor(tag) {
      // 根据`selectedTab`的值动态返回颜色
      return this.selectedTab=== tag ? '#9635ff' : '#000000';
    },
    handleGameClick(game) {
      console.log(game)
      this.$router.push(`/GameDetails/${game.game_id}`)
    },
    loadGames() {
      // 根据当前页码和每页显示数量计算起始索引和结束索引
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      // 从游戏数据中获取当前页的项目
      if (this.selectedTab === 'PC') {
        this.PCGames_now = this.PCGames.slice(startIndex, endIndex);
        this.totalItems = this.PCGames.length
      }

      else if (this.selectedTab === 'PS4') {
        this.PS4Games_now = this.PS4Games.slice(startIndex, endIndex);
        this.totalItems = this.PS4Games.length
      }

      else if (this.selectedTab === 'PS5') {
        this.PS5Games_now = this.PS5Games.slice(startIndex, endIndex);
        this.totalItems = this.PS5Games.length
      }

      else if (this.selectedTab === 'NS') {
        this.NSGames_now = this.NSGames.slice(startIndex, endIndex);
        this.totalItems = this.NSGames.length
      }
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.loadGames();
    },

    change_volume(tag) {
      this.selectedTab = tag
      this.currentPage = 1
      this.loadGames()
    }
  },
  mounted() {
    httpInstance.get('/game/GetGamesByTag/', {
      params: {
        tag_name: "PC",
      }
    }).then(response => {
      this.PCGames = response.map(
          game => ({
            game_id: game.game_id,
            name: game.game_cn_name,
            nameEn: game.game_en_name,
            price: game.price,
            rating: game.score,
            previewImage: game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/game/GetGamesByTag/', {
      params: {
        tag_name: "PS4",
      }
    }).then(response => {
      this.PS4Games = response.map(
          game => ({
            game_id: game.game_id,
            name: game.game_cn_name,
            nameEn: game.game_en_name,
            price: game.price,
            rating: game.score,//修改
            previewImage: game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/game/GetGamesByTag/', {
      params: {
        tag_name: "PS5",
      }
    }).then(response => {
      this.PS5Games = response.map(
          game => ({
            game_id: game.game_id,
            name: game.game_cn_name,
            nameEn: game.game_en_name,
            price: game.price,
            rating: game.score,//修改
            previewImage: game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });

    httpInstance.get('/game/GetGamesByTag/', {
      params: {
        tag_name: "NS",
      }
    }).then(response => {
      this.NSGames = response.map(
          game => ({
            game_id: game.game_id,
            name: game.game_cn_name,
            nameEn: game.game_en_name,
            price: game.price,
            rating: game.score,//修改
            previewImage: game.picture.img_url
          })
      )
    }).catch(error => {
      console.log(error)
    });

    this.loadGames()
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
.borderless {
  border: none !important; /* 移除边框 */
  box-shadow: none !important; /* 移除阴影 */
}
</style>
