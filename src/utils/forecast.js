const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7c357e59b05488e46de7f5de261aa364/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=en'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast: body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability*100) + '% chance of rain. The high today is ' + body.daily.data[0].temperatureHigh + ' degrees and the low is ' + body.daily.data[0].temperatureLow + ' degrees.',
                data: {
                    summary: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    precipitations: body.currently.precipProbability * 100
                }               
            })
        }
    })
}

module.exports = forecast