/**
 * 
 * @module server.js
 */

//提供http服务和客户端功能
var http=require('http');
//提供http服务和客户端功能
var fs=require('fs');
//提供http服务和客户端功能
var path=require('path');
//用来缓存文件内容
var mime=require('mime');
//用来缓存文件内容
var cache={}





//发送404错误
function send404(response) {
	response.writeHead(404,{'Content-type':'text/plain'});
	response.write('你找的页面并不存在');
	response.end();
}

//提供文件数据服务
function sendFile (response,filePath,fileContent) {
	response.writeHead(200,{'Content-type':mime.lookup(path.basename(filePath))});
	response.end(fileContent);
}

//提供静态文件服务
function serverStatic (response,cache,absPath) {
	//检查文件缓存是否存在于内存中
	if(cache[absPath]){
		sendFile(response,absPath,cache[absPath]);
	}else{
		//检查文件是否存在
		fs.exists(absPath,function(exists){
			if (exists) {
				fs.readFile(absPath,function(err,data){
					if(err){
						send404(response);
					}else{
						cache[absPath]=data;
						sendFile(response,absPath,data);
					}

				})
			}else{
				send404(response);
			};
		})
	}
}

var server=http.createServer(function(request,response){
	var filePath=false;
	if (request.url=='/') {
		filePath="public/index.html";
	} else{
		filePath='public'+request.url;
	};
	var absPath='./'+filePath;
	serverStatic(response,cache,absPath);
})

var chatServer=require("./lib/chat_server");
chatServer.listen(server);

//启动服务器
server.listen(3000,function() {
	console.log("启动成功");
	// body...
})