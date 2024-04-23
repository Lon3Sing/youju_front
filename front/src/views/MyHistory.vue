<template>
  <v-row>
    <v-col cols="2">
      <home_bar />
    </v-col>
    <v-col cols="10">
      <v-container>
        <v-timeline align-top dense>
          <v-timeline-item
              v-for="(record, index) in records"
              :key="index"
              :timestamp="record.date"
              color="deep-purple accent-4"
          >
            <span class="font-weight-bold">{{ record.date }}</span>
              <v-card class="elevation-2">
                <v-card-title>
                  <v-row>
                    <v-col cols="3">
                      <router-link :to="{ name: 'item', params: { id: record.id }}" class="link-no-underline">
                        <v-img :src="record.postImage" height="100px" contain></v-img>
                      </router-link>
                    </v-col>
                    <v-col cols="6">
                      <router-link :to="{ name: 'item', params: { id: record.id }}" class="link-no-underline">
                        <div>{{ record.postName }}</div>
                      </router-link>
                    </v-col>
                    <v-col cols="3" class="d-flex align-center">
                      <router-link :to="{ name: 'UserHome', params: { id: record.autherId }}" class="link-no-underline">
                        <v-avatar size="36" class="mr-2">
                          <v-img :src="record.authorAvatar"></v-img>
                        </v-avatar>
                      </router-link>
                      <router-link :to="{ name: 'UserHome', params: { id: record.autherId }}" class="link-no-underline">
                        {{ record.authorName }}
                      </router-link>
                    </v-col>
                  </v-row>
                </v-card-title>
              </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {
    home_bar: () => import("@/components/details/homebar.vue"),
  },
  data() {
    return {
      records: [
        {
          date: '2023-04-01',
          postImage: 'https://th.bing.com/th/id/OIP.WlMqmm2_N_4MzUoLE4BpwwHaEK?w=259&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7',
          postName: '帖子1',
          authorAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7',
          authorName: '作者1',
          id: 1,
          autherId: 1
        },
        {
          date: '2023-04-02',
          postImage: 'https://th.bing.com/th/id/OIP.WlMqmm2_N_4MzUoLE4BpwwHaEK?w=259&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7',
          postName: '帖子2',
          authorAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7',
          authorName: '作者2',
          id: 2,
          autherId: 2
        },
        {
          date: '2023-04-03',
          postImage: 'https://th.bing.com/th/id/OIP.WlMqmm2_N_4MzUoLE4BpwwHaEK?w=259&h=180&c=7&r=0&o=5&dpr=2.2&pid=1.7',
          postName: '帖子3',
          authorAvatar: 'https://tse1-mm.cn.bing.net/th/id/OIP-C._YFRagbOM8FbGUSUJy-m6QAAAA?w=189&h=189&c=7&r=0&o=5&dpr=2&pid=1.7',
          authorName: '作者3',
          id: 3,
          autherId: 3
        }
        // 更多记录...
      ]
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.link-no-underline {
  text-decoration: none; /* Remove underline from all router links */
  color: inherit; /* Keep the text color consistent with other text */
}
</style>
