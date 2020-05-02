import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useStore } from "hooks/store"
import * as styled from "./styled"

export default function Pokemon() {
  const router = useRouter()
  const [run] = useStore("run")
  const [pokemon, setPokemon] = useState()
  const pokemonName = router.query.pokemon

  useEffect(() => {
    run("getPokemon", pokemonName).then(setPokemon)
  }, [run, pokemonName])

  return pokemon ? (
    <styled.VideoContainer>
      <video autoPlay loop muted playsInline src={`${process.env.basePath}/pokemons/${pokemon.name}.mp4`} />

      <div>
        <div>{pokemon.attack}</div>
        <div>{pokemon.defense}</div>
        <div>{pokemon.stamina}</div>
      </div>
    </styled.VideoContainer>
  ) : null
}