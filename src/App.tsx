/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";
import CounterDown from "./CounterDown";
import { TimeType } from "./models/enums/TimeTypes";
import starsImage from "/images/bg-stars.svg";
import hillsImage from "/images/pattern-hills.svg";

function App() {
  const finalDate = new Date("2024-12-10");
  const [date, setDate] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    months: 0,
    years: 0,
  });
  useEffect(() => {
    console.log(starsImage);
    const updateDateDifference = () => {
      const now = new Date();
      const DiffAsMs = finalDate.getTime() - now.getTime();

      if (DiffAsMs <= 0) {
        // Handle the case when the countdown is finished
        setDate({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const seconds = Math.floor((DiffAsMs / 1000) % 60);
      const minutes = Math.floor((DiffAsMs / 1000 / 60) % 60);
      const hours = Math.floor((DiffAsMs / (1000 * 60 * 60)) % 24);
      const days = Math.floor((DiffAsMs / (1000 * 60 * 60 * 24)) % 30);
      const months = Math.floor((DiffAsMs / (1000 * 60 * 60 * 24 * 30)) % 12);
      const years = Math.floor(DiffAsMs / (1000 * 60 * 60 * 24 * 365));

      setDate({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      });
    };

    // Update immediately
    updateDateDifference();

    // Set up an interval to update every second
    const intervalId = setInterval(updateDateDifference, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main" style={{ backgroundImage: `url(${starsImage})` }}>
      <h1>we're coming soon</h1>
      <div className="container">
        <CounterDown type={TimeType.Day} count={date.days} />
        <CounterDown type={TimeType.Hour} count={date.hours} />
        <CounterDown type={TimeType.Minute} count={date.minutes} />
        <CounterDown type={TimeType.Second} count={date.seconds} />
      </div>
      <img src={hillsImage} alt="" className="hills-image" />
    </div>
  );
}

export default App;
