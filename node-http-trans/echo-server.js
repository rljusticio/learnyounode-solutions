//a simple echo server
  //sends whatever data is received in the request right back in the response.
    //all we need to do is grab the data from the request stream and write that data to the response stream
var http = require('http');
http.createServer(function(request, response) {
  var body = [];
  request.on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    response.end(body);
  });
}).listen(8080);

//If we want to only send an echo under the following conditions:
  //The request method is GET.
  //The URL is /echo.
  //In any other case, we want to simply respond with a 404.
var http = require('http');
http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/echo') {
    var body = [];
    request.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
//By checking the URL in this way, we're doing a form of "routing".
//Other forms of routing can be as simple as switch statements or as complex as whole frameworks like express.
//If you're looking for something that does routing and nothing else, try router.

//simplified even further
var http = require('http');
http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
//Remember, the request object is a ReadableStream and the response object is a WritableStream.
  //this means we can use pipe to direct data from one to the other.

//to handle errors in our simplified example
var http = require('http');
http.createServer(function(request, response) {
  request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', function(err) {
    console.error(err);
  });
  if (request.method === 'GET' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
