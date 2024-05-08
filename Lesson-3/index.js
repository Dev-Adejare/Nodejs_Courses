const logEvent = require("./logEvent");


const EventEmitter = require("events");

class myEmitter extends EventEmitter{}

const emitter = new myEmitter();

emitter.on("log", (msg) => logEvent(msg));

setTimeout(() => {
    emitter.emit("log", "log event emitted!")
},2000)

