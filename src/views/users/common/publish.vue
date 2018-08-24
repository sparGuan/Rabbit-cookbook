<template>
  <!-- 实现发布动态的组件 -->
  <div>
    <div class="best-publish" @click="publishDynamic">
      <i class="iconfont icon-fabiao" style="font-size:24px;"></i>
    </div>
    <div ref="publish" class="mui-popover mui-popover-action mui-popover-bottom">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" style="border-radius: 0;">
              <div class="mui-input-group">
                <div class="mui-input-row" style="margin-bottom:5px;">
                  <textarea  class="formSet" style="border-bottom: 1px solid #eee;    padding: 5px;" rows="3" placeholder="说点什么吧..." v-model="commitData.speech"></textarea>
                  <div class="dynamicAlbum">
                    <div style="text-align: left;margin-left: 5px;">
                      <i class="iconfont icon-shangchuan1" style="font-size: 50px;color: #999;display:inline-block;vertical-align: top;position: relative;" >
                          <input type="file" ubt="upDynamicAlbum" @change="uploadAlbum($event)" accept="image/gif,image/jpeg,image/jpg,image/png" class="upDynamicAlbum"> 
                      </i><coverflow :coverList="coverList" :coverWidth="50" :width="250" :height="50" :coverHeight="50" :coverSpace="10" :index="0" :coverFlat="true"
                      :showText="false" 
                      style="display: inline-block;"></coverflow>
                    </div>
                  </div>
                </div>
                <div style="padding: 5px;padding-top: 0;text-align: right;">
                  <button type="button" class="mui-btn" @click="canclDynamic">取消</button>
                  <button type="button" @click="submit($event)" class="mui-btn mui-btn-primary">发表</button>
                </div>
              </div>
          </li>
        </ul>
      </div>
  </div>  
</template>
<style lang="less" scoped>
.mui-popover .mui-table-view {
  background-color: #eee;
  border-radius: 0;
}
.mui-backdrop.mui-backdrop-action {
  display: none;
}
.mui-input-group {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}
.mui-input-group:before {
  content: unset;
}
.mui-popover {
  left: 0;
}
.mui-input-group .mui-input-row {
  height: auto;
}

.mui-popover .mui-table-view {
  max-height: 100%;
  background-color: #eee;
}

.mui-popover.mui-popover-action .mui-table-view .mui-table-view-cell:after {
  content: unset;
}
.mui-popover.mui-popover-action .mui-table-view {
  margin: 0;
}
.mui-input-group .mui-input-row:after {
  content: unset;
}
.mui-input-group:after {
  content: unset;
}
.best-publish {
  width: 45px;
  height: 45px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007aff;
  border-radius: 50%;
  text-align: center;
  line-height: 52px;
  color: #fff;
  box-shadow: 0 0 5px #007aff;
}
.dynamicAlbum {
  height: 50px;
}
.upDynamicAlbum {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
<script>
import coverflow from "@/components/vue-coverflow";
export default {
  components: {
    coverflow
  },
  data() {
    return {
      coverList: [],             
      commitData: {
        speech: ""
      },
      album: []
    };
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    publishDynamic() {
      mui(this.$refs["publish"]).popover("toggle");
      mui(".mui-backdrop-action.mui-active")[0].style.display = "none";
    },
    uploadAlbum(e) {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = evt => {
          this.coverList.push({ cover: evt.target.result });      
        };
      }
      this.album.push(e.target.files[0]);
      
    },
    canclDynamic() {
      mui(this.$refs["publish"]).popover("toggle");
    },
    // 将文件循环放进formData
    loopAppendToAlbum(formData) {
      if(this.album.length > 0) {
         this.album.forEach( (item,index) => {
           formData.append('album'+index ,item)
         })
      }      
    },
    submit() {
      mui(e.target).button('loading');
      const commitData = Object.assign({}, this.commitData);
      const data = new FormData();
      data.append('dynamic', JSON.stringify(commitData));
      this.loopAppendToAlbum(data) //循环放进formdata                 
      // 更新用户信息
      // 更新一条数据
      app.api.user.userDynamic({

      })
    }
  }
};
</script>