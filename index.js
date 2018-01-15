const fs = require('fs');
const URL = require('url');
const http = require('http');
const request = require('request');

const port = 9901;
const homeHTML = fs.readFileSync('./home.html', 'utf-8');

function requestInstance(url) {
	return request({
		url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
		}
	})
}

const Server = http.createServer((req, res) => {
	const url = URL.parse(req.url, true);
	if (url.pathname === '/') {
		req.pipe(requestInstance('https://www.google.com')).pipe(res);
	} else if (url.pathname === '/search'){
		// 代理搜索结果
		req.pipe(requestInstance(`https://www.google.com/search${url.search}`)).pipe(res);
	} else {
		// 代理其他请求道 google.com 下
		req.pipe(requestInstance(`https://www.google.com/${url.path}`)).pipe(res);
	}
});

Server.listen(port, () => {
	console.log(`Server on port ${port}`);
});
