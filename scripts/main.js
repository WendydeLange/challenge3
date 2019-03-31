 window.onload = function(){
	function getAPIdata() {
		var url = "http://api.openweathermap.org/data/2.5/weather";
		var apiKey ="b0c8dafa512a0134e90df6ece3c2b7a2";
		var city = document.getElementById("city").value;

		// construct request
		var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;

		// get current weather
		fetch(request)

		// parse to JSON format
		.then(function(response) {
			return response.json();
		})

		// render weather per day
		.then(function(response) {
			// render weatherCondition
			onAPISucces(response);
		})

		// catch error
		.catch(function (error) {
			onAPIError(error);
		});
	}

	function onAPISucces(response) {
		// get type of weather in string format
		var type = response.weather[0].description;

		// get temperature in Celcius
		var degC = Math.floor(response.main.temp - 273.15);

		// render weather in DOM
		var weatherBox = document.getElementById('weather');
		weatherBox.innerHTML = degC + "&#176;C <br>" + type;

		// get country code from api;
		var country = response.sys.country;
		fetch('https://restcountries.eu/rest/v2/alpha/' + country)
			.then(function(response) {
				return response.json();
			})
			.then(function(response) {
				console.log(response);
				//div van language.innerhtml = response.languages[0].name
				var language = document.getElementsByClassName('langres')[0];
					language.innerHTML = response.languages[0].name;
			
				var currencies = document.getElementsByClassName('moneys')[0];
					currencies.innerHTML = response.currencies[0].name;	

				var capital = document.getElementsByClassName('capital')[0];
					capital.innerHTML = response.capital;

			})


	}


	function onAPIError(error) {
		var weatherBox = document.getElementById('weather');
		weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?';
	}

	// init data stream
	document.getElementById("getWeather").onclick = function(){
		getAPIdata();
	};
};