import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Router from "next/router"
import { Fade, TableSortLabel, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { useStore } from "hooks/store"
import * as styled from "./styled"

const Search = dynamic(import("components/Search"))

function itemKey(index, data) {
  return data[index].name
}

export default function Home() {
  const [run] = useStore("run")
  const [pokemons, setPokemons] = useState()
  const [size, setSize] = useState()
  const [height, setHeight] = useState(0)
  const [search, setSearch] = useState(false)
  const [sort, setSort] = useState({ orderBy: "number", direction: 1 })

  function addRef(element) {
    if (element && !size) setSize(element.clientHeight)
  }

  function handleSort({ currentTarget }) {
    const { direction: directionString, id } = currentTarget.dataset
    const direction = parseInt(directionString, 10)

    if (id === sort.orderBy) {
      setSort({ ...sort, direction: sort.direction * -1 })
    } else {
      setSort({ direction, orderBy: id })
    }
  }

  function handleOpen() {
    setSearch(true)
  }

  function handleClose() {
    setSearch(false)
  }

  function handleClick({ currentTarget }) {
    showPokemon(currentTarget.dataset.id)
  }

  function showPokemon(pokemon) {
    Router.push("/[pokemon]", `/${pokemon}`)
  }

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    run("getPokemons", sort).then(setPokemons)
  }, [run, sort])

  const direction = sort.direction === 1 ? "asc" : "desc"

  return (
    <styled.Root>
      <styled.Input
        onClick={handleOpen}>
        <IconButton component="span">
          <MenuIcon />
        </IconButton>
        <span>Search Pokémon</span>
      </styled.Input>

      <styled.Row>
        <div>
          <TableSortLabel
            onClick={handleSort}
            data-direction="1"
            data-id="number"
            active={sort.orderBy === "number"}
            direction={direction}>#</TableSortLabel>
        </div>
        <div>
          <TableSortLabel
            onClick={handleSort}
            data-direction="1"
            data-id="name"
            active={sort.orderBy === "name"}
            direction={direction}>Name</TableSortLabel>
        </div>
        <div>
          <TableSortLabel
            onClick={handleSort}
            data-direction="-1"
            data-id="dps"
            active={sort.orderBy === "dps"}
            direction={direction}>DPS</TableSortLabel>
        </div>
        <div>
          <TableSortLabel
            onClick={handleSort}
            data-direction="-1"
            data-id="tdo"
            active={sort.orderBy === "tdo"}
            direction={direction}>TDO</TableSortLabel>
        </div>
      </styled.Row>

      <Fade in={!!pokemons}>
        <styled.List
          height={height}
          itemKey={itemKey}
          itemData={pokemons}
          itemCount={pokemons?.length || 0}
          itemSize={size || 50}>
          {({ index, style }) => {
            const { number, name, tdo, dps, prettyName } = pokemons[index]
            return (
              <styled.Row
                data-id={name}
                onClick={handleClick}
                style={size ? style : undefined}
                ref={index === 0 ? addRef : undefined}>
                <div>{number}</div>
                <div>{prettyName}</div>
                <div>{dps}</div>
                <div>{tdo}</div>
              </styled.Row>
            )
          }}
        </styled.List>
      </Fade>

      {search && <Search onClose={handleClose} showPokemon={showPokemon} />}
    </styled.Root >
  )
}