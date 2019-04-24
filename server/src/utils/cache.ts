/**
 *  获取redis缓存
 *  by 2019/3/12
 * author: spar
 */
import Redis from 'ioredis';
export default class RedisCache {
    private options: any = {};
    private redis: any = {};
    private ttl: number = 0;
    constructor(options: any) {
        this.options = options;
        this.redis = new Redis(options.options);
    }

    public async get(key: string) {
        let result = await this.redis.get(key);
        if (global._.isEmpty(result)) {
            result = JSON.parse(result);
        } else {
            result = false;
        }
        return result;
    }

    public async set(key: string, data: any, ttl: string) {
        this.ttl = parseInt(ttl, 10) || this.options.ttl;
        const dataStr = JSON.stringify(data);
        const multi = this.redis.multi();
        multi.set(key, dataStr);
        multi.expire(key, this.ttl);
        const ret = await multi.exec();
        return ret;
    }

    public async del(key: string) {
        const ret = await this.redis.del(key);
        return ret;
    }
}
