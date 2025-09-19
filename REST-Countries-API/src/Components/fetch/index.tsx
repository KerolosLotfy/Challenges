import data from "./data.json"
import { type objData } from "./types"

export const getData = {
    newData: data.map((obj) => {
        return {
            name: obj.name,
            nativeName: obj.nativeName,
            capital: obj.capital,
            population: obj.population,
            region: obj.region,
            flag: obj.flag,
            subregion: obj.subregion,
            currencies: obj.currencies,
            languages: obj.languages,
            topLevelDomain: obj.topLevelDomain,
            borders: obj.borders,
            alpha3Code: obj.alpha3Code
        }
    }) as objData[],

    regions: data.map((obj) => obj.region).filter((v, i, a) => a.indexOf(v) === i),

    all: function () {
        return this.newData;
    },

    byCountry: function (name: string) {
        const d = this.newData.filter((obj: objData) => obj.name.toLowerCase().includes(name.toLowerCase()));
        return d; // object
    },

    byResgion: (region: string) => {
        const d = getData.newData.filter((obj) => obj.region == region)
        return d  // array of Object
    },

    byCode3: (code: string) => {
        const d = getData.newData.filter((obj) => obj.alpha3Code == code)
        return d[0]  // array of Object
    },
}