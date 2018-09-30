const $ = require('jquery');
import {  TimelineMax } from 'gsap';
var AnimateInteractive = function($main) {
	this.svgContainer = $main.find('#interactive-skill');

	if (this.svgContainer.length === 0) {
		return;
	}

	this.finger = this.svgContainer.find('#finger');
	this.buttonbg = this.svgContainer.find('#button_bg');

	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true,
		onComplete: function() {
			//this.restart();
		}
	})
		.to(this.finger, 0.4, {
			x: -21,
			y: 20,
			delay: 0.7
		})
		.to(
			{
				fake: 0
			},
			0.3,
			{
				fake: 30
			}
		)
		.to(
			this.buttonbg,
			0.01,
			{
				opacity: 1
			},
			1
		)
		.to(this.finger, 0.7, {
			x: 0,
			y: 0
		})
		.to(
			this.buttonbg,
			0.2,
			{
				opacity: 0
			},
			1.3
		);

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.play();
		}.bind(this)
	);

	this.svgContainer.off('stopAnimation').on(
		'stopAnimation',
		function() {
			this.timeLine.reverse();
		}.bind(this)
	);
};

var AnimateHTML = function($main) {
	this.svgContainer = $main.find('#html5-skill');
  console.log(this.svgContainer)
	if (this.svgContainer.length === 0) {
		return;
	}
	this.star = this.svgContainer.find('#star');
	this.status = false;
	this.star.css('transform-origin', '56.5px 44.5px 0');

	var self = this;
	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true,
		onComplete: function() {
			//this.restart();
		},
		onReverseComplete: function() {
			//if(self.status) this.restart();
		}
	})
		.to(this.star, 0.5, {
			y: -19
		})
		.to(
			this.star,
			0.14,
			{
				rotationY: 90,
				ease: Linear.easeNone
			},
			0.1
		)
		.to(
			this.star,
			0.14,
			{
				rotationY: 0,
				ease: Linear.easeNone
			},
			0.24
		)
		.to(
			this.star,
			0.14,
			{
				rotationY: 90,
				ease: Linear.easeNone
			},
			0.38
		)
		.to(
			this.star,
			0.14,
			{
				rotationY: 0,
				ease: Linear.easeNone
			},
			0.52
		)

		.to(
			this.star,
			0.14,
			{
				rotationY: 90,
				ease: Linear.easeNone
			},
			0.66
		)
		.to(
			this.star,
			1.0,
			{
				y: 0,
				ease: Bounce.easeOut
			},
			0.8
		)

		.to(
			this.star,
			0.14,
			{
				rotationY: 0,
				ease: Linear.easeNone
			},
			0.85
		);

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.restart();
		}.bind(this)
	);
};

var AnimateEvents = function($main) {
	this.svgContainer = $main.find('#event-skill');

	if (this.svgContainer.length === 0) {
		return;
	}
	this.flag = this.svgContainer.find('#flag');

	this.stick = this.svgContainer.find('#stick');
	this.stickPath = this.stick.find('path');

	this.flag.css({
		'transform-origin': '80px 0 0'
	});

	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true
	})
		.set(this.flag, {
			rotationY: 90
		})
		.set(this.stick, {
			y: 35
		})
		.set(this.stickPath, {
			'fill-opacity': 0
		})
		.to(this.stick, 0.7, {
			y: 0
		})
		.to(
			this.stickPath,
			0.7,
			{
				'fill-opacity': 1
			},
			0
		)
		.to(this.flag, 2.5, {
			rotationY: 360
		})
		.to(this.flag, 2.5, {
			rotationY: 0
		});

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.restart();
		}.bind(this)
	);
};

var AnimateSocial = function($main) {
	this.svgContainer = $main.find('#social-skill');

	if (this.svgContainer.length === 0) {
		return;
	}

	this.person_a = this.svgContainer.find('#person_a');
	this.person_b = this.svgContainer.find('#person_b');

	this.person_a.css('transform-origin', 'center bottom');
	this.person_b.css('transform-origin', 'center bottom');

	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true,
		onComplete: function() {
			this.restart();
		}
	})
		.to(this.person_a, 0.2, {
			y: -10
		})
		.to(this.person_a, 0.2, {
			y: 0
		})
		.to(this.person_a, 0.2, {
			y: -8
		})
		.to(this.person_a, 0.2, {
			y: 0
		})
		.to(this.person_b, 0.2, {
			y: -10
		})
		.to(this.person_b, 0.2, {
			y: 0
		})
		.to(this.person_b, 0.2, {
			y: -8
		})
		.to(this.person_b, 0.2, {
			y: 0
		});

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.play();
		}.bind(this)
	);

	this.svgContainer.off('stopAnimation').on(
		'stopAnimation',
		function() {
			this.timeLine.reverse();
		}.bind(this)
	);
};

