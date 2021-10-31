<template>
  <div>
    <el-menu
      class="container"
      active-text-color="#313131"
      router
    >
      <el-menu-item-group>
        <!-- <template slot="title">推荐</template> -->
        <el-menu-item
          index="/index/find"
          @click="activeClick('find')"
          :class="activePath === 'find' ? 'activeBg' : ''"
        >
          发现音乐
        </el-menu-item>
        <el-menu-item
          index="/index/player"
          @click="activeClick('player')"
          :class="activePath === 'player' ? 'activeBg' : ''"
        >
          播客
        </el-menu-item>
        <el-menu-item
          index="/index/video"
          @click="activeClick('video')"
          :class="activePath === 'video' ? 'activeBg' : ''"
        >
          视频
        </el-menu-item>
        <el-menu-item
          index="/index/friends"
          @click="activeClick('friends')"
          :class="activePath === 'friends' ? 'activeBg' : ''"
        >
          朋友
        </el-menu-item>
        <el-menu-item
          index="/index/live"
          @click="activeClick('live')"
          :class="activePath === 'live' ? 'activeBg' : ''"
        >
          直播
        </el-menu-item>
        <el-menu-item
          index="/index/fm"
          @click="activeClick('fm')"
          :class="activePath === 'fm' ? 'activeBg' : ''"
        >
          私人FM
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template slot="title">我的音乐</template>
        <el-menu-item index="/download" class="icon"
          ><i class="el-icon-sunrise-1" />本地与下载</el-menu-item
        >
        <el-menu-item index="/history" class="icon"
          ><i class="el-icon-sunset" />最近播放</el-menu-item
        >
        <el-menu-item index="/cloudMusic" class="icon"
          ><i class="el-icon-sunny" />我的音乐云盘</el-menu-item
        >
        <el-menu-item index="/myPlayer" class="icon"
          ><i class="el-icon-cloudy" />我的播客</el-menu-item
        >
        <el-menu-item index="/collect" class="icon"
          ><i class="el-icon-light-rain" />我的收藏</el-menu-item
        >
      </el-menu-item-group>

      <el-menu-item-group>
        <template slot="title">创建的歌单</template>

        <!--         <el-menu-item
          :index="'/songlist/' + item.id"
          @click="changePlaylistId(item.id)"
          v-for="(item, index) in userList"
          :key="index"
          v-if="!item.subscribed"
          >{{ item.name }}
        </el-menu-item> -->
        <el-menu-item
          v-for="(item, index) in userList"
          :key="index"
          class="icon"
          :index="routeIndex(item.id)"
          ><i class="el-icon-sunrise-1" />{{ item.name }}
        </el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template slot="title">收藏的歌单</template>
        <!-- <el-menu-item
          :index="'/songlist/' + item.id"
          @click="changePlaylistId(item.id)"
          v-for="(item, index) in currentUserPlayList"
          :key="index"
          v-if="item.subscribed"
          >{{ item.name }}
        </el-menu-item> -->
        <el-menu-item
          v-for="(item, index) in favorList"
          :key="index"
          class="icon"
          :index="routeIndex(item.id)"
          ><i class="el-icon-sunrise-1" />{{ item.name }}
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
import { getUserList } from 'network/index'

export default {
  name: 'SideBar',
  data() {
    return {
      // 默认选中的是发现音乐页
      activePath: 'find',
      // 用户创建歌单
      userList: [],
      // 用户收藏歌单
      favorList: [],
      // 用户id，用来获取用户歌单
      userId: 0,
    }
  },
  created() {
    if (window.sessionStorage.getItem('activePath')) {
      this.activePath = window.sessionStorage.getItem('activePath')
    }
    if (window.sessionStorage.getItem('userId')) {
      this.userId = window.sessionStorage.getItem('userId')
    }
    // console.log(this.userId)
    getUserList(this.userId).then((res) => {
      let playlist = res.playlist
      for (let item of playlist) {
        if (item.userId == this.userId) {
          this.userList.push(item)
        } else {
          this.favorList.push(item)
        }
      }
      this.userList[0].name = '我喜欢的音乐'
      // console.log(this.userList)
    })
  },
  computed: {},
  methods: {
    // 通过与v-bind的结合使用来修改被选中的样式
    activeClick(activePath) {
      // console.log(string);
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    routeIndex(id) {
      return '/index/songListContent' + id
    }
  },
}
</script>

<style scoped>
.container {
  overflow: hidden;
  border: 0;
  width: 190px;
}

.el-menu-item {
  height: 35px;
  line-height: 35px;
  margin-bottom: 2px;
  font-size: 15px;
  color: #373737;
}

.el-menu-item:hover {
  background-color: #f6f6f7;
  cursor: pointer;
  color: black;
}

.el-menu-item:focus {
  background-color: #f6f6f7;
  font-weight: bold;
}

.activeBg {
  background-color: #f6f6f7;
  font-weight: bold;
}

.icon {
  /* margin-left: 5px; */
  font-size: 14px;
  width: 100%;
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;
}

.icon i {
  position: relative;
  top: -2px;
  /* font-size: 15px; */
}
</style>
