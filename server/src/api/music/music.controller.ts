import { statusCode } from '../../config/index';
import Music, { IMusic } from '../../db/schema/music';
import BASE_OPEN_SOURCE_API from '../../master/BASE_OPEN_SOURCE_API';
import MusicService from './music.service';
// 此处需要的是路由
class MusicController extends BASE_OPEN_SOURCE_API< MusicService, IMusic> {
  private music: IMusic;
  private musicList: IMusic[];
  private musicService: any;
  constructor(model: any) {
    super(model)
    this.musicService = new MusicService()
  }
  /**
   *  查询所有歌曲
   *  @param void
   *  @return void
   */
  public queryAllSongs() {
    return async (ctx: any) => {
      const { body } = ctx.request;
     const info = await this.musicService.queryAllSongsService(body);
     ctx.body = {
      message: statusCode.success,
      info
    };
  }
}
  /**
   * 实现搜索歌曲
   *  @param keyword
   *  @return void
   */
  public searchMusic() {
      return async (ctx: any) => {
        const { body } = ctx.request;
        const info = await this.musicService.searchMusicService(body.keyword);
        ctx.body = {
        message: statusCode.success,
        info
      };
    }
  }
  /**
   *  加入歌单功能实现
   *  @param userId play_list
   *  @return void
   */
  public queryMyPlayList() {
    return async (ctx: any) => {
      const { body } = ctx.request;
      const playList = await this.musicService.queryMyPlayListService(body.userId)
      return playList
    }
  }
  /**
   *  加入歌单功能实现
   *  @param userId play_list
   *  @return void
   */
  public joinPlayList() {
      return async (ctx: any) => {
        const { body } = ctx.request;
        // 先去判断该歌是否已经在歌单内，如果在就返回
        // 如果不在歌单内，就实现加入歌单功能，
        // 返回歌单列表数据
        const music = await this.musicService.joinPlayListService(body.userId, body.play_list)
        if (typeof music !== 'string') {
          ctx.body = {
            message: statusCode.success,
            music
          };
        } else {
          ctx.body = {
            message: music
          };
        }
    }
  }
  public removePlayListMusic() {
    return async (ctx: any) => {
      const { body } = ctx.request;
      const paly_list = await this.musicService.removePlayListMusicService(body.userId, body.musicId)
      ctx.body = {
        message: statusCode.success,
        paly_list
      };
    }
  }
}
export default new MusicController(Music) as any;
