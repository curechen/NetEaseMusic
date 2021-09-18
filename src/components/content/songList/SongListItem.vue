<template>
  <div class="list-item" @click="itemClick">
    <div class="img-box">
      <img :src="listItem.picUrl" />
      <i class="el-icon-video-play" />
    </div>
    <div class="list-info">
      <p>{{ listItem.name }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SongListItem',
  props: {
    listItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    itemClick() {
      let id = this.listItem.id
      this.$router.push({
        path: '/index/songListContent' + id
      })
    },
  },
}
</script>

<style scoped>
.list-item {
  position: relative;
  width: 145px;
  height: 190px;
  margin-bottom: 10px;
  /* background-color: pink; */
}

.list-item .img-box:hover {
  cursor: pointer;
}

.list-item img {
  width: 100%;
  height: 145px;
  border-radius: 5px;
  /* 消除图片下的间隙 */
  vertical-align: middle;
}

.list-info {
  /* position: absolute;
  bottom: 30px;
  left: 0;
  right: 0; */
  width: 100%;
  height: 45px;
  font-size: 14px;
  padding-top: 10px;
  box-sizing: border-box;
  /* overflow: hidden; */
}

.list-info p {
  /* white-space: nowrap; */
  /* margin-bottom: 3px; */
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* 文本溢出 */
  text-overflow: ellipsis;
  overflow: hidden;
  color: #373737;
}

.list-info p:hover {
  cursor: pointer;
  color: #000000;
}

.list-item i {
  position: absolute;
  top: 109px;
  right: 6px;
  font-size: 30px;
  color: white;
  opacity: 0;
  transition: opacity 1s;
}

.list-item .img-box:hover i {
  opacity: 1;
}
</style>
