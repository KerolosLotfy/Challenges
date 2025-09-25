type location = {
    latitude: number,
    longitude: number,
}

type geonames = {
    geonames: [{
        countryName: string,
        countryCode: string,
        name: string
    }]
}


type weatherData = {
    current: {
        time: Date,
        temperature_2m: number,
        relative_humidity_2m: number,
        apparent_temperature: number,
        precipitation: number,
        weather_code: number,
        wind_speed_10m: number,
        is_day: number,
    },
    hourly: {
        time: Date[],
        temperature_2m: Float32Array<ArrayBufferLike> | null,
        weather_code: Float32Array<ArrayBufferLike> | null,
        is_day: Float32Array<ArrayBufferLike> | null
    },
    daily: {
        time: Date[],
        temperature_2m_max: Float32Array<ArrayBufferLike> | null,
        temperature_2m_min: Float32Array<ArrayBufferLike> | null,
        weather_code: Float32Array<ArrayBufferLike> | null,
        temperature_2m_mean: Float32Array<ArrayBufferLike> | null,
        apparent_temperature_mean: Float32Array<ArrayBufferLike> | null,
        wind_speed_10m_mean: Float32Array<ArrayBufferLike> | null,
        relative_humidity_2m_mean: Float32Array<ArrayBufferLike> | null,
        precipitation_probability_mean: Float32Array<ArrayBufferLike> | null,
    },
    geonames: geonames["geonames"]

}

type geocoding = [
    {
        id: number,
        country: string,
        country_code: string,
        name: string,
        latitude: number,
        longitude: number

    }
]


export interface DataTypes {
    location: location;
    weatherData: weatherData;
    geonames: geonames;
    geocoding: geocoding;
}