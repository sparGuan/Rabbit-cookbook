class takeH5Photos {
	isSendToServer;
	file_url;
	task;
	dataBase64;
	constructor({ isSendToServer = false }) {
		this.isSendToServer = isSendToServer;
	}
	createTask(callback) {
		mui.plusReady(() => {
			return (this.task = plus.uploader.createUpload(
				`${app.Config.resourceUploadUrl}api/upload`,
				{ method: 'POST', priority: 100 },
				(t, status) => {
					plus.nativeUI.closeWaiting();
					//                  mui.toast("t="+JSON.stringify(t));
					if (status === 200) {
						let msg = JSON.parse(task.responseText);
						if (msg.message.code) {
							//人脸验证通过
							mui.toast(msg.message.message);
							if (typeof callback === 'function') {
								callback(t);
							}
							// postImg()
						} else {
							//验证失败
							mui.toast(msg.message.errorMessage);
						}
					} else {
						console.log(':上传失败');
						mui.toast('上传失败: ' + status);
					}
				}
			));
		});
	}
	openCamera(callback) {
		mui.plusReady(() => {
			let cmr = plus.camera.getCamera();
			cmr.captureImage(
				p => {
					plus.io.resolveLocalFileSystemURL(
						p,
						entry => {
							plus.nativeUI.showWaiting('人脸识别中...', ''); //显示系统loading框
							plus.zip.compressImage(
								{
									src: entry.toLocalURL(),
									dst: '_doc/camera/' + p, // 文件名
									overwrite: true,
									format: 'png',
									width: '100%',
									height: '100%'
								},
								zip => {
									if (zip.size > 2 * 1024 * 1024) {
										return mui.toast(
											'文件超大,请调整相机重新拍照'
										);
									}
									this.file_url = zip.target;
									//转为base64
									this.getBase64(this.file_url);
									if (this.isSendToServer) {
										this.uploadToServer(this.file_url);
									} else {
										const image = this.getBase64(this.file_url);
										// 传入相机对象
										typeof callback === 'function' && callback(this.file_url, image)
									}
								},
								zipe => {
									plus.nativeUI.closeWaiting();
									mui.toast('压缩失败！');
								}
							);
						},
						e => {
							plus.nativeUI.closeWaiting(); //获取图片失败,loading框取消
							mui.toast('失败：' + e.message); //打印失败原因,或给出错误提示
						}
					);
				},
				e => {
					plus.nativeUI.closeWaiting(); //开启照相机失败,关闭loading框
					mui.toast('失败：' + e.message); //打印错误原因,给出错提示
				},
				{
					filename: '_doc/camera/', //图片名字
					index: 1 //摄像头id
				}
			);
		});
	}
	//上传
	uploadToServer(file_url) {
		this.task.addFile(file_url, { key: 'faceImg' });
		this.task.start();
	}
	getBase64(url) {
		//传入图片路径
		const image = new Image();
		image.src = url;
		image.onload = () => {
			//onload事件不执行，后查是因为onloand事件是基于http协议的，file://。。.jpg路径没法执行，弃之
			mui.toast('load3');
			return ((img, width, height) => {
				const canvas = document.createElement('canvas');
				canvas.width = width ? width : img.width;
				canvas.height = height ? height : img.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				this.dataBase64 = canvas.toDataURL('image/jpg');
				// postImg(this.dataBase64.substr(22)) //this.dataBase64上传到后台
			})(image);
		};
	}
}
export default takeH5Photos;
