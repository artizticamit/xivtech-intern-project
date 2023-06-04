const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const weather = require('./routes/weather')

const path = require('path')


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// app.set("view engine", "html")
// app.set("public", path.join(__dirname, "public"))

app.post('/getWeather', async(req, res)=>{
    try{
        const {cities} = req.body;
        console.log('Cities : ', cities)
        const weatherData = await fetchWeatherData(cities);
        res.json({weather:weatherData})

    }catch(err){
        console.log(err)
    }
})

async function fetchWeatherData(cities){
    const weatherData = {};
    const promises = cities.map(async city=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3dd6054a997e81b42676a55bfe7b496f`
        const response = await axios.get(url)
        const temperature = response.data.main.temp;
        // console.log(temperature)
        weatherData[city] = `${temperature-270} deg C`
    })
    await Promise.all(promises);
    console.log(weatherData)
    return weatherData;
}



app.get('/', (req, res)=>{
    // res.send("hello world");
    res.sendFile(__dirname+"/public/index.html")
})


app.listen(8000, ()=>{
    console.log("Listening to the port 8000.")
})