import {Search} from 'react-bootstrap-icons'

import ClearIcon from '../assets/img/clear.png'
import CloudIcon from '../assets/img/cloud.png'
import DrizzleIcon from '../assets/img/drizzle.png'
import HumidityIcon from '../assets/img/humidity.png'
import RainIcon from '../assets/img/rain.png'
import SnowIcon from '../assets/img/snow.png'
import WindIcon from '../assets/img/wind.png'
import { useState } from 'react'

let ApiKey = '1d81c3daf91fc938867c871d9620090d';

function WeatherApp() {

    
    const [WIcon, SetWIcon] = useState(CloudIcon);
    const search = async () => {

        const SearchForm = document.getElementById('search-form') as HTMLInputElement;
        let city = document.getElementById('city') as HTMLInputElement;
        let temperature = document.getElementById('temperature') as HTMLInputElement;
        let humidity = document.getElementById('humidity') as HTMLInputElement;
        let wind = document.getElementById('wind') as HTMLInputElement;
        
        if ( ! SearchForm.value )
            return false;
        
            let Url = `https://api.openweathermap.org/data/2.5/weather?q=${SearchForm.value}&units=metric&appid=${ApiKey}`;
            let response = await fetch(Url);
            let data = await response.json();
            if ( data.cod == 200 ) {
                
                if ( data.weather[0].icon === '01d' || data.weather[0].icon === '01n' ) {
                    SetWIcon( ClearIcon );
                } else if ( data.weather[0].icon === '02d' || data.weather[0].icon === '02n' ) {
                    SetWIcon( CloudIcon );
                } else if ( data.weather[0].icon === '03d' || data.weather[0].icon === '03n' ) {
                    SetWIcon( DrizzleIcon );
                } else if ( data.weather[0].icon === '04d' || data.weather[0].icon === '04n' ) {
                    SetWIcon( DrizzleIcon );
                } else if ( data.weather[0].icon === '09d' || data.weather[0].icon === '09n' ) {
                    SetWIcon( RainIcon );
                } else if ( data.weather[0].icon === '10d' || data.weather[0].icon === '10n' ) {
                    SetWIcon( RainIcon );
                } else if ( data.weather[0].icon === '13d' || data.weather[0].icon === '13n' ) {
                    SetWIcon( SnowIcon );
                } else {
                    SetWIcon( ClearIcon );
                }

                temperature.innerHTML = data.main.temp + '°c';
                humidity.innerHTML = data.main.humidity + '%';
                wind.innerHTML = data.wind.speed + 'km/h';
                city.innerHTML = data.name;
            }
            
            
    }

    return (
        <>
            <div className="main-container">
                <div className="search-box">
                    <input type="text" className="form-control search-form" id="search-form" placeholder="Type a city" />
                    <button onClick={()=>{search()}}><Search/></button>
                </div>

                <div className="results-box">
                    <div className='weather-status'>
                        <img id='weatherImg' src={WIcon}/>
                    </div>
                    <div id='temperature'>-</div>
                    <div id="city">-</div>
                    <div className='other-info'>
                        <div className='info'>
                            <img src={HumidityIcon} />
                            <span id='humidity'>-</span>
                            <span className='label'>Humidty</span>
                        </div>
                        <div className='info'>
                            <img src={WindIcon} />
                            <span id='wind'>-</span>
                            <span className='label'>Wind Speed</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}
export default WeatherApp;