
var reader = require('./reader');
var dir = './aon';
var ext = '.js';

reader(dir, ext);

/*
fs.readdir(dir, function(error, data){
  if(error){console.log(error)};
  data.forEach(function(entry){
    if(path.extname(entry) == '.js'){
      console.log(entry)
    }
  })
})
*/
