import React, { Component } from 'react';
/* import './App.css'; */
import WeatherPage from './Components/WeatherPage';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      lng: 0,
    }
  }

  takeCoordonatesFromMapClick = data => {
    this.setState({
      lat: parseFloat(data[0].trim()),
      lng: parseFloat(data[1].trim())


      /* newLat: data[0].trim(),
      newLng: data[1].trim() */
    });
    console.log('parinte', this.state)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(async position => {
      this.coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });

      console.log('curr location', this.state.lat, this.state.lng)
    })
  }

  render() {
    return (
      <WeatherPage
        lat={this.state.lat}
        lng={this.state.lng}
        coords={this.coordinates}
        functionMap={this.takeCoordonatesFromMapClick}
      />
    )

  }
}

export default App;


