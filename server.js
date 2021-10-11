const http = require('http'); //an object that gives access to network
const fs = require('fs'); //gives access to files on harddrive
const url = require('url');
const querystring = require('querystring'); // enables us to look at the qeury parameters on our url

//^ dependency management - lines 1-4 is incorporating modules from node js thru "require"

function checkString(userInput) {

    let firstHalf = Math.floor(userInput.length / 2)
    let stringOne = userInput.substring(0, firstHalf)
    let stringTwo = userInput.substring(firstHalf, userInput.length)

    if (userInput.length % 2 !== 0) {
        stringTwo = userInput.substring(firstHalf + 1, userInput.length)
    }

    for (let i = 0; i < firstHalf; i++) {
        let firstLetter = stringOne.charAt(i)
        let lastLetter = stringTwo.charAt((stringTwo.length - 1) - i)
        if (firstLetter !== lastLetter) {
            return false
        }
    }
    return true
}

http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query); // using query parameters
    //passing in an argument to the createserver (the function is the argument) that says
    //every time someone hits this API then this function will run


    if (page == '/') { //loading project if you hit the server and request the main page
        fs.readFile('index.html', function (err, data) { //reading the file + responds
            res.writeHead(200, { 'Content-Type': 'text/html' }); //200 means everything is ok (like the response and the sever status)
            res.write(data); // data is a long string that contains every text in your html
            res.end(); //we're ending the respond so the server knows its time to spit data back to browser
        });
    }
    else if (page == '/api') { //for the fetch call

        if ('string' in params) {
            //logic goes here
            let answer = checkString(params['string'])
            console.log(answer)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            // more logic
            const objToJson = {
                result: answer
            }
            res.end(JSON.stringify(objToJson)) // passing a string thru res.end tells the server to add the string before ending
        }
    }
    else if (page == '/main.js') {
        fs.readFile('main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.write(data) // all the javascript will be returned
            res.end()
        })
    }
    else if (page == '/style.css') {
        fs.readFile('style.css', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            res.write(data)
            res.end()
        })
    }
}).listen(8002) //the dot seperates the method from the object (which is the whole createsever obj)