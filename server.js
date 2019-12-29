const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT || 3001;

function Weather(day) {
  this.temp = day.temperature;
  this.summary = day.summary;
  this.bg = day.icon;
}

app.get('/weather', (req, res) => {
  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_KEY}/47.6062,-122.332`;

  axios.get(url)
    .then(result => {
      const currentWeather = new Weather(result.data.currently);
      res.send(currentWeather);
    })
});

app.get('*',(request, response) => {
  response.status(404).send('not found');
})

app.listen(port, () => console.log(`Listening on port ${port}`));

// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night