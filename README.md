30行代码的Google镜像站
========================

#### **DEMO: [SO FREEDOM](http://so.luoyefe.com/)**

思路是在研究 `NodeJS` 代理时想到的小 trick，说是 30 行，其实最重要的只有一行，即：

```js
req.pipe(request(URL)).res;
```

将客户端来的请求直接转发到相应的 URL 上，实现代理，基于这个原理，可以很容易的实现各种网站的镜像站点。

几行代码，完整可用的免翻墙 Google 搜索就完成了。

按这个思路来，任何网站都可以用这样的思路来玩耍，比如 `po**hub.com` ??

如果想要自己部署的话:

* clone 本项目 `git clone https://github.com/luoye-fe/so.git`

* 启动 `node index.js`

首页(`home.html`)有百度的统计代码，自己部署的话需要去掉。
