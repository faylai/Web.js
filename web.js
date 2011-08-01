/*
 * @fileOverview
 * @author Will Wen Gunn
 * @version 0.2.1
 */

/*
 * @constructor web
 * @descripttion A simple HTTP, HTTPS and TCP framework for Node.js
 * @see <a href="https://github.com/iwillwen/Web.js">Web.js on Github</a>
 * @Simple Deployment require('webjs').run()
 */
//Modules
var http = require("http"),
	https =require("https"),
	fs = require("fs"),
	sys = require("sys"),
	url = require("url"),
	qs = require("querystring"),
	net = require("net"),
	mu = require("mustache"),
	events = require("events");

//Metas
var web = exports;
web.version = '0.2.1';
web.mimes = { "3gp"   : "video/3gpp",
				 "a"     : "application/octet-stream",
				 "ai"    : "application/postscript",
				 "aif"   : "audio/x-aiff",
				 "aiff"  : "audio/x-aiff",
				 "asc"   : "application/pgp-signature",
				 "asf"   : "video/x-ms-asf",
				 "asm"   : "text/x-asm",
				 "asx"   : "video/x-ms-asf",
				 "atom"  : "application/atom+xml",
				 "au"    : "audio/basic",
				 "avi"   : "video/x-msvideo",
				 "bat"   : "application/x-msdownload",
				 "bin"   : "application/octet-stream",
				 "bmp"   : "image/bmp",
				 "bz2"   : "application/x-bzip2",
				 "c"     : "text/x-c",
				 "cab"   : "application/vnd.ms-cab-compressed",
				 "cc"    : "text/x-c",
				 "chm"   : "application/vnd.ms-htmlhelp",
				 "class"   : "application/octet-stream",
				 "com"   : "application/x-msdownload",
				 "conf"  : "text/plain",
				 "cpp"   : "text/x-c",
				 "crt"   : "application/x-x509-ca-cert",
				 "css"   : "text/css",
				 "csv"   : "text/csv",
				 "cxx"   : "text/x-c",
				 "deb"   : "application/x-debian-package",
				 "der"   : "application/x-x509-ca-cert",
				 "diff"  : "text/x-diff",
				 "djv"   : "image/vnd.djvu",
				 "djvu"  : "image/vnd.djvu",
				 "dll"   : "application/x-msdownload",
				 "dmg"   : "application/octet-stream",
				 "doc"   : "application/msword",
				 "dot"   : "application/msword",
				 "dtd"   : "application/xml-dtd",
				 "dvi"   : "application/x-dvi",
				 "ear"   : "application/java-archive",
				 "eml"   : "message/rfc822",
				 "eps"   : "application/postscript",
				 "exe"   : "application/x-msdownload",
				 "f"     : "text/x-fortran",
				 "f77"   : "text/x-fortran",
				 "f90"   : "text/x-fortran",
				 "flv"   : "video/x-flv",
				 "for"   : "text/x-fortran",
				 "gem"   : "application/octet-stream",
				 "gemspec" : "text/x-script.ruby",
				 "gif"   : "image/gif",
				 "gz"    : "application/x-gzip",
				 "h"     : "text/x-c",
				 "hh"    : "text/x-c",
				 "htm"   : "text/html",
				 "html"  : "text/html",
				 "ico"   : "image/vnd.microsoft.icon",
				 "ics"   : "text/calendar",
				 "ifb"   : "text/calendar",
				 "iso"   : "application/octet-stream",
				 "jar"   : "application/java-archive",
				 "java"  : "text/x-java-source",
				 "jnlp"  : "application/x-java-jnlp-file",
				 "jpeg"  : "image/jpeg",
				 "jpg"   : "image/jpeg",
				 "js"    : "application/javascript",
				 "json"  : "application/json",
				 "jsonp" : "application/json",
				 "log"   : "text/plain",
				 "m3u"   : "audio/x-mpegurl",
				 "m4v"   : "video/mp4",
				 "man"   : "text/troff",
				 "mathml"  : "application/mathml+xml",
				 "mbox"  : "application/mbox",
				 "mdoc"  : "text/troff",
				 "me"    : "text/troff",
				 "mid"   : "audio/midi",
				 "midi"  : "audio/midi",
				 "mime"  : "message/rfc822",
				 "mml"   : "application/mathml+xml",
				 "mng"   : "video/x-mng",
				 "mov"   : "video/quicktime",
				 "mp3"   : "audio/mpeg",
				 "mp4"   : "video/mp4",
				 "mp4v"  : "video/mp4",
				 "mpeg"  : "video/mpeg",
				 "mpg"   : "video/mpeg",
				 "ogv"   : "video/ogv",
				 "webm"   : "video/webm",
				 "ms"    : "text/troff",
				 "msi"   : "application/x-msdownload",
				 "odp"   : "application/vnd.oasis.opendocument.presentation",
				 "ods"   : "application/vnd.oasis.opendocument.spreadsheet",
				 "odt"   : "application/vnd.oasis.opendocument.text",
				 "ogg"   : "application/ogg",
				 "p"     : "text/x-pascal",
				 "pas"   : "text/x-pascal",
				 "pbm"   : "image/x-portable-bitmap",
				 "pdf"   : "application/pdf",
				 "pem"   : "application/x-x509-ca-cert",
				 "pgm"   : "image/x-portable-graymap",
				 "pgp"   : "application/pgp-encrypted",
				 "pkg"   : "application/octet-stream",
				 "pl"    : "text/x-script.perl",
				 "pm"    : "text/x-script.perl-module",
				 "png"   : "image/png",
				 "pnm"   : "image/x-portable-anymap",
				 "ppm"   : "image/x-portable-pixmap",
				 "pps"   : "application/vnd.ms-powerpoint",
				 "ppt"   : "application/vnd.ms-powerpoint",
				 "ps"    : "application/postscript",
				 "psd"   : "image/vnd.adobe.photoshop",
				 "py"    : "text/x-script.python",
				 "qt"    : "video/quicktime",
				 "ra"    : "audio/x-pn-realaudio",
				 "rake"  : "text/x-script.ruby",
				 "ram"   : "audio/x-pn-realaudio",
				 "rar"   : "application/x-rar-compressed",
				 "rb"    : "text/x-script.ruby",
				 "rdf"   : "application/rdf+xml",
				 "roff"  : "text/troff",
				 "rpm"   : "application/x-redhat-package-manager",
				 "rss"   : "application/rss+xml",
				 "rtf"   : "application/rtf",
				 "ru"    : "text/x-script.ruby",
				 "s"     : "text/x-asm",
				 "sgm"   : "text/sgml",
				 "sgml"  : "text/sgml",
				 "sh"    : "application/x-sh",
				 "sig"   : "application/pgp-signature",
				 "snd"   : "audio/basic",
				 "so"    : "application/octet-stream",
				 "svg"   : "image/svg+xml",
				 "svgz"  : "image/svg+xml",
				 "swf"   : "application/x-shockwave-flash",
				 "t"     : "text/troff",
				 "tar"   : "application/x-tar",
				 "tbz"   : "application/x-bzip-compressed-tar",
				 "tcl"   : "application/x-tcl",
				 "tex"   : "application/x-tex",
				 "texi"  : "application/x-texinfo",
				 "texinfo" : "application/x-texinfo",
				 "text"  : "text/plain",
				 "tif"   : "image/tiff",
				 "tiff"  : "image/tiff",
				 "torrent" : "application/x-bittorrent",
				 "tr"    : "text/troff",
				 "txt"   : "text/plain",
				 "vcf"   : "text/x-vcard",
				 "vcs"   : "text/x-vcalendar",
				 "vrml"  : "model/vrml",
				 "war"   : "application/java-archive",
				 "wav"   : "audio/x-wav",
				 "wma"   : "audio/x-ms-wma",
				 "wmv"   : "video/x-ms-wmv",
				 "wmx"   : "video/x-ms-wmx",
				 "webp"   : "image/webp",
				 "wrl"   : "model/vrml",
				 "wsdl"  : "application/wsdl+xml",
				 "xbm"   : "image/x-xbitmap",
				 "xhtml"   : "application/xhtml+xml",
				 "xls"   : "application/vnd.ms-excel",
				 "xml"   : "application/xml",
				 "xpm"   : "image/x-xpixmap",
				 "xsl"   : "application/xml",
				 "xslt"  : "application/xslt+xml",
				 "yaml"  : "text/yaml",
				 "yml"   : "text/yaml",
				 "zip"   : "application/zip"
				},
			web.metas = {
				set tmplDir(val) {
					mu.templateRoot = './' + val;
				},
				get tmplDir() {
					return mu.templateRoot;
				}
			},
			web.servers = [],
			web.httpsServers = [];
