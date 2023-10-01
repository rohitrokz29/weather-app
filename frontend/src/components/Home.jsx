import React, { useState } from "react";
import axios from 'axios';
import '../styles/home.css';

const Home = () => {

    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState('');
    const [message, setMessage] = useState('Enter Location in Search Box');

    const getWeatherReport = async (e) => {
        e.preventDefault();
        try {
            setMessage("Getting Your Reoprt")
            setWeather('');
            let report = await axios.get(`http://localhost:3000/api/${location}`);
            if (report.data.resolvedAddress) {
                let location = report.data.resolvedAddress;
                let { temp, humidity, windspeed, datetime } = report.data.currentConditions;
                setWeather({ location, temp, humidity, windspeed, datetime });
                return;
            }
            setWeather('');
            setMessage("OOPS! Location Not Found");


        } catch (error) {
            setMessage("OOPS! Server Busy!");
        }
    }
    const handleChange = (e) => {
        setLocation(location => e.target.value);
    }
    return (
        <>
            <main className="main">
                <form className="search-box" onSubmit={getWeatherReport}>
                    <input type="search" name="location" id="location" placeholder="Enter Location" value={location} onChange={handleChange} />
                    <i className="fa-solid fa-magnifying-glass" onClick={getWeatherReport}></i>
                </form>
                {
                    weather.location ? <>
                        <WeatherCard weather={weather} />
                    </>
                        :
                        <NoSearch message={message} />
                }
            </main>
        </>
    )
}
export default Home;


const WeatherCard = ({ weather }) => {
    const date = new Date();
    return (
        <>
            <div className="card card-grid">
                <div className="head">
                    <div className="date">
                        {date.toDateString()}
                        <br />
                        <div className="time">
                            {weather?.datetime.slice(0, 5)}
                        </div>
                    </div>
                </div>

                <div className="location">
                    {weather?.location}
                </div>
                <ul className="weather">
                    <li className="weather-item">
                        <h3>Temp</h3>
                        <span>{weather?.temp} &#8451; </span>
                    </li>
                    <li className="weather-item">
                        <h3>Humidity</h3>
                        <span>{weather?.humidity} %</span>
                    </li>
                    <li className="weather-item">
                        <h3>Wind</h3>
                        <span>{weather?.windspeed} km/h</span>
                    </li>

                </ul>
            </div>
        </>
    )
}

const NoSearch = ({ message }) => {
    return (
        <>
            <div className="card nosearch ">
                {message}
            </div>
        </>
    )
}