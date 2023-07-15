//Had to input these by hand
const cities = [
    "New York",
    "Los Angeles",
    "Eugene",
    "Springfield",
    "Tacoma",
    "Oakland",
    "Baker's Field",
    "Austin",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "San Francisco",
    "Columbus",
    "Fort Worth",
    "Indianapolis",
    "Charlotte",
    "Seattle",
    "Denver",
    "Washington",
    "Boston",
    "El Paso",
    "Detroit",
    "Nashville",
    "Portland",
    "Memphis",
    "Oklahoma City",
    "Las Vegas",
    "Louisville",
    "Baltimore",
    "Milwaukee",
    "Albuquerque",
    "Tucson",
    "Fresno",
    "Mesa",
    "Sacramento",
    "Atlanta",
    "Kansas City",
    "Colorado Springs",
    "Miami",
    "Raleigh",
    "Omaha",
    "Long Beach",
    "Virginia Beach",
    "Oakland",
    "Minneapolis",
    "Tampa",
    "Tulsa",
    "Arlington",
    "New Orleans",
    "Wichita",
    "Bakersfield",
    "Cleveland",
    "Tampa",
    "Aurora",
    "Anaheim",
  ];
  
  //can't fins a short cut, had to manually input states and cities
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  
  const cityInput = document.getElementById("cityInput");
  const stateInput = document.getElementById("stateInput");
  const cityOptions = document.getElementById("cityOptions");
  const stateOptions = document.getElementById("stateOptions");
  
  // Clear existing options
  function displayCityOptions(inputValue) {
    cityOptions.innerHTML = ""; 
    const filteredCities = cities.filter(city => {
      return city.toLowerCase().startsWith(inputValue.toLowerCase());
    });
  
    filteredCities.forEach(city => {
      const option = document.createElement("div");
      option.classList.add("option");
      option.textContent = city;
      option.addEventListener("click", function() {
        cityInput.value = city;
        cityOptions.innerHTML = "";
      });
      cityOptions.appendChild(option);
    });
  }
  
  // Clear existing options
  function displayStateOptions(inputValue) {
    stateOptions.innerHTML = ""; 
  
    const filteredStates = states.filter(state => {
      return state.toLowerCase().startsWith(inputValue.toLowerCase());
    });
  
    filteredStates.forEach(state => {
      const option = document.createElement("div");
      option.classList.add("option");
      option.textContent = state;
      option.addEventListener("click", function() {
        stateInput.value = state;
        stateOptions.innerHTML = "";
      });
      stateOptions.appendChild(option);
    });
  }
  
  cityInput.addEventListener("input", function() {
    const inputValue = cityInput.value;
    displayCityOptions(inputValue);
  });
  
  stateInput.addEventListener("input", function() {
    const inputValue = stateInput.value;
    displayStateOptions(inputValue);
  });

  // Retrieving user input and fetch weather data from API
function fetchWeatherData(city, state) {
    // API key for OpenWeatherMap
    const apiKey = "d08207a4722998af528aab8b151c510a";
  
    // Attempt at taking API call to fetch weather data based on city and state
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}&units=imperial`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Updated the "cityName" and "temperature" elements in the HTML with the fetched data
        document.getElementById("cityName").textContent = `City: ${data.name}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °F`;
      })
      .catch(error => {
        console.log("Error fetching weather data:", error);
      });
  }
  
  // Handle search button click event
  document.getElementById("searchButton").addEventListener("click", function() {
    var city = document.getElementById("cityInput").value;
    var state = document.getElementById("stateInput").value;
  
    fetchWeatherData(city, state);
  });

  const apiKey = 'd08207a4722998af528aab8b151c510a';

// Function to fetch weather data from the OpenWeatherMap API
async function getWeather(city, state) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${apiKey}`);
  const data = await response.json();
  return data;
}

function updateStateDisplay(state) {
  document.getElementById('state').textContent = `State: ${state}`;
}

// Function to update the weather information on the page
function updateWeatherDisplay(city, temperature, description) {
  document.getElementById('cityName').textContent = `City: ${city}`;
  document.getElementById('weatherDescription').textContent = `Description: ${description}`;
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', async () => {
  const cityInput = document.getElementById('cityInput');
  const stateInput = document.getElementById('stateInput');
  const city = cityInput.value.trim();
  const state = stateInput.value.trim();

  if (city === '' || state === '') {
    alert('Please enter a valid city and state.');
    return;
  }

  try {
    const weatherData = await getWeather(city, state);
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    updateWeatherDisplay(city, temperature, description);
    updateStateDisplay(state);
  } catch (error) {
    alert('An error occurred while fetching the weather data. Please try again later.');
    console.error(error);
  }
});

