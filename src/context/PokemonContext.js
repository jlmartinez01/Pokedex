
import React, { useContext, useState } from 'react'

export const PokemonContext = React.createContext()

export const PokemonProvider = ({ children }) => {
  const [counter, setCounter] = useState(0)

  return (
    <PokemonContext.Provider value={{ counter, update: setCounter }}>
      {children}
    </PokemonContext.Provider>
  )
}
