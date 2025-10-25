"use strict";

/* ~~~~~ Term Project Phase 2 – Hao Li ~~~~~ */
/* Project Title: Golf Rounds and Happiness */
/* Hypothesis: As the number of golf rounds I play per week increases,
   my overall happiness level also increases. Weather and walking may also affect happiness. */

/* ~~~~~ Replace the example data below with your own project data! ~~~~~ */

let golfSessions = [
  {
    date: "2025-09-14",
    startTime: "11:30am",
    duration: "04:00", // hours:minutes
    course: "UBC Golf Club",
    weather: "Overcast (15°C)",
    holes: 18,
    score: 93,
    walking: true, // Yes = true, No = false
    happinessBefore: 6,
    happinessAfter: 8
  },
  {
    date: "2025-09-17",
    startTime: "1:00pm",
    duration: "03:58",
    course: "Mayfair Lakes",
    weather: "Cloudy (14°C)",
    holes: 18,
    score: 90,
    walking: true,
    happinessBefore: 6,
    happinessAfter: 8
  },
  {
    date: "2025-09-21",
    startTime: "12:15pm",
    duration: "04:05",
    course: "Northview",
    weather: "Partly Sunny (16°C)",
    holes: 18,
    score: 88,
    walking: true,
    happinessBefore: 7,
    happinessAfter: 10
  },
  {
    date: "2025-09-26",
    startTime: "2:00pm",
    duration: "03:59",
    course: "Quilchena",
    weather: "Light Rain (13°C)",
    holes: 18,
    score: 91,
    walking: true,
    happinessBefore: 6,
    happinessAfter: 9
  },
  {
    date: "2025-09-29",
    startTime: "3:45pm",
    duration: "04:00",
    course: "UBC Golf Club",
    weather: "Mostly Cloudy (12°C)",
    holes: 18,
    score: 95,
    walking: false,
    happinessBefore: 5,
    happinessAfter: 7
  },
  {
    date: "2025-10-03",
    startTime: "12:45pm",
    duration: "04:10",
    course: "Mayfair Lakes",
    weather: "Drizzle, Cool (12°C)",
    holes: 18,
    score: 92,
    walking: true,
    happinessBefore: 5,
    happinessAfter: 8
  },
  {
    date: "2025-10-08",
    startTime: "11:15am",
    duration: "03:55",
    course: "Northview",
    weather: "Cloudy (13°C)",
    holes: 18,
    score: 90,
    walking: true,
    happinessBefore: 6,
    happinessAfter: 8
  },
  {
    date: "2025-10-11",
    startTime: "1:20pm",
    duration: "04:05",
    course: "Quilchena",
    weather: "Partly Sunny (15°C)",
    holes: 18,
    score: 87,
    walking: true,
    happinessBefore: 7,
    happinessAfter: 10
  }
]; // list of golf sessions

// console.log(JSON.stringify(golfSessions)); // use this to validate JSON
showData(golfSessions); // required for output.js to display data on webpage
console.log(golfSessions); // output to webpage console
