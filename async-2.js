//the same as the previous problem, http collect
  //use http get
  //we'll be provided with three urls as the first three command line arguments

//collect the complete content provided to us by each of the URLs and print it to the console
  //one line per url
  //print them out in the same order as the urls are provided to us as command line arguments

//don't expect these three servers to play nicely
  //will not give us complete responses in the order we hope
    //we can't just print the output because they will be out of order

//queue the results and keep track of how many of the URLS have returned their entire contents
  //print the data once we have all the data

//counting callbacks is one of the fundamental ways of managing async in node
  //consider using the async library

var http = require('http');
var urls = [process.argv[2], process.argv[3], process.argv[4]];
var count = urls.length;
var indexCounter = 0;
var string = [];

var result = urls.map(function(url){
  var index = indexCounter;
  indexCounter++;
  http.get(url, function(res){
    var text = '';
    res.setEncoding('utf8');
    res.on('error', console.error);
    res.on('data', function(data){
      text += data;
    });
    res.on('end', function(){
      string[index] = text;
      next();
    });
  });
});

function next(){
  count--;
  if(count < 1){
    string.forEach(function(url){
      console.log(url);
    });
  }
}

//official solution
var http = require('http');
var bl = require('bl');
var results = [];
var count = 0;
function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i]);
}
function httpGet (index) {

  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err);

      results[index] = data.toString();
      count++;

      if (count == 3)
        printResults();
    }));
  });
}

for (var i = 0; i < 3; i++){
    httpGet(i);
}
