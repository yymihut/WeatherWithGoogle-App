import React, { Component } from 'react';
import './WeatherPage.css';
import Header from './Header/Header';
import MapContainer from './MapGoogle/Map';
import WeatherCard from './CurrentWeatherCard/CurrentWeatherCard';
import Forecast from './Forecast/Forecast';
import axios from 'axios';
import shortid from 'shortid';


class WeatherPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      data: {
        dt: '',
        main: {
          temp: '',
          pressure: '',
          humidity: '',
        },
        name: '',
        sys: {
          sunrise: '',
          sunset: '',
        },
        timezone: '',
        weather: {
          description: '',
          icon: '',
          main: ''
        }
      },
      forecast: [],
    }
  }



  componentDidMount() {
    console.log('curr location', this.props.lat, this.props.lng)
    this.getCurrentWeather(this.props.lat, this.props.lng);
    this.getForecast(this.props.lat, this.props.lng);
  }


  componentDidUpdate = (prevProps) => {
    console.log('componentDidUpdate---- this.state', this.props.lat)
    console.log('componentDidUpdate', this.state.lat, '----', prevProps.lat)
    if (this.props.lat !== prevProps.lat && this.props.lng !== prevProps.lng) {
      this.getCurrentWeather(this.props.lat, this.props.lng);
      this.getForecast(this.props.lat, this.props.lng);
    }
  }

  timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time1 = date + ' ' + month + ' ' + year + ' ' + ' la ora ' + hour + ':' + min + ':' + sec;
    let time2 = date + ' ' + month;
    let time3 = ' la ora ' + hour + ':' + min + ':' + sec;
    return {
      timeDateMonthYearHour: time1,
      timeDateMonth: time2,
      timeHour: time3,
    };
  }

  getCurrentWeather(currentLat, currentLon) {
    const apiKey1 = `2ca9ca04865ce518fae4c576a4ef76ec`;
    axios.get(` http://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&units=metric&appid=${apiKey1} `).
      then(response => {
        this.setState({
          lat: currentLat,
          lng: currentLon,
          data: {
            dt: this.timeConverter(response.data.dt).timeDateMonthYearHour,
            main: {
              temp: response.data.main.temp,
              pressure: response.data.main.pressure,
              humidity: response.data.main.humidity,
            },
            name: response.data.name,
            sys: {
              sunrise: this.timeConverter(response.data.sys.sunrise).timeDateMonthYearHour,
              sunset: this.timeConverter(response.data.sys.sunset).timeDateMonthYearHour,
            },
            timezone: response.data.timezone,
            weather: {
              description: response.data.weather[0].description,
              icon: response.data.weather[0].icon,
              main: response.data.weather[0].main
            }
          }

        })
      });
  }

  getForecast(currentLat, currentLon) {
    const apiKey1 = `2ca9ca04865ce518fae4c576a4ef76ec`;
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentLat}&lon=${currentLon}&units=metric&appid=${apiKey1}`).
      then(responseF => {
        this.setState({
          forecast: responseF.data.daily
        });
      })
  }

  forecastCards = () => {
    return (
      <React.Fragment>
        {this.state.forecast.map((el, idx) => (
          <Forecast
            key={shortid.generate()}
            name={this.timeConverter(el.dt).timeDateMonth}
            clouds={el.clouds}
            humidity={el.humidity}
            pressure={el.pressure}
            sunrise={this.timeConverter(el.sunrise).timeHour}
            sunset={this.timeConverter(el.sunset).timeHour}
            uvi={el.uvi}
            wind_speed={el.wind_speed}
            tempMin={el.temp.min}
            tempMax={el.temp.max}
            weather_description={el.weather[0].description}
            weather_icon={el.weather[0].icon}
          />
        ))}
      </React.Fragment>
    )
  }

  render() {
    const { name, main, sys, dt } = this.state.data;
    const { humidity, temp, pressure } = main;
    const { sunrise, sunset, } = sys;
    return (
      <div className="WeatherPage">
        <Header
          name={this.state.data.name}
        />
        <div className="inputs">
          <label>Lat</label>
          <input
            value={this.state.newLat ? this.state.newLat : this.state.lat}
            readOnly />
          <label>Lng</label>
          <input
            value={this.state.newLng ? this.state.newLng : this.state.lng}
            readOnly />
        </div>

        <MapContainer
          defaultCenter={this.props.coords}
          onchange={e => { this.props.functionMap(e) }}
        />
        <WeatherCard
          umiditate={humidity}
          rasarit={sunrise}
          apus={sunset}
          temp={temp}
          presiune={pressure}
          name={name}
          timezone={dt}
        />
        <p className="prognoza">Prognoza vremii in {this.state.data.name} pentru 8 zile  </p>
        {this.forecastCards()}
      </div>
    );
  }
}

export default WeatherPage;


