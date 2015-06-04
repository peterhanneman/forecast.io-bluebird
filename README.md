forecast.io-bluebird
====================

Wrapper for the http://forecast.io / Dark Sky API: https://developer.forecast.io/docs/v2

Only dependency is Bluebird!


Here's how to use it:

Require forecast.io

```
var Forecast = require('forecast.io-bluebird');
```


Instantiate an instance of the wrapper.  You'll need to specify your API key.  You may also supply your own `timeout` value, which defaults to 2000ms or 2 seconds if not provided.

```
var forecast = new Forecast({
    key: process.env.FORECAST_API_KEY,
    timeout: 2500
});
```


To fetch a forecast for the current time:

```
forecast.fetch(latitude, longitude)
.then(function(result) {
    console.dir(result);
})
.catch(function(error) {
    console.error(error);
});
```


To fetch a forecast for a specific time:

```
var time = new Date().setDate(32);

forecast.fetch(latitude, longitude, time)
.then(function(result) {
    console.dir(result);
})
.catch(function(error) {
    console.error(error);
});

```


To fetch a forecast for the current time with any of the "options" specified on the documentation page:
```
var options = {
    extend: 'hourly',
    units: 'auto'
};

forecast.fetch(latitude, longitude, options)
.then(function(result) {
    console.dir(result);
})
.catch(function(error) {
    console.error(error);
});
```


To fetch a forecast for a specific time with additional "options" from the documentation page:
```
var time = new Date().setDate(32);
var options = {
    units: 'si',
    exclude: 'hourly,minitely',
    lang: 'x-pig-latin'
};

forecast.fetch(latitude, longitude, time, options)
.then(function(result) {
    console.dir(result);
})
.catch(function(error) {
    console.error(error);
});
```


That's it folks!  Now go build something awesome!
