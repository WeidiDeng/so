const fs = require('fs');
const URL = require('url');
const http = require('http');
const request = require('request');

const port = 9901;
const homeHTML = fs.readFileSync('./home.html', 'utf-8');

const Server = http.createServer((req, res) => {
	const url = URL.parse(req.url, true);
	if (url.pathname === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.write(homeHTML);
		res.end();
	} else if (url.pathname === '/search'){
		console.log(url);
		// 代理搜索结果
		req.pipe(request({
			url: `https://www.google.com/search${url.search}`,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
			}
		})).pipe(res);
	} else {
		// 代理其他 google.com 下的请求
		req.pipe(request({
			url: `https://www.google.com/${url.path}`,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
			}
		})).pipe(res);
	}
});

Server.listen(port, () => {
	console.log(`Server on port ${port}`);
});
