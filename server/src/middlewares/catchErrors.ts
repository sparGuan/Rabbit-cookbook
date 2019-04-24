const assert = require('assert');
/**
 * 全局异常捕获
 */
module.exports = () => {
    return async (ctx: any, next: any) => {
        try {
            await next();
        } catch (err) {
            if (err instanceof assert.AssertionError) {
                ctx.res = err.message;
                return;
            }
            ctx.res = `Server Error: ${err.message}`;
            console.error('Unhandled Error\n', err);
        }
    };
}
