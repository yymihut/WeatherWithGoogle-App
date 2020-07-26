import React from 'react';
import './CurrentWeatherCard.css';

const weatherCard = (props) => {
    return (        
        <div className="cont">
            <p id="title">Vremea azi {props.timezone} in {props.name} </p>
            <div className="datas">
                <p>Umiditate : {props.umiditate} %</p>
                <p>Soarele rasare : {props.rasarit} </p>
                <p>Soarele apune : {props.apus} </p>
                <p>Temperatura : {props.temp} grd Celsius </p>
                <p>Presiune : {props.presiune} mb</p>
            </div>

        </div>
    );
}

export default weatherCard;
