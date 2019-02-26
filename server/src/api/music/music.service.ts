import Music, { IMusic } from '../../db/schema/music';
// const musicAPI = require("@suen/music-api");
const musicAPI = require('music-api-next');
const axios = require("axios");
export default class MusicService {
  private musicList: IMusic[];
  private music: IMusic;
  private songList: any[];
  public update() {
    console.log(111)
  }
  /* =============================================
 * 				 QQ音乐Api解析
 *	简介：
 *		将需要用到的API进行分析， 通过getEncodingUrl
 *		对URL进行组装，通过json来执行跨域数据获取，
 *		最后通过 apiHandler 方法导出统一的接口
 * =============================================  */
  public async queryAllSongsService(body?: any) {
    try {
      const detilList: any = await this.getDetilList();
      const ids: string[] = [];
      const songlist: any [] = []
      if (detilList.data) {
        detilList.data.songlist.forEach((element: any) => {
          ids.push(element.data.songmid)
        });
        if (ids.length > 0) {
          this.songList = await this.getSongs(ids)
          // 先去数据库获取歌单上的所有歌曲id
          // 进行匹配，如果匹配到就证明该歌曲是在歌单内了
          if (body) {
            this.music = (await Music.findOne({ user: body.userId })) as any;
            // 判断是否是歌单数据
            if (body.getplay_list) {
              if (!global._.isEmpty(this.music) && this.music.play_list.length > 0) {
                return this.music.play_list
              }
            }
          }
          detilList.data.songlist.forEach((element: any, index: number) => {
            if (this.songList[index].results) {
              element.file = this.songList[index].results.url
            }
            if (index < 10) {
              if (!global._.isEmpty(body) && !global._.isEmpty(this.music)) {
                // 再找到一条歌对象的情况下进来
                if (this.music.play_list.length > 0) {
                  this.music.play_list.forEach( (item: any) => {
                    if (item.musicId === element.data.songmid) {
                      element.isInPlay_list = true
                    }
                  })
                }
              }
              songlist.push(element)
            }
          });
        }
      }
      return songlist
    } catch (error) {
      throw error
    }
  }
  public async getSongs(ids: any[]): Promise <any[]>  {
    try {
      const promiseList: any[] = []
      ids.forEach( (item: string) => {
        // suoyou
        promiseList.push(musicAPI
          .getSong({
            id: item,
            vendor: "qq"
          }))
      })
      const metas: any [] = await Promise.all(promiseList)
      return metas
    } catch (error) {
      throw error
    }
  }
  // 获取专辑列表
  public async getDetilList() {
    try {
      const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
      const basicParams = {
        tpl: 3,
        page: 'detail',
        date: '2019_02',
        topid: 28,
        type: 'top',
        song_begin: 0,
        song_num: 30,
        g_tk: 5381,
        notice: 0,
        platform: 'yqq',
        hostUin: 0,
        loginUin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        needNewCode: 0,
        rnd: Math.random(),
        format: 'json',
        // jsonpCallback: 'jsonp',
        _: new Date().getTime()
      };
      const discList: any = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: {
              ...basicParams
            }            // 访问的域名
        }) as any;
      return discList
    } catch (error) {
      throw error
    }
  }
  public async searchMusicService(keyword: string): Promise <any[]> {
     const songs: any = await musicAPI
      .searchSong({
        key: keyword,
        page: 1,
        limit: 10,
        vendor: "qq"
      })
      const ids = songs.results.map((item: any) => item.id)
      const metas = await this.getSongs(ids)
      songs.results.forEach((item: any, index: number) => {
        item.file = metas[index].results.url
      })
      return songs
  }
  /**
   * TODO：
   * 判断歌单列表是否存在数据，如果存在就直接拿歌单列表的数据
   * 如果不存在，就去qq music那里拿10条返回
   */
  public async queryMyPlayListService(userId: string): Promise <any[]> {
    try {
      if (!global._.isEmpty(userId)) {
        this.music = (await Music.findOne({ user: userId })) as any;
        if (this.music.play_list.length > 0) {
          // 此处返回自己的歌单
          return this.music.play_list
        } else {
          // 此处返回默认的歌单
          // 从qq music里面搜索出10条默认数据
          return await this.queryAllSongsService()
        }
      } else {
        return await this.queryAllSongsService()
      }
    } catch (error) {
      throw error
    }
  }
  public async joinPlayListService(userId: string, play_list: any) {
    try {
      if (!global._.isEmpty(userId) && !global._.isEmpty(play_list)) {
        this.music = (await Music.findOne({ user: userId })) as any;
        if (!global._.isEmpty(this.music)) {
            const isExistList = this.music.play_list.filter(element => {
              return element.musicId === play_list.musicId
            });
            // 已经存在歌单内了
            if (isExistList.length === 0) {
              this.music = await this.music.update(
                {
                  $push: {
                    play_list
                  }
                },
                {
                  new: true
                }
              )
              return this.music.play_list
          } else {
            return `该歌曲已经存在歌单中`
          }
        } else {
          this.music = new Music({
            user: userId,
            play_list
          });
          this.music = (await this.music.save()) as IMusic;
          return this.music.play_list
        }
      } else {
        return `缺少参数！`
      }
    } catch (error) {
      throw error
    }
  }
  /**
   * 实现需求，从歌单列表中删除该歌单
   */
  public async removePlayListMusicService(userId: string, musicId: string) {
    try {
      if (!global._.isEmpty(userId) && !global._.isEmpty(musicId)) {
        this.music = (await Music.findOneAndUpdate(
            { user: userId },
            {
              $pull: {
                play_list: {musicId}
              }
          })) as IMusic
          // 删除之后判断是否还有剩余歌单，没有剩余歌单了，就必须返回默认10条
          if (this.music.play_list.length > 0) {
            return this.music.play_list
          } else {
            // 返回默认10条数据，明天实现
            return await this.queryAllSongsService()
          }
        }
    } catch (error) {
      throw error
    }
  }
}
