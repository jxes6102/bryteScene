/*eslint-disable*/
import { createRouter,createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import introductionView from '../views/Introduction/index.vue'
import editIntroduction from '../views/Introduction/editIntroduction.vue'
import newsView from '../views/news/index.vue'
import editNewsView from '../views/news/editNews.vue'
import centerView from '../views/center/index.vue'
import profileView from '../views/center/profileView.vue'
import userView from '../views/center/userView.vue'
import courseView from '../views/course/index.vue'
import courseDetail from '../views/course/courseDetail.vue'
import signRecord from '../views/course/signRecord.vue'
import contactView from '../views/contact/index.vue'
import contactDetail from '../views/contact/contactDetail.vue'
import contactSet from '../views/contact/contactSet.vue'
import contactChart from '../views/setting/contactChart.vue'
import medicationList from '../views/setting/medicationList.vue'
import signView from '../views/setting/signView.vue'
import transmitView from '../views/setting/transmitView.vue'
import learnSituation from '../views/setting/learnSituation.vue'
import tipView from '../views/setting/tipView.vue'
import temperatureView from '../views/setting/temperatureView.vue'
import chatView from '../views/chatroom/chatView.vue'
import chatroom from '../views/chatroom/index.vue' 
import messageView from '../views/message/index.vue'
import qrcodeView from '../views/qrcode/index.vue'
import recordView from '../views/record/index.vue'
import latestNewsView from '../views/news/latestNews.vue'
import loginView from '../views/login/index.vue'
import testView from '../views/testView.vue'
import errorView from '../views/errorView.vue'
import { useLoginStore,useUserStore } from '@/stores/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: introductionView
  },
  {
    path: '/news',
    name: 'news',
    component: newsView
  },
  {
    path: '/editNews',
    name: 'editNews',
    component: editNewsView,
  },
  {
    path: '/editIntroduction',
    name: 'editIntroduction',
    component: editIntroduction,
  },
  {
    path: '/center',
    name: 'center',
    component: centerView
  },
  {
    path: '/profile',
    name: 'profile',
    component: profileView
  },
  {
    path: '/user',
    name: 'user',
    component: userView,
  },
  {
    path: '/course',
    name: 'course',
    component: courseView
  },
  {
    path: '/courseDetail',
    name: 'courseDetail',
    component: courseDetail,
    beforeEnter: (to) => {
      if((!to.query?.CLSNO) || (!to.query?.HDYDATE)){
        return '/course'
      }
    },
  },
  {
    path: '/signRecord',
    name: 'signRecord',
    component: signRecord,
    beforeEnter: (to) => {
      if((!to.query?.CLSNO) || (!to.query?.HDYDATE)){
        return '/course'
      }
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: contactView,
    beforeEnter: () => {
      const userStore = useUserStore()
      // console.log(store.state.roleID)
      // console.log('to',to)
      // console.log('from',from)
      if(userStore.roleID == 3){
        return '/contactDetail'
      }
      // reject the navigation
      // return false
    },
  },
  {
    path: '/contactDetail',
    name: 'contactDetail',
    component: contactDetail
  },
  {
    path: '/contactSet',
    name: 'contactSet',
    component: contactSet,
  },
  {
    path: '/contactChart',
    name: 'contactChart',
    component: contactChart,
  },
  {
    path: '/medicationList',
    name: 'medicationList',
    component: medicationList,
  },
  {
    path: '/signView',
    name: 'signView',
    component: signView,
  },
  {
    path: '/transmitView',
    name: 'transmitView',
    component: transmitView,
  },
  {
    path: '/learnSituation',
    name: 'learnSituation',
    component: learnSituation,
  },
  {
    path: '/tipView',
    name: 'tipView',
    component: tipView,
  },
  {
    path: '/temperatureView',
    name: 'temperatureView',
    component: temperatureView,
  },
  {
    path: '/chatView',
    name: 'chatView',
    component: chatView,
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: chatroom,
  },
  {
    path: '/messageView',
    name: 'messageView',
    component: messageView,
  },
  {
    path: '/qrcodeView',
    name: 'qrcodeView',
    component: qrcodeView,
  },
  {
    path: '/recordView',
    name: 'recordView',
    component:recordView,
  },
  {
    path: '/latestNewsView',
    name: 'latestNewsView',
    component: latestNewsView,
  },
  {
    path: '/login',
    name: 'login',
    component: loginView,
  },
  {
    path: '/testView',
    name: 'testView',
    component: testView,
  },
  { 
    path: '/:pathMatch(.*)*', 
    component: errorView 
  },
  
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//可在未登入時進入
const allow = ['login','home','latestNewsView','testView']
//需特定權限
const authority = [
  'editNews',
  'editIntroduction',
  'user',
  'contactSet',
  'contactChart',
  'medicationList',
  'signView',
  'transmitView',
  'learnSituation',
  'temperatureView',
  'chatView',
  'qrcodeView',
  'recordView'
]

router.beforeEach((to, from) => {
  const loginStore = useLoginStore()
  const userStore = useUserStore()

  // console.log('to',to.name)
  if(!(allow.includes(to.name) || loginStore?.status)){
    return '/'
  }
  if((authority.includes(to.name)) && (userStore.roleID == 3)){
    return '/'
  }

  // explicitly return false to cancel the navigation
  // return false
})

export default router
