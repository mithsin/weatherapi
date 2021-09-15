import React, {useState} from "react";
import WeatherBlock from 'components/WeatherBlock';
import './App.css';

function App() {
  const [inputeValue, setInputValue] = useState();
  const [searchZip, setSearchZip] = useState(["10001"]);
  const [inputError, setInputError] = useState(false)
  const isValidZip = (zipcode) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

  const onSearchClick = () => {
      if(isValidZip(inputeValue)){
        setSearchZip(searchZip.concat(inputeValue));
        setInputError(false);
      } else {
        setInputError(true);
      }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
        onSearchClick();
    }
  }
  return (
    <div className="App">
        <h1>Weather Forcast</h1>
        <div className="mainSearchWrapper">
          <div className="searhBox">
            <input 
                placeholder="zip-code"
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button onClick={onSearchClick}>search</button>
          </div>
          {inputError && <div className="searhBox error">invalid zip code format</div>}
        </div>
        {searchZip.map((zip,index) => 
          <WeatherBlock
            zip={zip}
            searchZip={searchZip}
            setSearchZip={setSearchZip}
            key={index} />
        )}
        
    </div>
  );
}

export default App;
