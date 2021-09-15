<template>
  <div>
    <el-menu
      class="container"
      active-text-color="#313131"
      router
      default-active="/find"
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
        <el-menu-item index="/download">本地与下载</el-menu-item>
        <el-menu-item index="/history">最近播放</el-menu-item>
        <el-menu-item index="/cloudMusic">我的音乐云盘</el-menu-item>
        <el-menu-item index="/myPlayer">我的播客</el-menu-item>
        <el-menu-item index="/collect">我的收藏</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <template slot="title">创建的歌单</template>
        <!-- <el-menu-item
          :index="'/songlist/' + item.id"
          @click="changePlaylistId(item.id)"
          v-for="(item, index) in currentUserPlayList"
          :key="index"
          v-if="!item.subscribed"
          >{{ item.name }}
        </el-menu-item> -->
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
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      // 默认选中的是发现音乐页
      activePath: 'find',
    }
  },
  created() {
    if (window.sessionStorage.getItem('activePath')) {
      this.activePath = window.sessionStorage.getItem('activePath')
    }
  },
  methods: {
    // 通过与v-bind的结合使用来修改被选中的样式
    activeClick(activePath) {
      // console.log(string);
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style scoped>
.container {
  overflow: hidden;
  border: 0;
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
</style>
