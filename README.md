# Web.js: Simple HTTP / TCP development framework. #
For detailed information about this, please visit the [Web.js homepage].
如果想获得详细的关于Web.js的信息，请浏览官方网页。

## Install ##

```
npm install webjs
```

## Quick Start ##
```javascript
var web = require('webjs');

var urlHandlers = {					//URL路由功能(包括文件映射和域名跳转)
		'^(.*)' : 'page.html', //Return the 'page.html' data. 返回 'page.html' 的数据。(支持正则表达式)
		'^google' : 'http://www.google.com' //When the path name is 'google', the browser will redirect to Google homepage.  当访问/google时，浏览器自动跳转到Google首页。
		},
    getHandlers = {					//GET方法服务器响应
		'getsomething' : function (req, res, qs) {
					for (var key in qs) {
						res.send(key + ' : ' + qs[key], true);		//res.send 方法接受两个参数，第一个是需要传输的数据，第二个是确定是否保持通讯不中断，以供继续传输。
					}
					res.send('That all');
				}
		},
    postHandlers = {
		'postsomething' : function (req, res, data) {	//POST方法服务器响应
					res.send('Post success');
				}
		};
web.run(urlHandlers, 80)	//启动首个服务器，并传入传入URL映射规则
	.get(getHandlers)	//传入GET方法规则
	.post(postHandlers);	//传入POST方法规则
```

## 简单化部署 Simple Deployment ##
如果你只想在某个文件夹内建立一个简单的文件服务器，那是非常简单的。
If you only want to deploy a simple file server, that's very easy!

```javascript
require('webjs').run()
```
没错的，就是这么简单。



详细文档正在编写中