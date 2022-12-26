/* Global Variables */
const appKey = "a35cf0bb2b3319a01adcb635cf87e425&units=imperial";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Get generate button and adding event listener to handle click
const generate = document.getElementById('generate');
generate.addEventListener('click', preformAction)


// Handel function which get the user zip code then calls getData function
function preformAction() {
    const zipCode = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value
    getWeatherData(baseUrl, zipCode, appKey)
        .then(data => {
            console.log(data);

            // post request to /addTempData route with data object {}
            // 1- Temp info from api
            // 2- Live date
            // 3- And the userResponse => feelings textArea
            postData('/addTempData', {
                temperature: data.main.temp,
                date: newDate,
                feelings: userFeelings
            })
                .then(

                    // Calling UpdateUI function after post request
                    updateUI()
                )
        })

}


// UpdateUI function fetching data from server then display it in index.html
const updateUI = async () => {

    const response = await fetch('/getAllData')
    const info = await response.json();
    try {
        document.getElementById('temp').innerHTML = `${Math.round(info.temperature)}&#8457;`;
        document.getElementById('content').innerHTML = `${info.feelings}`;
        document.getElementById('date').innerHTML = `${info.date}`;
    }
    catch (error) {
        console.log(`error: ${error}`);
    }

}


// getWeatherData function which triggers a GET request to opeWeatherMap api
// get data according to user zipCode
const getWeatherData = async (url, zip, appid) => {
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
