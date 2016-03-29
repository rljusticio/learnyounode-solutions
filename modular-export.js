//create a new module by creating a new file that just contains your directory reading and filtering function

//The module must export a single function that takes three arguments:
  //the directory name,
  //the filename extension string
  //and a callback function, in that order
    //filename extension argument must be the same as what was passed to your program

//The callback function must be called using the idiomatic node(err, data) convention
  //This convention stipulates that unless there's an error, the first argument passed to the callback will be null
  //the second will be your data.
    //In this exercise, the data will be your filtered list of files as an Array
    //If you receive an error, e.g. from your call to fs.readdir(), the callback must be called with the error, and only the error, as the first argument.

//These four things are the contract that your module must follow.
  //Export a single function that takes exactly the arguments described.
  //Call the callback exactly once with an error or some data as described.
  //Don't change anything else, like global variables or stdout.
  //Handle all the errors that may occur and pass them to the callback.

//To define a single function export, you assign your function to the module.exports object
  //overwriting what is already there

/*
function bar (callback) {
  foo(function (err, data) {
  if (err) return callback(err) // early return

 // ... no error, continue doing cool things with `data`

 // all went well, call callback with `null` for the error argument

 callback(null, data)
})
}
*/
var fs = require('fs');
var path = require('path');
module.exports = function(dir, ext, callback){
  fs.readdir(dir, function (error, data) {
    if(error){
      console.log(error);
      callback(error);
    }
    else{
      var result = [];
      data.forEach(function(file){
        if(path.extname(file) === '.' + ext){
          result.push(file);
        }
      });
      callback(null, result);
    }
  });
};

//official solution
var fs = require('fs');
var path = require('path');
module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, function (err, list) {
    if (err)
      return callback(err);
    list = list.filter(function (file) {
      return path.extname(file) === '.' + filterStr;
    });
    callback(null, list);
  });
};
