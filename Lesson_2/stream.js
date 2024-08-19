//Readable Streams: Readable streams allow you to read data from a source, such as a file, into your Node.js application.
//Writable Streams: Writable streams allow you to write data from your Node.js application to a destination, such as a file.
//pipe() method to copy data from one file to another(readable file to writeable file)

const fs = require('fs');

const rs = fs.createReadStream("./files/lorem.txt", { encoding: 'utf8' });

const ws = fs.createWriteStream("./files/new-lorem.txt");

rs.pipe(ws);