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
  width: 550px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 16px;
  background-color: white;
  margin-bottom: 10px;
}

.top-bar-item {
  margin-right: 20px;
}

.top-bar-item span {
  color: #373737;
}

.active {
  font-weight: bold;
  font-size: 20px;
}

.active span {
  padding-bottom: 5px;
  border-bottom: 3px solid #ec4141;
}
</style>
