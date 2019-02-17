<template>
    <div class="music-center" ref="musicCenter" >
    	<article class="htmleaf-container">
        <div class='jAudio--player'>
            <audio></audio>
            <div class='jAudio--ui'>
              <form action @submit.prevent="searchMusic">
                <div class="search-type-insert mui-input-row mui-search">
                    <input type="search" v-model="searchVal" class="search-music mui-input-clear" ref="searchMusic" placeholder="搜索歌词，歌手，歌名"/>
                </div>
              </form>
              <div class='jAudio--thumb'></div>
              <div class='jAudio--status-bar'>
                <div class='jAudio--details'></div>
                <div class='jAudio--progress-bar'>
                  <div class='jAudio--progress-bar-wrapper'>
                    <div class='jAudio--progress-bar-played'>
                      <span class='jAudio--progress-bar-pointer'></span>
                    </div>
                  </div>
                </div>
                <div class='jAudio--time'>
                  <span class='jAudio--time-elapsed'>00:00</span>
                  <span class='jAudio--time-total'>00:00</span>
                </div>
              </div>
               <div class='jAudio--controls'>
                  <ul>
                    <li><button class='btn' data-action='prev' id='btn-prev'><span></span></button></li>
                    <li><button class='btn' data-action='play' id='btn-play'><span></span></button></li>
                    <li><button class='btn' data-action='next' id='btn-next'><span></span></button></li>
                  </ul>
              </div>
            </div>
            <div class="mui-scroll-wrapper jAudio-scroll-wrapper" ref="jAudio--playlist">
              <div class="mui-scroll">
                <!--这里放置真实显示的DOM内容-->
                <div class='jAudio--playlist'>
                </div>
              </div>
            </div>
        </div>
	    </article>
    </div>
</template>
<script>
export default {
  props:['value'],
  data () {
    return {
      searchVal: '',
      showContent: false,
      dataSource: [], // 数据源，后台返回30条数据
      videoList: {
        playlist: []
      }
    }
  },
  components: {  },
  mounted() {
    mui(this.$refs['searchMusic']).input(); 
    this.getSong();
    this.initMusicScorll()
  },
  watch: {
  },
  methods: {
    searchMusic() {
      app.api.music.searchMusic({
         data: {
           keyword:this.searchVal
         },
         success: res => {
          if (res.message === 'success') {
            this.videoList.playlist = res.info.results
            this.videoList.playlist.forEach( item => {
              item.musicId = item.id,
              item.trackAlbum = item.album
              item.trackArtist = `${item.artist}&`
              item.thumb = item.cover
              item.trackName = `${item.name}`
            })
            // 重新初始化一遍
            this.$emit('listenSongs',this.videoList)
          }
        }
      })
    },
    initMusicScorll() {
      mui(this.$refs['jAudio--playlist']).scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    getSong() {
      const data = {userId: app.globalService.getLoginUserInfo()._id}
      app.api.music.queryAllSongs({
        data,
         success: res => {
          if (res.message === 'success') {
            try {
              if (res.message === 'success') {
                this.dataSource = res.info;
                this.dataSource.forEach( (item,index) => {
                       this.videoList.playlist.push({
                        isInPlay_list: item.isInPlay_list,
                        musicId: item.data.songmid,
                        file: item.file,
                        thumb: `https://y.gtimg.cn/music/photo_new/T002R90x90M000${item.data.albummid}.jpg??max_age=2592000`,
                        trackName: item.data.songname,
                        trackArtist: ((singer) => {
                            let names = ''
                            singer.forEach( (singeror) => {
                              names += `${singeror.name}&`
                            })
                            return names
                        })(item.data.singer),
                        trackAlbum: "Single",
                      })
                })
                this.$emit('listenSongs',this.videoList)
              }
            } catch (error) {
              
            }
          }
        }
      })
    }
	}
}
</script>
<style lang="less" scoped>
@import './common/musicbox.css';
.search-type-insert {
  width: calc(~'100% - 20px');
  margin: 0 auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(12px);
}
.search-music {
      margin-bottom: 0;
}
.jAudio-scroll-wrapper {
  max-height: calc(~'100% - 230px');
  margin-top: 178px
}
.mui-search.mui-active:before {
  margin-top: -13px !important;
}
.mui-search {
  border-radius:5px;
}
.mui-search.mui-active {
  box-shadow: 0 0 10px #efeff4 inset;
}
</style>