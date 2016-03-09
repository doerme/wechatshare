define(function (require, exports, module) {
    "use strict";
    var $ = window.jQuery;
    /*
     var wx = require('http://res.wx.qq.com/open/js/jweixin-1.1.0.js');
     */
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

            }
        }
        this.defaults = $.extend(config, opt, true);
        this.init();
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
            $.ajax({
                url: request_share_url,
                dataType: "jsonp",
            }).then(function (jdata) {
                console.log('doconfig', jdata);
                console.log('defaluts', self.defaults);
                var msg = jdata.wxapi;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
                            self.defaults.success_callback;
                        },
                        cancel: function () {
                            self.defaults.cancel_callback;
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
                            self.defaults.success_callback;
                        },
                        cancel: function () {
                            self.defaults.cancel_callback;
                        }
                    });


                    wx.onMenuShareQQ({
                        title: share_title, // 分享标题
                        desc: share_desc, // 分享描述
                        link: share_link, // 分享链接
                        imgUrl: share_img, // 分享图标
                        success: function () {
                            self.defaults.success_callback;
                        },
                        cancel: function () {
                            self.defaults.cancel_callback;
                        }
                    });


                    wx.onMenuShareWeibo({
                        title: share_title, // 分享标题
                        desc: share_desc, // 分享描述
                        link: share_link, // 分享链接
                        imgUrl: share_img, // 分享图标
                        success: function () {
                            self.defaults.success_callback;
                        },
                        cancel: function () {
                            self.defaults.cancel_callback;
                        }
                    })
                });
            });
            /*share end*/
        }
    }
    module.exports = wechatShare;
})