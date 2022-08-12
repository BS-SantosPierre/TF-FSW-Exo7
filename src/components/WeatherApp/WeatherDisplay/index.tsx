import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { WeatherData } from '../../../types';
import styles from './weather-display.module.scss';

type WeatherDisplayProps = {
  city: string;
};

const defaultParams = {
  units: 'metric',
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city }) => {
  const [data, setData] = useState<WeatherData>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    fetchCurrentWeather(city);
  }, [city]);

  const fetchCurrentWeather = async (cityName: string) => {
    setData(undefined);
    setError(undefined);

    try {
      const { data } = await axios.get<WeatherData>(import.meta.env.VITE_WEATHER_API_URL, {
        params: { ...defaultParams, appId: import.meta.env.VITE_WEATHER_API_KEY, q: cityName },
      });
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error);
      }
    }
  };

  if (error) {
    return <p>Something went wrong. Try Again</p>;
  }

  if (!data) {
    return <p>...Loading</p>;
  }

  return (
    <div className={styles['weather-display']}>
      <div>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt='weather-icon'
        />
      </div>
      <div className={styles['content']}>
        <span className={styles['name']}>{data.name}</span>
        <span className={styles['temp']}>{data.main.temp}°C</span>
      </div>
    </div>
  );
};

export default WeatherDisplay;
