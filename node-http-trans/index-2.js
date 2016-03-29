//a server that sends back all of the data that was sent to us by the user
var http = require('http');

http.createServer(function(request, response) {
  var headers = request.headers;
  var method = request.method;
  var url = request.url;
  var body = [];
  request.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', function(err) {
      console.error(err);
    });

    //if we don't bother setting it, the response code will default to 200
      //to set a different response, change the response.statusCode property
    response.statusCode = 200;

    //headers are set with setHeader
      //when setting headers on a response, the case is insensitive on their names
      //if we set a header repeatedly, the last value we set is the value that gets sent
        //once we've set the headers, we're ready to start sending response data
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    var responseBody = {
      headers: headers,
      method: method,
      url: url,
      body: body
    };

    //Since the response object is a WritableStream, writing a response body out to the client is just a matter of using the usual stream methods
    response.write(JSON.stringify(responseBody));

    //The end function on streams can also take in some optional data to send as the last bit of data on the stream
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    //It's important to set the status and headers before you start writing chunks of data to the body.
      //This makes sense, since headers come before the body in HTTP responses.

    // END OF NEW STUFF
  });
}).listen(8080);
