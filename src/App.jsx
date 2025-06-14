import { useEffect, useState } from "react";
import Prayer from "./component/Prayer"

function App() {

  const [prayerTimes, setPrayerTimes] = useState({})
  const [dateValue, setDateValue] = useState("")
  const [city, setCity] = useState("Cairo")

  const cities = [ 
    { name: "القاهرة", value: "Cairo" }, 
    { name: "الإسكندرية", value: "Alexandria" }, 
    { name: "الجيزة", value: "Giza" }, 
    { name: "قـنا", value: "Qena" }, 
    { name: "اسوان", value: "Aswan" }, 
    { name: "الأقصر", value: "Luxor" } 
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try{
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5&adjustment=+1`)
        const date_prayer = await response.json()

        setPrayerTimes(date_prayer.data.timings)

        setDateValue(date_prayer.data.date.gregorian.date)

        console.log(date_prayer.data)
      } catch(error){
        console.error(error)
      }
    }

    fetchPrayerTimes()
  },[city])

  const formateTimes = (time) => {
    if(!time) {
      return "00:00";
    }

    let [hours, minutes] = time.split(":").map(Number)
    const pard = hours >= 12? "PM" : "AM";
    hours = hours % 12 || 12;
    return`${hours}:${minutes < 10? "0" + minutes : minutes} ${pard}`
  }

  return (
    <section>
      <div className="container">
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_obj) => (
                <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateValue || "جاري التحميل ..."}</h4>
          </div>

        </div>

        <Prayer name="الفجر" time={formateTimes(prayerTimes.Fajr)} />
        <Prayer name="الظهر" time={formateTimes(prayerTimes.Dhuhr)} />
        <Prayer name="العصر" time={formateTimes(prayerTimes.Asr)} />
        <Prayer name="المغرب" time={formateTimes(prayerTimes.Maghrib)} />
        <Prayer name="العشاء" time={formateTimes(prayerTimes.Isha)} />
        <div className="bottom-sec"></div>
      </div>
    </section>
  )
}

export default App
