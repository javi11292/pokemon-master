import { useEffect, useState } from "react"
import Router from "next/router"
import { Fade, TableSortLabel } from "@material-ui/core"
import { useStore } from "hooks/store"
import * as styled from "./styled"

function itemKey(index, data) {
  return data[index].name
}

export default function Home() {
  const [run] = useStore("run")
  const [pokemons, setPokemons] = useState()
  const [size, setSize] = useState()
  const [height, setHeight] = useState(0)
  const [search, setSearch] = useState("")
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

  function handleChange({ currentTarget }) {
    setSearch(currentTarget.value)
  }

  function handleKey({ key }) {
    if (key === "Enter") {
      Router.push(`/${search}`)
    }
  }

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (run) {
      run("getPokemons", sort).then(setPokemons)
    }
  }, [run, sort])

  const direction = sort.direction === 1 ? "asc" : "desc"

  return (
    <styled.Root>
      <styled.InputContainer>
        <styled.Input
          onKeyDown={handleKey}
          onChange={handleChange}
          value={search}
          placeholder="Search pokémon" />
      </styled.InputContainer>

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
            const { number, name, tdo, dps } = pokemons[index]
            return (
              <styled.Row style={size ? style : undefined} ref={index === 0 ? addRef : undefined}>
                <div>{number}</div>
                <div>{name}</div>
                <div>{dps}</div>
                <div>{tdo}</div>
              </styled.Row>
            )
          }}
        </styled.List>
      </Fade>
    </styled.Root >
  )
}