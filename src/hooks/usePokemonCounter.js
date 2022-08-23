import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"

export default usePokemonCounter = () => {
    const { counter, update } = useContext(PokemonContext)
    return { counter, update }
  }