//Foundation Server
var server,
	httpsServer;
function createHttpServer() {
    var content;
    server = http.createServer(function (req, res) {
    		var path = url.parse(req.url).pathname.substring(1);
    		//Response
		/*
		 * @description 发送数据到客户端
		 * @param {String} data 发送的数据*
		 * @param {Boolean} last 是否是最后一次发送(建议在最后一次异步发送使用*)
		 */
    		res.send = function (data, last) {
    			this.write(data);
			if (last) {
				res.end();
    				return this;
			} else {
				return this;
			}
    		};
		res.setTimeout = function (fn, t) {
			setTimeout(fn, t)
		};
		/*
		 * @description 发送指定文件到客户端
		 * @param {String} fileName 需要发送的文件的文件名(不包括文件名前端的'/');*
		 */
    		res.sendFile = function (fileName) {
    			var format = fileName.split('.');
    			fs.readFile("./" + fileName, function (err, data) {
    				if (err) return send404(res);
    				this.charset = web.mimes[format[format.length - 1]];
    				res.writeHead(200, {'Content-Type' : this.charset});
    				res.write(data);
    				res.end();
    			});
    		};
		/*
		 * @description 发送JSON数据到客户端
		 * @param {Array} data 需要发送的数据，可以是Array, Object或是已经编码的JSON字符串*
		 */
    		res.sendJSON = function (data) {
    			switch (typeof data) {
    				case "string":
    					this.charset = "application/json";
    					res.writeHead(200, {'Content-Type' : this.charset});
    					res.write(data);
    					res.end();
    					break;
				case "array":
    				case "object":
    					var sJSON = JSON.stringify(data);
    					this.charset = "application/json";
    					res.writeHead(200, {'Content-Type' : this.charset});
    					res.write(sJSON);
    					res.end();
    					break;
    			}
    		};
		/*
		 * @description 在客户端设置cookies
		 * @param {String} name cookies的名字*
		 * @param {String} val cookies的数据*
		 * @param {Object} options cookies的详细设置
		 */
    		res.cookie = function (name, val, options) {
    			options = options || {};
    			if ('maxAge' in options) options.expires = new Date(Date.now() + options.maxAge);
    			if (undefined === options.path) options.path = this.app.set('home');
    			var cookie = utils.serializeCookie(name, val, options);
    			this.header('Set-Cookie', cookie);
    			return this;
    		};
		/*
		 * @decription 清除某指定cookies
		 * @param {String} name 需要清除的cookies的名字*
		 * @param {Object} options 详细设置
		 */
    		res.clearCookie = function (name, options) {
    			var opts = { expires: new Date(1) };
    
    			return this.cookie(name, '', options
    				? utils.merge(options, opts)
    				: opts);
    		};
    
    		//Request
    		req.addListener('data', function(chunk) {
    			content += chunk;
    		});
		/*
		 * @description 检测请求的MIME类型是否为指定的MIME类型
		 * @param {String} type 需要检测的MIME类型*
		 */
    		req.type = function(type) {
    			var contentType = this.headers['content-type'];
    			if (!contentType) return;
    			if (!~type.indexOf('/')) type = web.mimes[type];
    			if (~type.indexOf('*')) {
    				type = type.split('/')
    				contentType = contentType.split('/');
    				if ('*' == type[0] && type[1] == contentType[1]) return true;
    				if ('*' == type[1] && type[0] == contentType[0]) return true;
    			}
    			return !! ~contentType.indexOf(type);
    		};
		/*
		 * @description 返回请求头中的指定数据
		 * @param {String} sHeader 需要查询的头数据名*
		 */
    		req.header = function (sHeader) {
    			if (this.headers[sHeader]) {
    				return this.headers[sHeader];
    			} else {
    				return undefined;
    			}
    		};

    		switch (req.method) {
    			case "GET":
    				getHandler(req, res, path, this);
    				break;
    			case "POST":
    				postHandler(req, res, path, this);
    				break;
    		}
    	});
	server.urlHandlers = {};
	server.getHandlers = {};
	server.postHandlers = {};
	server.erorrHandlers = {};
	server.blockMimes = {};
	return server;
}
function createHttpsServer() {
    var content;
    httpsServer = https.createServer(function (req, res) {
    		var path = url.parse(req.url).pathname.substring(1);
                /*
                 * @description 发送数据到客户端
                 * @param {String} data 发送的数据*
                 * @param {Boolean} last 是否是最后一次发送(建议在最后一次的异步发送使用*)
                 */
    		//Response
    		res.send = function (data, last) {
    			this.write(data);
    			if (last !== undefined) {
    				return this;
    			} else {
    				this.end();
    				return this;
    			}
    		};
                /*
                 * @description 发送指定文件到客户端
                 * @param {String} fileName 需要发送的文件的文件名(不包括文件名前端的'/');*
                 */
    		res.sendFile = function (fileName) {
    			var format = fileName.split('.');
    			fs.readFile("./" + fileName, function (err, data) {
    				if (err) return send404(res);
    				this.charset = web.mimes[format[format.length - 1]];
    				res.writeHead(200, {'Content-Type' : this.charset});
    				res.write(data);
    				res.end();
    			});
    		};
                /*
                 * @description 发送JSON数据到客户端
                 * @param {Array} data 需要发送的数据，可以是Array, Object或是已经编码
的JSON字符串*
                 */
    		res.sendJSON = function (data) {
    			switch (typeof data) {
    				case "string":
    					this.charset = "application/json";
    					res.writeHead(200, {'Content-Type' : this.charset});
    					res.write(data);
    					res.end();
    					break;
				case "array":
    				case "object":
    					var sJSON = JSON.stringify(data);
    					this.charset = "application/json";
    					res.writeHead(200, {'Content-Type' : this.charset});
    					res.write(sJSON);
    					res.end();
    					break;
    			}
    		};
                /*
                 * @description 在客户端设置cookies
                 * @param {String} name cookies的名字*
                 * @param {String} val cookies的数据*
                 * @param {Object} options cookies的详细设置
                 */
    		res.cookie = function (name, val, options) {
    			options = options || {};
    			if ('maxAge' in options) options.expires = new Date(Date.now() + options.maxAge);
    			if (undefined === options.path) options.path = this.app.set('home');
    			var cookie = utils.serializeCookie(name, val, options);
    			this.header('Set-Cookie', cookie);
    			return this;
    		};
                /*
                 * @decription 清除某指定cookies
                 * @param {String} name 需要清除的cookies的名字*
                 * @param {Object} options 详细设置
                 */
    		res.clearCookie = function (name, options) {
    			var opts = { expires: new Date(1) };
    
    			return this.cookie(name, '', options
    				? utils.merge(options, opts)
    				: opts);
    		};
    
    		//Request
    		req.addListener('data', function(chunk) {
    			content += chunk;
    		});
                /*
                 * @description 检测请求的MIME类型是否为指定的MIME类型
                 * @param {String} type 需要检测的MIME类型*
                 */
    		req.type = function(type) {
    			var contentType = this.headers['content-type'];
    			if (!contentType) return;
    			if (!~type.indexOf('/')) type = web.mimes[type];
    			if (~type.indexOf('*')) {
    				type = type.split('/')
    				contentType = contentType.split('/');
    				if ('*' == type[0] && type[1] == contentType[1]) return true;
    				if ('*' == type[1] && type[0] == contentType[0]) return true;
    			}
    			return !! ~contentType.indexOf(type);
    		};
                /*
                 * @description 返回请求头中的指定数据
                 * @param {String} sHeader 需要查询的头数据名*
                 */
    		req.header = function (sHeader) {
    			if (this.headers[sHeader]) {
    				return this.headers[sHeader];
    			} else {
    				return undefined;
    			}
    		};  
    		switch (req.method) {
    			case "GET":
    				getHandler(req, res, path, httpsServer);
    				break;
    			case "POST":
    				postHandler(req, res, path, httpsServer);
    				break;
    		}
    	});
	httpsServer.urlHandlers = {};
	httpsServer.getHandlers = {};
	httpsServer.postHandlers = {};
	httpsServer.erorrHandlers = {};
	httpsServer.blockMimes = {};
	return httpsServer;
}
//404 page
var page404 = "Page not found.",
	send404 = function (res) {
		res.send(page404);
	};

