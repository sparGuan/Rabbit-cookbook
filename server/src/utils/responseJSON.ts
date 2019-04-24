/**
 * @param code number 错误代码
 * @param msg string 错误大写返回
 * @param data 返回数据
 * 返回错误代码
 */
export default function responseJSON(code: number, msg: string, data?: any): {} {
    const result = {
        error_code: code,
        error_msg: msg
    } as any;
    if (data) {
        result.data = data;
    }
    return result;
}
