/**
 * Video Streaming Web App
 /* To stream web cam on a mac, run: ffmpeg -video_size VAR_XxVAR_Y -framerate 30 -f avfoundation -i "0" -f mpeg1video -vf "crop=iw-mod(iw\,2):ih-mod(ih\,2)" -b 0 http://localhost:8082/my_secret_yoyo
 /*    Where valid varibale combinations are :
        [
          {
            VAR_X: 1280,
            VAR_Y: 720
          },
          {
            VAR_X: 640,
            VAR_Y: 480
          },
          {
            VAR_X: 320,
            VAR_Y: 240
          }
        ]
  /* NOTE: Must change 'width', 'hieght' variables below to match the stream
 */

'use strict';

import http from 'http';
import ws from 'ws';

var streamer = {}


streamer.startStreamer = function(STREAM_SECRET, STREAM_PORT, WEBSOCKET_PORT, STREAM_MAGIC_BYTES) {

  var width = 1280,
  	height = 720;

  // Websocket Server
  var socketServer = new (ws.Server)({port: WEBSOCKET_PORT});
  socketServer.on('connection', function(socket) {
  	// Send magic bytes and video size to the newly connected socket
  	// struct { char magic[4]; unsigned short width, height;}
  	var streamHeader = new Buffer(8);
  	streamHeader.write(STREAM_MAGIC_BYTES);
  	streamHeader.writeUInt16BE(width, 4);
  	streamHeader.writeUInt16BE(height, 6);
  	socket.send(streamHeader, {binary:true});

  	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );

  	socket.on('close', function(code, message){
  		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
  	});
  });

  socketServer.broadcast = function(data, opts) {
  	for( var i in this.clients ) {
  		if (this.clients[i].readyState == 1) {
  			this.clients[i].send(data, opts);
  		}
  		else {
  			console.log( 'Error: Client ('+i+') not connected.' );
  		}
  	}
  };


  // HTTP Server to accept incomming MPEG Stream
  var streamServer = http.createServer( function(request, response) {
  	var params = request.url.substr(1).split('/');

  	if( params[0] == STREAM_SECRET ) {
  		response.connection.setTimeout(0);

  		width = (params[1] || 1280)|0;
  		height = (params[2] || 720)|0;

  		console.log(
  			'Stream Connected: ' + request.socket.remoteAddress +
  			':' + request.socket.remotePort + ' size: ' + width + 'x' + height
  		);
  		request.on('data', function(data){
  			socketServer.broadcast(data, {binary:true});
  		});
  	}
  	else {
  		console.log(
  			'Failed Stream Connection: '+ request.socket.remoteAddress +
  			request.socket.remotePort + ' - wrong secret.'
  		);
  		response.end();
  	}
  }).listen(STREAM_PORT);


}





// Expose app
exports = module.exports = streamer;
