/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(1);
	
	var domUtils = __webpack_require__(2);
	var utils = __webpack_require__(3);
	var lotteryButton = __webpack_require__(4);
	
	var $scope = {};
	
	var activity = {
	  bindEvents: function bindEvents() {
	    var lastWinH;
	
	    $('.playBtn').click(this.clickPlayBtn.bind(this));
	    $(window).on('load', function () {
	      $('.opacity-hide').removeClass('opacity-hide').addClass('opacity-show');
	      $('.remain-ripple').addClass('ripple-effect');
	    });
	  },
	  clickPlayBtn: function clickPlayBtn(e) {
	    lotteryButton.play();
	    $(e.currentTarget).hide();
	  },
	  initPage: function initPage() {
	    lotteryButton.init(document.getElementById('playBtn'), {
	      $scope: $scope
	    });
	  },
	  start: function start() {
	    this.initPage();
	    this.bindEvents();
	  }
	};
	activity.start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  createHtmlDom: function createHtml() {
	    var div = document.createElement('div');
	
	    return function (html) {
	      var temp;
	      div.innerHTML = html;
	      temp = div.children[0];
	      div.removeChild(temp);
	      return temp;
	    };
	  }(),
	  replaceTemlate: function replaceTemlate(str, data) {
	    var regx = new RegExp(/{(.*?)}/g),
	        temp;
	    while (temp = regx.exec(str)) {
	      str = str.replace(temp[0], data[temp[1]]);
	    }
	    return str;
	  },
	  bindEvent: function bindEvent(dom, name, fn) {
	    dom.addEventListener(name, fn, false);
	  },
	  unBindEvent: function unBindEvent(dom, name, fn) {
	    dom.removeEventListener(name, fn, false);
	  },
	  getUrlParam: function getUrlParam(key) {
	    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return decodeURI(r[2]);
	    return null;
	  },
	  assign: function assign() {
	    var temp = arguments[0];
	    var args = [].slice.call(arguments, 1);
	    for (var i = 0, len = args.length; i < len; i++) {
	      var item = args[i];
	      for (var p in item) {
	        if (item.hasOwnProperty(p)) {
	          temp[p] = item[p];
	        }
	      }
	    }
	    return temp;
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    ns: "",
	    formatNum: function formatNum(c, bitcount) {
	        var b = ["", "", "", "K", "W", "W", "W", "KW"];
	        var a = {
	            K: 1000,
	            W: 10000,
	            KW: 10000000
	        };
	        var d, e;
	        c += "";
	        if (!c || isNaN(Number(c))) {
	            return "0";
	        }
	        if (!!bitcount) {
	            if (c.length <= bitcount) return c;
	        }
	        d = c.length >= 8 ? b[7] : b[c.length - 1];
	        e = d ? c / a[d] : c;
	        if (/^\d+\.\d+$/.test(e)) {
	            // d += "+";
	            e = parseInt(e);
	        }
	        if (d == 'K') {
	            d = '000';
	        }
	        if (d == 'W') {
	            d = '万+';
	        }
	        if (d == 'KW') {
	            d = '千万+';
	        }
	        return e + d;
	    },
	    setStorage: function setStorage(name, val) {
	        var key = this.ns + '_bro' + name;
	        try {
	            if (val == null) localStorage.removeItem(key);else localStorage.setItem(key, JSON.stringify(val));
	        } catch (error) {
	            console.warn('Unable to save state', error);
	        }
	    },
	
	    getStorage: function getStorage(name, ns) {
	        var key = this.ns + '_bro' + name,
	            data;
	        try {
	            data = localStorage.getItem(key);
	        } catch (error) {
	            console.warn('Unable to read state', error);
	        }
	        if (data) {
	            try {
	                data = JSON.parse(data);
	            } catch (error) {
	                // Ignore invalid JSON.
	            }
	            return data;
	        }
	    },
	    timeFormat: function timeFormat(time, format) {
	        if (!time) return '';
	
	        var date = new Date(time);
	        if (date.toString() == "Invalid Date") return '';
	        format = format || 'yy/mm/dd HH:ii:ss';
	        var timeMap = {
	            yy: date.getFullYear(),
	            mm: date.getMonth() + 1,
	            dd: date.getDate(),
	            HH: date.getHours(),
	            hh: date.getHours(),
	            ii: date.getMinutes(),
	            ss: date.getSeconds()
	        };
	        if (timeMap.HH > 11) {
	            if (timeMap.HH > 12) timeMap.hh = timeMap.HH - 12;
	            timeMap.ns = 'PM';
	        } else {
	            timeMap.ns = 'AM';
	        }
	
	        return format.replace(/(yy|mm|dd|HH|hh|ii|ss|ns)/g, function (a) {
	            var data = timeMap[a] + '';
	            data = data.length == 1 ? '0' + data : data;
	            return data;
	        });
	    },
	    replaceUrlParam: function replaceUrlParam(url, key, replaceStr, isappend) {
	        var reg = new RegExp("(?:^|&)" + key + "=([^&]*)(&|$)", "i");
	        var index = url.indexOf('?'),
	            oriUrl = url,
	            matchs;
	        if (index != -1) {
	            url = url.substr(index + 1);
	            if (matchs = url.match(reg)) {
	                url = oriUrl.substr(0, index + 1) + url.replace(matchs[1], replaceStr);
	            }
	        }
	        if (isappend && url.indexOf(key) == -1) {
	            if (index == -1) url += '?';else url += '&';
	            url += key + '=' + replaceStr;
	        }
	        return url;
	    },
	    toFixed: function toFixed(data, num, isround) {
	        if (isround) {
	            data = data * 1;
	            data.toFixed(num);
	        } else {
	            data = data + '';
	            var dotIndex = data.indexOf('.'),
	                decimals,
	                integ;
	
	            if (dotIndex > -1) {
	                integ = data.substr(0, dotIndex);
	                decimals = data.substr(dotIndex + 1);
	
	                if (decimals.length > num) {
	                    decimals = decimals.substr(0, num);
	                }
	                return (integ + '.' + decimals) * 1;
	            } else return data;
	        }
	    },
	
	    dec2hex: function dec2hex(num) {
	        if (typeof num !== 'undefined') {
	            return Number(num).toString(16);
	        }
	    },
	    unicode2Ch: function unicode2Ch(str) {
	        if (!str) return '';
	        var self = this;
	        if (/&#\d+;/.test(str)) {
	            str = str.replace(/&#(\d+);/g, function (a, b) {
	                return '%u' + self.dec2hex(b);
	            });
	            return unescape(str);
	        } else return str;
	    },
	    // Zepto.cookie plugin
	    //
	    // Copyright (c) 2010, 2012
	    // @author Klaus Hartl (stilbuero.de)
	    // @author Daniel Lacy (daniellacy.com)
	    //
	    // Dual licensed under the MIT and GPL licenses:
	    // http://www.opensource.org/licenses/mit-license.php
	    // http://www.gnu.org/licenses/gpl.html
	    cookie: function cookie(key, value, options) {
	        var days, time, result, decode;
	
	        // A key and value were given. Set cookie.
	        if (arguments.length > 1 && String(value) !== "[object Object]") {
	            // Enforce object
	            options = $.extend({}, options);
	
	            if (value === null || value === undefined) options.expires = -1;
	
	            if (typeof options.expires === 'number') {
	                days = options.expires * 24 * 60 * 60 * 1000;
	                time = options.expires = new Date();
	
	                time.setTime(time.getTime() + days);
	            }
	
	            value = String(value);
	
	            return document.cookie = [encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join('');
	        }
	
	        // Key and possibly options given, get cookie
	        options = value || {};
	
	        decode = options.raw ? function (s) {
	            return s;
	        } : decodeURIComponent;
	
	        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	    },
	    formatAmount: function formatAmount(amount) {
	        if (!amount) return 0;
	
	        amount += '';
	        var len = amount.length,
	            ret = '';
	
	        if (len <= 3) return amount;
	
	        for (var i = 1; amount.length > 0; i++) {
	            var splitIndex = amount.length - 3;
	            splitIndex = splitIndex < 0 ? 0 : splitIndex;
	            ret = amount.substr(splitIndex, 3) + ret;
	            ret = ',' + ret;
	            amount = amount.substring(0, splitIndex);
	        }
	        ret = ret.substring(1);
	        return ret;
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var luobosJson = __webpack_require__(5);
	var zatuzisJson = __webpack_require__(6);
	var resolveSheet = __webpack_require__(7);
	
	function ImgUrl(data) {
	  return new LBitmap(new LBitmapData(data));
	}
	
	function setCenter(target, x, y) {
	  if (x != null) target.x = x - target.getWidth() / 2;
	  if (y != null) target.y = y - target.getHeight() / 2;
	}
	var lotteryButton = {
	  targetId: "game-canvas",
	  rotateAngel: 0,
	  step: 0.5,
	  direction: 1,
	  duration: 500,
	  init: function (_init) {
	    function init(_x, _x2) {
	      return _init.apply(this, arguments);
	    }
	
	    init.toString = function () {
	      return _init.toString();
	    };
	
	    return init;
	  }(function (button, options) {
	    var self = this;
	
	    $.extend(this, options);
	
	    init(16, this.targetId, 1080, 1180, function () {
	      self.main();
	    });
	  }),
	  main: function main() {
	    var imgData = [{ name: 'luobos', path: './imgs/luobos.webp' }, { name: 'zatuzis', path: './imgs/zatuzis.png' }],
	        loadingLayer = new LoadingSample3(),
	        self = this;
	
	    LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
	    // LSystem.screen(LStage.FULL_SCREEN);
	    LGlobal.preventDefault = false;
	    // LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	    var winW = document.body.clientWidth;
	    var ratio = winW / 1080;
	    var canvas = document.getElementsByTagName('canvas')[0];
	    // canvas.style.width = winW + 'px';
	    // canvas.style.height = ratio * 1180 + 'px';
	    LGlobal.resize(winW, ratio * 1180);
	    document.getElementById(this.targetId).style.height = ratio * 1180 + 'px';
	
	    LLoadManage.load(imgData, function (progress) {
	      loadingLayer.setProgress(progress);
	    }, function (result) {
	      removeChild(loadingLayer);
	      loadingLayer = null;
	      self.gameInit(result);
	      console.log(result);
	    });
	  },
	  gameInit: function gameInit(result) {
	    var luobos = resolveSheet(luobosJson, result.luobos),
	        rabbits = resolveSheet(zatuzisJson, result.zatuzis),
	        l1 = luobos('luobon1.png'),
	        l2 = luobos('luobon2.png'),
	        l3 = luobos('luobon3.png'),
	        targetEye = rabbits('target-eye.png');
	
	    this.backLayer = new LSprite();
	    this.mainLayer = new LSprite();
	    this.shootLayer = new LSprite();
	
	    this.backLayer.name = 'backLayer';
	
	    addChild(this.backLayer);
	    addChild(this.mainLayer);
	    addChild(this.shootLayer);
	
	    l2.x = LGlobal.width / 2 - l2.getWidth() / 2;
	    l2.y = 0;
	
	    l1.x = LGlobal.width / 5 - l1.getWidth() / 2;
	    l1.y = 100;
	
	    l3.x = LGlobal.width * 4 / 5 - l3.getWidth() / 2;
	    l3.y = 90;
	
	    this.addTargetEye(targetEye, l1.x, 140 + l2.getHeight() / 2 - targetEye.getHeight() / 2);
	    this.addShooter(rabbits);
	    this.backLayer.addChild(l1);
	    this.backLayer.addChild(l2);
	    this.backLayer.addChild(l3);
	
	    this.backLayer.addEventListener(LEvent.ENTER_FRAME, this.onFrame.bind(this));
	    this.lastTime = this.getCurrentTime();
	    this.l1 = l1;
	  },
	  addTargetEye: function addTargetEye(target, x, y) {
	    var targetEye = new LSprite();
	
	    targetEye.addChild(target);
	
	    targetEye.x = x;
	    targetEye.y = y;
	    targetEye.name = 'target-eye';
	    targetEye.rotatex = LGlobal.width / 2 - target.getWidth() / 2;
	    targetEye.rotatey = 530;
	
	    this.mainLayer.addChild(targetEye);
	    this.targetEye = targetEye;
	  },
	  addShooter: function addShooter(getImg) {
	    var deadman = getImg('dangong.png'),
	        rope = getImg('dangongshen.png'),
	        activeShoot = getImg('jihuo.png'),
	        zatuzi = getImg('zatuzi.png');
	
	    zatuzi.visible = false;
	    setCenter(deadman, LGlobal.width / 2, 832);
	    setCenter(rope, LGlobal.width / 2, 850);
	    setCenter(activeShoot, LGlobal.width / 2, 953);
	    this.backLayer.addChild(deadman);
	    this.mainLayer.addChild(rope);
	    this.mainLayer.addChild(zatuzi);
	    this.shootLayer.addChild(activeShoot);
	
	    this.rope = rope;
	    this.activeShoot = activeShoot;
	    this.zatuzi = zatuzi;
	    rope.visible = false;
	    // this.shootLayer.visible = false;
	
	    // LMouseEventContainer.set(LMouseEvent.MOUSE_UP,true);
	    this.backLayer.addEventListener(LMouseEvent.MOUSE_UP, this.shoot.bind(this));
	  },
	  update: function update(passed) {
	
	    this.rotateAngel += this.step * this.direction; // * (passed /this.duration);
	
	    if (this.rotateAngel >= 80) {
	      this.direction = -1;
	    } else if (this.rotateAngel <= 0) {
	      this.direction = 1;
	    }
	  },
	  draw: function draw() {
	    this.targetEye.rotate = this.rotateAngel;
	  },
	  onFrame: function onFrame() {
	    var now = this.getCurrentTime(),
	        passed = now - this.lastTime;
	    this.update(passed);
	    this.draw();
	
	    this.lastTime = now;
	  },
	  getCurrentTime: function getCurrentTime() {
	    return +new Date();
	  },
	  play: function play() {
	    this.rope.visible = false;
	    this.shootLayer.visible = true;
	  },
	  shoot: function shoot() {
	    setCenter(this.zatuzi, this.l1.x, this.l1.y);
	    this.zatuzi.visible = true;
	    this.rope.visible = true;
	    this.shootLayer.visible = false;
	  }
	};
	module.exports = lotteryButton;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"frames": {
			"luobon1.png": {
				"frame": {
					"x": 1,
					"y": 333,
					"w": 224,
					"h": 302
				},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 224,
					"h": 302
				},
				"sourceSize": {
					"w": 224,
					"h": 302
				}
			},
			"luobon2.png": {
				"frame": {
					"x": 1,
					"y": 637,
					"w": 211,
					"h": 318
				},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 211,
					"h": 318
				},
				"sourceSize": {
					"w": 211,
					"h": 318
				}
			},
			"luobon3.png": {
				"frame": {
					"x": 1,
					"y": 1,
					"w": 239,
					"h": 330
				},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 239,
					"h": 330
				},
				"sourceSize": {
					"w": 239,
					"h": 330
				}
			}
		},
		"meta": {
			"app": "http://www.codeandweb.com/texturepacker",
			"version": "1.0",
			"image": "luobosn.png",
			"format": "RGBA8888",
			"size": {
				"w": 241,
				"h": 956
			},
			"scale": "1",
			"smartupdate": "$TexturePacker:SmartUpdate:5c6b7fc58bff121af918041f7ce46e8c:325669cb7f3def3d1041371b46b7fe00:f09ef7ef6dc65545381cce27b2ad2694$"
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
		"frames": {
			"dangong.png": {
				"frame": {
					"x": 1,
					"y": 488,
					"w": 372,
					"h": 160
				},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 372,
					"h": 160
				},
				"sourceSize": {
					"w": 372,
					"h": 160
				}
			},
			"dangongshen.png": {
				"frame": {
					"x": 1,
					"y": 335,
					"w": 307,
					"h": 123
				},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 307,
					"h": 123
				},
				"sourceSize": {
					"w": 307,
					"h": 123
				}
			},
			"gap.png": {
				"frame": {
					"x": 310,
					"y": 234,
					"w": 128,
					"h": 128
				},
				"rotated": false,
				"trimmed": true,
				"spriteSourceSize": {
					"x": 6,
					"y": 0,
					"w": 128,
					"h": 128
				},
				"sourceSize": {
					"w": 134,
					"h": 128
				}
			},
			"jihuo.png": {
				"frame": {
					"x": 1,
					"y": 1,
					"w": 307,
					"h": 332
				},
				"rotated": false,
				"trimmed": false,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 307,
					"h": 332
				},
				"sourceSize": {
					"w": 307,
					"h": 332
				}
			},
			"target-eye.png": {
				"frame": {
					"x": 310,
					"y": 364,
					"w": 123,
					"h": 122
				},
				"rotated": false,
				"trimmed": true,
				"spriteSourceSize": {
					"x": 4,
					"y": 4,
					"w": 123,
					"h": 122
				},
				"sourceSize": {
					"w": 130,
					"h": 130
				}
			},
			"zatuzi.png": {
				"frame": {
					"x": 310,
					"y": 1,
					"w": 158,
					"h": 231
				},
				"rotated": false,
				"trimmed": true,
				"spriteSourceSize": {
					"x": 0,
					"y": 0,
					"w": 158,
					"h": 231
				},
				"sourceSize": {
					"w": 161,
					"h": 231
				}
			}
		},
		"meta": {
			"app": "http://www.codeandweb.com/texturepacker",
			"version": "1.0",
			"image": "zatuzis.png",
			"format": "RGBA8888",
			"size": {
				"w": 469,
				"h": 649
			},
			"scale": "1",
			"smartupdate": "$TexturePacker:SmartUpdate:5ad5b629f945d2eea3c8eba3e62458c6:c404da8c7977abdfff3370a68a8119f2:29e63d9cac49cd19675a7fee1969bf2e$"
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function resolve(jsonFile, img) {
	  var mapTemp = {},
	      frames = jsonFile.frames,
	      mapdata;
	
	  Object.keys(frames).forEach(function (name) {
	    var item = frames[name],
	        frame = item.frame;
	
	    mapdata = new LBitmap(new LBitmapData(img, frame.x, frame.y, frame.w, frame.h));
	
	    mapTemp[name] = mapdata;
	  });
	  return getImg;
	
	  function getImg(name) {
	    return mapTemp[name] && mapTemp[name].clone();
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzYzY2I5NzdkNDA4MDE2ZWVkZGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHRwcm9qZWN0L25leHRwcm9qZWN0LmVudHJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0cHJvamVjdC9jc3MvaW5kZXgubGVzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2phdmFzY3JpcHQvZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vamF2YXNjcmlwdC91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dHByb2plY3QvanMvbG90dGVyeUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dHByb2plY3QvaW1ncy9sdW9ib3NuLmpzb24iLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHRwcm9qZWN0L2ltZ3MvemF0dXppcy5qc29uIiwid2VicGFjazovLy8uL3NyYy9uZXh0cHJvamVjdC9qcy9yZXNvbHZlU3ByaXRlU2hlZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBQ0EscUJBQVEsQ0FBUjs7QUFFQSxLQUFJLFdBQVcsb0JBQVEsQ0FBUixDQUFmO0FBQ0EsS0FBSSxRQUFRLG9CQUFRLENBQVIsQ0FBWjtBQUNBLEtBQUksZ0JBQWdCLG9CQUFRLENBQVIsQ0FBcEI7O0FBRUEsS0FBSSxTQUFRLEVBQVo7O0FBRUEsS0FBSSxXQUFXO0FBQ2IsZUFBWSxzQkFBVTtBQUNwQixTQUFJLFFBQUo7O0FBRUEsT0FBRSxVQUFGLEVBQWMsS0FBZCxDQUFvQixLQUFLLFlBQUwsQ0FBa0IsSUFBbEIs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QUFPLElBQVAsQ0FBWDtBQUFBLFNBQ0ksUUFBUSxLQUFLLEtBRGpCOztBQUdBLGVBQVUsSUFBSSxPQUFKLENBQVksSUFBSSxXQUFKLENBQWlCLEdBQWpCLEVBQXNCLE1BQU0sQ0FBNUIsRUFBK0IsTUFBTSxDQUFyQyxFQUF3QyxNQUFNLENBQTlDLEVBQWlELE1BQU0sQ0FBdkQsQ0FBWixDQUFWOztBQUVBLGFBQVEsSUFBUixJQUFnQixPQUFoQjtBQUNELElBUEQ7QUFRQSxVQUFPLE1BQVA7O0FBRUEsWUFBUyxNQUFULENBQWdCLElBQWhCLEVBQXFCO0FBQ25CLFlBQU8sUUFBUSxJQUFSLEtBQWlCLFFBQVEsSUFBUixFQUFjLEtBQWQsRUFBeEI7QUFDRDtBQUNGLEVBbEJELEMiLCJmaWxlIjoibmV4dHByb2plY3QuZW50cnkuMzYzY2I5NzdkNDA4MDE2ZWVkZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDM2M2NiOTc3ZDQwODAxNmVlZGRlXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnJlcXVpcmUoJy4vY3NzL2luZGV4Lmxlc3MnKTtcclxuXHJcbnZhciBkb21VdGlscyA9IHJlcXVpcmUoJy4uL2NvbW1vbi9qYXZhc2NyaXB0L2RvbS5qcycpO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi9jb21tb24vamF2YXNjcmlwdC91dGlscy5qcycpO1xyXG52YXIgbG90dGVyeUJ1dHRvbiA9IHJlcXVpcmUoJy4vanMvbG90dGVyeUJ1dHRvbi5qcycpO1xyXG5cclxudmFyICRzY29wZSA9e307XHJcblxyXG52YXIgYWN0aXZpdHkgPSB7XHJcbiAgYmluZEV2ZW50czogZnVuY3Rpb24oKXtcclxuICAgIHZhciBsYXN0V2luSDtcclxuXHJcbiAgICAkKCcucGxheUJ0bicpLmNsaWNrKHRoaXMuY2xpY2tQbGF5QnRuLmJpbmQodGhpcykpO1xyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJyxmdW5jdGlvbigpe1xyXG4gICAgICAkKCcub3BhY2l0eS1oaWRlJykucmVtb3ZlQ2xhc3MoJ29wYWNpdHktaGlkZScpLmFkZENsYXNzKCdvcGFjaXR5LXNob3cnKTtcclxuICAgICAgJCgnLnJlbWFpbi1yaXBwbGUnKS5hZGRDbGFzcygncmlwcGxlLWVmZmVjdCcpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjbGlja1BsYXlCdG46IGZ1bmN0aW9uKGUpe1xyXG4gICAgbG90dGVyeUJ1dHRvbi5wbGF5KCk7XHJcbiAgICAkKGUuY3VycmVudFRhcmdldCkuaGlkZSgpO1xyXG4gIH0sXHJcbiAgaW5pdFBhZ2U6IGZ1bmN0aW9uKCl7XHJcbiAgICBsb3R0ZXJ5QnV0dG9uLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlCdG4nKSx7XHJcbiAgICAgICAgJHNjb3BlOiAkc2NvcGVcclxuICAgICAgfSk7XHJcbiAgfSxcclxuICBzdGFydDogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuaW5pdFBhZ2UoKTtcclxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gIH1cclxufTtcclxuYWN0aXZpdHkuc3RhcnQoKTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25leHRwcm9qZWN0L25leHRwcm9qZWN0LmVudHJ5LmpzXG4gKiovIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL25leHRwcm9qZWN0L2Nzcy9pbmRleC5sZXNzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgY3JlYXRlSHRtbERvbTogKGZ1bmN0aW9uIGNyZWF0ZUh0bWwoKXtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24oaHRtbCl7XHJcbiAgICAgIHZhciB0ZW1wO1xyXG4gICAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgdGVtcCA9IGRpdi5jaGlsZHJlblswXTtcclxuICAgICAgZGl2LnJlbW92ZUNoaWxkKHRlbXApO1xyXG4gICAgICByZXR1cm4gdGVtcDtcclxuICAgIH1cclxuICB9KSgpLFxyXG4gIHJlcGxhY2VUZW1sYXRlOiBmdW5jdGlvbihzdHIsZGF0YSl7XHJcbiAgICB2YXIgcmVneCA9IG5ldyBSZWdFeHAoL3soLio/KX0vZyksXHJcbiAgICAgICAgdGVtcDtcclxuICAgIHdoaWxlKHRlbXAgPSByZWd4LmV4ZWMoc3RyKSl7XHJcbiAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHRlbXBbMF0sZGF0YVt0ZW1wWzFdXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RyO1xyXG4gIH0sXHJcbiAgYmluZEV2ZW50OiBmdW5jdGlvbihkb20sbmFtZSxmbil7XHJcbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLGZuLGZhbHNlKTtcclxuICB9LFxyXG4gIHVuQmluZEV2ZW50OiBmdW5jdGlvbihkb20sbmFtZSxmbil7XHJcbiAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLGZuLGZhbHNlKTtcclxuICB9LFxyXG4gIGdldFVybFBhcmFtOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIGtleSArIFwiPShbXiZdKikoJnwkKVwiLCBcImlcIik7XHJcbiAgICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgICAgaWYgKHIgIT0gbnVsbCkgcmV0dXJuIGRlY29kZVVSSShyWzJdKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBhc3NpZ246IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdGVtcCA9IGFyZ3VtZW50c1swXTtcclxuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgZm9yKHZhciBpPTAsbGVuPWFyZ3MubGVuZ3RoO2k8bGVuO2krKyl7XHJcbiAgICAgIHZhciBpdGVtID0gYXJnc1tpXTtcclxuICAgICAgZm9yKHZhciBwIGluIGl0ZW0pe1xyXG4gICAgICAgIGlmKGl0ZW0uaGFzT3duUHJvcGVydHkocCkpe1xyXG4gICAgICAgICAgdGVtcFtwXSA9IGl0ZW1bcF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGVtcDtcclxuICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb21tb24vamF2YXNjcmlwdC9kb20uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBuczogXCJcIixcclxuICBmb3JtYXROdW06IGZ1bmN0aW9uKGMsYml0Y291bnQpIHtcclxuICAgIHZhciBiID0gW1wiXCIsIFwiXCIsIFwiXCIsIFwiS1wiLCBcIldcIiwgXCJXXCIsIFwiV1wiLCBcIktXXCJdO1xyXG4gICAgdmFyIGEgPSB7XHJcbiAgICAgICAgSzogMTAwMCxcclxuICAgICAgICBXOiAxMDAwMCxcclxuICAgICAgICBLVzogMTAwMDAwMDBcclxuICAgIH07XHJcbiAgICB2YXIgZCwgZTtcclxuICAgIGMgKz0gXCJcIjtcclxuICAgIGlmICghYyB8fCBpc05hTihOdW1iZXIoYykpKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiMFwiXHJcbiAgICB9XHJcbiAgICBpZighIWJpdGNvdW50KXtcclxuICAgICAgICBpZihjLmxlbmd0aCA8PSBiaXRjb3VudClcclxuICAgICAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICBkID0gYy5sZW5ndGggPj0gOCA/IGJbN10gOiBiW2MubGVuZ3RoIC0gMV07XHJcbiAgICBlID0gZCA/IGMgLyBhW2RdIDogYztcclxuICAgIGlmICgvXlxcZCtcXC5cXGQrJC8udGVzdChlKSkge1xyXG4gICAgICAgLy8gZCArPSBcIitcIjtcclxuICAgICAgICBlID0gcGFyc2VJbnQoZSlcclxuICAgIH1cclxuICAgIGlmKGQgPT0gJ0snKXtcclxuICAgICAgICBkID0gICcwMDAnO1xyXG4gICAgfVxyXG4gICAgaWYoZCA9PSAnVycpe1xyXG4gICAgICAgIGQgPSAgJ+S4hysnO1xyXG4gICAgfVxyXG4gICAgaWYoZCA9PSAnS1cnKXtcclxuICAgICAgIGQgPSAn5Y2D5LiHKyc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZSArIGQ7XHJcbiAgfSxcclxuICBzZXRTdG9yYWdlOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHRoaXMubnMgKyAnX2JybycgKyBuYW1lO1xyXG4gICAgICAgIHRyeXtcclxuICAgICAgICAgICAgaWYodmFsID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xyXG4gICAgICAgIH1jYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gc2F2ZSBzdGF0ZScsZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICBnZXRTdG9yYWdlOiBmdW5jdGlvbiAobmFtZSxucykge1xyXG4gICAgICAgIHZhciBrZXkgPSB0aGlzLm5zICsgJ19icm8nICsgbmFtZSxcclxuICAgICAgICAgICAgZGF0YTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICB9Y2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIHJlYWQgc3RhdGUnLGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YSl7XHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICB9Y2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgLy8gSWdub3JlIGludmFsaWQgSlNPTi5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZUZvcm1hdDogZnVuY3Rpb24odGltZSxmb3JtYXQpe1xyXG4gICAgICAgIGlmKCF0aW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUodGltZSk7XHJcbiAgICAgICAgaWYoZGF0ZS50b1N0cmluZygpID09IFwiSW52YWxpZCBEYXRlXCIpXHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ3l5L21tL2RkIEhIOmlpOnNzJztcclxuICAgICAgICB2YXIgdGltZU1hcCA9IHtcclxuICAgICAgICAgICAgeXk6IGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgbW06IGRhdGUuZ2V0TW9udGgoKSArIDEsXHJcbiAgICAgICAgICAgIGRkOiBkYXRlLmdldERhdGUoKSxcclxuICAgICAgICAgICAgSEg6IGRhdGUuZ2V0SG91cnMoKSxcclxuICAgICAgICAgICAgaGg6IGRhdGUuZ2V0SG91cnMoKSxcclxuICAgICAgICAgICAgaWk6IGRhdGUuZ2V0TWludXRlcygpLFxyXG4gICAgICAgICAgICBzczogZGF0ZS5nZXRTZWNvbmRzKClcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKHRpbWVNYXAuSEggPiAxMSl7XHJcbiAgICAgICAgICAgIGlmKHRpbWVNYXAuSEggPiAxMilcclxuICAgICAgICAgICAgICAgIHRpbWVNYXAuaGggPSB0aW1lTWFwLkhIIC0gMTI7XHJcbiAgICAgICAgICAgIHRpbWVNYXAubnMgPSAnUE0nO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aW1lTWFwLm5zID0gJ0FNJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXQucmVwbGFjZSgvKHl5fG1tfGRkfEhIfGhofGlpfHNzfG5zKS9nLGZ1bmN0aW9uKGEpe1xyXG4gICAgICAgICAgdmFyIGRhdGEgPSB0aW1lTWFwW2FdICsgJyc7XHJcbiAgICAgICAgICBkYXRhID0gZGF0YS5sZW5ndGggPT0gMSA/ICcwJytkYXRhIDogZGF0YTtcclxuICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHJlcGxhY2VVcmxQYXJhbTogZnVuY3Rpb24gKHVybCxrZXkscmVwbGFjZVN0cixpc2FwcGVuZCkge1xyXG4gICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIig/Ol58JilcIiArIGtleSArIFwiPShbXiZdKikoJnwkKVwiLCBcImlcIik7XHJcbiAgICAgIHZhciBpbmRleCA9IHVybC5pbmRleE9mKCc/JyksXHJcbiAgICAgICAgICBvcmlVcmwgPSB1cmwsXHJcbiAgICAgICAgICBtYXRjaHM7XHJcbiAgICAgIGlmKGluZGV4ICE9IC0xKXtcclxuICAgICAgICB1cmwgPSB1cmwuc3Vic3RyKGluZGV4ICsgMSk7XHJcbiAgICAgICAgaWYobWF0Y2hzID0gdXJsLm1hdGNoKHJlZykpe1xyXG4gICAgICAgICAgdXJsID0gIG9yaVVybC5zdWJzdHIoMCxpbmRleCArIDEpICsgdXJsLnJlcGxhY2UobWF0Y2hzWzFdLHJlcGxhY2VTdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihpc2FwcGVuZCAmJiB1cmwuaW5kZXhPZihrZXkpID09IC0xKXtcclxuICAgICAgICBpZihpbmRleCA9PSAtMSlcclxuICAgICAgICAgICAgdXJsICs9ICc/JztcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHVybCArPSAnJic7XHJcbiAgICAgICAgdXJsICs9IGtleSArICc9JyArIHJlcGxhY2VTdHI7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHVybDtcclxuICB9LFxyXG4gIHRvRml4ZWQoZGF0YSxudW0saXNyb3VuZCl7XHJcbiAgICBpZihpc3JvdW5kKXtcclxuICAgICAgICBkYXRhID0gZGF0YSoxO1xyXG4gICAgICAgIGRhdGEudG9GaXhlZChudW0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgZGF0YSA9IGRhdGEgKyAnJztcclxuICAgICAgICB2YXIgZG90SW5kZXggPSBkYXRhLmluZGV4T2YoJy4nKSxcclxuICAgICAgICAgICAgZGVjaW1hbHMsIGludGVnO1xyXG5cclxuICAgICAgICBpZihkb3RJbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgaW50ZWcgPSBkYXRhLnN1YnN0cigwLGRvdEluZGV4KTtcclxuICAgICAgICAgICAgZGVjaW1hbHMgPSBkYXRhLnN1YnN0cihkb3RJbmRleCsxKTtcclxuXHJcbiAgICAgICAgICAgIGlmKGRlY2ltYWxzLmxlbmd0aCA+IG51bSl7XHJcbiAgICAgICAgICAgICAgICBkZWNpbWFscyA9IGRlY2ltYWxzLnN1YnN0cigwLG51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChpbnRlZyArICcuJyArIGRlY2ltYWxzKSoxO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGVjMmhleDogZnVuY3Rpb24oIG51bSApe1xyXG4gICAgaWYoIHR5cGVvZiBudW0gIT09ICd1bmRlZmluZWQnICl7XHJcbiAgICAgICAgcmV0dXJuIE51bWJlcihudW0pLnRvU3RyaW5nKDE2KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHVuaWNvZGUyQ2g6IGZ1bmN0aW9uKHN0cil7XHJcbiAgICBpZighc3RyKVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGlmKC8mI1xcZCs7Ly50ZXN0KHN0cikpe1xyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZyxmdW5jdGlvbihhLGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gJyV1JyArIHNlbGYuZGVjMmhleChiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdW5lc2NhcGUoc3RyKTtcclxuICAgIH1lbHNlXHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICB9LFxyXG4vLyBaZXB0by5jb29raWUgcGx1Z2luXHJcbi8vXHJcbi8vIENvcHlyaWdodCAoYykgMjAxMCwgMjAxMlxyXG4vLyBAYXV0aG9yIEtsYXVzIEhhcnRsIChzdGlsYnVlcm8uZGUpXHJcbi8vIEBhdXRob3IgRGFuaWVsIExhY3kgKGRhbmllbGxhY3kuY29tKVxyXG4vL1xyXG4vLyBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgYW5kIEdQTCBsaWNlbnNlczpcclxuLy8gaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuLy8gaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzL2dwbC5odG1sXHJcbiAgY29va2llIDogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgZGF5cywgdGltZSwgcmVzdWx0LCBkZWNvZGVcclxuXHJcbiAgICAgICAgLy8gQSBrZXkgYW5kIHZhbHVlIHdlcmUgZ2l2ZW4uIFNldCBjb29raWUuXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIFN0cmluZyh2YWx1ZSkgIT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcclxuICAgICAgICAgICAgLy8gRW5mb3JjZSBvYmplY3RcclxuICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBvcHRpb25zKVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIG9wdGlvbnMuZXhwaXJlcyA9IC0xXHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZXhwaXJlcyA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGRheXMgPSAob3B0aW9ucy5leHBpcmVzICogMjQgKiA2MCAqIDYwICogMTAwMClcclxuICAgICAgICAgICAgICAgIHRpbWUgPSBvcHRpb25zLmV4cGlyZXMgPSBuZXcgRGF0ZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgdGltZS5zZXRUaW1lKHRpbWUuZ2V0VGltZSgpICsgZGF5cylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKGRvY3VtZW50LmNvb2tpZSA9IFtcclxuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrZXkpLCAnPScsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnJhdyA/IHZhbHVlIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZXhwaXJlcyA/ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpIDogJycsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBhdGggPyAnOyBwYXRoPScgKyBvcHRpb25zLnBhdGggOiAnJyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZG9tYWluID8gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbiA6ICcnLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zZWN1cmUgPyAnOyBzZWN1cmUnIDogJydcclxuICAgICAgICAgICAgXS5qb2luKCcnKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEtleSBhbmQgcG9zc2libHkgb3B0aW9ucyBnaXZlbiwgZ2V0IGNvb2tpZVxyXG4gICAgICAgIG9wdGlvbnMgPSB2YWx1ZSB8fCB7fVxyXG5cclxuICAgICAgICBkZWNvZGUgPSBvcHRpb25zLnJhdyA/IGZ1bmN0aW9uIChzKSB7IHJldHVybiBzIH0gOiBkZWNvZGVVUklDb21wb25lbnRcclxuXHJcbiAgICAgICAgcmV0dXJuIChyZXN1bHQgPSBuZXcgUmVnRXhwKCcoPzpefDsgKScgKyBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9KFteO10qKScpLmV4ZWMoZG9jdW1lbnQuY29va2llKSkgPyBkZWNvZGUocmVzdWx0WzFdKSA6IG51bGxcclxuICAgIH0sXHJcbiAgICBmb3JtYXRBbW91bnQ6IGZ1bmN0aW9uKGFtb3VudCl7XHJcbiAgICAgICAgIGlmKCFhbW91bnQpXHJcbiAgICAgICAgICAgICByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgIGFtb3VudCArPSAnJztcclxuICAgICAgICAgdmFyIGxlbiA9IGFtb3VudC5sZW5ndGgsXHJcbiAgICAgICAgICAgICByZXQgPSAnJztcclxuXHJcbiAgICAgICAgIGlmKGxlbiA8PSAzKVxyXG4gICAgICAgICAgICAgcmV0dXJuIGFtb3VudDtcclxuXHJcbiAgICAgICAgIGZvcih2YXIgaT0xOyBhbW91bnQubGVuZ3RoID4gMDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIHNwbGl0SW5kZXggPSBhbW91bnQubGVuZ3RoIC0gMztcclxuICAgICAgICAgICAgc3BsaXRJbmRleCA9IHNwbGl0SW5kZXggPCAwID8gMCA6IHNwbGl0SW5kZXg7XHJcbiAgICAgICAgICAgIHJldCA9IGFtb3VudC5zdWJzdHIoc3BsaXRJbmRleCwzKSArIHJldDtcclxuICAgICAgICAgICAgcmV0ID0gJywnICsgcmV0O1xyXG4gICAgICAgICAgICBhbW91bnQgPSBhbW91bnQuc3Vic3RyaW5nKDAsc3BsaXRJbmRleCk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgcmV0ID0gcmV0LnN1YnN0cmluZygxKTtcclxuICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbW1vbi9qYXZhc2NyaXB0L3V0aWxzLmpzXG4gKiovIiwidmFyIGx1b2Jvc0pzb24gPSByZXF1aXJlKFwiLi4vaW1ncy9sdW9ib3NuLmpzb25cIik7XHJcbnZhciB6YXR1emlzSnNvbiA9IHJlcXVpcmUoXCIuLi9pbWdzL3phdHV6aXMuanNvblwiKTtcclxudmFyIHJlc29sdmVTaGVldCA9IHJlcXVpcmUoXCIuL3Jlc29sdmVTcHJpdGVTaGVldC5qc1wiKTtcclxuXHJcbmZ1bmN0aW9uIEltZ1VybChkYXRhKXtcclxuICByZXR1cm4gbmV3IExCaXRtYXAobmV3IExCaXRtYXBEYXRhKGRhdGEpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q2VudGVyKHRhcmdldCwgeCwgeSl7XHJcbiAgaWYoeCAhPSBudWxsKVxyXG4gICAgdGFyZ2V0LnggPSB4IC0gdGFyZ2V0LmdldFdpZHRoKCkgLyAyO1xyXG4gIGlmKHkgIT0gbnVsbClcclxuICAgIHRhcmdldC55ID0geSAtIHRhcmdldC5nZXRIZWlnaHQoKSAvIDI7XHJcbn1cclxudmFyIGxvdHRlcnlCdXR0b24gPSB7XHJcbiAgdGFyZ2V0SWQ6IFwiZ2FtZS1jYW52YXNcIixcclxuICByb3RhdGVBbmdlbDogMCxcclxuICBzdGVwOiAwLjUsXHJcbiAgZGlyZWN0aW9uOiAxLFxyXG4gIGR1cmF0aW9uOiA1MDAsXHJcbiAgaW5pdDogZnVuY3Rpb24oYnV0dG9uLG9wdGlvbnMpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQuZXh0ZW5kKHRoaXMsb3B0aW9ucyk7XHJcblxyXG4gICAgaW5pdCgxNix0aGlzLnRhcmdldElkLDEwODAsMTE4MCxmdW5jdGlvbigpe1xyXG4gICAgICBzZWxmLm1haW4oKTtcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgbWFpbjogZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbWdEYXRhID0gW1xyXG4gICAgICAgIHtuYW1lOidsdW9ib3MnLHBhdGg6Jy4vaW1ncy9sdW9ib3Mud2VicCd9LFxyXG4gICAgICAgIHtuYW1lOid6YXR1emlzJyxwYXRoOiAnLi9pbWdzL3phdHV6aXMucG5nJ31cclxuICAgICAgXSxcclxuICAgICAgbG9hZGluZ0xheWVyID0gbmV3IExvYWRpbmdTYW1wbGUzKCksXHJcbiAgICAgIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIExHbG9iYWwuc3RhZ2VTY2FsZSA9IExTdGFnZVNjYWxlTW9kZS5FWEFDVF9GSVQ7XHJcbiAgICAvLyBMU3lzdGVtLnNjcmVlbihMU3RhZ2UuRlVMTF9TQ1JFRU4pO1xyXG4gICAgTEdsb2JhbC5wcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgLy8gTEdsb2JhbC5zdGFnZVNjYWxlID0gTFN0YWdlU2NhbGVNb2RlLlNIT1dfQUxMO1xyXG4gICAgdmFyIHdpblcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG4gICAgdmFyIHJhdGlvID0gd2luVyAvIDEwODA7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdO1xyXG4gICAgLy8gY2FudmFzLnN0eWxlLndpZHRoID0gd2luVyArICdweCc7XHJcbiAgICAvLyBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gcmF0aW8gKiAxMTgwICsgJ3B4JztcclxuICAgIExHbG9iYWwucmVzaXplKHdpblcscmF0aW8gKiAxMTgwKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFyZ2V0SWQpLnN0eWxlLmhlaWdodCA9IHJhdGlvICogMTE4MCArICdweCc7XHJcblxyXG4gICAgTExvYWRNYW5hZ2UubG9hZChcclxuICAgICAgaW1nRGF0YSxcclxuICAgICAgZnVuY3Rpb24ocHJvZ3Jlc3Mpe1xyXG4gICAgICAgIGxvYWRpbmdMYXllci5zZXRQcm9ncmVzcyhwcm9ncmVzcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGZ1bmN0aW9uKHJlc3VsdCl7XHJcbiAgICAgICAgcmVtb3ZlQ2hpbGQobG9hZGluZ0xheWVyKTtcclxuICAgICAgICBsb2FkaW5nTGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIHNlbGYuZ2FtZUluaXQocmVzdWx0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfSxcclxuICBnYW1lSW5pdDogZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgIHZhciBsdW9ib3MgPSByZXNvbHZlU2hlZXQobHVvYm9zSnNvbixyZXN1bHQubHVvYm9zKSxcclxuICAgICAgICByYWJiaXRzID0gcmVzb2x2ZVNoZWV0KHphdHV6aXNKc29uLHJlc3VsdC56YXR1emlzKSxcclxuICAgICAgICBsMSA9IGx1b2JvcygnbHVvYm9uMS5wbmcnKSxcclxuICAgICAgICBsMiA9IGx1b2JvcygnbHVvYm9uMi5wbmcnKSxcclxuICAgICAgICBsMyA9IGx1b2JvcygnbHVvYm9uMy5wbmcnKSxcclxuICAgICAgICB0YXJnZXRFeWUgPSByYWJiaXRzKCd0YXJnZXQtZXllLnBuZycpO1xyXG5cclxuICAgIHRoaXMuYmFja0xheWVyID0gbmV3IExTcHJpdGUoKTtcclxuICAgIHRoaXMubWFpbkxheWVyID0gbmV3IExTcHJpdGUoKTtcclxuICAgIHRoaXMuc2hvb3RMYXllciA9IG5ldyBMU3ByaXRlKCk7XHJcblxyXG4gICAgdGhpcy5iYWNrTGF5ZXIubmFtZSA9ICdiYWNrTGF5ZXInO1xyXG5cclxuICAgIGFkZENoaWxkKHRoaXMuYmFja0xheWVyKTtcclxuICAgIGFkZENoaWxkKHRoaXMubWFpbkxheWVyKTtcclxuICAgIGFkZENoaWxkKHRoaXMuc2hvb3RMYXllcik7XHJcblxyXG4gICAgbDIueCA9IExHbG9iYWwud2lkdGggLyAyIC0gbDIuZ2V0V2lkdGgoKS8yO1xyXG4gICAgbDIueSA9IDA7XHJcblxyXG4gICAgbDEueCA9IExHbG9iYWwud2lkdGggLyA1IC0gbDEuZ2V0V2lkdGgoKS8yO1xyXG4gICAgbDEueSA9IDEwMDtcclxuXHJcbiAgICBsMy54ID0gTEdsb2JhbC53aWR0aCAqIDQgLyA1IC0gbDMuZ2V0V2lkdGgoKS8yO1xyXG4gICAgbDMueSA9IDkwO1xyXG5cclxuICAgIHRoaXMuYWRkVGFyZ2V0RXllKHRhcmdldEV5ZSwgbDEueCwgMTQwICsgbDIuZ2V0SGVpZ2h0KCkvMiAtIHRhcmdldEV5ZS5nZXRIZWlnaHQoKS8yKTtcclxuICAgIHRoaXMuYWRkU2hvb3RlcihyYWJiaXRzKTtcclxuICAgIHRoaXMuYmFja0xheWVyLmFkZENoaWxkKGwxKTtcclxuICAgIHRoaXMuYmFja0xheWVyLmFkZENoaWxkKGwyKTtcclxuICAgIHRoaXMuYmFja0xheWVyLmFkZENoaWxkKGwzKTtcclxuXHJcbiAgICB0aGlzLmJhY2tMYXllci5hZGRFdmVudExpc3RlbmVyKExFdmVudC5FTlRFUl9GUkFNRSx0aGlzLm9uRnJhbWUuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmxhc3RUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSgpO1xyXG4gICAgdGhpcy5sMSA9IGwxO1xyXG4gIH0sXHJcbiAgYWRkVGFyZ2V0RXllOiBmdW5jdGlvbih0YXJnZXQsIHgsIHkpe1xyXG4gICAgdmFyIHRhcmdldEV5ZSA9IG5ldyBMU3ByaXRlKCk7XHJcblxyXG4gICAgdGFyZ2V0RXllLmFkZENoaWxkKHRhcmdldCk7XHJcblxyXG4gICAgdGFyZ2V0RXllLnggPSB4O1xyXG4gICAgdGFyZ2V0RXllLnkgPSB5O1xyXG4gICAgdGFyZ2V0RXllLm5hbWUgPSAndGFyZ2V0LWV5ZSc7XHJcbiAgICB0YXJnZXRFeWUucm90YXRleCA9IExHbG9iYWwud2lkdGggLyAyIC0gdGFyZ2V0LmdldFdpZHRoKCkvMjtcclxuICAgIHRhcmdldEV5ZS5yb3RhdGV5ID0gNTMwO1xyXG5cclxuICAgIHRoaXMubWFpbkxheWVyLmFkZENoaWxkKHRhcmdldEV5ZSk7XHJcbiAgICB0aGlzLnRhcmdldEV5ZSA9IHRhcmdldEV5ZTtcclxuICB9LFxyXG4gIGFkZFNob290ZXI6IGZ1bmN0aW9uKGdldEltZyl7XHJcbiAgICB2YXIgZGVhZG1hbiA9IGdldEltZygnZGFuZ29uZy5wbmcnKSxcclxuICAgICAgICByb3BlID0gZ2V0SW1nKCdkYW5nb25nc2hlbi5wbmcnKSxcclxuICAgICAgICBhY3RpdmVTaG9vdCA9IGdldEltZygnamlodW8ucG5nJyksXHJcbiAgICAgICAgemF0dXppID0gZ2V0SW1nKCd6YXR1emkucG5nJyk7XHJcblxyXG5cclxuICAgIHphdHV6aS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICBzZXRDZW50ZXIoZGVhZG1hbiwgTEdsb2JhbC53aWR0aCAvIDIsIDgzMik7XHJcbiAgICBzZXRDZW50ZXIocm9wZSwgTEdsb2JhbC53aWR0aCAvIDIsIDg1MCk7XHJcbiAgICBzZXRDZW50ZXIoYWN0aXZlU2hvb3QsIExHbG9iYWwud2lkdGggLyAyLCA5NTMpO1xyXG4gICAgdGhpcy5iYWNrTGF5ZXIuYWRkQ2hpbGQoZGVhZG1hbik7XHJcbiAgICB0aGlzLm1haW5MYXllci5hZGRDaGlsZChyb3BlKTtcclxuICAgIHRoaXMubWFpbkxheWVyLmFkZENoaWxkKHphdHV6aSk7XHJcbiAgICB0aGlzLnNob290TGF5ZXIuYWRkQ2hpbGQoYWN0aXZlU2hvb3QpO1xyXG5cclxuICAgIHRoaXMucm9wZSA9IHJvcGU7XHJcbiAgICB0aGlzLmFjdGl2ZVNob290ID0gYWN0aXZlU2hvb3Q7XHJcbiAgICB0aGlzLnphdHV6aSA9IHphdHV6aTtcclxuICAgIHJvcGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgLy8gdGhpcy5zaG9vdExheWVyLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBMTW91c2VFdmVudENvbnRhaW5lci5zZXQoTE1vdXNlRXZlbnQuTU9VU0VfVVAsdHJ1ZSk7XHJcbiAgICB0aGlzLmJhY2tMYXllci5hZGRFdmVudExpc3RlbmVyKExNb3VzZUV2ZW50Lk1PVVNFX1VQICx0aGlzLnNob290LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcbiAgdXBkYXRlOiBmdW5jdGlvbihwYXNzZWQpe1xyXG5cclxuICAgIHRoaXMucm90YXRlQW5nZWwgKz0gdGhpcy5zdGVwICogdGhpcy5kaXJlY3Rpb247Ly8gKiAocGFzc2VkIC90aGlzLmR1cmF0aW9uKTtcclxuXHJcbiAgICBpZih0aGlzLnJvdGF0ZUFuZ2VsID49IDgwKXtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAtMTtcclxuICAgIH1lbHNlIGlmKHRoaXMucm90YXRlQW5nZWwgPD0gMCl7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gMTtcclxuICAgIH1cclxuICB9LFxyXG4gIGRyYXc6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnRhcmdldEV5ZS5yb3RhdGUgPSB0aGlzLnJvdGF0ZUFuZ2VsO1xyXG4gIH0sXHJcbiAgb25GcmFtZTogZnVuY3Rpb24oKXtcclxuICAgIHZhciBub3cgPSB0aGlzLmdldEN1cnJlbnRUaW1lKCksXHJcbiAgICAgICAgcGFzc2VkID0gbm93IC0gdGhpcy5sYXN0VGltZTtcclxuICAgIHRoaXMudXBkYXRlKHBhc3NlZCk7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuXHJcbiAgICB0aGlzLmxhc3RUaW1lID0gbm93O1xyXG4gIH0sXHJcbiAgZ2V0Q3VycmVudFRpbWU6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gK25ldyBEYXRlO1xyXG4gIH0sXHJcbiAgcGxheTogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMucm9wZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob290TGF5ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgfSxcclxuICBzaG9vdDogZnVuY3Rpb24oKXtcclxuICAgIHNldENlbnRlcih0aGlzLnphdHV6aSwgdGhpcy5sMS54LCB0aGlzLmwxLnkpO1xyXG4gICAgdGhpcy56YXR1emkudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnJvcGUudmlzaWJsZSA9IHRydWU7XHJcbiAgICB0aGlzLnNob290TGF5ZXIudmlzaWJsZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGxvdHRlcnlCdXR0b247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dHByb2plY3QvanMvbG90dGVyeUJ1dHRvbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImZyYW1lc1wiOiB7XG5cdFx0XCJsdW9ib24xLnBuZ1wiOiB7XG5cdFx0XHRcImZyYW1lXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDEsXG5cdFx0XHRcdFwieVwiOiAzMzMsXG5cdFx0XHRcdFwid1wiOiAyMjQsXG5cdFx0XHRcdFwiaFwiOiAzMDJcblx0XHRcdH0sXG5cdFx0XHRcInJvdGF0ZWRcIjogZmFsc2UsXG5cdFx0XHRcInRyaW1tZWRcIjogZmFsc2UsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogMCxcblx0XHRcdFx0XCJ5XCI6IDAsXG5cdFx0XHRcdFwid1wiOiAyMjQsXG5cdFx0XHRcdFwiaFwiOiAzMDJcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMjI0LFxuXHRcdFx0XHRcImhcIjogMzAyXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcImx1b2JvbjIucG5nXCI6IHtcblx0XHRcdFwiZnJhbWVcIjoge1xuXHRcdFx0XHRcInhcIjogMSxcblx0XHRcdFx0XCJ5XCI6IDYzNyxcblx0XHRcdFx0XCJ3XCI6IDIxMSxcblx0XHRcdFx0XCJoXCI6IDMxOFxuXHRcdFx0fSxcblx0XHRcdFwicm90YXRlZFwiOiBmYWxzZSxcblx0XHRcdFwidHJpbW1lZFwiOiBmYWxzZSxcblx0XHRcdFwic3ByaXRlU291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAwLFxuXHRcdFx0XHRcInlcIjogMCxcblx0XHRcdFx0XCJ3XCI6IDIxMSxcblx0XHRcdFx0XCJoXCI6IDMxOFxuXHRcdFx0fSxcblx0XHRcdFwic291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwid1wiOiAyMTEsXG5cdFx0XHRcdFwiaFwiOiAzMThcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwibHVvYm9uMy5wbmdcIjoge1xuXHRcdFx0XCJmcmFtZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAxLFxuXHRcdFx0XHRcInlcIjogMSxcblx0XHRcdFx0XCJ3XCI6IDIzOSxcblx0XHRcdFx0XCJoXCI6IDMzMFxuXHRcdFx0fSxcblx0XHRcdFwicm90YXRlZFwiOiBmYWxzZSxcblx0XHRcdFwidHJpbW1lZFwiOiBmYWxzZSxcblx0XHRcdFwic3ByaXRlU291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAwLFxuXHRcdFx0XHRcInlcIjogMCxcblx0XHRcdFx0XCJ3XCI6IDIzOSxcblx0XHRcdFx0XCJoXCI6IDMzMFxuXHRcdFx0fSxcblx0XHRcdFwic291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwid1wiOiAyMzksXG5cdFx0XHRcdFwiaFwiOiAzMzBcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdFwibWV0YVwiOiB7XG5cdFx0XCJhcHBcIjogXCJodHRwOi8vd3d3LmNvZGVhbmR3ZWIuY29tL3RleHR1cmVwYWNrZXJcIixcblx0XHRcInZlcnNpb25cIjogXCIxLjBcIixcblx0XHRcImltYWdlXCI6IFwibHVvYm9zbi5wbmdcIixcblx0XHRcImZvcm1hdFwiOiBcIlJHQkE4ODg4XCIsXG5cdFx0XCJzaXplXCI6IHtcblx0XHRcdFwid1wiOiAyNDEsXG5cdFx0XHRcImhcIjogOTU2XG5cdFx0fSxcblx0XHRcInNjYWxlXCI6IFwiMVwiLFxuXHRcdFwic21hcnR1cGRhdGVcIjogXCIkVGV4dHVyZVBhY2tlcjpTbWFydFVwZGF0ZTo1YzZiN2ZjNThiZmYxMjFhZjkxODA0MWY3Y2U0NmU4YzozMjU2NjljYjdmM2RlZjNkMTA0MTM3MWI0NmI3ZmUwMDpmMDllZjdlZjZkYzY1NTQ1MzgxY2NlMjdiMmFkMjY5NCRcIlxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbmV4dHByb2plY3QvaW1ncy9sdW9ib3NuLmpzb25cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJmcmFtZXNcIjoge1xuXHRcdFwiZGFuZ29uZy5wbmdcIjoge1xuXHRcdFx0XCJmcmFtZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAxLFxuXHRcdFx0XHRcInlcIjogNDg4LFxuXHRcdFx0XHRcIndcIjogMzcyLFxuXHRcdFx0XHRcImhcIjogMTYwXG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IGZhbHNlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDAsXG5cdFx0XHRcdFwieVwiOiAwLFxuXHRcdFx0XHRcIndcIjogMzcyLFxuXHRcdFx0XHRcImhcIjogMTYwXG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDM3Mixcblx0XHRcdFx0XCJoXCI6IDE2MFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJkYW5nb25nc2hlbi5wbmdcIjoge1xuXHRcdFx0XCJmcmFtZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAxLFxuXHRcdFx0XHRcInlcIjogMzM1LFxuXHRcdFx0XHRcIndcIjogMzA3LFxuXHRcdFx0XHRcImhcIjogMTIzXG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IGZhbHNlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDAsXG5cdFx0XHRcdFwieVwiOiAwLFxuXHRcdFx0XHRcIndcIjogMzA3LFxuXHRcdFx0XHRcImhcIjogMTIzXG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDMwNyxcblx0XHRcdFx0XCJoXCI6IDEyM1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJnYXAucG5nXCI6IHtcblx0XHRcdFwiZnJhbWVcIjoge1xuXHRcdFx0XHRcInhcIjogMzEwLFxuXHRcdFx0XHRcInlcIjogMjM0LFxuXHRcdFx0XHRcIndcIjogMTI4LFxuXHRcdFx0XHRcImhcIjogMTI4XG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IHRydWUsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogNixcblx0XHRcdFx0XCJ5XCI6IDAsXG5cdFx0XHRcdFwid1wiOiAxMjgsXG5cdFx0XHRcdFwiaFwiOiAxMjhcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMTM0LFxuXHRcdFx0XHRcImhcIjogMTI4XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcImppaHVvLnBuZ1wiOiB7XG5cdFx0XHRcImZyYW1lXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDEsXG5cdFx0XHRcdFwieVwiOiAxLFxuXHRcdFx0XHRcIndcIjogMzA3LFxuXHRcdFx0XHRcImhcIjogMzMyXG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IGZhbHNlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDAsXG5cdFx0XHRcdFwieVwiOiAwLFxuXHRcdFx0XHRcIndcIjogMzA3LFxuXHRcdFx0XHRcImhcIjogMzMyXG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDMwNyxcblx0XHRcdFx0XCJoXCI6IDMzMlxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJ0YXJnZXQtZXllLnBuZ1wiOiB7XG5cdFx0XHRcImZyYW1lXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDMxMCxcblx0XHRcdFx0XCJ5XCI6IDM2NCxcblx0XHRcdFx0XCJ3XCI6IDEyMyxcblx0XHRcdFx0XCJoXCI6IDEyMlxuXHRcdFx0fSxcblx0XHRcdFwicm90YXRlZFwiOiBmYWxzZSxcblx0XHRcdFwidHJpbW1lZFwiOiB0cnVlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDQsXG5cdFx0XHRcdFwieVwiOiA0LFxuXHRcdFx0XHRcIndcIjogMTIzLFxuXHRcdFx0XHRcImhcIjogMTIyXG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDEzMCxcblx0XHRcdFx0XCJoXCI6IDEzMFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJ6YXR1emkucG5nXCI6IHtcblx0XHRcdFwiZnJhbWVcIjoge1xuXHRcdFx0XHRcInhcIjogMzEwLFxuXHRcdFx0XHRcInlcIjogMSxcblx0XHRcdFx0XCJ3XCI6IDE1OCxcblx0XHRcdFx0XCJoXCI6IDIzMVxuXHRcdFx0fSxcblx0XHRcdFwicm90YXRlZFwiOiBmYWxzZSxcblx0XHRcdFwidHJpbW1lZFwiOiB0cnVlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDAsXG5cdFx0XHRcdFwieVwiOiAwLFxuXHRcdFx0XHRcIndcIjogMTU4LFxuXHRcdFx0XHRcImhcIjogMjMxXG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDE2MSxcblx0XHRcdFx0XCJoXCI6IDIzMVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XCJtZXRhXCI6IHtcblx0XHRcImFwcFwiOiBcImh0dHA6Ly93d3cuY29kZWFuZHdlYi5jb20vdGV4dHVyZXBhY2tlclwiLFxuXHRcdFwidmVyc2lvblwiOiBcIjEuMFwiLFxuXHRcdFwiaW1hZ2VcIjogXCJ6YXR1emlzLnBuZ1wiLFxuXHRcdFwiZm9ybWF0XCI6IFwiUkdCQTg4ODhcIixcblx0XHRcInNpemVcIjoge1xuXHRcdFx0XCJ3XCI6IDQ2OSxcblx0XHRcdFwiaFwiOiA2NDlcblx0XHR9LFxuXHRcdFwic2NhbGVcIjogXCIxXCIsXG5cdFx0XCJzbWFydHVwZGF0ZVwiOiBcIiRUZXh0dXJlUGFja2VyOlNtYXJ0VXBkYXRlOjVhZDViNjI5Zjk0NWQyZWVhM2M4ZWJhM2U2MjQ1OGM2OmM0MDRkYThjNzk3N2FiZGZmZjMzNzBhNjhhODExOWYyOjI5ZTYzZDljYWM0OWNkMTk2NzVhN2ZlZTE5NjliZjJlJFwiXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9uZXh0cHJvamVjdC9pbWdzL3phdHV6aXMuanNvblxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVzb2x2ZShqc29uRmlsZSxpbWcpe1xyXG4gIHZhciBtYXBUZW1wID0ge30sXHJcbiAgICAgIGZyYW1lcyA9IGpzb25GaWxlLmZyYW1lcyxcclxuICAgICAgbWFwZGF0YTtcclxuXHJcbiAgT2JqZWN0LmtleXMoZnJhbWVzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgdmFyIGl0ZW0gPSBmcmFtZXNbbmFtZV0sXHJcbiAgICAgICAgZnJhbWUgPSBpdGVtLmZyYW1lO1xyXG5cclxuICAgIG1hcGRhdGEgPSBuZXcgTEJpdG1hcChuZXcgTEJpdG1hcERhdGEgKGltZywgZnJhbWUueCwgZnJhbWUueSwgZnJhbWUudywgZnJhbWUuaCkpO1xyXG5cclxuICAgIG1hcFRlbXBbbmFtZV0gPSBtYXBkYXRhO1xyXG4gIH0pO1xyXG4gIHJldHVybiBnZXRJbWc7XHJcblxyXG4gIGZ1bmN0aW9uIGdldEltZyhuYW1lKXtcclxuICAgIHJldHVybiBtYXBUZW1wW25hbWVdICYmIG1hcFRlbXBbbmFtZV0uY2xvbmUoKTtcclxuICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uZXh0cHJvamVjdC9qcy9yZXNvbHZlU3ByaXRlU2hlZXQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9