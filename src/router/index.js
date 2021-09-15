import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
const Login = () => import('views/login/Login')
const Index = () => import('views/index/Index')
const Find = () => import('views/find/Find')
const Friends = () => import('views/friends/Friends')
const Player = () => import('views/player/Player')
const Search = () => import('views/search/Search')
const Video = () => import('views/video/Video')
const Live = () => import('views/live/Live')
const Fm = () => import('views/fm/Fm')

// find二级路由
const Customized = () => import('views/find/childViews/Customized')
const NewMusic = () => import('views/find/childViews/NewMusic')
const Personality = () => import('views/find/childViews/Personality')
const Rank = () => import('views/find/childViews/Rank')
const Singer = () => import('views/find/childViews/Singer')
const SongList = () => import('views/find/childViews/SongList')

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法，动态重复路由不在报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/index',
    // redirect: '/index/find/personality',
    component: Index,
    children: [
      {
        path: '/',
        redirect: 'find',
      },
      {
        path: 'search:information',
        component: Search
      },
      {
        path: 'find',
        component: Find,
        children: [
          {
            path: '/',
            redirect: 'personality'
          },
          {
            path: 'customized',
            component: Customized
          },
          {
            path: 'newMusic',
            component: NewMusic
          },
          {
            path: 'rank',
            component: Rank
          },
          {
            path: 'singer',
            component: Singer
          },
          {
            path: 'songList',
            component: SongList
          },
          {
            path: 'personality',
            component: Personality
          },
        ]
      },
      {
        path: 'friends',
        component: Friends
      },
      {
        path: 'player',
        component: Player
      },
      {
        path: 'live',
        component: Live
      },
      {
        path: 'fm',
        component: Fm
      },
      {
        path: 'video',
        component: Video
      }
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router