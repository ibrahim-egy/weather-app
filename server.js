// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Get request to render index page
app.get('/', (req, res)=> {
    res.render('index.html')
})

// Get route that returns projectData object
app.get('/getData', (req, res) => {
    res.send(projectData)
})

const data = []
app.post('/addTempData', (req, res) => {
    const newData = {
        temperature: req.body.temp,
        data: req.body.data,
        userResponse: req.body.userResponse
    }
    data.push(newData);
    console.log(data);
})


const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server up and running on port ${PORT}`);
})