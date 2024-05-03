import { defineStore } from 'pinia'
import { ref } from 'vue'
import httpInstance from '@/utils/axios'
import { inject } from 'vue'

export const useUserStore = defineStore('user', () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({
        userid:'',
        username: '',
        authorization:'',
        student_id: '',
        building_id:'',
        room_id: '',
        telephone: '',
        image:''
    })

    // 3. 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {
            userid:'',
            username: '',
            authorization:'',
            student_id: '',
            building_id:'',
            room_id: '',
            telephone: '',
            image:''
        }
    }

    return {
        userInfo,
        merchantInfo,
        riderInfo,
        loginType,
        clearUserInfo
    }
}, {
    persist: true,
})