var AnimateUX = function($main) {
	this.svgContainer = $main.find('#ux-skill');

	if (this.svgContainer.length === 0) {
		return;
	}

	this.blink = this.svgContainer.find('#blink');
	this.pupil = this.svgContainer.find('#pupil');

	this.pupil.css('transform-origin', '27px -40px');

	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true,
		onComplete: function() {
			this.restart();
		}
	})
		.to(this.blink, 0.001, {
			opacity: 1,
			delay: 0.2
		})
		.to(this.blink, 0.1, {
			opacity: 0,
			delay: 0.2
		})

		.to(this.pupil, 0.3, {
			x: 1,
			y: 0
		})
		.to(this.pupil, 0.3, {
			x: -1,
			y: 0
		})
		.to(this.pupil, 0.3, {
			x: 0,
			y: 0
		})
		.to(this.blink, 0.001, {
			opacity: 1,
			delay: 0.2
		})
		.to(this.blink, 0.001, {
			opacity: 0,
			delay: 0.2
		})
		.to(this.blink, 0.001, {
			opacity: 1,
			delay: 0.2
		})
		.to(this.blink, 0.001, {
			opacity: 0,
			delay: 0.2
		})
		.to(this.pupil, 0.3, {
			x: 0,
			y: 0
		});

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.play();
		}.bind(this)
	);

	this.svgContainer.off('stopAnimation').on(
		'stopAnimation',
		function() {
			this.timeLine.reverse();
		}.bind(this)
	);
};

var AnimateWeb = function($main) {
	this.svgContainer = $main.find('#web-skill');

	if (this.svgContainer.length === 0) {
		return;
	}

	this.mobile = this.svgContainer.find('#mobile');
	this.mobile2 = this.svgContainer.find('#mobile2');
	this.desktop = this.svgContainer.find('#desktop');

	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true,
		onComplete: function() {
			this.restart();
		}
	})
		.to(this.desktop, 0.5, {
			x: 13,
			delay: 1
		})
		.to(
			[this.mobile, this.mobile2],
			0.5,
			{
				x: -6,
				delay: 1
			},
			0
		)
		.to(this.mobile2, 0, {
			opacity: 1
		})
		.to([this.mobile, this.mobile2, this.desktop], 0.5, {
			x: 0
		})
		.to(this.desktop, 0.5, {
			x: 13,
			delay: 1
		})
		.to(
			[this.mobile, this.mobile2],
			0.5,
			{
				x: -6,
				delay: 1
			},
			2.0
		)
		.to(this.mobile2, 0, {
			opacity: 0
		})
		.to([this.mobile, this.mobile2, this.desktop], 0.5, {
			x: 0
		});

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.play();
		}.bind(this)
	);

	this.svgContainer.off('stopAnimation').on(
		'stopAnimation',
		function() {
			this.timeLine.reverse();
		}.bind(this)
	);
};

var AnimateBrand = function($main) {
	this.svgContainer = $main.find('#brand-skill');

	if (this.svgContainer.length === 0) {
		return;
	}

	this.pen = this.svgContainer.find('#pen');
	this.penHeight = 40;
	this.penWidth = 82;

	this.heart = this.svgContainer.find('#heart');

	this.heartPath = this.heart.find('#heartpath')[0];

	if (!this.heartPath) {
		return;
	}

	this.pathobj = {
		length: 0,
		pathLength: this.heartPath.getTotalLength()
	};

	this.pen.css('transform-origin', '23px 100px 0');

	this.timeLine = new TimelineMax({
		yoyo: true,
		paused: true
	})
		.to(this.pen, 0.4, {
			rotation: 45
		})
		.to(this.pathobj, 1, {
			length: this.pathobj.pathLength,
			ease: Linear.easeNone,
			onUpdateScope: this,
			onUpdate: function() {
				this.heartPath.style.strokeDasharray = [
					this.pathobj.length,
					this.pathobj.pathLength
				].join(' ');

				var coords = this.heartPath.getPointAtLength(
					this.pathobj.length
				);

				coords.y = coords.y - 102;
				coords.x = coords.x - 22;
				this.pen.css(
					'transform',
					'translate(' +
						coords.x +
						'px, ' +
						coords.y +
						'px) rotate(45deg)'
				);
			}
		});

	this.svgContainer.off('runAnimation').on(
		'runAnimation',
		function() {
			this.timeLine.play();
		}.bind(this)
	);

	this.svgContainer.off('stopAnimation').on(
		'stopAnimation',
		function() {
			this.timeLine.reverse();
		}.bind(this)
	);
};

function setSkillAnimation($main) {
	new AnimateHTML($main);
	new AnimateSocial($main);
	new AnimateUX($main);
	new AnimateWeb($main);

	var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

	if (!is_firefox) {
		new AnimateBrand($main);
	}
// console.log($main
//   .find('#skills li'))
	$main
		.on('mouseenter touchstart','.toolbar .toolbar-icon', function(e) {
			if (e.type == 'touchstart') {
				$('.toolbar .toolbar-icon')
					.find('svg')
					.trigger('stopAnimation');
			}

			$(this)
				.find('svg')
				.trigger('runAnimation');
		})
		.on('mouseleave', function() {
			$(this)
				.find('svg')
				.trigger('stopAnimation');
		});
}

setSkillAnimation($('body'));
