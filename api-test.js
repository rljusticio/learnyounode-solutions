var http =  require('http');

http.createServer(function(req, res){
  console.log(req.url);
}).listen(process.argv[2]);
