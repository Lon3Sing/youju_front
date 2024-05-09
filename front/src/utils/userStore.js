import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const userStore = new Vuex.Store({
    state: {
        // 定义管理用户数据的state
        userInfo: {
            userid: '',
            username: '',
            token: '',
            image: ''
        }
    },
    mutations: {
        // 退出时清除用户信息
        CLEAR_USER_INFO(state) {
            state.userInfo = {
                userid: '',
                username: '',
                token: '',
                image: ''
            };
        }
    },
    actions: {
        clearUserInfo({ commit }) {
            commit('CLEAR_USER_INFO');
        }
    }
});