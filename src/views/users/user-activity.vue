<template>
	<div data-page="user-activity">
    <div class="bgBanner-banner">
      <img :src="updateActivityData.bgBanner" style="max-width:100%;">
    </div>
    <div style="left:10px;top:54px; position: absolute;" v-show="isAddNewOne">
      <button type="button" class="mui-btn mui-btn-outlined" style="padding: 1px 10px;font-size: 12px;line-height:1.5;">替换Banner 
        <input type="file" multiple="multiple" accept="image/gif,image/jpeg,image/jpg,image/png" @change="setBgByActvity($event)" style="opacity: 0;position: absolute;left: 0px;top: 0px;z-index: 1;width: 80px;"/> 
      </button>
    </div>
    <div style="left: 100px;top:54px; position: absolute;background: #fff;" v-show="isAddNewOne">
      <button type="button" class="mui-btn mui-btn-outlined" style="padding: 1px 10px;font-size: 12px;line-height:1.5;">替换标题背景图
        <input type="file" multiple="multiple" accept="image/gif,image/jpeg,image/jpg,image/png" @change="setBgByTitleBox($event)" style="opacity: 0;position: absolute;left: 0px;top: 0px;z-index: 1;width: 105px;"/> 
      </button>
    </div>
		<!-- 先提供一个默认的基本的设置 -->
		<!-- 活动页由三部分组成 -->
		<!-- 背景图 -->		
		<!-- 主题内容区
					内容页修整
		 -->
		<!-- 活动规则 -->
		<!-- 责权人 -->
		<!-- 背景图可切换 -->
		<!-- 主体内容区可选择模板 -->
		<!-- 活动规则可选择模板，可上传背景图 -->
		<!-- 责权人生成 -->
		<div class="mui-content activity-config-container">
				<ul class="activity-config-list">
					<!-- 默认提供三个基本配置-->
					<li class="activity-config-item activity-config-introduce" >
						<div class="mui-slider" ref="introduce_slider">
							<div class="mui-slider-group">
								<!--第一个内容区容器-->
								<div class="mui-slider-item">
									<!-- 具体内容 -->
									<!-- 图文描述 -->
									<!-- 活动介绍 -->
									<div class="introduce-tip">活动介绍</div><div class="button-bar">
                    <div class="button-bar-icon" @click="tumpUpZan($event)" :class="isActiveZan || updateActivityData.hasZan ? 'active':''">
                      <i class="iconfont icon-icon"></i>
                      <span class="zan-num" v-text="updateActivityData.meta.totalPraise || 0"></span>
                    </div>
                    <div class="button-bar-icon" @click="tumpZuji">
                      <i class="iconfont icon-jiaoya"></i>
                    </div>
                  </div>
									<button type="button" class="mui-btn mui-btn-outlined" style="padding: 1px 10px;font-size: 12px;line-height:1.5;" @click="writeIntroduce" v-show="isAddNewOne">替换文本</button>
									<div class="introduce-desc" :style="'max-height:'+shieldingMaxHeight" v-html="updateActivityData.introduce">
										
									</div>
									<div class="read-more"><label @click="spreadOutShielding"><a href="#" style="font-size:12px;">{{readBtnTxt}}<i class="iconfont icon-gengduo1 ico-more" :style="'transform: '+ico_rotate" ></i></a></label></div>
								</div>
								<!--第二个内容区-->
								<div class="mui-slider-item" style="padding:8px;" v-show="isAddNewOne">
									<!-- 具体内容 -->
                  <editor :content="updateActivityData.introduce" :height="100" :z-index="1000" :auto-height="false" @change="changeIntroduceTxtByEditor"></editor>
								</div>
							</div>
						</div>
					</li>
					
					<li class="activity-config-item activity-config-step">
							<div class="activity-config-title" :style="'background-image:url('+updateActivityData.uploadBoxPic+')'">
								<span class="inner-txt">购买流程</span>
							</div>
							<Step :now-step="nowStep" :step-list="stepList" style-type="style2" :itemLabelStyles="itemLabelStyles" style="margin: 0 15px;"></Step>
					</li>
					<!-- 默认提供一个活动规则 -->
					<li class="activity-config-item activity-config-rule" >
							<div class="activity-config-title" :style="'background-image:url('+updateActivityData.uploadBoxPic+')'">
								<span class="inner-txt">活动规则</span>
							</div>
              <div class="mui-slider" ref="rule_slider">
                  <div class="mui-slider-group">
                        <!--第一个内容区容器-->
                      <div class="mui-slider-item">
                        <button type="button" class="mui-btn mui-btn-outlined" style="padding: 1px 10px;font-size: 12px;line-height:1.5;margin-left:15px;" @click="writeruleTxt" v-show="isAddNewOne">编辑文本</button>
                        <button type="button" class="mui-btn mui-btn-outlined" style="padding: 1px 10px;font-size: 12px;line-height:1.5;" v-show="isAddNewOne">
                          替换选框背景
                          <input type="file" multiple="multiple" accept="image/gif,image/jpeg,image/jpg,image/png" @change="writeRuleBg($event)" style="opacity: 0;position: absolute;left: 0px;top: 0px;z-index: 1;width: 105px;"/> 
                        </button>
                        <div class="activity-config-body" v-html="updateActivityData.rule" :style="'background-image:url('+updateActivityData.ruleBg+')'">
                        </div>
                      </div>
                      <div class="mui-slider-item" style="padding:5px;" v-show="isAddNewOne">
                        <!-- 具体内容 -->
                        <editor :content="updateActivityData.rule" :height="100" :z-index="1000" :auto-height="false" @change="changeRuleTxtByEditor"></editor>
                      </div>
                  </div>
              </div>    
					</li>
				</ul>				
		</div>
	</div>
