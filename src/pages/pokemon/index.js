import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Fade } from "@material-ui/core"
import { useStore } from "hooks/store"
import * as styled from "./styled"

export default function Pokemon() {
  const router = useRouter()
  const [run] = useStore("run")
  const [pokemon, setPokemon] = useState()
  const [maxStats, setMaxStats] = useState()
  const [showVideo, setShowVideo] = useState(false)
  const pokemonName = router.query.pokemon

  function handleLoad() {
    setShowVideo(true)
  }

  useEffect(() => {
    run("getMaxStats").then(setMaxStats)
    run("getPokemon", pokemonName).then(setPokemon)
  }, [run, pokemonName])

  return pokemon ? (
    <>
      <styled.VideoContainer>
        <Fade in={showVideo}>
          <video onLoadedData={handleLoad} autoPlay loop muted playsInline src={`${process.env.basePath}/pokemons/${pokemon.name}.mp4`} />
        </Fade>

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
            <span>STA {pokemon.stamina}</span>
          </styled.Bar>
        </styled.Stats>
      </styled.VideoContainer>

      <styled.Name variant="h4">#{pokemon.number} {pokemon.prettyName}</styled.Name>
    </>
  ) : null
}