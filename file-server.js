//http file server
//write an http server that serves that same text file for each request it receives
  //server should listen on the port provided by the first argument to our program

  //we will be provided with the file to serve as the second command line argument
    //use fs.createReadStream to stream file contents to the response

  //we need to create an http server
  //use the http module from node core, http.createServer creates a server that speaks http
  //http.createServer takes a callback that is called once for each connection received by your server
  //call server.liste(portNumber) to start listening on a particular port

    //callback function has the signature: function callback (request, response) { /* ... */ }
      //the two argumners are objects representing the http request and the corresponding response for this request
        //request is used to fetch properties, such as the header and query string from the request
        //response is for sending data to the client (headers and body)

        //request and response are also node streams
          //they can use the streaming interface to send and receive data

//typical node http server
/*
var http = require('http')
var server = http.createServer(function (req, res) {
  // request handling logic...
})
server.listen(8000)
*/

//http module docs
  //file:///usr/local/lib/node_modules/learnyounode/node_apidoc/http.html

//fs core module also has some streaming apis for files
  //use fs.createReadStream to create a stream representing the file you are given as a command-line argument
    //the method returns a stream object that we can use src.pipe(dst) on to pipe data from the src stream to the dst stream
      //this is how we can connect a filesystem stream with an http response stream

var http = require('http');
var fs = require('fs');
var file = fs.createReadStream(process.argv[3]);
var server = http.createServer(function(req, res){
  file.pipe(res);
}).listen(process.argv[2]);

//official solution
var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })
  fs.createReadStream(process.argv[3]).pipe(res)
})
server.listen(Number(process.argv[2]))
