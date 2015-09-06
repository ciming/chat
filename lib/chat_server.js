//引入socket.io
var socketio=require('socket.io');
var io;
var gestNumber=1;
var nikeName={};
var nameUsed=[];
var currentRoom={};

exports.listen=function(server){
	//启动ic
	io=socketio.listen(server);
	
	
	//
	io.sockets.on("connection",function(socket){
		//赋予访客用户名
		gestNumber=assignGestNumber(socket,gestNumber,nikeName,nameUsed);

	})
}