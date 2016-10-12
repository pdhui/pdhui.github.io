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
	__webpack_require__(2);
	
	var domUtils = __webpack_require__(3);
	var utils = __webpack_require__(4);
	var lotteryButton = __webpack_require__(5);
	
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

	// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var luobosJson = __webpack_require__(6);
	var zatuzisJson = __webpack_require__(7);
	var resolveSheet = __webpack_require__(8);
	
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWEzMzY3ZWVjNWI1MzFjZWIxOWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHRwcm9qZWN0L25leHRwcm9qZWN0LmVudHJ5LmpzIiwid2VicGFjazovLy8uL34vQGZseW1lL21vZGFsZGlhbG9nL2xpYi9tYWluLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dHByb2plY3QvY3NzL2luZGV4Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9qYXZhc2NyaXB0L2RvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2phdmFzY3JpcHQvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHRwcm9qZWN0L2pzL2xvdHRlcnlCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHRwcm9qZWN0L2ltZ3MvbHVvYm9zbi5qc29uIiwid2VicGFjazovLy8uL3NyYy9uZXh0cHJvamVjdC9pbWdzL3phdHV6aXMuanNvbiIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dHByb2plY3QvanMvcmVzb2x2ZVNwcml0ZVNoZWV0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUNBLHFCQUFRLENBQVI7QUFDQSxxQkFBUSxDQUFSOztBQUVBLEtBQUksV0FBVyxvQkFBUSxDQUFSLENBQWY7QUFDQSxLQUFJLFFBQVEsb0JBQVEsQ0FBUixDQUFaO0FBQ0EsS0FBSSxnQkFBZ0Isb0JBQVEsQ0FBUixDQUFwQjs7QUFFQSxLQUFJLFNBQVEsRUFBWjs7QUFFQSxLQUFJLFdBQVc7QUFDYixlQUFZLHNCQUFVO0FBQ3BC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Sjs7QUFJQSxVQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLE9BQXBCLENBQTRCLFVBQVMsSUFBVCxFQUFjO0FBQ3hDLFNBQUksT0FBTyxPQUFPLElBQVAsQ0FBWDtBQUFBLFNBQ0ksUUFBUSxLQUFLLEtBRGpCOztBQUdBLGVBQVUsSUFBSSxPQUFKLENBQVksSUFBSSxXQUFKLENBQWlCLEdBQWpCLEVBQXNCLE1BQU0sQ0FBNUIsRUFBK0IsTUFBTSxDQUFyQyxFQUF3QyxNQUFNLENBQTlDLEVBQWlELE1BQU0sQ0FBdkQsQ0FBWixDQUFWOztBQUVBLGFBQVEsSUFBUixJQUFnQixPQUFoQjtBQUNELElBUEQ7QUFRQSxVQUFPLE1BQVA7O0FBRUEsWUFBUyxNQUFULENBQWdCLElBQWhCLEVBQXFCO0FBQ25CLFlBQU8sUUFBUSxJQUFSLEtBQWlCLFFBQVEsSUFBUixFQUFjLEtBQWQsRUFBeEI7QUFDRDtBQUNGLEVBbEJELEMiLCJmaWxlIjoibmV4dHByb2plY3QuZW50cnkuOWEzMzY3ZWVjNWI1MzFjZWIxOWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDlhMzM2N2VlYzViNTMxY2ViMTlhXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnJlcXVpcmUoJ0BmbHltZS9tb2RhbGRpYWxvZy9saWIvbWFpbi5jc3MnKTtcclxucmVxdWlyZSgnLi9jc3MvaW5kZXgubGVzcycpO1xyXG5cclxudmFyIGRvbVV0aWxzID0gcmVxdWlyZSgnLi4vY29tbW9uL2phdmFzY3JpcHQvZG9tLmpzJyk7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL2NvbW1vbi9qYXZhc2NyaXB0L3V0aWxzLmpzJyk7XHJcbnZhciBsb3R0ZXJ5QnV0dG9uID0gcmVxdWlyZSgnLi9qcy9sb3R0ZXJ5QnV0dG9uLmpzJyk7XHJcblxyXG52YXIgJHNjb3BlID17fTtcclxuXHJcbnZhciBhY3Rpdml0eSA9IHtcclxuICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGxhc3RXaW5IO1xyXG5cclxuICAgICQoJy5wbGF5QnRuJykuY2xpY2sodGhpcy5jbGlja1BsYXlCdG4uYmluZCh0aGlzKSk7XHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJy5vcGFjaXR5LWhpZGUnKS5yZW1vdmVDbGFzcygnb3BhY2l0eS1oaWRlJykuYWRkQ2xhc3MoJ29wYWNpdHktc2hvdycpO1xyXG4gICAgICAkKCcucmVtYWluLXJpcHBsZScpLmFkZENsYXNzKCdyaXBwbGUtZWZmZWN0Jyk7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNsaWNrUGxheUJ0bjogZnVuY3Rpb24oZSl7XHJcbiAgICBsb3R0ZXJ5QnV0dG9uLnBsYXkoKTtcclxuICAgICQoZS5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XHJcbiAgfSxcclxuICBpbml0UGFnZTogZnVuY3Rpb24oKXtcclxuICAgIGxvdHRlcnlCdXR0b24uaW5pdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheUJ0bicpLHtcclxuICAgICAgICAkc2NvcGU6ICRzY29wZVxyXG4gICAgICB9KTtcclxuICB9LFxyXG4gIHN0YXJ0OiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5pbml0UGFnZSgpO1xyXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgfVxyXG59O1xyXG5hY3Rpdml0eS5zdGFydCgpO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dHByb2plY3QvbmV4dHByb2plY3QuZW50cnkuanNcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L0BmbHltZS9tb2RhbGRpYWxvZy9saWIvbWFpbi5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvbmV4dHByb2plY3QvY3NzL2luZGV4Lmxlc3NcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBjcmVhdGVIdG1sRG9tOiAoZnVuY3Rpb24gY3JlYXRlSHRtbCgpe1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbihodG1sKXtcclxuICAgICAgdmFyIHRlbXA7XHJcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICB0ZW1wID0gZGl2LmNoaWxkcmVuWzBdO1xyXG4gICAgICBkaXYucmVtb3ZlQ2hpbGQodGVtcCk7XHJcbiAgICAgIHJldHVybiB0ZW1wO1xyXG4gICAgfVxyXG4gIH0pKCksXHJcbiAgcmVwbGFjZVRlbWxhdGU6IGZ1bmN0aW9uKHN0cixkYXRhKXtcclxuICAgIHZhciByZWd4ID0gbmV3IFJlZ0V4cCgveyguKj8pfS9nKSxcclxuICAgICAgICB0ZW1wO1xyXG4gICAgd2hpbGUodGVtcCA9IHJlZ3guZXhlYyhzdHIpKXtcclxuICAgICAgc3RyID0gc3RyLnJlcGxhY2UodGVtcFswXSxkYXRhW3RlbXBbMV1dKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHI7XHJcbiAgfSxcclxuICBiaW5kRXZlbnQ6IGZ1bmN0aW9uKGRvbSxuYW1lLGZuKXtcclxuICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKG5hbWUsZm4sZmFsc2UpO1xyXG4gIH0sXHJcbiAgdW5CaW5kRXZlbnQ6IGZ1bmN0aW9uKGRvbSxuYW1lLGZuKXtcclxuICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsZm4sZmFsc2UpO1xyXG4gIH0sXHJcbiAgZ2V0VXJsUGFyYW06IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsga2V5ICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgICBpZiAociAhPSBudWxsKSByZXR1cm4gZGVjb2RlVVJJKHJbMl0pO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICB9LFxyXG4gIGFzc2lnbjogZnVuY3Rpb24oKXtcclxuICAgIHZhciB0ZW1wID0gYXJndW1lbnRzWzBdO1xyXG4gICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICBmb3IodmFyIGk9MCxsZW49YXJncy5sZW5ndGg7aTxsZW47aSsrKXtcclxuICAgICAgdmFyIGl0ZW0gPSBhcmdzW2ldO1xyXG4gICAgICBmb3IodmFyIHAgaW4gaXRlbSl7XHJcbiAgICAgICAgaWYoaXRlbS5oYXNPd25Qcm9wZXJ0eShwKSl7XHJcbiAgICAgICAgICB0ZW1wW3BdID0gaXRlbVtwXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0ZW1wO1xyXG4gIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbW1vbi9qYXZhc2NyaXB0L2RvbS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG5zOiBcIlwiLFxyXG4gIGZvcm1hdE51bTogZnVuY3Rpb24oYyxiaXRjb3VudCkge1xyXG4gICAgdmFyIGIgPSBbXCJcIiwgXCJcIiwgXCJcIiwgXCJLXCIsIFwiV1wiLCBcIldcIiwgXCJXXCIsIFwiS1dcIl07XHJcbiAgICB2YXIgYSA9IHtcclxuICAgICAgICBLOiAxMDAwLFxyXG4gICAgICAgIFc6IDEwMDAwLFxyXG4gICAgICAgIEtXOiAxMDAwMDAwMFxyXG4gICAgfTtcclxuICAgIHZhciBkLCBlO1xyXG4gICAgYyArPSBcIlwiO1xyXG4gICAgaWYgKCFjIHx8IGlzTmFOKE51bWJlcihjKSkpIHtcclxuICAgICAgICByZXR1cm4gXCIwXCJcclxuICAgIH1cclxuICAgIGlmKCEhYml0Y291bnQpe1xyXG4gICAgICAgIGlmKGMubGVuZ3RoIDw9IGJpdGNvdW50KVxyXG4gICAgICAgICAgICByZXR1cm4gYztcclxuICAgIH1cclxuICAgIGQgPSBjLmxlbmd0aCA+PSA4ID8gYls3XSA6IGJbYy5sZW5ndGggLSAxXTtcclxuICAgIGUgPSBkID8gYyAvIGFbZF0gOiBjO1xyXG4gICAgaWYgKC9eXFxkK1xcLlxcZCskLy50ZXN0KGUpKSB7XHJcbiAgICAgICAvLyBkICs9IFwiK1wiO1xyXG4gICAgICAgIGUgPSBwYXJzZUludChlKVxyXG4gICAgfVxyXG4gICAgaWYoZCA9PSAnSycpe1xyXG4gICAgICAgIGQgPSAgJzAwMCc7XHJcbiAgICB9XHJcbiAgICBpZihkID09ICdXJyl7XHJcbiAgICAgICAgZCA9ICAn5LiHKyc7XHJcbiAgICB9XHJcbiAgICBpZihkID09ICdLVycpe1xyXG4gICAgICAgZCA9ICfljYPkuIcrJztcclxuICAgIH1cclxuICAgIHJldHVybiBlICsgZDtcclxuICB9LFxyXG4gIHNldFN0b3JhZ2U6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICB2YXIga2V5ID0gdGhpcy5ucyArICdfYnJvJyArIG5hbWU7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBpZih2YWwgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsKSk7XHJcbiAgICAgICAgfWNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1VuYWJsZSB0byBzYXZlIHN0YXRlJyxlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgIGdldFN0b3JhZ2U6IGZ1bmN0aW9uIChuYW1lLG5zKSB7XHJcbiAgICAgICAgdmFyIGtleSA9IHRoaXMubnMgKyAnX2JybycgKyBuYW1lLFxyXG4gICAgICAgICAgICBkYXRhO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIH1jYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gcmVhZCBzdGF0ZScsZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIH1jYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAvLyBJZ25vcmUgaW52YWxpZCBKU09OLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0aW1lRm9ybWF0OiBmdW5jdGlvbih0aW1lLGZvcm1hdCl7XHJcbiAgICAgICAgaWYoIXRpbWUpXHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSh0aW1lKTtcclxuICAgICAgICBpZihkYXRlLnRvU3RyaW5nKCkgPT0gXCJJbnZhbGlkIERhdGVcIilcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXkvbW0vZGQgSEg6aWk6c3MnO1xyXG4gICAgICAgIHZhciB0aW1lTWFwID0ge1xyXG4gICAgICAgICAgICB5eTogZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBtbTogZGF0ZS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICAgICAgZGQ6IGRhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgICAgICBISDogZGF0ZS5nZXRIb3VycygpLFxyXG4gICAgICAgICAgICBoaDogZGF0ZS5nZXRIb3VycygpLFxyXG4gICAgICAgICAgICBpaTogZGF0ZS5nZXRNaW51dGVzKCksXHJcbiAgICAgICAgICAgIHNzOiBkYXRlLmdldFNlY29uZHMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYodGltZU1hcC5ISCA+IDExKXtcclxuICAgICAgICAgICAgaWYodGltZU1hcC5ISCA+IDEyKVxyXG4gICAgICAgICAgICAgICAgdGltZU1hcC5oaCA9IHRpbWVNYXAuSEggLSAxMjtcclxuICAgICAgICAgICAgdGltZU1hcC5ucyA9ICdQTSc7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRpbWVNYXAubnMgPSAnQU0nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKC8oeXl8bW18ZGR8SEh8aGh8aWl8c3N8bnMpL2csZnVuY3Rpb24oYSl7XHJcbiAgICAgICAgICB2YXIgZGF0YSA9IHRpbWVNYXBbYV0gKyAnJztcclxuICAgICAgICAgIGRhdGEgPSBkYXRhLmxlbmd0aCA9PSAxID8gJzAnK2RhdGEgOiBkYXRhO1xyXG4gICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgcmVwbGFjZVVybFBhcmFtOiBmdW5jdGlvbiAodXJsLGtleSxyZXBsYWNlU3RyLGlzYXBwZW5kKSB7XHJcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKD86XnwmKVwiICsga2V5ICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgICAgdmFyIGluZGV4ID0gdXJsLmluZGV4T2YoJz8nKSxcclxuICAgICAgICAgIG9yaVVybCA9IHVybCxcclxuICAgICAgICAgIG1hdGNocztcclxuICAgICAgaWYoaW5kZXggIT0gLTEpe1xyXG4gICAgICAgIHVybCA9IHVybC5zdWJzdHIoaW5kZXggKyAxKTtcclxuICAgICAgICBpZihtYXRjaHMgPSB1cmwubWF0Y2gocmVnKSl7XHJcbiAgICAgICAgICB1cmwgPSAgb3JpVXJsLnN1YnN0cigwLGluZGV4ICsgMSkgKyB1cmwucmVwbGFjZShtYXRjaHNbMV0scmVwbGFjZVN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGlzYXBwZW5kICYmIHVybC5pbmRleE9mKGtleSkgPT0gLTEpe1xyXG4gICAgICAgIGlmKGluZGV4ID09IC0xKVxyXG4gICAgICAgICAgICB1cmwgKz0gJz8nO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdXJsICs9ICcmJztcclxuICAgICAgICB1cmwgKz0ga2V5ICsgJz0nICsgcmVwbGFjZVN0cjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdXJsO1xyXG4gIH0sXHJcbiAgdG9GaXhlZChkYXRhLG51bSxpc3JvdW5kKXtcclxuICAgIGlmKGlzcm91bmQpe1xyXG4gICAgICAgIGRhdGEgPSBkYXRhKjE7XHJcbiAgICAgICAgZGF0YS50b0ZpeGVkKG51bSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBkYXRhID0gZGF0YSArICcnO1xyXG4gICAgICAgIHZhciBkb3RJbmRleCA9IGRhdGEuaW5kZXhPZignLicpLFxyXG4gICAgICAgICAgICBkZWNpbWFscywgaW50ZWc7XHJcblxyXG4gICAgICAgIGlmKGRvdEluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICBpbnRlZyA9IGRhdGEuc3Vic3RyKDAsZG90SW5kZXgpO1xyXG4gICAgICAgICAgICBkZWNpbWFscyA9IGRhdGEuc3Vic3RyKGRvdEluZGV4KzEpO1xyXG5cclxuICAgICAgICAgICAgaWYoZGVjaW1hbHMubGVuZ3RoID4gbnVtKXtcclxuICAgICAgICAgICAgICAgIGRlY2ltYWxzID0gZGVjaW1hbHMuc3Vic3RyKDAsbnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKGludGVnICsgJy4nICsgZGVjaW1hbHMpKjE7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgfSxcclxuICBkZWMyaGV4OiBmdW5jdGlvbiggbnVtICl7XHJcbiAgICBpZiggdHlwZW9mIG51bSAhPT0gJ3VuZGVmaW5lZCcgKXtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKG51bSkudG9TdHJpbmcoMTYpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgdW5pY29kZTJDaDogZnVuY3Rpb24oc3RyKXtcclxuICAgIGlmKCFzdHIpXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgaWYoLyYjXFxkKzsvLnRlc3Qoc3RyKSl7XHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoLyYjKFxcZCspOy9nLGZ1bmN0aW9uKGEsYil7XHJcbiAgICAgICAgICAgIHJldHVybiAnJXUnICsgc2VsZi5kZWMyaGV4KGIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB1bmVzY2FwZShzdHIpO1xyXG4gICAgfWVsc2VcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gIH0sXHJcbi8vIFplcHRvLmNvb2tpZSBwbHVnaW5cclxuLy9cclxuLy8gQ29weXJpZ2h0IChjKSAyMDEwLCAyMDEyXHJcbi8vIEBhdXRob3IgS2xhdXMgSGFydGwgKHN0aWxidWVyby5kZSlcclxuLy8gQGF1dGhvciBEYW5pZWwgTGFjeSAoZGFuaWVsbGFjeS5jb20pXHJcbi8vXHJcbi8vIER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBhbmQgR1BMIGxpY2Vuc2VzOlxyXG4vLyBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG4vLyBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvZ3BsLmh0bWxcclxuICBjb29raWUgOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHZhciBkYXlzLCB0aW1lLCByZXN1bHQsIGRlY29kZVxyXG5cclxuICAgICAgICAvLyBBIGtleSBhbmQgdmFsdWUgd2VyZSBnaXZlbi4gU2V0IGNvb2tpZS5cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgU3RyaW5nKHZhbHVlKSAhPT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xyXG4gICAgICAgICAgICAvLyBFbmZvcmNlIG9iamVjdFxyXG4gICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIG9wdGlvbnMpXHJcblxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgb3B0aW9ucy5leHBpcmVzID0gLTFcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5leHBpcmVzID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICAgICAgZGF5cyA9IChvcHRpb25zLmV4cGlyZXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKVxyXG4gICAgICAgICAgICAgICAgdGltZSA9IG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKClcclxuXHJcbiAgICAgICAgICAgICAgICB0aW1lLnNldFRpbWUodGltZS5nZXRUaW1lKCkgKyBkYXlzKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoZG9jdW1lbnQuY29va2llID0gW1xyXG4gICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGtleSksICc9JyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucmF3ID8gdmFsdWUgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5leHBpcmVzID8gJzsgZXhwaXJlcz0nICsgb3B0aW9ucy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJyxcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucGF0aCA/ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kb21haW4gPyAnOyBkb21haW49JyArIG9wdGlvbnMuZG9tYWluIDogJycsXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnNlY3VyZSA/ICc7IHNlY3VyZScgOiAnJ1xyXG4gICAgICAgICAgICBdLmpvaW4oJycpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gS2V5IGFuZCBwb3NzaWJseSBvcHRpb25zIGdpdmVuLCBnZXQgY29va2llXHJcbiAgICAgICAgb3B0aW9ucyA9IHZhbHVlIHx8IHt9XHJcblxyXG4gICAgICAgIGRlY29kZSA9IG9wdGlvbnMucmF3ID8gZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMgfSA6IGRlY29kZVVSSUNvbXBvbmVudFxyXG5cclxuICAgICAgICByZXR1cm4gKHJlc3VsdCA9IG5ldyBSZWdFeHAoJyg/Ol58OyApJyArIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgJz0oW147XSopJykuZXhlYyhkb2N1bWVudC5jb29raWUpKSA/IGRlY29kZShyZXN1bHRbMV0pIDogbnVsbFxyXG4gICAgfSxcclxuICAgIGZvcm1hdEFtb3VudDogZnVuY3Rpb24oYW1vdW50KXtcclxuICAgICAgICAgaWYoIWFtb3VudClcclxuICAgICAgICAgICAgIHJldHVybiAwO1xyXG5cclxuICAgICAgICAgYW1vdW50ICs9ICcnO1xyXG4gICAgICAgICB2YXIgbGVuID0gYW1vdW50Lmxlbmd0aCxcclxuICAgICAgICAgICAgIHJldCA9ICcnO1xyXG5cclxuICAgICAgICAgaWYobGVuIDw9IDMpXHJcbiAgICAgICAgICAgICByZXR1cm4gYW1vdW50O1xyXG5cclxuICAgICAgICAgZm9yKHZhciBpPTE7IGFtb3VudC5sZW5ndGggPiAwOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgc3BsaXRJbmRleCA9IGFtb3VudC5sZW5ndGggLSAzO1xyXG4gICAgICAgICAgICBzcGxpdEluZGV4ID0gc3BsaXRJbmRleCA8IDAgPyAwIDogc3BsaXRJbmRleDtcclxuICAgICAgICAgICAgcmV0ID0gYW1vdW50LnN1YnN0cihzcGxpdEluZGV4LDMpICsgcmV0O1xyXG4gICAgICAgICAgICByZXQgPSAnLCcgKyByZXQ7XHJcbiAgICAgICAgICAgIGFtb3VudCA9IGFtb3VudC5zdWJzdHJpbmcoMCxzcGxpdEluZGV4KTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICByZXQgPSByZXQuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29tbW9uL2phdmFzY3JpcHQvdXRpbHMuanNcbiAqKi8iLCJ2YXIgbHVvYm9zSnNvbiA9IHJlcXVpcmUoXCIuLi9pbWdzL2x1b2Jvc24uanNvblwiKTtcclxudmFyIHphdHV6aXNKc29uID0gcmVxdWlyZShcIi4uL2ltZ3MvemF0dXppcy5qc29uXCIpO1xyXG52YXIgcmVzb2x2ZVNoZWV0ID0gcmVxdWlyZShcIi4vcmVzb2x2ZVNwcml0ZVNoZWV0LmpzXCIpO1xyXG5cclxuZnVuY3Rpb24gSW1nVXJsKGRhdGEpe1xyXG4gIHJldHVybiBuZXcgTEJpdG1hcChuZXcgTEJpdG1hcERhdGEoZGF0YSkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDZW50ZXIodGFyZ2V0LCB4LCB5KXtcclxuICBpZih4ICE9IG51bGwpXHJcbiAgICB0YXJnZXQueCA9IHggLSB0YXJnZXQuZ2V0V2lkdGgoKSAvIDI7XHJcbiAgaWYoeSAhPSBudWxsKVxyXG4gICAgdGFyZ2V0LnkgPSB5IC0gdGFyZ2V0LmdldEhlaWdodCgpIC8gMjtcclxufVxyXG52YXIgbG90dGVyeUJ1dHRvbiA9IHtcclxuICB0YXJnZXRJZDogXCJnYW1lLWNhbnZhc1wiLFxyXG4gIHJvdGF0ZUFuZ2VsOiAwLFxyXG4gIHN0ZXA6IDAuNSxcclxuICBkaXJlY3Rpb246IDEsXHJcbiAgZHVyYXRpb246IDUwMCxcclxuICBpbml0OiBmdW5jdGlvbihidXR0b24sb3B0aW9ucyl7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgJC5leHRlbmQodGhpcyxvcHRpb25zKTtcclxuXHJcbiAgICBpbml0KDE2LHRoaXMudGFyZ2V0SWQsMTA4MCwxMTgwLGZ1bmN0aW9uKCl7XHJcbiAgICAgIHNlbGYubWFpbigpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBtYWluOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGltZ0RhdGEgPSBbXHJcbiAgICAgICAge25hbWU6J2x1b2JvcycscGF0aDonLi9pbWdzL2x1b2Jvcy53ZWJwJ30sXHJcbiAgICAgICAge25hbWU6J3phdHV6aXMnLHBhdGg6ICcuL2ltZ3MvemF0dXppcy5wbmcnfVxyXG4gICAgICBdLFxyXG4gICAgICBsb2FkaW5nTGF5ZXIgPSBuZXcgTG9hZGluZ1NhbXBsZTMoKSxcclxuICAgICAgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgTEdsb2JhbC5zdGFnZVNjYWxlID0gTFN0YWdlU2NhbGVNb2RlLkVYQUNUX0ZJVDtcclxuICAgIC8vIExTeXN0ZW0uc2NyZWVuKExTdGFnZS5GVUxMX1NDUkVFTik7XHJcbiAgICBMR2xvYmFsLnByZXZlbnREZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAvLyBMR2xvYmFsLnN0YWdlU2NhbGUgPSBMU3RhZ2VTY2FsZU1vZGUuU0hPV19BTEw7XHJcbiAgICB2YXIgd2luVyA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcbiAgICB2YXIgcmF0aW8gPSB3aW5XIC8gMTA4MDtcclxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnY2FudmFzJylbMF07XHJcbiAgICAvLyBjYW52YXMuc3R5bGUud2lkdGggPSB3aW5XICsgJ3B4JztcclxuICAgIC8vIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSByYXRpbyAqIDExODAgKyAncHgnO1xyXG4gICAgTEdsb2JhbC5yZXNpemUod2luVyxyYXRpbyAqIDExODApO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50YXJnZXRJZCkuc3R5bGUuaGVpZ2h0ID0gcmF0aW8gKiAxMTgwICsgJ3B4JztcclxuXHJcbiAgICBMTG9hZE1hbmFnZS5sb2FkKFxyXG4gICAgICBpbWdEYXRhLFxyXG4gICAgICBmdW5jdGlvbihwcm9ncmVzcyl7XHJcbiAgICAgICAgbG9hZGluZ0xheWVyLnNldFByb2dyZXNzKHByb2dyZXNzKTtcclxuICAgICAgfSxcclxuICAgICAgZnVuY3Rpb24ocmVzdWx0KXtcclxuICAgICAgICByZW1vdmVDaGlsZChsb2FkaW5nTGF5ZXIpO1xyXG4gICAgICAgIGxvYWRpbmdMYXllciA9IG51bGw7XHJcbiAgICAgICAgc2VsZi5nYW1lSW5pdChyZXN1bHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9LFxyXG4gIGdhbWVJbml0OiBmdW5jdGlvbihyZXN1bHQpe1xyXG4gICAgdmFyIGx1b2JvcyA9IHJlc29sdmVTaGVldChsdW9ib3NKc29uLHJlc3VsdC5sdW9ib3MpLFxyXG4gICAgICAgIHJhYmJpdHMgPSByZXNvbHZlU2hlZXQoemF0dXppc0pzb24scmVzdWx0LnphdHV6aXMpLFxyXG4gICAgICAgIGwxID0gbHVvYm9zKCdsdW9ib24xLnBuZycpLFxyXG4gICAgICAgIGwyID0gbHVvYm9zKCdsdW9ib24yLnBuZycpLFxyXG4gICAgICAgIGwzID0gbHVvYm9zKCdsdW9ib24zLnBuZycpLFxyXG4gICAgICAgIHRhcmdldEV5ZSA9IHJhYmJpdHMoJ3RhcmdldC1leWUucG5nJyk7XHJcblxyXG4gICAgdGhpcy5iYWNrTGF5ZXIgPSBuZXcgTFNwcml0ZSgpO1xyXG4gICAgdGhpcy5tYWluTGF5ZXIgPSBuZXcgTFNwcml0ZSgpO1xyXG4gICAgdGhpcy5zaG9vdExheWVyID0gbmV3IExTcHJpdGUoKTtcclxuXHJcbiAgICB0aGlzLmJhY2tMYXllci5uYW1lID0gJ2JhY2tMYXllcic7XHJcblxyXG4gICAgYWRkQ2hpbGQodGhpcy5iYWNrTGF5ZXIpO1xyXG4gICAgYWRkQ2hpbGQodGhpcy5tYWluTGF5ZXIpO1xyXG4gICAgYWRkQ2hpbGQodGhpcy5zaG9vdExheWVyKTtcclxuXHJcbiAgICBsMi54ID0gTEdsb2JhbC53aWR0aCAvIDIgLSBsMi5nZXRXaWR0aCgpLzI7XHJcbiAgICBsMi55ID0gMDtcclxuXHJcbiAgICBsMS54ID0gTEdsb2JhbC53aWR0aCAvIDUgLSBsMS5nZXRXaWR0aCgpLzI7XHJcbiAgICBsMS55ID0gMTAwO1xyXG5cclxuICAgIGwzLnggPSBMR2xvYmFsLndpZHRoICogNCAvIDUgLSBsMy5nZXRXaWR0aCgpLzI7XHJcbiAgICBsMy55ID0gOTA7XHJcblxyXG4gICAgdGhpcy5hZGRUYXJnZXRFeWUodGFyZ2V0RXllLCBsMS54LCAxNDAgKyBsMi5nZXRIZWlnaHQoKS8yIC0gdGFyZ2V0RXllLmdldEhlaWdodCgpLzIpO1xyXG4gICAgdGhpcy5hZGRTaG9vdGVyKHJhYmJpdHMpO1xyXG4gICAgdGhpcy5iYWNrTGF5ZXIuYWRkQ2hpbGQobDEpO1xyXG4gICAgdGhpcy5iYWNrTGF5ZXIuYWRkQ2hpbGQobDIpO1xyXG4gICAgdGhpcy5iYWNrTGF5ZXIuYWRkQ2hpbGQobDMpO1xyXG5cclxuICAgIHRoaXMuYmFja0xheWVyLmFkZEV2ZW50TGlzdGVuZXIoTEV2ZW50LkVOVEVSX0ZSQU1FLHRoaXMub25GcmFtZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMubGFzdFRpbWUgPSB0aGlzLmdldEN1cnJlbnRUaW1lKCk7XHJcbiAgICB0aGlzLmwxID0gbDE7XHJcbiAgfSxcclxuICBhZGRUYXJnZXRFeWU6IGZ1bmN0aW9uKHRhcmdldCwgeCwgeSl7XHJcbiAgICB2YXIgdGFyZ2V0RXllID0gbmV3IExTcHJpdGUoKTtcclxuXHJcbiAgICB0YXJnZXRFeWUuYWRkQ2hpbGQodGFyZ2V0KTtcclxuXHJcbiAgICB0YXJnZXRFeWUueCA9IHg7XHJcbiAgICB0YXJnZXRFeWUueSA9IHk7XHJcbiAgICB0YXJnZXRFeWUubmFtZSA9ICd0YXJnZXQtZXllJztcclxuICAgIHRhcmdldEV5ZS5yb3RhdGV4ID0gTEdsb2JhbC53aWR0aCAvIDIgLSB0YXJnZXQuZ2V0V2lkdGgoKS8yO1xyXG4gICAgdGFyZ2V0RXllLnJvdGF0ZXkgPSA1MzA7XHJcblxyXG4gICAgdGhpcy5tYWluTGF5ZXIuYWRkQ2hpbGQodGFyZ2V0RXllKTtcclxuICAgIHRoaXMudGFyZ2V0RXllID0gdGFyZ2V0RXllO1xyXG4gIH0sXHJcbiAgYWRkU2hvb3RlcjogZnVuY3Rpb24oZ2V0SW1nKXtcclxuICAgIHZhciBkZWFkbWFuID0gZ2V0SW1nKCdkYW5nb25nLnBuZycpLFxyXG4gICAgICAgIHJvcGUgPSBnZXRJbWcoJ2RhbmdvbmdzaGVuLnBuZycpLFxyXG4gICAgICAgIGFjdGl2ZVNob290ID0gZ2V0SW1nKCdqaWh1by5wbmcnKSxcclxuICAgICAgICB6YXR1emkgPSBnZXRJbWcoJ3phdHV6aS5wbmcnKTtcclxuXHJcblxyXG4gICAgemF0dXppLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHNldENlbnRlcihkZWFkbWFuLCBMR2xvYmFsLndpZHRoIC8gMiwgODMyKTtcclxuICAgIHNldENlbnRlcihyb3BlLCBMR2xvYmFsLndpZHRoIC8gMiwgODUwKTtcclxuICAgIHNldENlbnRlcihhY3RpdmVTaG9vdCwgTEdsb2JhbC53aWR0aCAvIDIsIDk1Myk7XHJcbiAgICB0aGlzLmJhY2tMYXllci5hZGRDaGlsZChkZWFkbWFuKTtcclxuICAgIHRoaXMubWFpbkxheWVyLmFkZENoaWxkKHJvcGUpO1xyXG4gICAgdGhpcy5tYWluTGF5ZXIuYWRkQ2hpbGQoemF0dXppKTtcclxuICAgIHRoaXMuc2hvb3RMYXllci5hZGRDaGlsZChhY3RpdmVTaG9vdCk7XHJcblxyXG4gICAgdGhpcy5yb3BlID0gcm9wZTtcclxuICAgIHRoaXMuYWN0aXZlU2hvb3QgPSBhY3RpdmVTaG9vdDtcclxuICAgIHRoaXMuemF0dXppID0gemF0dXppO1xyXG4gICAgcm9wZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAvLyB0aGlzLnNob290TGF5ZXIudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIC8vIExNb3VzZUV2ZW50Q29udGFpbmVyLnNldChMTW91c2VFdmVudC5NT1VTRV9VUCx0cnVlKTtcclxuICAgIHRoaXMuYmFja0xheWVyLmFkZEV2ZW50TGlzdGVuZXIoTE1vdXNlRXZlbnQuTU9VU0VfVVAgLHRoaXMuc2hvb3QuYmluZCh0aGlzKSk7XHJcbiAgfSxcclxuICB1cGRhdGU6IGZ1bmN0aW9uKHBhc3NlZCl7XHJcblxyXG4gICAgdGhpcy5yb3RhdGVBbmdlbCArPSB0aGlzLnN0ZXAgKiB0aGlzLmRpcmVjdGlvbjsvLyAqIChwYXNzZWQgL3RoaXMuZHVyYXRpb24pO1xyXG5cclxuICAgIGlmKHRoaXMucm90YXRlQW5nZWwgPj0gODApe1xyXG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IC0xO1xyXG4gICAgfWVsc2UgaWYodGhpcy5yb3RhdGVBbmdlbCA8PSAwKXtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSAxO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZHJhdzogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMudGFyZ2V0RXllLnJvdGF0ZSA9IHRoaXMucm90YXRlQW5nZWw7XHJcbiAgfSxcclxuICBvbkZyYW1lOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIG5vdyA9IHRoaXMuZ2V0Q3VycmVudFRpbWUoKSxcclxuICAgICAgICBwYXNzZWQgPSBub3cgLSB0aGlzLmxhc3RUaW1lO1xyXG4gICAgdGhpcy51cGRhdGUocGFzc2VkKTtcclxuICAgIHRoaXMuZHJhdygpO1xyXG5cclxuICAgIHRoaXMubGFzdFRpbWUgPSBub3c7XHJcbiAgfSxcclxuICBnZXRDdXJyZW50VGltZTogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiArbmV3IERhdGU7XHJcbiAgfSxcclxuICBwbGF5OiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5yb3BlLnZpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvb3RMYXllci52aXNpYmxlID0gdHJ1ZTtcclxuICB9LFxyXG4gIHNob290OiBmdW5jdGlvbigpe1xyXG4gICAgc2V0Q2VudGVyKHRoaXMuemF0dXppLCB0aGlzLmwxLngsIHRoaXMubDEueSk7XHJcbiAgICB0aGlzLnphdHV6aS52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMucm9wZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hvb3RMYXllci52aXNpYmxlID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gbG90dGVyeUJ1dHRvbjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uZXh0cHJvamVjdC9qcy9sb3R0ZXJ5QnV0dG9uLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiZnJhbWVzXCI6IHtcblx0XHRcImx1b2JvbjEucG5nXCI6IHtcblx0XHRcdFwiZnJhbWVcIjoge1xuXHRcdFx0XHRcInhcIjogMSxcblx0XHRcdFx0XCJ5XCI6IDMzMyxcblx0XHRcdFx0XCJ3XCI6IDIyNCxcblx0XHRcdFx0XCJoXCI6IDMwMlxuXHRcdFx0fSxcblx0XHRcdFwicm90YXRlZFwiOiBmYWxzZSxcblx0XHRcdFwidHJpbW1lZFwiOiBmYWxzZSxcblx0XHRcdFwic3ByaXRlU291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAwLFxuXHRcdFx0XHRcInlcIjogMCxcblx0XHRcdFx0XCJ3XCI6IDIyNCxcblx0XHRcdFx0XCJoXCI6IDMwMlxuXHRcdFx0fSxcblx0XHRcdFwic291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwid1wiOiAyMjQsXG5cdFx0XHRcdFwiaFwiOiAzMDJcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwibHVvYm9uMi5wbmdcIjoge1xuXHRcdFx0XCJmcmFtZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAxLFxuXHRcdFx0XHRcInlcIjogNjM3LFxuXHRcdFx0XHRcIndcIjogMjExLFxuXHRcdFx0XHRcImhcIjogMzE4XG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IGZhbHNlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDAsXG5cdFx0XHRcdFwieVwiOiAwLFxuXHRcdFx0XHRcIndcIjogMjExLFxuXHRcdFx0XHRcImhcIjogMzE4XG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDIxMSxcblx0XHRcdFx0XCJoXCI6IDMxOFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XCJsdW9ib24zLnBuZ1wiOiB7XG5cdFx0XHRcImZyYW1lXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDEsXG5cdFx0XHRcdFwieVwiOiAxLFxuXHRcdFx0XHRcIndcIjogMjM5LFxuXHRcdFx0XHRcImhcIjogMzMwXG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IGZhbHNlLFxuXHRcdFx0XCJzcHJpdGVTb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDAsXG5cdFx0XHRcdFwieVwiOiAwLFxuXHRcdFx0XHRcIndcIjogMjM5LFxuXHRcdFx0XHRcImhcIjogMzMwXG5cdFx0XHR9LFxuXHRcdFx0XCJzb3VyY2VTaXplXCI6IHtcblx0XHRcdFx0XCJ3XCI6IDIzOSxcblx0XHRcdFx0XCJoXCI6IDMzMFxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0XCJtZXRhXCI6IHtcblx0XHRcImFwcFwiOiBcImh0dHA6Ly93d3cuY29kZWFuZHdlYi5jb20vdGV4dHVyZXBhY2tlclwiLFxuXHRcdFwidmVyc2lvblwiOiBcIjEuMFwiLFxuXHRcdFwiaW1hZ2VcIjogXCJsdW9ib3NuLnBuZ1wiLFxuXHRcdFwiZm9ybWF0XCI6IFwiUkdCQTg4ODhcIixcblx0XHRcInNpemVcIjoge1xuXHRcdFx0XCJ3XCI6IDI0MSxcblx0XHRcdFwiaFwiOiA5NTZcblx0XHR9LFxuXHRcdFwic2NhbGVcIjogXCIxXCIsXG5cdFx0XCJzbWFydHVwZGF0ZVwiOiBcIiRUZXh0dXJlUGFja2VyOlNtYXJ0VXBkYXRlOjVjNmI3ZmM1OGJmZjEyMWFmOTE4MDQxZjdjZTQ2ZThjOjMyNTY2OWNiN2YzZGVmM2QxMDQxMzcxYjQ2YjdmZTAwOmYwOWVmN2VmNmRjNjU1NDUzODFjY2UyN2IyYWQyNjk0JFwiXG5cdH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9uZXh0cHJvamVjdC9pbWdzL2x1b2Jvc24uanNvblxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImZyYW1lc1wiOiB7XG5cdFx0XCJkYW5nb25nLnBuZ1wiOiB7XG5cdFx0XHRcImZyYW1lXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDEsXG5cdFx0XHRcdFwieVwiOiA0ODgsXG5cdFx0XHRcdFwid1wiOiAzNzIsXG5cdFx0XHRcdFwiaFwiOiAxNjBcblx0XHRcdH0sXG5cdFx0XHRcInJvdGF0ZWRcIjogZmFsc2UsXG5cdFx0XHRcInRyaW1tZWRcIjogZmFsc2UsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogMCxcblx0XHRcdFx0XCJ5XCI6IDAsXG5cdFx0XHRcdFwid1wiOiAzNzIsXG5cdFx0XHRcdFwiaFwiOiAxNjBcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMzcyLFxuXHRcdFx0XHRcImhcIjogMTYwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcImRhbmdvbmdzaGVuLnBuZ1wiOiB7XG5cdFx0XHRcImZyYW1lXCI6IHtcblx0XHRcdFx0XCJ4XCI6IDEsXG5cdFx0XHRcdFwieVwiOiAzMzUsXG5cdFx0XHRcdFwid1wiOiAzMDcsXG5cdFx0XHRcdFwiaFwiOiAxMjNcblx0XHRcdH0sXG5cdFx0XHRcInJvdGF0ZWRcIjogZmFsc2UsXG5cdFx0XHRcInRyaW1tZWRcIjogZmFsc2UsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogMCxcblx0XHRcdFx0XCJ5XCI6IDAsXG5cdFx0XHRcdFwid1wiOiAzMDcsXG5cdFx0XHRcdFwiaFwiOiAxMjNcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMzA3LFxuXHRcdFx0XHRcImhcIjogMTIzXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcImdhcC5wbmdcIjoge1xuXHRcdFx0XCJmcmFtZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAzMTAsXG5cdFx0XHRcdFwieVwiOiAyMzQsXG5cdFx0XHRcdFwid1wiOiAxMjgsXG5cdFx0XHRcdFwiaFwiOiAxMjhcblx0XHRcdH0sXG5cdFx0XHRcInJvdGF0ZWRcIjogZmFsc2UsXG5cdFx0XHRcInRyaW1tZWRcIjogdHJ1ZSxcblx0XHRcdFwic3ByaXRlU291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwieFwiOiA2LFxuXHRcdFx0XHRcInlcIjogMCxcblx0XHRcdFx0XCJ3XCI6IDEyOCxcblx0XHRcdFx0XCJoXCI6IDEyOFxuXHRcdFx0fSxcblx0XHRcdFwic291cmNlU2l6ZVwiOiB7XG5cdFx0XHRcdFwid1wiOiAxMzQsXG5cdFx0XHRcdFwiaFwiOiAxMjhcblx0XHRcdH1cblx0XHR9LFxuXHRcdFwiamlodW8ucG5nXCI6IHtcblx0XHRcdFwiZnJhbWVcIjoge1xuXHRcdFx0XHRcInhcIjogMSxcblx0XHRcdFx0XCJ5XCI6IDEsXG5cdFx0XHRcdFwid1wiOiAzMDcsXG5cdFx0XHRcdFwiaFwiOiAzMzJcblx0XHRcdH0sXG5cdFx0XHRcInJvdGF0ZWRcIjogZmFsc2UsXG5cdFx0XHRcInRyaW1tZWRcIjogZmFsc2UsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogMCxcblx0XHRcdFx0XCJ5XCI6IDAsXG5cdFx0XHRcdFwid1wiOiAzMDcsXG5cdFx0XHRcdFwiaFwiOiAzMzJcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMzA3LFxuXHRcdFx0XHRcImhcIjogMzMyXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInRhcmdldC1leWUucG5nXCI6IHtcblx0XHRcdFwiZnJhbWVcIjoge1xuXHRcdFx0XHRcInhcIjogMzEwLFxuXHRcdFx0XHRcInlcIjogMzY0LFxuXHRcdFx0XHRcIndcIjogMTIzLFxuXHRcdFx0XHRcImhcIjogMTIyXG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IHRydWUsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogNCxcblx0XHRcdFx0XCJ5XCI6IDQsXG5cdFx0XHRcdFwid1wiOiAxMjMsXG5cdFx0XHRcdFwiaFwiOiAxMjJcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMTMwLFxuXHRcdFx0XHRcImhcIjogMTMwXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcInphdHV6aS5wbmdcIjoge1xuXHRcdFx0XCJmcmFtZVwiOiB7XG5cdFx0XHRcdFwieFwiOiAzMTAsXG5cdFx0XHRcdFwieVwiOiAxLFxuXHRcdFx0XHRcIndcIjogMTU4LFxuXHRcdFx0XHRcImhcIjogMjMxXG5cdFx0XHR9LFxuXHRcdFx0XCJyb3RhdGVkXCI6IGZhbHNlLFxuXHRcdFx0XCJ0cmltbWVkXCI6IHRydWUsXG5cdFx0XHRcInNwcml0ZVNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcInhcIjogMCxcblx0XHRcdFx0XCJ5XCI6IDAsXG5cdFx0XHRcdFwid1wiOiAxNTgsXG5cdFx0XHRcdFwiaFwiOiAyMzFcblx0XHRcdH0sXG5cdFx0XHRcInNvdXJjZVNpemVcIjoge1xuXHRcdFx0XHRcIndcIjogMTYxLFxuXHRcdFx0XHRcImhcIjogMjMxXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRcIm1ldGFcIjoge1xuXHRcdFwiYXBwXCI6IFwiaHR0cDovL3d3dy5jb2RlYW5kd2ViLmNvbS90ZXh0dXJlcGFja2VyXCIsXG5cdFx0XCJ2ZXJzaW9uXCI6IFwiMS4wXCIsXG5cdFx0XCJpbWFnZVwiOiBcInphdHV6aXMucG5nXCIsXG5cdFx0XCJmb3JtYXRcIjogXCJSR0JBODg4OFwiLFxuXHRcdFwic2l6ZVwiOiB7XG5cdFx0XHRcIndcIjogNDY5LFxuXHRcdFx0XCJoXCI6IDY0OVxuXHRcdH0sXG5cdFx0XCJzY2FsZVwiOiBcIjFcIixcblx0XHRcInNtYXJ0dXBkYXRlXCI6IFwiJFRleHR1cmVQYWNrZXI6U21hcnRVcGRhdGU6NWFkNWI2MjlmOTQ1ZDJlZWEzYzhlYmEzZTYyNDU4YzY6YzQwNGRhOGM3OTc3YWJkZmZmMzM3MGE2OGE4MTE5ZjI6MjllNjNkOWNhYzQ5Y2QxOTY3NWE3ZmVlMTk2OWJmMmUkXCJcblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL25leHRwcm9qZWN0L2ltZ3MvemF0dXppcy5qc29uXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXNvbHZlKGpzb25GaWxlLGltZyl7XHJcbiAgdmFyIG1hcFRlbXAgPSB7fSxcclxuICAgICAgZnJhbWVzID0ganNvbkZpbGUuZnJhbWVzLFxyXG4gICAgICBtYXBkYXRhO1xyXG5cclxuICBPYmplY3Qua2V5cyhmcmFtZXMpLmZvckVhY2goZnVuY3Rpb24obmFtZSl7XHJcbiAgICB2YXIgaXRlbSA9IGZyYW1lc1tuYW1lXSxcclxuICAgICAgICBmcmFtZSA9IGl0ZW0uZnJhbWU7XHJcblxyXG4gICAgbWFwZGF0YSA9IG5ldyBMQml0bWFwKG5ldyBMQml0bWFwRGF0YSAoaW1nLCBmcmFtZS54LCBmcmFtZS55LCBmcmFtZS53LCBmcmFtZS5oKSk7XHJcblxyXG4gICAgbWFwVGVtcFtuYW1lXSA9IG1hcGRhdGE7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGdldEltZztcclxuXHJcbiAgZnVuY3Rpb24gZ2V0SW1nKG5hbWUpe1xyXG4gICAgcmV0dXJuIG1hcFRlbXBbbmFtZV0gJiYgbWFwVGVtcFtuYW1lXS5jbG9uZSgpO1xyXG4gIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25leHRwcm9qZWN0L2pzL3Jlc29sdmVTcHJpdGVTaGVldC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=