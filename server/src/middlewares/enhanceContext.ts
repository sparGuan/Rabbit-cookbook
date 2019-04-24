
/**
 * 增强context对象
 */
module.exports = () => {
    return async (ctx: any, next: any) => {
        await next();
        if (ctx.acknowledge) {
            ctx.acknowledge(ctx.res);
        }
    };
};
