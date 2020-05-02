import { useEffect, useState, useRef } from "react"
import { useStore } from "hooks/store"
import { List, ListItem, ListItemText, Divider } from "@material-ui/core"
import BackIcon from "@material-ui/icons/ArrowBack"
import * as styled from "./styled"

export default function Search({ onClose, showPokemon }) {
  const inputRef = useRef()
  const [run] = useStore("run")
  const [search, setSearch] = useState("")
  const [pokemons, setPokemons] = useState()

  function handleChange({ currentTarget }) {
    setSearch(currentTarget.value)
  }

  function handleKey({ key }) {
    if (key === "Enter") {
      showPokemon(search)
    }
  }

  function handleClick({ currentTarget }) {
    showPokemon(currentTarget.dataset.id)
  }

  useEffect(() => {
    function handleFocus() {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    document.addEventListener("focus", handleFocus, true)
    return () => {
      document.removeEventListener("focus", handleFocus, true)
    }
  }, [])

  useEffect(() => {
    if (search) {
      run("getPokemon", search).then(setPokemons)
    } else {
      setPokemons()
    }
  }, [run, search])

  return (
    <styled.Root tabIndex="-1">
      <styled.InputContainer>
        <styled.Button onClick={onClose}>
          <BackIcon />
        </styled.Button>

        <styled.Input
          autoFocus
          placeholder="Search Pokémon"
          inputRef={inputRef}
          onChange={handleChange}
          onKeyDown={handleKey}
          value={search} />
      </styled.InputContainer>

      <Divider />

      <List>
        {pokemons?.map(pokemon => (
          <ListItem
            button
            onClick={handleClick}
            data-id={pokemon.name}
            key={pokemon.name}>
            <ListItemText primary={pokemon.prettyName} />
          </ListItem>
        ))}
      </List>
    </styled.Root>
  )
}