/* Global Variables */
const appKey = "a35cf0bb2b3319a01adcb635cf87e425&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Get generate button and adding event listener to handle click
const generate = document.getElementById('generate');
generate.addEventListener('click', preform)


// Handel function which get the user zip code then calls getData function
function preform() {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value
    getData(baseUrl, zipCode, appKey)
        .then(data => {
            console.log(data);

            // post request to /addTempData route with data object {}
            // 1- temp info from api
            // 2- live date
            // 3- and the userResponse => feelings textArea
            postData('/addTempData', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userResponse
            })
        })
}

// getData function which triggers a GET request to opeWeatherMap api
// get data according to user zipCode
const getData = async (url, zip, appid) => {
    const response = await fetch(url = `${url}?zip=${zip}&appid=${appid}`)
    try {
        const data = await response.json();
        return data
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}

// postData function posts data to the server.js
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        console.log(newData);
    }
    catch (error) {
        console.log(`error: ${error}`);
    }
}
