<template>
  <div class="top-bar">
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
  name: 'TopBar',
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
.top-bar {
  display: flex;
  width: 820px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  background-color: white;
  margin-bottom: 10px;
}

.top-bar .top-bar-item {
  margin-right: 20px;
}

.top-bar .top-bar-item:hover {
  cursor: pointer;
}

.top-bar .top-bar-item span {
  color: #373737;
  /* margin-bottom: 10px; */
}

.top-bar .active {
  font-weight: bold;
  font-size: 20px;
}

.top-bar .active span {
  padding-bottom: 5px;
  border-bottom: 3px solid #ec4141;
}
</style>
