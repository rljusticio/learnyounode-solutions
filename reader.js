var fs = require('fs');
var path = require('path');
module.exports = function(dir, ext){
  fs.readdir(dir, function(error, data){
    if(error){console.log(error)};
    data.forEach(function(entry){
      if(path.extname(entry) == ext){
        console.log(entry)
      }
    })
  })
};
