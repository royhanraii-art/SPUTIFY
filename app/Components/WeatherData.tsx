'use client'
import React, { useEffect, useState } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { WiDaySunny, WiCloudy, WiRain, WiNightClear, WiSnow } from 'react-icons/wi'
import { FaMusic } from 'react-icons/fa'

import { useHome } from '../Zustnd/HomePage'

// 🎵 Music Map
const MusicGenres: Record<string, string> = {
  // Clear
  'clear_day_hot_summer': 'EDM / Party',
  'clear_day_warm_summer': 'Pop / Feel Good',
  'clear_day_cool_spring': 'Indie / Soft Rock',
  'clear_day_cool_autumn': 'Indie / Chill',
  'clear_day_cold_winter': 'Acoustic / Calm',
  'clear_night_hot_summer': 'Chill / Lo-Fi Beats',
  'clear_night_warm_summer': 'Chill / Acoustic',
  'clear_night_cool_spring': 'Soft Jazz / Slow Pop',
  'clear_night_cold_winter': 'Piano / Calm Night',
  // Cloudy
  'cloudy_day_hot_summer': 'Pop / Chill Hits',
  'cloudy_day_warm_summer': 'Indie / Chill',
  'cloudy_day_cool_spring': 'Acoustic / Soft',
  'cloudy_day_cold_winter': 'Lofi / Rainy Vibes',
  'cloudy_night_warm_summer': 'Lofi / Chill',
  'cloudy_night_cool_spring': 'Indie / Chill Night',
  'cloudy_night_cold_winter': 'Slow Jazz / Piano',
  // Rain
  'rain_day_hot_summer': 'Lo-Fi / Rain Beats',
  'rain_day_warm_summer': 'Lo-Fi / Chill',
  'rain_day_cool_spring': 'Rainy Jazz / Acoustic',
  'rain_day_cold_winter': 'Sad Lo-Fi / Piano',
  'rain_night_hot_summer': 'Lo-Fi / Rain Vibes',
  'rain_night_warm_summer': 'Rainy Chill / Lo-Fi',
  'rain_night_cool_spring': 'Rainy Jazz / Calm',
  'rain_night_cold_winter': 'Slow Piano / Sad',
  // Snow
  'snow_day_cold_winter': 'Soft Jazz / Winter Chill',
  'snow_night_cold_winter': 'Piano / Cozy Night',
  // Default
  'default': 'Calm / Soft Music'
}

// 🎯 Helper function
const getMusicFromMap = (
  weather: 'clear' | 'cloudy' | 'rain' | 'snow' | 'fog' | 'storm',
  tempC: number,
  isDay: number,
  month: number
) => {
  let temp: 'hot' | 'warm' | 'cool' | 'cold' = 'warm'
  if (tempC >= 30) temp = 'hot'
  else if (tempC >= 20) temp = 'warm'
  else if (tempC >= 10) temp = 'cool'
  else temp = 'cold'

  const time = isDay ? 'day' : 'night'

  let season: 'spring' | 'summer' | 'autumn' | 'winter' = 'summer'
  if ([3, 4, 5].includes(month)) season = 'spring'
  else if ([6, 7, 8].includes(month)) season = 'summer'
  else if ([9, 10, 11].includes(month)) season = 'autumn'
  else season = 'winter'

  const key = `${weather}_${time}_${temp}_${season}`
  return MusicGenres[key] || MusicGenres['default']
}

const WeatherData = () => {
  const [loading, setLoading] = useState(true)
  const [place, setPlace] = useState('Detecting location...')
  const [weatherCode, setWeatherCode] = useState<number>(0)
  const [isDay, setIsDay] = useState<number>(1)
  const [temp, setTemp] = useState<number>(0)
  const [music, setMusic] = useState<string>('')

  const { setLoadingPage, setmood, setlocation } = useHome()

  // 🌍 Automatic location detection on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setPlace('Geolocation not supported')
      setLoading(false)
      setLoadingPage(false)
      return
    }

    setLoading(true)
    setLoadingPage(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        getPlaceName(lat, lon)
        getWeather(lat, lon)
      },
      () => {
        setPlace('Permission denied')
        setLoading(false)
        setLoadingPage(false)
        setlocation(false)
      }
    )
  }, [])

  const getPlaceName = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}`
      )
      const data = await res.json()
      setPlace(data.city || data.locality || 'Unknown place')
    } catch {
      setPlace('Location error')
    }
  }

  const getWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      )
      const data = await res.json()

      setTemp(data.current_weather.temperature)
      setWeatherCode(data.current_weather.weathercode)
      setIsDay(data.current_weather.is_day)

      let weatherType: 'clear' | 'cloudy' | 'rain' | 'snow' | 'fog' | 'storm' = 'clear'
      const code = data.current_weather.weathercode
      if (code === 0) weatherType = 'clear'
      else if (code >= 1 && code <= 3) weatherType = 'cloudy'
      else if (code >= 51 && code <= 67) weatherType = 'rain'
      else if (code >= 71 && code <= 77) weatherType = 'snow'
      else if (code >= 80 && code <= 82) weatherType = 'rain'
      else weatherType = 'fog'

      const month = new Date().getMonth() + 1
      const mood = getMusicFromMap(weatherType, data.current_weather.temperature, data.current_weather.is_day, month)
      setMusic(mood)
      setmood(mood)
    } catch {
      setPlace('Weather fetch error')
    } finally {
      setLoading(false)
      setLoadingPage(false)
    }
  }

  const getWeatherIcon = () => {
    if (!isDay) return <WiNightClear size={70} />
    if (weatherCode === 0) return <WiDaySunny size={70} />
    if (weatherCode >= 1 && weatherCode <= 3) return <WiCloudy size={70} />
    if (weatherCode >= 51 && weatherCode <= 82) return <WiRain size={70} />
    if (weatherCode >= 71 && weatherCode <= 77) return <WiSnow size={70} />
    return <WiCloudy size={70} />
  }

  return (
    <div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-xl m-2 shadow-xl p-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-44">
          <VscLoading className="text-4xl animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Weather</p>
              <h2 className="text-lg font-bold">{place}</h2>
              <p className="text-3xl font-semibold">{temp}°C</p>
            </div>
            <div>{getWeatherIcon()}</div>
          </div>

          <hr className="my-3 opacity-30" />

          <div className="flex items-center gap-2">
            <FaMusic />
            <p className="text-sm">
              Music for now: <b>{music}</b>
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default WeatherData
