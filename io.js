//To perform a filesystem operation you are going to need the fs module from the Node core library.
var fs = require('fs');

//All synchronous (or blocking) filesystem methods in the fs module end with 'Sync'
  //to read a file
  //This method will return a Buffer object containing the complete contents of the file.
var file = fs.readFileSync(process.argv[2]).toString().split('\n');

console.log(file.length - 1);

//Buffer objects are Node's way of efficiently representing arbitrary arrays of data
  //Buffer objects can be converted to strings by simply calling the toString() method on them

//a JavaScript String can be .split() into an array of substrings and '\n' can be used as a delimiter.
  //the test file does not have a newline character ('\n') at the end of the last line, so using this method you'll end up with an array that has one more element than the number of newlines.

//official solution
var fs = require('fs')
var contents = fs.readFileSync(process.argv[2])
var lines = contents.toString().split('\n').length - 1
console.log(lines)
// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1  
