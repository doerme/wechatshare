# wechatshare


##页面先引入
```script
<script src="http://code.jquery.com/jquery-1.12.1.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
```
## 使用例子
```script
var wechatShare = require('wechatshare');
    wechatShare({
		title: '标题',
		desc: '描述',
		link:'分享点击连接', /*默认值是当前页面连接*/
		img:'分享封面',
		request_share_url:'签名接口地址', /*默认值是h5.yy.com*/
		success_callback:function(){},	/*分享成功回调*/
		cancel_callback:function(){},	/*分享失败回调*/
		debug:false	/*是否启用调试*/
    })
```
