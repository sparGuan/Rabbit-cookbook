/**
 * 作者：493683987@qq.com
 * 时间：2018-03-01
 * 描述：使圆旋转
 * @sta 命令
 * @val x y坐标
 */

export default {
    sta: 'up',
    coord: [],
    start (sta, ...val) {
        this.sta = sta;
        if (sta == 'turnAround') {
            this.coord = val
        }
        this.move();
    },
    // 新增一个dom
    cEle (tagName, iClass) {
        var tag = document.createElement(tagName);
        tag.className = iClass ? iClass : '';
        return tag;
    },
    // 替换原来的css的方法
    css (ele, styles) {
        for (var attr in styles) {
            ele['style'][attr] = styles[attr];
        }
    },
    putPoints (ele, x, y, r, deg, w, h, css, sta) {
        var a, b;
        var _this = this;
        a = Math.sin(deg * Math.PI / 180) * r;
        b = Math.cos(deg * Math.PI / 180) * r;
        let valx = (x - w / 2) + b,
            valy = (y - h / 2) + a;
        if (this.sta === 'turnAround') {
            if (typeof css === 'function') {
                css(ele, {
                    transform: 'translate3d(' + valx + 'px' + ',' + valy + 'px' + ',0px)',
                    'transition-duration': '32ms',
                    // 'transition-delay': '.1s',
                    'transition-timing-function': 'ease-in-out'
                })
                if (deg === 200) {
                    ele.childNodes[0].classList.add('opll');
                    ele.classList.add('on');
                } else {
                    ele.childNodes[0].classList.remove('opll');
                    ele.classList.remove('on');
                }
                //   console.log(deg)
                ele.setAttribute('deg', deg);
            }
        } else if (this.sta === 'turnLeave') {
            if (typeof css === 'function') {
                css(ele, {
                    transform: 'translate3d(' + valx + 'px' + ',' + valy + 'px' + ',0px)',
                    'transition-duration': '100ms',
                    // 'transition-delay': '.1s',
                    'transition-timing-function': 'ease-out'
                })
                if (deg === 200) {
                    ele.childNodes[0].classList.add('opll');
                    ele.classList.add('on');
                } else {
                    ele.childNodes[0].classList.remove('opll');
                    ele.classList.remove('on');
                }
                ele.setAttribute('deg', deg);
            }
        }
    },
    touchRound (ele, x, y, r, deg, w, h) {
        var w = ele.offsetWidth;
        var h = ele.offsetHeight;
        this.putPoints(ele, ...[x, y, r, deg, w, h, this.css, this.sta]) // 32.5
    },
    move () {
        let circles = document.querySelectorAll('.circle-u'),
            _this = this,
            x = window.innerWidth,
            y = document.querySelector('.rollers').offsetHeight / 2,
            r = document.querySelector('.around').offsetWidth + 20,
            deg = '';
        [].slice.call(circles).forEach(function (e) {
            // deg is important
            if (_this.sta === 'turnAround') {
                //要做判断方向进行旋转
                if (_this.coord[1].y - _this.coord[0].y > 0 || _this.coord[1].x - _this.coord[0].x < 0) {
                    if (e.getAttribute('deg')) {
                        e.setAttribute('deg', parseInt(e.getAttribute('deg')) % 360 + 2);
                        _this.touchRound(e, x, y, r, parseInt(e.getAttribute('deg')) + 2)
                    }
                } else if (_this.coord[1].x - _this.coord[0].x > 0 || _this.coord[1].y - _this.coord[0].y < 0) {
                    if (e.getAttribute('deg')) {
                        e.setAttribute('deg', (parseInt(e.getAttribute('deg')) % 360 - 1) <= 0 ? (parseInt(e.getAttribute('deg')) % 360 - 2) + 360 : parseInt(e.getAttribute('deg')) % 360 - 2);
                        _this.touchRound(e, x, y, r, parseInt(e.getAttribute('deg')) - 2)
                    }
                }
            } else if (_this.sta === 'turnLeave') {
                if (Number(e.getAttribute('deg') % 40) !== 0)// 判断是40的倍数,就不管它
                {
                    // 旋转之后不是40的倍数就让它回滚到之前一个
                    let deg = Number(e.getAttribute('deg')) - Number(e.getAttribute('deg')) % 40;
                    e.setAttribute('deg', deg);//设置回滚
                    _this.touchRound(e, x, y, r, deg)
                }
                if (e.getAttribute('deg') === '200') {
                    document.querySelector('.tweezer').childNodes[0].textContent = e.getAttribute('name');
                    document.querySelector('.tweezer').setAttribute('router', e.getAttribute('router'))
                }
            }

        })

    }

}