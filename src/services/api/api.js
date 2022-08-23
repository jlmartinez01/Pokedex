import { RutaPrincipal } from "../../utils/constants";


export const ServiceGetPokemons = () => {
  const url = RutaPrincipal + 'pokemon';
  return fetch(url,
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error)

    })
};

export const ServiceGetDetallePokemon = (name) => {
  const url = RutaPrincipal + 'pokemon/'+name;
  return fetch(url,
    {
      method: 'GET'
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error)

    })
};