import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useStore } from "hooks/store"
import * as styled from "./styled"

export default function Pokemon() {
  const router = useRouter()
  const [run] = useStore("run")
  const [pokemon, setPokemon] = useState()
  const [maxStats, setMaxStats] = useState()
  const pokemonName = router.query.pokemon

  useEffect(() => {
    run("getMaxStats").then(setMaxStats)
    run("getPokemon", pokemonName).then(setPokemon)
  }, [run, pokemonName])

  return pokemon ? (
    <styled.VideoContainer>
      <video autoPlay loop muted playsInline src={`${process.env.basePath}/pokemons/${pokemon.name}.mp4`} />

      <styled.Stats>
        <styled.Bar value={pokemon.attack * 100 / maxStats.attack}>
          <div />
          <span>ATK {pokemon.attack}</span>
        </styled.Bar>
        <styled.Bar value={pokemon.defense * 100 / maxStats.defense}>
          <div />
          <span>DEF {pokemon.defense}</span>
        </styled.Bar>
        <styled.Bar value={pokemon.stamina * 100 / maxStats.stamina}>
          <div />
          <span>STA {pokemon.attack}</span>
        </styled.Bar>
      </styled.Stats>
    </styled.VideoContainer>
  ) : null
}