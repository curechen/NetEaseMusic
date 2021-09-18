<template>
  <div class="content-top-bar">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="top-bar-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentTopBar',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      // 子传父
      this.$emit('tabClick', index)
    },
  },
}
</script>

<style scoped>
.content-top-bar {
  display: flex;
  width: 550px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  /* background-color: pink; */
  margin-bottom: 5px;
  padding-left: 30px;
}

.content-top-bar .top-bar-item {
  margin-right: 20px;
}

.content-top-bar .top-bar-item span:hover {
  cursor: pointer;
  color: black;
}

.content-top-bar .top-bar-item span {
  color: #373737;
}

.content-top-bar .active {
  font-weight: bold;
  /* font-size: 20px; */
}

.content-top-bar .active span {
  padding-bottom: 5px;
  border-bottom: 3px solid #ec4141;
}
</style>
