//In node if we require the events module, we can use the so-called 'event emitter' that node itself uses for all of its APIs that emit things.
//events are a common pattern in programming
  //known more widely as the 'observer pattern' or 'pub/sub' (publish/subscribe)
    //callbacks are a one-to-one relationship between the thing waiting for the callback and the thing calling the callback
    //events are the same exact pattern except with a many-to-many API

//events let us subscribe to things
  //we can say 'when X do Y', whereas with plain callbacks it is 'do X then Y'

//common use cases for using events instead of plain callbacks:
  //Chat room where you want to broadcast messages to many listeners
  //Game server that needs to know when new players connect, disconnect, move, shoot and jump
  //Game engine where you want to let game developers subscribe to events like .on('jump', function() {})
  //A low level web server that wants to expose an API to easily hook into events that happen like .on('incomingRequest') or .on('serverError')

//a module that connects to a chat server using only callbacks it would look like this:
var chatClient = require('my-chat-client')

function onConnect() {
  // have the UI show we are connected
}

function onConnectionError(error) {
  // show error to the user
}

function onDisconnect() {
 // tell user that they have been disconnected
}

function onMessage(message) {
 // show the chat room message in the UI
}

chatClient.connect(
  'http://mychatserver.com',
  onConnect,
  onConnectionError,
  onDisconnect,
  onMessage
)
//this is really cumbersome because of all of the functions that you have to pass in a specific order to the .connect function.

//Writing this with events would look like this:
//this approach is similar to the pure-callback approach but introduces the .on method, which subscribes a callback to an event.
   //we can choose which events we want to subscribe to from the chatClient
var chatClient = require('my-chat-client').connect()

chatClient.on('connect', function() {
  // have the UI show we are connected
})

chatClient.on('connectionError', function() {
  // show error to the user
})

chatClient.on('disconnect', function() {
  // tell user that they have been disconnected
})

chatClient.on('message', function() {
  // show the chat room message in the UI
})

//we can also subscribe to the same event multiple times with different callbacks
var chatClient = require('my-chat-client').connect()
chatClient.on('message', logMessage)
chatClient.on('message', storeMessage)

function logMessage(message) {
  console.log(message)
}

function storeMessage(message) {
  myDatabase.save(message)
}
