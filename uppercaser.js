//write an http server that receives only post requests
  //convert incoming post body characters to uppercase
    //return result to client
    
//server should listen on the port provided by the first argument to our program
var http = require('http');
var port = process.argv[2];

var server = http.createServer(function(req, res){
  var method = req.method;
  var body = [];
  //if req method == POST
    //convert post body to uppercase
      //return result to client
  if(method === "POST"){
    req.on('data', function(chunk){
      body.push(chunk);
    }).on('end', function(){
      body = body.join("").toUpperCase();
      res.end(body);
    });
  }
  res.writeHead(200, { 'content-type': 'text/plain' });

});
server.listen(port);

//official solution
var http = require('http')
var map = require('through2-map')
var server = http.createServer(function (req, res) {
  if (req.method != 'POST'){
    return res.end('send me a POST\n')
  }
  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
 })).pipe(res)
});
server.listen(Number(process.argv[2]))
