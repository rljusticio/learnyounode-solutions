
//declare variables
  //set counter to 0 to allow number functionality
var sum = 0, i, number;
//loop through arguments, starting at 2 to skip node variables
for (i = 2; i < process.argv.length; i++) {
  //convert string to number
   number = Number(process.argv[i]);
   //add string to counter
   sum += number;
}
console.log(sum);
