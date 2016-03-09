# wechatshare
## 使用例子

```script
var wechatShare = require('wechatshare');
    wechatShare({
        title: '标题',
        desc: '描述',
		link:'分享点击连接', /*默认值是当前页面连接*/
		img:'分享封面',
		request_share_url:'签名接口地址' /*默认值是h5.yy.com*/
    })
```
