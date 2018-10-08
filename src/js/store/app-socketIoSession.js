export default {
	// 该vuex使用全部使用大写，因为数据内容重要
	// 所有用到socket的全局数据管理
	state: {
		connect: false,
		message: null,
		requestNewFriend: null,
		newChatUser: [],
	},
	mutations: {

		// commit该函数，自动触发
		SOCKET_CONNECT: (state, status) => {
			state.connect = true;
		},
		// 添加好友重要性比较强，所以使用了message
		SOCKET_USER_MESSAGE: (state, user) => {
			if (user.headImg) {
				user.headImg = app.getResourceUrl(user.headImg)
			}
			state.requestNewFriend = user
		},
		// 取消掉需要点击的提醒红点 || 增加一个需要打开聊天窗口的红点
		SOCKET_USER_HASNEWS: (state,NewChating) => {
			if (NewChating.isHasNewChating) {
				NewChating.user.headImg = app.getResourceUrl(NewChating.user.headImg)
				NewChating.user.isHasNewChating = NewChating.isHasNewChating
				state.newChatUser.push(NewChating.user)
			} else {
				NewChating.user.isHasNewChating = NewChating.isHasNewChating
				state.newChatUser.forEach((item , index) => {
						if (item._id === NewChating.user._id && !NewChating.user.isHasNewChating) {							
							if (NewChating.Vue) {								
								NewChating.Vue.$set(state.newChatUser,index,NewChating.user)
							} else {
								state.newChatUser[index] = NewChating.user
							}
						}
				});
			}
		}
	},
	actions: {
		otherAction: (context, type) => {
			return true;
		},
		socket_userMessage: (context, message) => {
			context.dispatch('newMessage', message);
			context.commit('NEW_MESSAGE_RECEIVED', message);
			if (message.is_important) {
				context.dispatch('alertImportantMessage', message);
			}
		}
	}
};