//HTTP handler
var getHandler = function (req, res, getpath, server) {
		switch (getpath) {
			case "":
				if ("/" in server.urlHandlers) {
					res.sendFile(server.urlHandlers["/"]);
				} else if ("/" in server.getHandlers) {
					server.getHandlers["/"](req, res);
				} else {
					res.sendFile("index.html");
				}
				break;
			case "favicon.ico":
				res.sendFile("favicon.ico");
				break;
			default:
				for (var key in server.getHandlers) {
					var uhReg = new RegExp(key, "i");
					var querystrings = url.parse(req.url, true).query;
					if (uhReg.test(getpath)) {
						try {
							res.writeHead(200, {'Content-type' : 'text/html'});
							server.getHandlers[key](req, res, querystrings);
						} catch(ex) {
							if (server.erorrHandlers.get) {
								return server.erorrHandlers.get(req, res);
							}
						}
						return;
					}
				}
				urlHandler(req, res, getpath, server);
		}
	},
	urlHandler = function (req, res, getpath, server) {
		var scriptfile;
		for (var key in server.urlHandlers) {
			var uhReg = new RegExp(key, "i");
			if (uhReg.test(getpath)) {
				scriptfile = server.urlHandlers[key];
				var keys = [];
				for (var i = 1; i < 10;i++)
					keys.push(RegExp['$' + i]);
				for (var j = 1; j < 10; j++)
						if (keys[j - 1]) 
							scriptfile = scriptfile.replace('$' + j, keys[j - 1]);
				break;
			}
		}
		if (/^http/.test(scriptfile)) {
			res.writeHead(302, {'Location':scriptfile});
			res.end();
			console.log('Redirected to ' + scriptfile);
			return;
		}
		if (scriptfile !== undefined) {
			fs.readFile("./" + scriptfile, function (err, data) {
				if (err) return send404(res);
				var format = scriptfile.split(".");
				res.writeHead(200, {'Content-Type': web.mimes[format[format.length -1]]});
				res.write(data, 'utf8');
				res.end();
			});
		} else {
			fileHandler(req, res, getpath, server);
		}
	},
	postHandler = function (req, res, postpath, server) {
        var request = {};
		content = content.substring(15);
		request = qs.parse(content);
		for (var key in server.postHandlers) {
			var uhReg = new RegExp(key, "i");
			if (uhReg.test(postpath)) {
				try {
					res.write(200, {'Content-type':'text/plain'});
					server.postHandlers[key](req, res, request);
				} catch(ex) {
					if (server.erorrHandlers.post) {
						return server.erorrHandlers.post(req, res);
					} else {
						return send404(res);
					}
				}
			}
		}
    },
	fileHandler = function (req, res, getpath, server) {
		var format = getpath.split('.');
		if (format[format.length - 1] in server.blockMimes) {
			server.blockMimes[format[format.length - 1]](req, res);
		} else {
			res.sendFile(getpath);
		}
	};

