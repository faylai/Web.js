var web = require("./web"),
	urls = {
			"^test/([a-zA-Z0-9])" : "test.html",
			"^[0-9]" : "testimage.jpg",
			"^google" : "http://www.google.com"
			},
	gets = {
			"get" : function (req, res, qs) {
						res.send('Test the GET<br />' + JSON.stringify(qs));
					}
			},
	posts = {
			"post" : function (req, res, data) {
						res.send("Post success.");
					}
			};
web.run(urls, 80)
	.get(gets)
	.post(posts)
	.set404("404.html")
	.server.on("request", function (req, res) {
		console.log("Getting " + req.url);
	});
console.log("It's running on http://127.0.0.1:80");