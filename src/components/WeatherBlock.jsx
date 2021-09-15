import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles.scss';

const WeatherBlock = ({
    zip,
    searchZip,
    setSearchZip
}) => {
    const [inputeValue, setInputValue] = useState(zip);
    const [weatherForcast, setWeatherForcast] = useState()
    const [edit, setEdit] = useState(false)
    const [inputError, setInputError] = useState(false)
    useEffect(()=>{
        axios.get(`/api/weathertoday/?zip=${zip}`)
          .then(res => {
            setWeatherForcast(res.data)
        });
    },[zip])
    const image = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const DisplayBlock = ({wd}) => {
        const dtConverter = (dt) => {
           const date = new Date(dt * 1000);
           return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        }
        const date = wd?.dt ? dtConverter(wd?.dt) : `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
        return(
            <div 
                tabIndex="0"
                className="displayWrapper">
                <span className="displayInfo" >
                    <span>{date}</span>
                    <div>
                        {wd?.temp?.max}&#176; / {wd?.temp?.min}&#176;
                    </div>
                    <div>{wd?.weather?.[0]?.description}</div>
                </span>
                <span>
                    <img src={image(wd?.weather?.[0]?.icon)} alt="icon" />
                </span>
            </div>
        );
    };
    const isValidZip = (zipcode) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
    const onClickSearchZipCode = () => {
        if(isValidZip(inputeValue)){
            setSearchZip(searchZip.map(zipNumber => {
                return zipNumber === zip ? inputeValue : zipNumber
            }))
            setEdit(false)
        } else {
            setInputError(true);
        }
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            onClickSearchZipCode()
        }
    }
    return(
        <div className="DisplayBlockWrapper">
            {weatherForcast?.name && 
                <div className="titleWrapper">
                    <span><b>City:</b> {weatherForcast?.name}</span>
                    <button className="editButton" onClick={()=>setEdit(!edit)}>Edit</button>
                </div>
            }
            {edit &&
                <>
                    <div className="searhBox">
                        <input 
                            placeholder="zip-code"
                            value={inputeValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onFocus={()=> setInputError(false)}
                        />
                        <button onClick={onClickSearchZipCode}>search</button>
                        <button className="deleteButton" onClick={()=>{
                            setSearchZip(searchZip.filter(zipNumber=> zipNumber !== zip))
                        }}>Delete</button>
                    </div>
                    {inputError && <div className="searhBox error">invalid zipcode input</div>}
                </>
               
            }
            <div className="forcastWrapper">
                {weatherForcast?.daily?.slice(0,4)?.map((list, index) => <DisplayBlock wd={list} key={index}/>)}
            </div>
        </div>
    );
};

export default WeatherBlock;