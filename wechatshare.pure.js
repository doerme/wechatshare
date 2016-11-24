!(function () {
    var wechatShare = function (opt) {
        if (!(this instanceof wechatShare)) {
            return new wechatShare(opt);
        }
        var config = {
            title: '微信分享标题',
            desc: '微信分享内容',
            link: window.location.href,
            img: 'http://makefriends.bs2dl.yy.com/48980134342886519512.png',
            request_share_url: 'http://h5.yy.com/wap/getsharecf?url=' + encodeURIComponent(window.location.href.split('#')[0]),
            success_callback: function () {

            },
            cancel_callback: function () {

            },
            debug: false
        }
        this.defaults = $.extend(config, opt, true);
        this.init();
    }
	
	var Ajax = function(type, url, data, success, failed){
		// 创建ajax对象
		var xhr = null;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP')
		}
	 
		var type = type.toUpperCase();
		// 用于清除缓存
		var random = Math.random();
	 
		if(typeof data == 'object'){
			var str = '';
			for(var key in data){
				str += key+'='+data[key]+'&';
			}
			data = str.replace(/&$/, '');
		}
	 
		if(type == 'GET'){
			if(data){
				xhr.open('GET', url + '?' + data, true);
			} else {
				xhr.open('GET', url + '?t=' + random, true);
			}
			xhr.send();
	 
		} else if(type == 'POST'){
			xhr.open('POST', url, true);
			// 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(data);
		}
	 
		// 处理返回数据
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200){
					success(xhr.responseText);
				} else {
					if(failed){
						failed(xhr.status);
					}
				}
			}
		}
	}

    wechatShare.prototype = {
        init: function () {
            var self = this;
            self.doconfig();
        },
        doconfig: function () {
            var self = this;
            /*share*/
            var request_share_url = self.defaults.request_share_url;
            Ajax('get', request_share_url, {}, function(jdata){
				console.log('doconfig', jdata);
                console.log('defaluts', self.defaults);
                var msg = jdata.wxapi;
                wx.config({
                    debug: self.defaults.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg.appId, // 必填，公众号的唯一标识
                    timestamp: msg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg.nonceStr, // 必填，生成签名的随机串
                    signature: msg.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'chooseWXPay', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    var share_title = self.defaults.title;
                    var share_desc = self.defaults.desc;
                    var share_link = self.defaults.link;
                    var share_img = self.defaults.img;
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: share_title, // 分享标题
                        link: share_link, // 分享链接
                        imgUrl: share_img, // 分享图标
                        success: function () {
                            self.defaults.success_callback();
                        },
                        cancel: function () {
                            self.defaults.cancel_callback();
                        }
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: share_title, // 分享标题
                        desc: share_desc, // 分享描述
                        link: share_link, // 分享链接
                        imgUrl: share_img, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            self.defaults.success_callback();
                        },
                        cancel: function () {
                            self.defaults.cancel_callback();
                        }
                    });


                    wx.onMenuShareQQ({
                        title: share_title, // 分享标题
                        desc: share_desc, // 分享描述
                        link: share_link, // 分享链接
                        imgUrl: share_img, // 分享图标
                        success: function () {
                            self.defaults.success_callback();
                        },
                        cancel: function () {
                            self.defaults.cancel_callback();
                        }
                    });


                    wx.onMenuShareWeibo({
                        title: share_title, // 分享标题
                        desc: share_desc, // 分享描述
                        link: share_link, // 分享链接
                        imgUrl: share_img, // 分享图标
                        success: function () {
                            self.defaults.success_callback();
                        },
                        cancel: function () {
                            self.defaults.cancel_callback();
                        }
                    })
                });
			});
            /*share end*/
        }
    }
    // RequireJS && SeaJS
    if (typeof define === 'function') {
        define(function () {
            return wechatShare;
        });

// NodeJS
    } else if (typeof exports !== 'undefined') {
        module.exports = wechatShare;
    } else {
        this.wechatShare = wechatShare;
    }

})()
