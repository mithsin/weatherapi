const axios = require("axios");

module.exports = app => {
   app.get(`/api/weathertoday/`, (req, res, next) => {

      const weatherCall = (lat, lon, today) => {
        const apiKey = process.env.apikey;
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&units=imperial&appid=${apiKey}`;
        axios.get(url)
          .then(info => {
            res.send({
              ...today,
              daily: info.data.daily
            })
          })
          .catch(err => console.log(err))
      }

      const apiKey = process.env.apikey;
      const url = `http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${req.query.zip},us&appid=${apiKey}`;

      axios.get(url)
        .then(info => {
          weatherCall(info.data.coord.lat, info.data.coord.lon, info.data);
        })
        .catch(err => console.log(err))
  });
};
