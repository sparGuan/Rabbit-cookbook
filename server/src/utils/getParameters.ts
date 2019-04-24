// export default function elements(keys: any [], params: any) {
//   const result = {} as any;
//   global._.forEach(keys, (v: any) => {
//     if (!global._.isEmpty(params[v])) {
//       result[v] = params[v]
//     }
//   });
//   return result;
// }

import responseJSON from './responseJSON'
/**
 * 实现前端参数与后台module对接
 * @param module 传入模块
 * @param ctx 域、
 */
export default function getParameters(module: any, ctx: any) {
    const result = {} as any;
    global._.each(ctx.request.body, (v: any, k: string) => {
        // module里面有request里面没有的情况下
        // 前端漏传重要参数？
        global._.each(module, (value: any, objectKey: string) => {
            // 两个key值相等的情况下
            if (k === objectKey) {
                if (module[objectKey].require && global._.isEmpty(v)) {
                    // 如果是空的并且非空
                    ctx.body = responseJSON(400, `MISSING_PARAMS_${objectKey.toLocaleUpperCase}`);
                    return;
                } else if (global._.isEmpty(v)) {
                    // 赋予默认值
                    result[objectKey] = module[objectKey].default
                } else {
                    // 赋值
                    result[objectKey] = v
                }
            }
        });
    });
    return result;
}
