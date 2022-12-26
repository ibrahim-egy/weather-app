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
// For testing
app.get('/', (req, res)=> {
    res.render('index.html')
})

// Get route that returns projectData object
app.get('/getAllData', (req, res) => {
    res.send(projectData)
    console.log(`projectData: ${projectData}`);
})


// Post route save req.body in data array
app.post('/addTempData', (req, res) => {
    
    projectData.temperature = req.body.temperature,
    projectData.date = req.body.date,
    projectData.feelings = req.body.feelings
    
    res.send(projectData)
})


// Server setup
// Listening on port 3000
const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
})