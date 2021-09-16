<template>
  <div class="body">
    <el-container class="container">
      <el-header height="60px">
        <nav-bar />
      </el-header>

      <el-container class="middle">
        <el-aside width="200px">
          <side-bar />
        </el-aside>
        <el-main>
          <router-view />
          <!-- <search/> -->
        </el-main>
      </el-container>

      <el-footer height="70px">
        <bottom-audio />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import NavBar from 'components/content/navbar/NavBar'
import SideBar from 'components/content/sidebar/SideBar'

import BottomAudio from 'components/common/audio/Audio'

// import Search from 'views/search/Search'

export default {
  name: 'Home',
  components: {
    NavBar,
    SideBar,
    BottomAudio,
    // Search
  },
}
</script>

<style scoped>


.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1080px;
  height: 680px;
  background-color: pink;
}

.el-header {
  position: relative;
  width: 100%;
  background-color: #ec4141;
}

.middle {
  height: 550px;
  /* overflow: hidden; */
}

.el-aside {
  /* 默认就是border-box */
  height: 100%;
  border-right: 1px solid #e0e0e0;
  background-color: #fff;
}

.el-main {
  background-color: #fff;
  padding: 0;
}

.el-footer {
  position: relative;
  overflow: hidden;
  padding: 0;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
}
</style>
