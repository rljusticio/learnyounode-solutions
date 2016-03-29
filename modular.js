//this problem is the same as the previous but introduces the concept of modules
  //you will need to create two files to solve this.

//create a program that prints a list of files in a given directory, filtered by the extension of the files.
  //first argument is the directory name and the second argument is the extension filter
  //Print the  list of files (one file per line) to the console.
  //You must use asynchronous I/O.

//You must write a module file to do most of the work.
  //The module must export a single function that takes three arguments:
    //the directory name,
    //the filename extension string
    //and a callback function, in that order. The
      //filename extension argument must be the same as what was passed to your program

//You must not print directly to the console from your module file, only from your original program.
  //In the case of an error bubbling up to your original program file, simply check for it and print an informative message to the console

//To use your new module in your original program file, use the require() call in the same way that you require('fs') to load the fs module.
  //The only difference is that for local modules must be prefixed with './'

var exp = require('./modular-export.js');
var dir = process.argv[2];
var ext = process.argv[3];

exp(dir, ext, function(error, data){
  data.forEach(function (file) {
    console.log(file);
  });
});

//official solution

var filterFn = require('./solution_filter.js');
var dir = process.argv[2];
var filterStr = process.argv[3];
filterFn(dir, filterStr, function (err, list) {
 if (err)
   return console.error('There was an error:', err);
 list.forEach(function (file) {
   console.log(file);
 });
});
