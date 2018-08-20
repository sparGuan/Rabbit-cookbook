const setTransform3D = (el, degree, perspective, z) => {
  degree = Math.max(Math.min(degree, 90), -90)
  z -= 5
  el.style['-webkit-perspective'] = el.style['perspective'] = el.style['-moz-perspective'] = perspective + 'px'
  el.style['-webkit-transform'] = el.style['transform'] = 'rotateY(' + degree + 'deg) translateZ(' + z + 'px)'
}
const displayIndex = (imgSize, spacing, left, imgs, index, flat, width, titleBox, vnode) => {
  if (imgs.length <= 0) {
    return
  }
  let mLeft = (width - imgSize) * 0.1 - spacing * (index + 1) - imgSize * 0.1

  for (let i = 0; i <= index; i++) {
    imgs[i].style.left = (left + i * spacing + spacing) + 'px'
    imgs[i].style.marginLeft = mLeft + 'px'
    imgs[i].style['-webkit-filter'] = 'brightness(0.65)'
    imgs[i].style.zIndex = i + 1
    setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 + 45), 300, flat ? -(index - i) * 10 : (-(index - i) * 30 - 20))
  }

  imgs[index].style['-webkit-filter'] = 'none'
  imgs[index].style.marginLeft = (mLeft + imgSize * 0.1) + 'px'
  imgs[index].style.zIndex = imgs.length
  titleBox.style.visibility = 'hidden'

  if (vnode.context.coverList[index].title) {
    titleBox.style.visibility = 'visible'
    let info = vnode.context.coverList[index].title
    titleBox.innerHTML = info
    titleBox.style.left = (left + index * spacing + spacing + 10) + 'px'
    titleBox.style.marginLeft = (mLeft + imgSize * 0.1) + 'px'
  }

  setTransform3D(imgs[index], 0, 0, 5)

  for (let j = index + 1; j < imgs.length; ++j) {
    imgs[j].style.left = (left + j * spacing + spacing) + 'px'
    imgs[j].style.marginLeft = (mLeft + imgSize * .8) + 'px'
    imgs[j].style['-webkit-filter'] = 'brightness(0.7)'
    imgs[j].style.zIndex = imgs.length - j
    setTransform3D(imgs[j], flat ? 0 : ((index - j) * 10 - 45), 300, flat ? (index - j) * 10 : ((index - j) * 30 - 20))
  }

  if (vnode.context.coverIndex !== index) {
    vnode.context.handleChange(index)
  }
}
const renderAllCover = (el, binding, vnode) => {
  let imgSize = parseInt(vnode.context.coverWidth)
  let spacing = parseInt(vnode.context.coverSpace)
  let shadow = vnode.context.coverShadow
  let bgColor = vnode.context.bgColor
  let flat = vnode.context.coverFlat
  let width = vnode.context.width
  let index = vnode.context.index
  let showText = vnode.context.showText
  vnode.context.coverIndex = index
  let imgHeight = Math.max(vnode.context.coverHeight, vnode.context.coverWidth)
  let imgs = []
  let placeholding  
  for (let i = 0; i < el.childNodes.length; ++i) {
    if(el.childNodes[i].nodeName === 'IMG'){
      imgs.push(el.childNodes[i])
    }
    
  }
  for (let j = 0; j < imgs.length; j++) {
    imgs[j].style.position = 'absolute'
    imgs[j].style.width = imgSize + 'px'
    imgs[j].style.height = 'auto'
    imgs[j].style.bottom = '10px'
    imgs[j].style.transition = 'transform .4s ease, margin-left .4s ease, -webkit-filter .4s ease'
  }

  el.style.overflowX = 'hidden'
  el.style.backgroundColor = bgColor

  let titleBox = document.createElement('SPAN')

  if (!shadow) {
    titleBox.className = 'coverflow-title-box'
    titleBox.style.position = 'absolute'
    titleBox.style.width = (imgSize - 20) + 'px'
    titleBox.style.height = '20px'
    titleBox.style.lineHeight = '20px'
    titleBox.style.fontSize = '14px'
    titleBox.style.padding = '0 3px'
    titleBox.style.color = '#222'
    titleBox.style.background = '#ddd'
    titleBox.style.borderRadius = '10px'
    titleBox.style.fontWeight = 'normal'
    titleBox.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif'
    titleBox.style.bottom = '28px'
    titleBox.style.textAlign = 'center'
    titleBox.style.display = showText ?'block':'none'
    showText ? el.appendChild(titleBox):''
  }

  setTransform3D(el, 0, 600, 0)
  placeholding = document.createElement('DIV')
  placeholding.style.width = width * 2 + 'px'
  placeholding.style.height = '1px'
  el.appendChild(placeholding)

  el.style.width = width + 'px'

  if (shadow) {
    el.style.height = (imgHeight * 2 + 80) + 'px'
    el.style['-webkit-perspective-origin'] = el.style['perspective-origin'] = el.style['-moz-perspective-origin'] = '50% 25%'

    for (let k = 0; k < imgs.length; k++) {
      imgs[k].style.bottom = (20 + imgHeight) + 'px'
      imgs[k].style['-webkit-box-reflect'] = 'below 0 -webkit-gradient(linear, 30% 20%, 30% 100%, from(transparent), color-stop(0.3, transparent), to(rgba(0, 0, 0, 0.8)))'
    }
  } else {
    el.style.height = (imgHeight + 10) + 'px'
  }

  el.style.position = 'relative'
  
  displayIndex(imgSize, spacing, el.scrollLeft, imgs, index, flat, parseInt(el.style.width), titleBox, vnode)
  return {
    imgSize,
    spacing,    
    imgs,
    flat,
    titleBox
  }
}
const matchImgSrc = (newSrcArr,oldSrcArr) => {
  for(let i=0;i<newSrcArr.length;i++) {
    console.log(oldSrcArr[i])
    if(newSrcArr.length !== oldSrcArr.length
      &&
      newSrcArr[i].src !== oldSrcArr[i].elm.src){
      return false
    }
  }
  return true
}
export default {
  bind:  (el, binding, vnode) => {
    const {
      imgSize,
      spacing,    
      imgs,
      flat,
      titleBox
    } = renderAllCover(el, binding, vnode)
    const handleClick = event =>{
      if (event.target && event.target.nodeName.toUpperCase() === 'IMG') {
        let index = imgs.indexOf(event.target)
        console.log(imgSize)
        displayIndex(imgSize, spacing, el.scrollLeft, imgs, index, flat, parseInt(el.style.width), titleBox, vnode)
      }
    }
    el.$destroy = () => {
      el.removeEventListener('click', handleClick, false)
    }
    // 绑定函数
    el.addEventListener('click', handleClick, false)
  },
  componentUpdated:  (el, binding, vnode,oldVnode) => {    // 根据获得的新值执行对应的更新
    // 对于初始值也会被调用一次
    // if(typeof el.$destroy === 'function') {
    //   console.log(11)
    //   el.$destroy()
    // }
    // console.log(matchImgSrc(el.childNodes,binding.oldValue))
    console.log(vnode)
    console.log(oldVnode)
    if(oldVnode && matchImgSrc(vnode.elm.children,oldVnode.children)) {
      renderAllCover(el, binding, vnode)
    }
    
    // 
    // el.dispatchEvent('click');
  },
  unbind: (el) => {
     el.$destroy()
  }
}