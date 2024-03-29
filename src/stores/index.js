import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobile', () => {
    const width = ref(0)
    const isMobile = computed(() => {
        return width.value <= 768
    })
    const setMobile = (value) => {
        width.value = value
    }

    return { width, isMobile ,setMobile }
})

export const useMenuStore = defineStore('menu', () => {
    const status = ref(false)
    const setMenu = () => {
        status.value = !status.value 
    }
    const closeMenu = () => {
        status.value = false
    }
    const openMenu = () => {
        status.value = true
    }
    return { status,setMenu,closeMenu,openMenu }
})

export const useAnnounceStore = defineStore('announce', () => {
    const status = ref(false)
    const setAnnounce = () => {
        status.value = !status.value 
        localStorage.getItem('announce',status.value)
    }
    const closeAnnounce = () => {
        status.value = false
        localStorage.setItem('announce',false)
    }
    const openAnnounce = () => {
        status.value = true
        localStorage.setItem('announce',true)
    }
    return { status,setAnnounce,closeAnnounce,openAnnounce }
})

export const useLoginStore = defineStore('login', () => {
    const status = ref(false)
    const isLogin = () => {
        status.value = true
    }
    const setToken = (value) => {
        status.value = true
        localStorage.setItem("token", value)
    }
    const clearToken = () => {
        status.value = false
        localStorage.removeItem("token")
    }
    return { status,setToken,clearToken,isLogin }
})

export const useUserStore = defineStore('user', () => {
    const information = ref({})
    const roleID = ref(1)
    const setUserInformation = (value) => {
        information.value = value
    }
    const setRoleID = (value) => {
        roleID.value = value
    }
    return { information,roleID,setUserInformation,setRoleID }
})