//write a TCP time server
  //server should listen to TCP connections on the port provided by the first argument to your program
  //for each connection write the current date and 24 hour time in the format
    //"YYY-MM-DD hh:mm"
      //followed by a newline character

//Hints
  //For this exercise we'll be creating a raw TCP server.
  //There's no HTTP involved here
    //so we need to use the net module from Node core which has all the basic networking functions.

    //The net module has a method named net.createServer() that takes a callback function.
      //Unlike most callbacks in Node, the callback used by createServer() is called more than once.
        //Every connection received by your server triggers another call to the callback.
          //callback signature:  function callback (socket) { /* ... */ }

    //net.createServer() also returns an instance of your server.
      //You must call server.listen(portNumber) to start listening on a particular port.

//A typical Node TCP server looks like this:
/*
  var net = require('net')
  var server = net.createServer(function (socket) {
   // socket handling logic
  })
  server.listen(8000)
*/

//Remember to use the port number supplied to you as the first command-line argument

//the socket object contains a lot of meta-data regarding the connection
  //the socket object is also a node duplex stream
    //it can be read from and written to
      //for this exercise we only need to write data and then close the socket

  //use socket.write(data) to write data to the socket
  //use socket.end() to close the socket
    //.end() method also takes a data object so we can simplify to just: socket.end(data)

  //.net documentation
    //file:///usr/local/lib/node_modules/learnyounode/node_apidoc/net.html

  /*
  To create the date, you'll need to create a custom format from a new
  Date() object. The methods that will be useful are:
   date.getFullYear()
   date.getMonth()     // starts at 0
   date.getDate()      // returns the day of month
   date.getHours()
   date.getMinutes()
  */

var net = require('net');
var server = net.createServer(function(socket){
  //socket handling logic
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();

  //"YYYY-MM-DD hh:mm"
  var result = year + "-" + 0 + month + "-" + day + " " + hour + ":" + minute + "\n";
  socket.write(result);
  socket.end();
});
server.listen(process.argv[2])

//official solution
  //excellent example
  //note how each function does just one thing
  //this solution is much cleaner than mine
var net = require('net')
function zeroFill(i) {
  //this is really cool
    //prefixes all numbers less than 10 with a zero
  return (i < 10 ? '0' : '') + i
}

function now () {
  var d = new Date()
  return d.getFullYear() + '-'
   + zeroFill(d.getMonth() + 1) + '-'
   + zeroFill(d.getDate()) + ' '
   + zeroFill(d.getHours()) + ':'
   + zeroFill(d.getMinutes())
}
var server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})
