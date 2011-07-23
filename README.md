# Web.js : a framework like Webpy for NodeJS. #

For detailed information about this and other Node.js
Developer visit the [Node.js Web.js homepage] [homepage].

## INSTALL ##

```
npm install webjs
```

## QUICK START ##

```javascript
var web = require("webjs"),
	urls = {
			"test/([a-zA-Z0-9])" : "test.html",
			"[0-9]" : "README.txt"
			}
web.run(urls, 8888)
	.server.on("request",function (req, res) {
		console.log("Getting " + req.url);
	});
console.log("It's running.");
```

## GET ##
```javascript
var web = require("webjs"),
	urls = {
			"^test/([a-zA-Z0-9])" : "test.html",
			"^[0-9]" : "testimage.jpg"
			},
	gets = {
			"get" : function (res) {
						res.send('Getting.');
					}
			};
web.run(urls, 8888)
	.get(gets);
console.log("It's running.");
```

## POST ##
```javascript
var web = require("webjs"),
	urls = {
			"test/([a-zA-Z0-9])" : "test.html",
			"[0-9]" : "testimage.jpg"
			},
	posts = {
			"post" : function (req, res, data) {
						var qss = "";
						for (var key in data) {
							qss += key + ":" + data[key] + "<br />";
						}
						res.send(qss);
					}
			}
web.run(urls, 8888)
	.post(posts);
```
## Custom 404 Page ##
```javascript
var web = require("webjs").set404("404.html");
```

## Block the current file format ##
```javascript
var web = require("webjs"),
	noMimes = {
			'php' : function (req, res) {
						web.send(res, "Sorry. This isn't a php file.")
					},
			'exe' : function (req, res) {
						web.send(res, "Sorry. This isn't a exe file.");
					},
			'asp' : function (req, res) {
						web.send(res, "Sorry. This isn't a asp file.");
					}
			};
web.run()
	.noMimes(noMimes);
```

## Server meta infomation setting ##
```javascript
var web = require("webjs")
			.run()
			.meta('index', 'index.html');
```

## Custom MIME file type ##
```javascript
var web = require("webjs")
			.run()
			.reg('webm', 'video/webm')
			.reg('ogv', 'video/ogg');
```

## LICENSE ##

This module is released under the [MIT License] [license].

[homepage]: http://www.iwillwen.com
[license]: http://www.opensource.org/licenses/mit-license.php