</template>
<script>
/**
 * TODO:实现需求用户的点赞合分享到足迹
 * 预计完成日: 12/15
 */
import Step from '@/components/Step.vue';
import VueHtml5Editor from 'vue-html5-editor';
const editor = new VueHtml5Editor({
  // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效
  // global component name
  name: 'vue-html5-editor',
  // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
  // if set true,will append module name to toolbar after icon
  showModuleName: false,
  // 自定义各个图标的class，默认使用的是font-awesome提供的图标
  // custom icon class of built-in modules,default using font-awesome
  icons: {
    text: 'fa fa-pencil',
    color: 'fa fa-paint-brush',
    font: 'fa fa-font',
    align: 'fa fa-align-justify',
    list: 'fa fa-list',
    link: 'fa fa-chain',
    unlink: 'fa fa-chain-broken',
    tabulation: 'fa fa-table',
    image: 'fa fa-file-image-o',
    hr: 'fa fa-minus',
    eraser: 'fa fa-eraser',
    undo: 'fa-undo fa',
    'full-screen': 'fa fa-arrows-alt'
  },
  // 配置图片模块
  // config image module
  image: {
    // 文件最大体积，单位字节  max file size
    sizeLimit: 512 * 1024,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: null,
      headers: {},
      params: {},
      fieldName: {}
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
    // set null to disable compression
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    // 响应数据处理,最终返回图片链接
    // handle response data，return image url
    uploadHandler(responseText) {
      //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
      var json = JSON.parse(responseText);
      if (!json.ok) {
        alert(json.msg);
      } else {
        return json.data;
      }
    }
  },
  // 语言，内建的有英文（en-us）和中文（zh-cn）
  //default en-us, en-us and zh-cn are built-in
  language: 'zh-cn',
  // 自定义语言
  i18n: {
    //specify your language here
    'zh-cn': {
      align: '对齐方式',
      image: '图片',
      list: '列表',
      link: '链接',
      unlink: '去除链接',
      table: '表格',
      font: '文字',
      'full screen': '全屏',
      text: '排版',
      eraser: '格式清除',
      info: '关于',
      color: '颜色',
      'please enter a url': '请输入地址',
      'create link': '创建链接',
      bold: '加粗',
      italic: '倾斜',
      underline: '下划线',
      'strike through': '删除线',
      subscript: '上标',
      superscript: '下标',
      heading: '标题',
      'font name': '字体',
      'font size': '文字大小',
      'left justify': '左对齐',
      'center justify': '居中',
      'right justify': '右对齐',
      'ordered list': '有序列表',
      'unordered list': '无序列表',
      'fore color': '前景色',
      'background color': '背景色',
      'row count': '行数',
      'column count': '列数',
      save: '确定',
      upload: '上传',
      progress: '进度',
      unknown: '未知',
      'please wait': '请稍等',
      error: '错误',
      abort: '中断',
      reset: '重置'
    }
  },
  // 隐藏不想要显示出来的模块
  // the modules you don't want
  hiddenModules: [],
  // 自定义要显示的模块，并控制顺序
  // keep only the modules you want and customize the order.
  // can be used with hiddenModules together
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen'
  ],
  // 扩展模块，具体可以参考examples或查看源码
  // extended modules
  modules: {
    //omit,reference to source code of build-in modules
  }
});
export default {
  name:'user-activity',
  components: { Step, editor },
  data() {
    return {
      isActiveZan: false,
      isAddNewOne: true,
      bgBanner: {},
      uploadBoxPic: {},
      ruleBg: {},
      updateActivityData: {
        meta: {
          totalPraise:0
        },
        _id: '',
        bgBanner: '../../../src/imgs/test/bgbingxue.png', // banner图
        uploadBoxPic: '../../../src/imgs/test/bingxuetit.png', // 标题框背景图
        ruleBg: '../..//src/imgs/test/stepjoin.png', // 活动规则背景图
        introduce:
          '<p>一、冰雪旅游活动 ' +
          '举办冰雪大世界、太阳岛雪雕艺术博览会、冰灯艺术游园会、中央大街圣诞嘉年华系列活动、伏尔加庄园城堡滑雪及冬令营系列活动、第2届哈尔滨·宾县(英杰)寒地温泉旅游文化节、第2届长岭湖冬捕冰钓旅游节以及“冰雪进社区、百姓游冰城”等活动。' +
          '</p>' +
          '<p>二、冰雪艺术活动' +
          '举办第30届国际冰雕比赛、第5届国际组合冰雕比赛、第21届国际雪雕比赛、第8届国际大学生雪雕比赛、第22届全国雪雕比赛、第3届全国大学生雪雕比赛、第16届全省雪雕比赛、第3届黑龙江省大学生雪雕比赛、中小学生冰雪雕比赛、2015国际LED冰雪景观艺术创新设计大赛等活动。' +
          '</p>' +
          '<p>三、冰雪时尚活动' +
          '举办冰艺秀场表演、冰雪艺术宫T台秀、室外冰上表演秀、U型槽表演、“冰雪仙子”导游大赛、中国·哈尔滨第32届维纳斯国际冰雪集体婚礼、中俄青少年舞蹈交流演出、2016哈尔滨新年音乐会、2016新年民族音乐会、“永恒的歌声”中外经典声乐作品重唱音乐会、俄罗斯冰雪油画展等活动。' +
          '</p>' +
          '<p>四、冰雪经贸活动' +
          '举办2018哈尔滨寒地博览会、寒地城市发展论坛、寒地城市除雪设备技术研讨会及现场展示、寒地物流高峰会、香港企业家投资哈尔滨交流会、哈尔滨国际冰雪之约、第16届中国企业家论坛年会等活动。' +
          '五、冰雪体育活动' +
          '举办全国冰球联赛、全国女子冰球锦标赛、全国男子少年冰球锦标赛、全国高山滑雪冠军赛、第16届哈尔滨国际冬泳邀请赛、哈尔滨市百万青少年上冰雪活动、哈尔滨市家庭冰上趣味运动会等活动。' +
          '</p>',
        rule: '',
        userId: app.globalService.getLoginUserInfo()._id //用户Id,指明是哪个用户在操作该页面
      },
      shieldingMaxHeight: '125px',
      readBtnTxt: '阅读更多',
      ico_rotate: 'rotate(0)',
      nowStep: 2,
      stepList: ['快捷支付', '等待确认', '订单完成'],
      itemLabelStyles:
        'font-size: 12px;color:#fff;border-radius: 20px;background: linear-gradient(to left,rgba(239, 170, 43, .9),rgba(255, 0, 0, .9));padding: 4px 10px;box-shadow: 0 0 1px rgba(0,0,0,.4);'
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 如果从用户中心进来且是浏览的 有活动id是浏览的
      if (
        from.name === 'userCenter' 
        && Object.keys(vm.$route.params).length > 0
        && (vm.$route.params.activityInfo._id || '') !== ''
      ) {
        vm.$set(
          vm.$route.params.activityInfo,
          'bgBanner',
          app.getResourceUrl(vm.$route.params.activityInfo.bgBanner)
        );
        vm.updateActivityData = vm.$route.params.activityInfo;
        vm.$store.dispatch('updateHeadSaveBtn', false);
        vm.isAddNewOne = false;
      }
    });
  },
  mounted() {
    this.$store.dispatch('updateHeadSaveBtn', true);
    this.$store.dispatch('updateSaveMethod', this.updateDataHandler);
  },
  methods: {
    /**
     * 实现分享到足迹业务
     * @param acceptUserId
     * @param userId
     */
    tumpZuji() {

    },
    /**
     * TODO： 实现点赞业务
     * @param acceptUserId
     * @param userId
     */
    tumpUpZan() {
      const data = {
        activityId: this.updateActivityData._id,
        userId: app.globalService.getLoginUserInfo()._id,
        acceptUserId:this.updateActivityData.userId,
        type: 0
      }
      console.log(this.updateActivityData)
      app.api.userActivity.updateActivitysZan({
        data,
        success: res => {
          if (res.message === 'success') {
            ++this.zanMount
            this.isActiveZan = true
            // 把更新好友关系的当前用户重新设置到缓存里去
          }
        }
      });
    },
    spreadOutShielding() {
      if (this.readBtnTxt === '阅读更多') {
        this.shieldingMaxHeight = '1000px';
        this.readBtnTxt = '收起';
        this.ico_rotate = 'rotate(180deg)';
      } else {
        this.shieldingMaxHeight = '125px';
        this.readBtnTxt = '阅读更多';
        this.ico_rotate = 'rotate(0deg)';
      }
    },
    changeIntroduceTxtByEditor(htmlTxt) {
      this.updateActivityData.introduce = htmlTxt;
    },
    writeIntroduce() {
      mui(this.$refs['introduce_slider'])
        .slider()
        .gotoItem(1); //跳转到第index张图片，index从0开始；
    },
    setBgByActvity(e) {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = evt => {
          this.updateActivityData.bgBanner = evt.target.result;
        };
      }
      this.bgBanner = e.target.files[0];
    },
    setBgByTitleBox(e) {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = evt => {
          this.updateActivityData.uploadBoxPic = evt.target.result;
        };
      }
      this.uploadBoxPic = e.target.files[0];
    },
    writeRuleBg(e) {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = evt => {
          this.updateActivityData.ruleBg = evt.target.result;
        };
      }
      this.ruleBg = e.target.files[0];
    },
    writeruleTxt() {
      mui(this.$refs['rule_slider'])
        .slider()
        .gotoItem(1); //跳转到第index张
    },
    changeRuleTxtByEditor(htmlTxt) {
      this.updateActivityData.rule = htmlTxt;
    },
    // 保存之前会进行截取封面图的操作
    updateDataHandler() {
      mui.confirm(
        '提交该活动后内容将不可修改，需要修改请联系客服进行修改！',
        '', ['取消','确定'],
        e => {
          if (e.index === 1) {
            const userActivity = Object.assign({}, this.updateActivityData);
            const data = new FormData();
            if (userActivity._id === '') {
              delete userActivity._id;
            }
            if (this.bgBanner.size) {
              delete userActivity.bgBanner;
              data.append('bgBanner', this.bgBanner);
            }
            if (this.uploadBoxPic.size) {
              delete userActivity.uploadBoxPic;
              data.append('uploadBoxPic', this.uploadBoxPic);
            }
            if (this.ruleBg.size) {
              delete userActivity.ruleBg;
              data.append('ruleBg', this.ruleBg);
            }
            data.append('userActivity', JSON.stringify(userActivity));
            app.api.userActivity.saveOrUpdate({
              data,
              success: res => {
                if (res.message === 'success') {
                  // 当保存完数据之后，将屏幕w:100% h:135的内容做成图片上传至服务器，使服务器可以获得活动封面图
                  this.$router.push({
                    name: 'userCenter',
                    params: { activityInfo: res.activity,saveStatus: true }
                  });
                }
              }
            });
          } else {
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../less/_mixins.less';
@import '../../less/_colors-vars';
@import 'https://cdn.bootcss.com/font-awesome/4.6.3/css/font-awesome.min.css';
[data-page='user-activity'] {
  overflow: auto;
  -webkit-overflow-scrolling : touch;
  max-height: calc(~'100vh - 40px');
  &.page {
    height: auto !important;
  }
  background-color: #fff;
  .bgBanner-banner {
    width: 100%;
    height: auto;
  }
  .activity-config-container {
    height: 100%;
    background-color: unset;
    .activity-config-list {
      .activity-config-item {
        .activity-config-title {
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          color: #666;
          font-weight: bold;
        }
        .activity-config-body {
          height: 150px;
          background-repeat: no-repeat;
          background-size: calc(~'100% - 30px') 150px;
          background-color: #fff;
          background-position: center;
          padding: 15px 25px 5px 25px;
          font-size: 12px;
          margin-bottom: 25px;
        }
      }
      .activity-config-introduce {
        .introduce-tip {
          font-weight: bold;
          padding-left: 25px;
          display: inline-block;
          vertical-align: bottom;
          width: calc(~'100% - 100px');
        }
        .button-bar {
          display: inline-block;
          width: 100px;
          vertical-align: bottom;
          text-align: left;
          .button-bar-icon {
            margin: 0 8px;
            display: inline-block;
            position: relative;
            &.active>i, &.active span{
              color:@blue;
            }
            .iconfont {
              font-size: 22px;
            }
            .zan-num {
              position: absolute;
              bottom: -2px;
              right: -6px;
              font-size: 12px;
            }
          }
        }
        .introduce-desc {
          margin: 0 15px;
          padding: 10px;
          max-height: 125px;
          overflow: hidden;
          transition: all 0.5s ease;
        }
        .read-more {
          padding: 5px 0 0 25px;
          .ico-more {
            font-size: 12px;
            vertical-align: text-top;
            display: inline-block;
            margin-left: 5px;
            transition: all 0.3s ease;
          }
        }
      }
    }
  }
}
</style>