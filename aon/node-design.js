//The design of node requires us to think non-linearly. Consider this list of operations:
  //read a file
  //process that file

//If we were to turn this into pseudocode you would end up with this:
var file = readFile();
processFile(file);

//this kind of linear step by step code is not how node works
  //if this code were to be executed, readfile and processFile would be executed at the same time
  //we need to express that processFile depends on readfile finishing
    //this is what callbacks are for

//We could rewrite this code as:
var fs = require('fs')
fs.readFile('movie.mp4', finishedReading)

function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
}

//or like this:
var fs = require('fs')

function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
}

fs.readFile('movie.mp4', finishedReading)

//or even like this
var fs = require('fs')

fs.readFile('movie.mp4', function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
})
