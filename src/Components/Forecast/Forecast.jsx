import React from 'react';
import './Forecast.css';
import shortid from 'shortid';

const forecast = (props) => {
    
    return (
        <div className="container" key={shortid.generate()}>
            <div className="Card">
                <div>
                    <p id="title">Vremea in {props.name} </p>
                    <div className="descriere">
                        <p >Descriere  : {props.weather_description} </p>
                        <div className="icon" style={{background: `url(http://openweathermap.org/img/wn/${props.weather_icon}@2x.png)`}} />
                    </div>
                </div>                
                <div className="data" >
                    <p>Nori : {props.clouds} %</p>
                    <p>Umiditate : {props.humidity} %</p>
                    <p>Soarele rasare : {props.sunrise}  </p>
                    <p>Soarele apune : {props.sunset} </p>
                    <p>Temp min : {props.tempMin} grd C </p>
                    <p>Temp max : {props.tempMax} grd C </p>
                    <p>Presiune : {props.pressure}  mb</p>
                    <p>Indice UV : {props.uvi} uvi</p>
                    <p>Viteza vant : {props.wind_speed} m/s</p>                    
                </div>
            </div>
        </div>
    );
}

export default forecast;
