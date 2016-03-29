//Write a program that uses a single asynchronous filesystem operation to read a file and print the number of newlines it contains to the console
  //The full path to the file to read will be provided as the first command-line argument.

// The solution to this problem is almost the same as the previous problem except you must now do it the Node.js way: asynchronous.

//To perform a filesystem operation you are going to need the fs module from the Node core library.
var fs = require('fs');

//Instead of fs.readFileSync() you will want to use fs.readFile()
//instead of using the return value of this method you need to collect the value from a callback function that you pass in as the second argument.
var file = fs.readFile(process.argv[2], 'utf-8', function(error, data){
  if (error){
    console.log(error);
    process.exit(1);
  }
  else{
    var answer = data.split('\n');
    console.log(answer.length - 1);
  }
});

//official solution
var fs = require('fs');
var file = process.argv[2];
fs.readFile(file, function (err, contents) {
  // fs.readFile(file, 'utf8', callback) can also be used  
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
