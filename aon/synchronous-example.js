//this is an example of synchronous code
  //we can read this code as is, from top to bottom
  //synchronous coe is expected to run sequentially from top to bottom
var myNumber = 1;
function addOne() { myNumber++ }; // define the function
addOne(); // run the function
console.log(myNumber); // logs out 2
