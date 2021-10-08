const http = require('http'); //an object that gives access to network
const fs = require('fs'); //gives access to files on harddrive
const url = require('url');
const querystring = require('querystring'); // enables us to look at the qeury parameters on our url

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
    const params = querystring.parse(url.parse(req.url).query); // query parameters



    if (page == '/') { //loading project
        fs.readFile('index.html', function (err, data) { //reading the 'demofile' file + responds
            res.writeHead(200, { 'Content-Type': 'text/html' }); //200 means everything is ok (like the response and the sever status)
            res.write(data);
            res.end();
        });
    }
    else if (page == '/api') { //for the fetch call

        if ('string' in params) {
            //logic goes here
            let answer = checkString(params['string'])
            console.log(answer)

            if (answer === true) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                // more logic
                const objToJson = {
                    result: true
                }
                res.end(JSON.stringify(objToJson))
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                // more logic
                const objToJson = {
                    result: false
                }
                res.end(JSON.stringify(objToJson))
            }
        }


    }
    else if (page == '/main.js') {
        fs.readFile('main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' })
            res.write(data)
            res.end()
        })
    }
    else if (page == '/style.css') {
        fs.readFile('style.css', function (err, data) {
            res.write(data)
            res.end()
        })
    }
}).listen(8002)