var Https = require('https');
var Bluebird = require('bluebird');
var QueryString = require('querystring');
var version = require('./package').version;


var Forecast = function(options) {
    if (!options || !options.key) throw new Error('Dark Sky API key must be specified! Get one from "https://developer.forecast.io/".');
    if (typeof options.key !== 'string') throw new Error('API key must be a string');
    this.key = options.key;
    this.timeout = options.timeout || 2000;
};


Forecast.prototype.fetch = function(latitude, longitude, time, options) {
    if (!latitude || !longitude) throw new Error('Latitude and longitude are required parameters!');

    var path = '/forecast/' + this.key + '/' + latitude + ',' + longitude;

    if (time) {
        var d = new Date(time);
        if ( isNaN( d.getTime() ) ) {
            options = time;
        } else {
            path += ',' + Math.round( d.getTime()/1000 ); 
        }
    }

    if (typeof(options) === 'object') {
        path += '?' + QueryString.stringify(options);
    }

    var parent = this,
        requestOptions = {
            host: 'api.forecast.io',
            path: path,
            method: 'get',
            headers: { 'User-Agent': 'NodeJS ' + process.version + ' forecast.io-bluebird (' + version + ')' }
        };

    return new Bluebird(function(resolve, reject) {
        var request = Https.request(requestOptions, function(response) {
            var buffer = '';

            response.setEncoding('utf8');

            response.on('data', function(chunk) {
                buffer += chunk;
            });

            response.on('end', function() {
                try {
                    resolve(JSON.parse(buffer));
                } catch(error) {
                    reject(new Error('Invalid JSON response from API!'));
                }
            });
        });

        request.on('error', function(error) {
            reject(error);
        });

        request.on('socket', function(socket) {
            socket.setTimeout(parent.timeout);

            socket.on('timeout', function() {
                request.abort();
            });

            socket.on('error', function(error) {
                reject(error);
            });
        });

        request.end();
    });
};


module.exports = Forecast;
