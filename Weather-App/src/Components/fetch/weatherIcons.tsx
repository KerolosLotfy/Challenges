import sunny from '../../assets/images/icon-sunny.webp'
import overcast from '../../assets/images/icon-overcast.webp'
import drizzle from "../../assets/images/icon-drizzle.webp"
import fog from "../../assets/images/icon-fog.webp"
import cloudy from "../../assets/images/icon-partly-cloudy.webp"
import rain from "../../assets/images/icon-rain.webp"
import snow from "../../assets/images/icon-snow.webp"
import storm from "../../assets/images/icon-storm.webp"
import night from "../../assets/images/icons8-night-wind-100.png"

// Weather Icons Based on Weather Code
export const weatherIcons = {
    0: { d: sunny, n: 'https://img.icons8.com/plumpy/24/moon-satellite.png' },
    1: { d: cloudy, n: 'https://img.icons8.com/material-outlined/24/partly-cloudy-night.png' },
    2: { d: cloudy, n: night },
    3: { d: overcast, n: night },
    45: { d: fog, n: 'https://img.icons8.com/emoji/48/fog.png' },
    48: { d: fog, n: 'https://img.icons8.com/emoji/48/fog.png' },
    51: { d: drizzle, n: 'https://img.icons8.com/ios-glyphs/30/light-rain.png' },
    53: { d: drizzle, n: 'https://img.icons8.com/ios-glyphs/30/light-rain.png' },
    55: { d: drizzle, n: 'https://img.icons8.com/ios-glyphs/30/light-rain.png' },
    56: { d: drizzle, n: 'https://img.icons8.com/color/48/sleet.png' }, // freezing Drizzle
    57: { d: drizzle, n: 'https://img.icons8.com/color/48/sleet.png' },  // freezing Drizzle
    61: { d: rain, n: 'https://img.icons8.com/material-rounded/24/rain--v1.png' },
    63: { d: rain, n: 'https://img.icons8.com/material-rounded/24/rain--v1.png' },
    65: { d: rain, n: 'https://img.icons8.com/fluency/48/heavy-rain.png' }, // Heavy Rain
    66: { d: rain, n: 'https://img.icons8.com/fluency/48/heavy-rain.png' }, // Freezing Rain
    67: { d: rain, n: 'https://img.icons8.com/fluency/48/heavy-rain.png' }, // Freezing Rain
    71: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    73: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    75: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    77: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    80: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    81: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    82: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    85: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    86: { d: snow, n: 'https://img.icons8.com/forma-bold/24/snow-storm.png' },
    95: { d: storm, n: 'https://img.icons8.com/material-rounded/24/storm.png' },
    96: { d: storm, n: 'https://img.icons8.com/material-rounded/24/storm.png' },
    99: { d: storm, n: 'https://img.icons8.com/material-rounded/24/storm.png' },
}