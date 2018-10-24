import React, {
  StyleSheet,
  Text,
  View,
  Platform,  
  Navigator,
  TouchableOpacity
} from 'react-native'
import HeadMenu from '@material-ui/icons/menu'
import Icon from '@material-ui/core/Icon';
export const LefButton = (route, navigator, index, navState) => {
  if (index === 0) {
    
    return null
  }
  return (
    <TouchableOpacity
      onPress={() => navigator.pop()}
      style={styles.navBarLeftButton}>
    </TouchableOpacity>
  )
} // 左侧按钮
export const RightButton = (route, navigator, index, navState) => {
  return (
    <View />
  )
} // 右侧按钮
export  const MiddleTabs = (route, navigator, index, navState) => {
  return (
    <Text style={[styles.navBarText, styles.navBarTitleText]}>
      我的APP
    </Text>
  )
}// 中间标签页
const styles = StyleSheet.create({
  navBarText: {
    top: Platform.OS == 'ios' ? 0 : 24,
    fontSize: 14,
    color: '#fff',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarLeftIcon:{
   height:22,
  },
  rightBtnView:{

  }
})