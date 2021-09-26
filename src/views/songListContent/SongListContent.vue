// 点击歌单后获取到的歌单详细内容
<template>
  <div>
    <!-- 上部歌单详情信息 -->
    <div class="detail-content">
      <!-- 左边图片 -->
      <img class="cover" :src="information.coverImgUrl" />

      <!-- 右边内容 -->
      <img src="~assets/image/songlistLogo.png" class="songlistLogo" />
      <p class="listName">{{ information.name }}</p>
      <div class="creator">
        <img class="creator-avatar" :src="information.creator.avatarUrl" />
        <span class="creator-name">{{ information.creator.nickname }}</span>
        <span class="createTime"
          >{{ information.createTime | showDate }}创建</span
        >
      </div>
      <div class="button-list">
        <click-button class="play-button">
          <i slot="left" class="el-icon-caret-right" />
          <span slot="center">播放全部</span>
          <i slot="right" class="el-icon-plus" />
        </click-button>
        <click-button class="collect-button">
          <i slot="left" class="el-icon-folder-add" />
          <span slot="center">收藏</span>
        </click-button>
        <click-button class="share-button">
          <i slot="left" class="el-icon-share" />
          <span slot="center">分享</span>
        </click-button>
        <click-button class="download-button">
          <i slot="left" class="el-icon-download" />
          <span slot="center">下载全部</span>
        </click-button>
      </div>
      <!-- 文本信息 -->
      <div class="text">
        <p>{{ getTags }}</p>
        <p>{{ getSongsCount + ' ' + getPlayCount }}</p>
        <p class="desc" :class="{ extend: show === true }">
          <span>简介 : </span>
          {{ getDescription }}
          <i class="el-icon-caret-bottom" @click="extendContent"  :class="{ rotate: show === true }"/>
        </p>
      </div>
    </div>
    <content-top-bar :titles="['歌曲列表', '评论', '收藏者']" />
    <song-content :music-list="musicList" />
  </div>
</template>

<script>
import ClickButton from 'components/common/clickButton/ClickButton.vue'

import SongContent from 'components/content/songContent/SongContent.vue'

import ContentTopBar from './childComps/ContentTopBar.vue'

import { getSongListContent } from 'network/find'

import { formatDate } from 'common/utils'

export default {
  name: 'SongListContent',
  components: {
    SongContent,
    ContentTopBar,
    ClickButton,
  },
  data() {
    return {
      id: 0,
      // 歌单详情信息
      information: {
        // 防止渲染过程中creator为null，可以先初始化再等待赋值
        creator: {},
        tags: {},
        trackIds: {},
      },
      musicList: [],
      // 显示简介更多内容
      show: false
    }
  },
  created() {
    this.id = this.$route.params.id
    getSongListContent(this.id).then((res) => {
      // console.log(res)
      this.musicList = res.playlist.tracks
      this.information = res.playlist
      // console.log(this.information);
    })
  },
  methods: {
    getTime() {
      // let time = this.information.createTime
      // console.log(this.information);
    },
    extendContent() {
      // console.log('haha');
      this.show = !this.show
    }
  },
  computed: {
    getTags() {
      let tags = this.information.tags
      let string = ''
      for (let item of Object.values(tags)) {
        string += item + ' / '
        // console.log(item);
      }
      string = string.substring(0, string.length - 3)
      return '标签 : ' + string
    },
    getSongsCount() {
      return '歌曲 : ' + this.information.trackIds.length
    },
    getPlayCount() {
      let count = this.information.playCount
      // console.log(typeof count)
      if (count < 100000) {
        return '播放 : ' + count
      } else {
        let computeCount = parseInt(count / 10000)
        return '播放 : ' + computeCount + '万'
      }
    },
    getDescription() {
      return this.information.description
    },
  },
  filters: {
    showDate: function (value) {
      let date = new Date(value)
      return formatDate(date, 'yyyy-MM-dd')
    },
  },
}
</script>

<style scoped>
.detail-content {
  position: relative;
  height: 250px;
  /* background-color: pink; */
}

.detail-content .cover {
  position: absolute;
  top: 30px;
  left: 30px;
  width: 185px;
  height: 185px;
  border-radius: 5px;
}

.detail-content .songlistLogo {
  position: absolute;
  top: 33px;
  left: 226px;
  width: 43px;
  height: 30px;
}

.detail-content .listName {
  position: absolute;
  top: 35px;
  left: 275px;
  font-size: 22px;
  font-weight: bolder;
  color: #373737;
}

.detail-content .creator {
  display: flex;
  position: absolute;
  top: 70px;
  left: 230px;
  height: 25px;
  line-height: 25px;
}

.detail-content .creator .creator-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.detail-content .creator .creator-name {
  /* width: 25px;
  height: 25px; */
  margin-left: 10px;
  border-radius: 50%;
  color: #507daf;
  font-size: 12px;
}

.detail-content .creator .createTime {
  margin-left: 10px;
  font-size: 12px;
  color: #676767;
}

.detail-content .button-list {
  position: absolute;
  top: 105px;
  left: 230px;
  width: 480px;
  height: 40px;
  /* background-color: pink; */
}

.detail-content .button-list .play-button {
  background-color: #ec4141;
  color: white;
  border: 0;
}

.detail-content .button-list .play-button:hover {
  background-color: #cc3232;
}

.detail-content .text {
  position: absolute;
  top: 155px;
  left: 230px;
  width: 570px;
  height: 60px;
  font-size: 13px;
  color: #373737;
  line-height: 1.65;
  /* background-color: pink; */
}

/* .detail-content .text p {
  margin-bottom: 6px;
} */

.detail-content .text .desc {
  color: #676767;

  /* 文本溢出 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.extend {
  display: block !important;
}

/* 修改图标样式 */
.rotate:before {
  content: "\e78f";
}

.detail-content .text .desc span {
  color: #373737;
}

.detail-content .text .desc .el-icon-caret-bottom {
  position: absolute;
  top: 40px;
  left: 595px;
  font-size: 18px;
  color: #999999;
}

.detail-content .text .desc .el-icon-caret-bottom:hover {
  cursor: pointer;
}
</style>
