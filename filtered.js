//Create a program that prints a list of files in a given directory
  //filtered by the extension of the files

//You will be provided a directory name as the first argument to your program (e.g. '/path/to/dir/')
  //a file extension to filter by as the second argument
var fs = require('fs');
var path = require('path');
var pathname = process.argv[2];
var callback = function(error, list){
  if (error) { console.log(error); }
  else{
    for(i=0; i<list.length; i++){
      if(path.extname(list[i]) == '.md'){
        console.log(list[i]);
      }
    }
  }
};
//takes a pathname as its first argument and a callback as its second
fs.readdir(pathname, callback);

//The list of files should be printed to the console, one file per line.
  //You must use asynchronous I/O.

//official solution
var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (file) {
    if (path.extname(file) === '.' + process.argv[3]){
      console.log(file);
    }
  });
});
