import ObjectCreator from './helpers';

const sendRequest = (city, method) => {
    let http;
    let dayCounter = 1;
    let front = "https://api.openweathermap.org/data/2.5/forecast/daily?q=";
    let back = "&appid=f631fd357c75163a46154773a513dd64";
    const url = front + city + back;

    if (window.XMLHttpRequest) {
        http = new XMLHttpRequest();
    } else {
        http = new ActiveXObject("Microsoft.XMLHTTP");
    }

    return new Promise(function(resolve, reject) {
        http.onload = function() {
            if (this.readyState === 4 && this.status === 200) {
                dayCounter = 1;

                // parse JSON data from API to a javaScript Object
                let data = JSON.parse(http.responseText);

                // create weather object for current city witch user enter
                let weatherInfo = {
                    country: data.city.country,
                    city: data.city.name,
                    days: []
                };

                // loop for getting all needed data from javaScript Object API data
                for (let i = 0; i < data.list.length - 2; i++) {
                    weatherInfo.days.push(new ObjectCreator(
                        dayCounter,
                        "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png",
                        data.list[i].weather[0].description,
                        Math.round(data.list[i].temp.max - 273.15),
                        Math.round(data.list[i].temp.min - 273.15),
                        Math.round((data.list[i].speed) * 10) / 10
                    ));
                    dayCounter++;
                }
                resolve(weatherInfo);
            }
            if (this.status === 400) {
                let validCity = {'info': 'Enter valid city name.'};
                reject(validCity);
            }
            if (this.status === 404) {
                let notFound = {'info': 'The city is not found.'};
                reject(notFound);
            }
        };

        http.onerror = function() {
            let notFound = {'info':'Something went wrong! Please try again latter.'};
            reject(notFound);
        };

        http.open(method, url, true);
        http.send();
    });
};

export default sendRequest;