//Write a program that performs an HTTP GET request to a URL provided to you as the first command-line argument
  //Collect all data from the server
    //not just the first "data" event and then write two lines to the console

//The first line you write should just be an integer representing the number of characters received from the server.
  //The second line should contain the complete String of characters sent by the server.

//Two appraoches to this problem
  //collect data across multiple data events and append the results together prior to printing the output
    //use the end event to determine when the stream is finished and we can write the output

  //use a third-party packager to abstract the difficulties involved in collecting an entire stream of data
    //two different packags provide useful apis for solving this problem
      //bl: buffer list - http://npm.im/bl
      //concat-stream - http://npm.im/concat-stream

var http = require('http');
var url = process.argv[2];
var result = '';
var print = function(string){
  console.log(string.length);
  console.log(string);
};

http.get(url, function(res){
  res.setEncoding('utf8');
  res.on('data', function(data){
    result += data;
  });
  res.on('error', console.error);
  res.on('end', function(){
    print(result);
  });
});

//official solution
var http = require('http');
var bl = require('bl');
http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err){
      return console.error(err);
    }  
    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
});
