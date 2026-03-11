import { useState } from 'react'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  
  // 1. New Memory: Track which unit the user wants (Defaults to Fahrenheit)
  const [isFahrenheit, setIsFahrenheit] = useState(true)

  const fetchWeather = async (e) => {
    e.preventDefault()
    setError('')
    setWeather(null)

    try {
      const response = await fetch(`http://localhost:8000/api/weather/${city}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setWeather(data)
      }
    } catch (err) {
      setError('Failed to connect to the backend server.')
    }
  }

  // 2. The Math: Convert Celsius to Fahrenheit if the toggle is set to true
  const displayTemp = weather 
    ? (isFahrenheit ? Math.round((weather.temperature * 9/5) + 32) : Math.round(weather.temperature))
    : null;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Weather Dashboard</h1>

        <form onSubmit={fetchWeather} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a city (e.g., Reno)..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">{error}</div>
        )}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">{weather.city}</h2>
            
            <div className="flex flex-col items-center my-4">
              <div className="flex justify-center items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt="Weather icon"
                  className="w-20 h-20"
                />
                {/* 3. Display the calculated temperature and the correct letter */}
                <span className="text-5xl font-bold text-gray-800">
                  {displayTemp}°{isFahrenheit ? 'F' : 'C'}
                </span>
              </div>
              
              {/* 4. The Toggle Button */}
              <button 
                onClick={() => setIsFahrenheit(!isFahrenheit)}
                className="mt-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1 rounded-full"
              >
                Switch to °{isFahrenheit ? 'C' : 'F'}
              </button>
            </div>
            
            <p className="text-gray-600 text-xl capitalize font-medium">{weather.description}</p>
            
            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-center gap-4">
              <p className="text-gray-500">
                Humidity: <span className="font-semibold text-gray-700">{weather.humidity}%</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App