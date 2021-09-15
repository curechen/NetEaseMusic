<template>
  <div>
    <top-bar
      :titles="['个性推荐', '专属订制', '歌单', '排行榜', '歌手', '最新音乐']"
      @tabClick="tabClick"
    />
    <router-view />
  </div>
</template>

<script>
import TopBar from 'components/content/topbar/TopBar.vue'

export default {
  name: 'Find',
  components: {
    TopBar,
  },
  data() {
    return {}
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.$router.push('/find/personality')
          break
        case 1:
          this.$router.push('/find/customized')
          break
        case 2:
          this.$router.push('/find/songList')
          break
        case 3:
          this.$router.push('/find/rank')
          break
        case 4:
          this.$router.push('/find/singer')
          break
        case 5:
          this.$router.push('/find/newMusic')
          break
      }
    },
  },
  mounted() {},
}
</script>

<style scoped>
</style>
