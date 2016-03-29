var fs = require('fs') //require filesystem module
var myNumber = undefined //set myNumber to undefined


function addOne(callback) {
  fs.readFile('number.txt', function doneReading(err, fileContents) {
    myNumber = parseInt(fileContents)
    myNumber++

    //after readFile is done the callback variable will be invoked (callback()).
      //only functions can be invoked, so if you pass in anything other than a function it will cause an error
        //when a function gets invoked in javascript the code inside that function will immediately get executed
        //our log statement will execute since callback is actually logMyNumber
    callback()
  })
}

function logMyNumber() {
  console.log(myNumber)
}

//the logMyNumber function can get passed in as an argument that will become the callback variable inside the addOne function
addOne(logMyNumber)

//a timeline of events that happen when we run this program

  //1: the code is parsed
    //if there are any syntax errors they would make the program break
    //fs and myNumber are declared as variables while addOne and logMyNumber are declared as functions
      //these are just declarations. Neither function has been called nor invoked yet.

  //2: the last line of our program gets executed addOne is invoked with the logMyNumber function passed as its callback argument.
    //Invoking addOne will first run the asynchronous fs.readFile function.
      //this part of the program takes a while to finish.

  //3: With nothing to do, node idles for a bit as it waits for readFile to finish.
    //if there was anything else to do during this time, node would be available for work

  //4: As soon as readFile finishes it executes its callback, doneReading, which parses fileContents for an integer called myNumber
    //increments myNumber and then immediately invokes the function that addOne passed in (its callback), logMyNumber

//functions are just objects that can be stored in variables and passed around with different names
  //in node programs when you see a variable like callback or cb you can assume it is a function

//'evented programming' or 'event loop'
  //refers to the way that readFile is implemented
  //node first dispatches the readFile operation and then waits for readFile to send it an event that it has completed
    //while it is waiting node can go check on other things
      //Inside node there is a list of things that are dispatched but haven't reported back yet
      //node loops over the list again and again checking to see if they are finished
      //after they finished, they get 'processed', e.g. any callbacks that depended on them finishing will get invoked.

function addOne(thenRunThisFunction) {
  waitAMinuteAsync(function waitedAMinute() {
    thenRunThisFunction()
  })
}

addOne(function thisGetsRunAfterAddOneFinishes() {})


//Callback example
  //Imagine you had 3 async functions a, b and c.
  //Each one takes 1 minute to run and after it finishes it calls a callback (that gets passed in the first argument).
  //If you wanted to tell node 'start running a, then run b after a finishes, and then run c after b finishes' it would look like this:

    a(function() {
      b(function() {
        c()
      })
    })
//When this code gets executed, a will immediately start running
  //then a minute later it will finish and call b,
    //then a minute later it will finish and call c
      //finally 3 minutes later node will stop running since there would be nothing more to do

// the point is that if you have code that has to wait for some other async code to finish then you express that dependency by putting your code in functions that get passed around as callbacks.
