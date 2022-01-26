const dotenv = require('dotenv');
dotenv.config();

const api_data={
    API_url : 'https://api.meaningcloud.com/sentiment-2.1',
    API_key : process.env.API_KEY,
};

console.log(`Your API key is ${api_data.API_key}`);

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

//GET route that returns the projectData
app.get('/api', function (req, res) {
    res.send(api_data);
    console.log('server side getApi:', api_data);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})