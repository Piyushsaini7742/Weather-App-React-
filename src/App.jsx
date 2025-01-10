import { useEffect, useState } from "react";

function App() {
  const date = new Date();

  function inputSearch(event) {
    setSearch(event.target.value.toLowerCase());
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      setInputValue(search);
    }
  }

  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const month = date.getMonth();
  const day = date.getDate();
  const dayName = date.getDay();
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours % 12 || 12
    }:${minutes < 10 ? "0" + minutes : minutes} ${hours >= 12 ? "PM" : "AM"}`;

  const [mainData, setMainData] = useState([]);
  const [inputValue, setInputValue] = useState("pune");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [inputValue]);

  const fetchData = async () => {
    try {
      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=b87abf895c511c59dbf662c17d489357`
      );
      let data1 = await data.json();
      setMainData(data1);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-yellow-300 to-blue-300">

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">

        <div className="relative mb-6">
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="search your city..."
            onChange={inputSearch}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          {mainData.name}, {mainData?.sys?.country}
        </h1>
        <h2 className="text-sm text-gray-500">
          {weekdays[dayName]}, {monthArr[month]} {day}, {year} at {formattedTime}
        </h2>

        <div className="flex flex-col items-center my-6">
          <span className="bg-black text-white py-1 px-4 rounded-full text-sm mb-2">
            {mainData?.weather?.[0]?.main}
          </span>
          <img
            src={`https://openweathermap.org/img/wn/${mainData?.weather?.[0]?.icon}@4x.png`}
            alt="weather icon"
            className="w-20 h-20"
          />
        </div>


        <h1 className="text-5xl font-bold text-gray-800">
          {(mainData?.main?.temp - 273.15).toFixed(2)}°C
        </h1>
        <p className="text-sm text-gray-500">
          Min: {(mainData?.main?.temp_min - 273.15).toFixed(2)}°C | Max:{" "}
          {(mainData?.main?.temp_max - 273.15).toFixed(2)}°C
        </p>


        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <i className="fas fa-temperature-low text-blue-500 text-2xl"></i>
            <div>
              <p className="text-sm text-gray-500">Feels Like</p>
              <h3 className="text-lg font-medium text-gray-800">
                {(mainData?.main?.feels_like - 273.15).toFixed(2)}°C
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <i className="fas fa-tint text-blue-500 text-2xl"></i>
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <h3 className="text-lg font-medium text-gray-800">
                {mainData?.main?.humidity}%
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <i className="fas fa-wind text-blue-500 text-2xl"></i>
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <h3 className="text-lg font-medium text-gray-800">
                {mainData?.wind?.speed} m/s
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow">
            <i className="fas fa-tachometer-alt text-blue-500 text-2xl"></i>
            <div>
              <p className="text-sm text-gray-500">Pressure</p>
              <h3 className="text-lg font-medium text-gray-800">
                {mainData?.main?.pressure} hPa
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