//Method
/*
 * @description 设置当前或指定Server的GetRouter
 * @param {Object} _gethandlers 传入的GetRouter*
 * @param {Object} server 可指定Server
 */
web.get = function (_gethandlers, server) {
	var key;
	if (server) {
		for (key in _gethandlers)
			server.getHandlers[key] = _gethandlers[key];
	} else {
		for (key in _gethandlers)
			web.server.getHandlers[key] = _gethandlers[key];
	}
	return this;
};
/*
 * @description 设置当前货指定的Server的PostRouter
 * @param {Object} _posthandlers 传入的PostRouter
 * @param {Object} server 可指定Server
 */
web.post = function (_posthandlers, server) {
	var key;
	if (server) {
		for (key in _posthandlers)
			server.postHandlers[key] = _posthandlers[key];
	} else {
		for (key in _posthandlers)
			web.server.postHandlers[key] = _posthandlers[key];
	}
	return this;
};
/*
 * @description 启动HTTP Server的主方法
 * @param {Object} getpath 传入的URLRouter*
 * @param {Number} port 监听的端口*
 * @param {String} host 监听的域名*
 * @param {Boolean} backserver 是否返回该Server对象(建议在启动多服务器的时候使用*)
 */
web.run = function (getpath, port, host, backserver) {
	if (server == undefined) {
	        server = createHttpServer();
		web.servers.push(server);
		web.server = server;
		console.log('Create server.');
	} else 
	if (backserver) {
		server = createHttpServer();
		web.server = server;
		console.log('Create new server.');
	}
	if (getpath == undefined) {
		web.server.listen(80);
		console.log('Server is running on 127.0.0.1:80');
		if (backserver) {
		    return server;
		} else {
	 	    return this;
		}
	} else {
		var key;
		for (key in getpath) {
			web.server.urlHandlers[key] = getpath[key];
		}
		if (port !== undefined) {
			if (host === undefined) {
				web.server.listen(port);
			} else {
				web.server.listen(port, host);
			}
		}
		if (backserver){
		    return web.server;
		} else {
		    return this;
		}
	}
};
/*
 * @description 启动HTTPS Server的主方法
 * @param {Object} getpath 传入的URLRouter*
 * @param {Number} port 监听的端口*
 * @param {String} host 监听的域名*
 * @param {Boolean} backserver 是否返回该Server对象(建议在启动多服务器的时候使用*)
 */
