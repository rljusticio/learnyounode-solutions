//require the http module
var http = require('http');

//Any node web server application will at some point have to create a web server object. This is done by using createServer
//The function that's passed in to createServer is called once for every HTTP request that's made against that server
  //so it's called the request handler
var server = http.createServer(function(req,res){});

var server = http.createServer();
//the Server object returned by createServer is an EventEmitter
  //When an HTTP request hits the server, node calls the request handler function with a few handy objects for dealing with the transaction
    //request and response
server.on('request', function(request, response) {
//When handling a request, the first thing you'll probably want to do is look at the method and URL, so that appropriate actions can be taken.
//Node makes this relatively painless by putting handy properties onto the request object.
  //The method here will always be a normal HTTP method/verb.
  var method = request.method;

  //The url is the full URL without the server, protocol or port.
    //For a typical URL, this means everything after and including the third forward slash
  var url = request.url;

  //Headers are also not far away. They're in their own object on request called headers.
    //all headers are represented in lower-case only, regardless of how the client actually sent them
  var headers = request.headers;

  //When receiving a POST or PUT request, the request body might be important to your application
  //The request object that's passed in to a handler implements the ReadableStream interface.
    //This stream can be listened to or piped elsewhere just like any other stream.
      //We can grab the data right out of the stream by listening to the stream's 'data' and 'end' events
        //The chunk emitted in each 'data' event is a Buffer.
        //If you know it's going to be string data, the best thing to do is collect the data in an array
        //at the 'end', concatenate and stringify it
  var body = [];

  //an error in the request stream presents itself by emitting an error event on the stream
    //if you don't have a listener for that event, the error will be thrown, which could crash your Node.js program
    //add an 'error' listener on your request streams, even if you just log it and continue on your way
  request.on('error', function(err){

    //this prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  }).on('data', function(chunk){
    body.push(chunk);
  }).on('end', function(){
    body = Buffer.concat(body).toString();
    //at this point, we have the headers, method, url and body, and can now do whatever we need to in order to respond to this request.
  });
}).listen(8080); // Activates this server, listening on port 8080.;
//In order to actually serve requests, the listen method needs to be called on the server object.
  //In most cases, all you'll need to pass to listen is the port number you want the server to listen on
