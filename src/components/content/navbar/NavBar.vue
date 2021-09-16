<template>
  <div>
    <div class="logo"></div>
    <i class="el-icon-arrow-left" @click="goBack" />
    <i class="el-icon-arrow-right" @click="goForward" />

    <i class="el-icon-search"></i>
    <input
      type="text"
      class="search"
      placeholder="搜索"
      v-model="query"
      @keyup.enter="enterSearch"
      clearable
    />

    <i class="el-icon-microphone"></i>

    <div class="draft1">
      <img src="~assets/image/draft1.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    enterSearch() {
      this.$router
        .push({
          path: '/index/search' + this.query,
        })
        .catch((err) => {
          console.log(err)
        })
    },
    goBack() {
      this.$router.go(-1)
    },
    goForward() {
      this.$router.go(1)
    },
  },
}
</script>

<style scoped>
.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 160px;
  height: 100%;
  background-size: cover;
  background-image: url(~assets/image/logo.png);
}

.el-icon-arrow-left {
  position: absolute;
  top: 19px;
  left: 230px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  background-color: #d83b3b;
  color: #f7d7d7;
  font-size: 13px;
}

.el-icon-arrow-right {
  position: absolute;
  top: 19px;
  left: 262px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  background-color: #d83b3b;
  color: #f7d7d7;
  font-size: 13px;
}

.el-icon-arrow-left:hover, .el-icon-arrow-right:hover {
  cursor: pointer;
}

.el-icon-search {
  position: absolute;
  top: 24px;
  left: 310px;
  color: #f7d7d7;
  font-size: 13px;
  z-index: 1;
}

.search {
  position: absolute;
  top: 15px;
  left: 300px;
  width: 125px;
  height: 30px;
  line-height: 30px;
  outline: none;
  border: 0;
  color: white;
  padding-left: 30px;
  border-radius: 25px;
  background-color: #e13e3e;
  font-size: 12px;
}

.search::-webkit-input-placeholder {
  color: #e66262;
}

.el-icon-microphone {
  position: absolute;
  top: 17px;
  left: 465px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background-color: #e13e3e;
  color: #f6c5c5;
  font-size: 20px;
}

.draft1 img {
  position: absolute;
  top: 0;
  left: 640px;
  width: 430px;
  height: 100%;
  background-size: cover;
  /* background-image: url(~assets/image/draft1.png); */
}
</style>