web.runHttps = function (getpath, port, host, backserver) {
	if (httpsServer == undefined) {
	        httpsServer = createHttpsServer();
		web.httpsServers.push(httpsServer);
		web.httpsServer = httpsServer;
	}
	if (getpath == undefined) {
		httpsServer.listen(80);
		console.log('Server is running on 127.0.0.1:80');
		if (backserver) {
		    return httpsServer;
		} else {
	 	    return this;
		}
	} else {
		var key;
		for (key in getpath) {
			web.httpsServer.urlHandlers[key] = getpath[key];
		}
		if (port !== undefined) {
			if (host === undefined) {
				web.httpsServer.listen(port);
			} else {
				web.httpsServer.listen(port, host);
			}
		}
		if (backserver){
		    return web.httpsServer;
		} else {
		    return this;
		}
	}
};
/*
 * @description 设置自定义404页面
 * @param {String} path 需要设置的文件路径(不包括'/')*
 */
web.set404 = function (path) {
	fs.readFile("./" + path, function (err, data) {
		page404 = data;
	});
	return this;
};
/*
 * @description 设置GET和POST响应错误时的错误响应
 * @param {Object} handlers 传入的ErorrHandlers*
 */
web.erorr = function (handlers) {
	var key;
	for (key in handlers) {
		erorrHandlers[key] = handlers[key];
	}
	return this;
};
/*
 * @description 禁止请求某些文件格式时的响应器
 * @param {Object} handlers 传入的响应器*
 */
