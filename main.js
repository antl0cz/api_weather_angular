var weather = angular.module('weather', []);


// weather factory
weather.factory('weatherService', function ($http) {
    return {
        getWeather: function (city, country) {
            var query = city + ',' + country;
            var apiKey = 'ffdffc0b92daec1e70561d27c2f2aafe';
            return $http.get('http://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: query,
                    APPID: apiKey
                }
            })
                .then(function(res) { // then() returns a promise which is resolved with return value of success callback
                    var tempR = Math.round(((((res.data.main.temp)*(9/5))-459.67)*100)/100); // extracts weather data
                    return tempR;
                });
        }
    }
});

// weather controller
weather.controller('WeatherController', function ($scope, weatherService) {
    $scope.getWeather = function () {
        $scope.weatherDescription = "Fetching ...";
        weatherService.getWeather($scope.city, $scope.country)
            .then(function (data) {
                $scope.weatherDescription = data;
            }, function () {
                $scope.weatherDescription = "Could not obtain data";
            });
    }
});