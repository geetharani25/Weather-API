// router.ts
const { Router } = require('express');
const { Weather } = require('../models/user.ts');
const router = Router();

router.post('/weather', async (req, res) => {
  try {
    const { cityName, temperature, humidity, weather } = req.body;
    const weatherData = new Weather({
      cityname: cityName,
      temperature: temperature,
      humidity: humidity,
      weather: weather
    });
    await weatherData.save();
    res.status(200).send({ message: 'Weather data saved successfully' });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).send({ message: 'Error occurred while saving weather data' });
  }
});

router.get('/allweather', async (req, res) => {
  try {
    const allWeatherData = await Weather.find();
    res.status(200).json(allWeatherData);
  } catch (error) {
    console.error('Error fetching all weather data:', error);
    res.status(500).send({ message: 'Error occurred while fetching all weather data' });
  }
});

module.exports = router;
