var fs = require('fs'); // require is a special function provided by node
var myNumber = undefined; // we don't know what the number is yet since it is stored in a file

//when addOne is called it kicks off a readFile and moves on to the next thing that is ready to execute
    //if there is nothing to execute node will either wait for pending fs network operations to finish or it will stop running and exit to the command line
function addOne() {
  //fs.readFile is an asynchronous method
  //When readFile is done reading the file (this may take anywhere from milliseconds to seconds to minutes depending on how fast the hard drive is) it will run the doneReading function and give it an error (if there was an error) and the file contents.

    //we give readFile a function (known as a callback)
      //it will call this callback after it has retrieved the data from the file system
        //It puts the data it retrieved into a javascript variable and calls our function (callback) with that variable
        //in this case the variable is called fileContents because it contains the contents of the file that was read
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents);
    myNumber++;
  })
}

addOne();

console.log(myNumber); // logs out undefined -- this line gets run before readFile is done

//when we run this program, all of the functions are immediately defined, but they don't execute immediately
  //this is a fundamental aspect of asynchronous programming

  //we get undefined above because nowhere in our code exists logic that tells the console.log statement to
  //wait until the readFile statement finishes before it prints out the number

  //Callbacks are just functions that get executed at some later time.
  //The key to understanding callbacks is to realize that they are used when you don't know when some async operation will complete, but you do know where the operation will complete
    //the last line of the async function!

  //The top-to-bottom order that we declare callbacks does not necessarily matter,
    //only the logical/hierarchical nesting of them.
    //First you split your code up into functions
    //then use callbacks to declare if one function depends on another function finishing
