import { useState } from 'react';
import SearchInput from './SearchInput';
import WeatherDisplay from './WeatherDisplay';

const WeatherApp = () => {
  const [city, setCity] = useState<string>('');

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SearchInput
          label='Entrer une ville'
          placeholder='Charleroi, Belgique'
          onSearch={(cityName) => setCity(cityName)}
        />
      </div>
      {!city ? <p>Aucune ville recherché</p> : <WeatherDisplay city={city} />}
    </>
  );
};

export default WeatherApp;