web.noMimes = function (handlers) {
	var key;
	for (key in handlers) {
		blockMimes[key] = handlers[key];
	}
	return this;
};
/*
 * @description 设置一些需要用到的元数据
 * @param {String} key 元数据的Key*
 * @param {String} value 元数据的值*
 */
web.set = function (key, value) {
	this.metas[key] = value;
	return this;
};
/*
 * @description 自定义MIME类型
 * @param {String} format 文件格式后缀*
 * @param {String} mime MIME类型*
 */
web.reg = function (format, mime) {
	if (/^\./.test(format)) {
		this.mimes[format.substring(1)] = mime;
	} else {
		this.mimes[format] = mime;
	}
	return this;
};
/*
 * @description 调用Mustache进行模板渲染
 * @param {String} 模板的名称
 * @param {Object} 
 */
web.render = function (tmlpName, obj) {
	var sHtml;
	mu.render(tmlpName + '.html', obj, {}, function (err, data) {
		data.on('data', function(d) {sHtml += d;});
	});
	return sHtml;
};
//TCP Server
var sockets = [];
web.net = function (port, callback) {
	var tcpServer = net.createServer(function (socket) {
		sys.inherits(socket, events.EventEmitter);
		socket.id = Math.round(Math.random() * 10000000000);
		socket.on('connect', function () {
			for (var i = 0; i < socket.listeners('connection').length; i++) {
				socket.listeners('connection')[i]();
			}
		});
		socket.on('data', function (data) {
			for (var i = 0; i < socket.listeners('message').length; i++) {
				socket.listeners('message')[i](data);
			}
		});
		socket.on('end', function () { 
			var a = sockets.indexOf(socket);
			sockets.splice(a, 1);
			for (var i = 0; i < socket.listeners('disconnect').length; i++) {
				socket.listeners('disconnect')[i]();
			}
		});
		socket.send = function (str) {
			socket.write(str);
			console.log('send success');
		};
		socket.broadcast = function (data) {
			for (var i = 0; i < sockets.length; i++) {
				if (sockets[i] == socket) continue;
				sockets[i].write(data);
			}
		};
		sockets.push(socket);
		callback(socket);
	}).listen(port);
	return tcpServer;
};