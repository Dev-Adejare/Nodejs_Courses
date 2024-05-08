const fs = require('fs');
const path = require('path');

// fs.readFile('./files/open.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// }) 
// fs.writeFile(path.join(__dirname, "files", "late.txt"), "we are late already", 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// }) 

// fs.writeFile(path.join(__dirname, "files", "open.txt"), 'Yoo we are moving', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('adding more text')
// }) 
// fs.appendFile(path.join(__dirname, "files", "late.txt"), '\n\nClosing period please', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('append text')
// }) 
// fs.rename(path.join(__dirname, "files", "open.txt"), path.join(__dirname, "files", "gig.txt") ,  (err, data) => {
//     if (err) throw err;
//     console.log('append text')
// }) 




// console.log('Adejare')

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error :${err}`)
//     process.exit(1)
// })  

fs.writeFile("server.js", `const fsPromises = require('fs').Promises;`, (err) => {
    if (err) throw err;
    console.log('file created!')

    fs.appendFile("server.js",`\nconst paths = require('path')`, 'utf8', (err) => {
        if (err) throw err;
        console.log('content Added!')  
    })
});



process.on('uncaughtException', err => {
    console.error(`There was an uncaught error :${err}`)
    process.exit(1)
})
   