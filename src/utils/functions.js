import { ServiceGetDetallePokemon, ServiceGetPokemons } from "../services/api/api";
import {showMessage} from 'react-native-flash-message'
import { colorPrimario, colorSecundario } from "./designSystem";

export default function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));        

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}

export function getPokemons() {
    return new Promise((resolve, reject) => {
    ServiceGetPokemons()
        .then((res) => {
                const pokemones = res.results
                resolve(pokemones)
        }).catch(() => {
            reject()
            showMessage({
                message: 'Error en el servidor',
                backgroundColor: colorPrimario,
                color: colorSecundario,
                type: "info",
            });
        })
    })
}

export function getDetallePokemon(name) {
    return new Promise((resolve, reject) => {
    ServiceGetDetallePokemon(name)
        .then((res) => {
                const obj={
                    moves:res.moves,
                    types:res.types
                }
                resolve(obj)
        }).catch(() => {
            reject()
            showMessage({
                message: 'Error en el servidor',
                backgroundColor: colorPrimario,
                color: colorSecundario,
                type: "info",
            });
        })
    })
}