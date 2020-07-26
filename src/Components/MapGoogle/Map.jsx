import React, { Component } from 'react';
import './Map.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.mapStyles = {
            top: "130px",
            height: "60vh",
            width: "100%",
            display: "flex"
        };
        this.state = {
            lat: 0,
            lng: 0,
        }
        
    }

    handleChange = event => {
        this.props.onchange(event.target.value)
    }

    
    render() {
        return (
            <LoadScript googleMapsApiKey='AIzaSyA_7WB0qubHUgC5vKgzaDQp5X37GM3sGhs'>
                <GoogleMap
                    mapContainerStyle={this.mapStyles}
                    zoom={13}
                    center={this.props.defaultCenter }
                    onClick={event=> {
                        let coords = event.latLng.toString()                                                
                        let res = coords.replace(/[{()}]/g,'').split(',')
                        console.log(res)
                        this.setState({
                            lat: parseFloat(res[0].trim()),
                            lng: parseFloat(res[1].trim())
                          });
                          console.log('GoogleMap', this.state )
                          console.log('this.props.defaultCenter', this.props.defaultCenter) 
                        this.props.onchange(res);
                    }}
                    
                >
                    <Marker position={this.state.lat ? this.state : this.props.defaultCenter } />
                </GoogleMap>
            </LoadScript>
        )
    }
}

export default MapContainer;