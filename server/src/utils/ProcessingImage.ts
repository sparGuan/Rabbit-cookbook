const gm = require('gm');
const spawn = require('child_process').spawn; // 提供生成node子进程的方法
import path = require('path');
import DirExistUtils from './DirExistUtils';
const fs = require('fs');
class ProcessingImage {
    private cropAddr: string;
    private imageMagick: any;
    constructor() {
        this.imageMagick = gm.subClass({ imageMagick: true });
    }
    /**
     * 裁剪图片
     * @param srcImg    待裁剪的图片路径
     * @param height    高度
     * @param x         x坐标
     * @param y         y坐标
     * @returns cropAddr 标切之后的图片路径
     */
    public async cropCurrentImg(
        srcImg: string,
        x: number,
        y: number
    ): Promise<string> {
        const srcImgAll = path.join(
            __dirname,
            '../../',
            `src/public/upload/${srcImg}`
        );
        const ext: string = DirExistUtils.getUploadFileExt(srcImgAll);
        const fileName: string = DirExistUtils.getUploadFileName(ext);
        this.cropAddr = `${srcImgAll.substring(
            0,
            srcImgAll.lastIndexOf('\\') + 1
        )}${fileName}`;
        await fs.exists(srcImgAll, async (exists: boolean) => {
            if (exists) {
                await this.imageMagick(srcImgAll).size((err: Error, size: any) => {
                    if (!err) {
                        this.imageMagick(srcImgAll)
                            .crop(size.width, (size.height * .35), x, y)
                            .write(this.cropAddr, (err: Error) => {
                                if (err) {
                                    throw err;
                                }
                                Promise.resolve();
                            });
                    } else {
                        throw err;
                    }
                });
            } else {
                return;
            }
        });
        return `${srcImg.split('/')[0]}/${fileName}`;
    }
    /**
     * 裁剪图片
     * @param srcImg    待裁剪的图片路径
     * @param destImg   裁剪后的图片路径
     * @param width     宽度
     * @param height    高度
     * @param x         x坐标
     * @param y         y坐标
     */
    public cropImg(
        srcImg: string,
        destImg: string,
        width: number,
        height: number,
        x: number,
        y: number
    ) {
        this.imageMagick(srcImg)
            .crop(width, height, x, y)
            .write(destImg, (err: Error) => {
                if (err) {
                    throw err;
                }
            });
    }
    // cropCurrentImg("../../public/aa.png","../../public/dest.jpg",100,100,50,50);

    /**
     * 缩放图片
     * @param srcImg    待缩放的图片路径
     * @param size      缩放后的图片大小(长宽均为size)
     */
    public resizeCurrentImg(srcImg: string, size: number) {
        this.imageMagick(srcImg)
            .resize(size, size)
            .write(srcImg, (err: Error) => {
                if (err) {
                    throw err;
                }
            });
    }

    /**
     * 缩放图片，默认输出图片质量75%，格式PNG
     * @param srcImg    待缩放的图片路径
     * @param destImg   缩放后的图片输出路径
     * @param size      缩放后的图片大小(长宽均为size)
     */
    public resizeImgWithArgs(srcImg: string, destImg: string, size: number) {
        this.imageMagick(srcImg)
            .resize(size, size)
            .write(destImg, (err: Error) => {
                if (err) {
                    throw err;
                }
            });
    }

    /**
     * 缩放图片
     * @param srcImg    待缩放的图片路径
     * @param destImg   缩放后的图片输出路径
     * @param quality   缩放的图片质量，0~100(质量最优)
     * @param width     缩放后的图片宽度
     * @param height    缩放后的图片高度
     * @param imgFormat 缩放后的图片格式
     */
    public resizeImgWithFullArgs(
        srcImg: string,
        destImg: string,
        quality: number,
        width: number,
        height: number,
        imgFormat: string
    ) {
        this.imageMagick(srcImg)
            .resize(width, height)
            .quality(quality)
            .setFormat(imgFormat)
            .write(destImg, (err: Error) => {
                if (err) {
                    throw err;
                }
            });
    }

    /**
     * 添加水印
     * @param srcImg    待添加水印的图片路径
     * @param watermarkImg  水印图片路径
     * @param destImg   添加水印后图片输出路径
     * @param alpha     透明度，0~100(为0表示全透明，100不透明)
     * @param position  水印位置，NorthWest, North, NorthEast, West, Center,East, SouthWest, South, or SouthEast
     */
    public addWaterMark(
        srcImg: string,
        watermarkImg: string,
        destImg: string,
        alpha: number,
        position: string
    ) {
        const composite = spawn('imageMagick', [
            'composite',
            '-gravity',
            position,
            '-dissolve',
            alpha,
            watermarkImg,
            srcImg,
            destImg
        ]);
        composite.on('exit', (code: any) => {
            console.log(1111)
        });
    }
}
export default new ProcessingImage();
