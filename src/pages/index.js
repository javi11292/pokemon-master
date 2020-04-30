import { useEffect, useState } from "react"
import { Fade } from "@material-ui/core"
import { useStore } from "hooks/store"
import { FixedSizeList as List } from "react-window"
import * as styled from "./styled"

function itemKey(index, data) {
  return data[index].name
}

export default function Home() {
  const [run] = useStore("run")
  const [pokemons, setPokemons] = useState()
  const [size, setSize] = useState()
  const [height, setHeight] = useState(0)

  function addRef(element) {
    if (element) setSize(element.clientHeight)
  }

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    if (run) {
      run("getPokemons").then(setPokemons)
    }
  }, [run])

  return (
    <styled.Root>
      <styled.Row>
        <div>#</div>
        <div>Name</div>
        <div>Score</div>
        <div>DPS</div>
      </styled.Row>

      <Fade in={!!pokemons}>
        <List
          height={height}
          itemKey={itemKey}
          itemData={pokemons}
          itemCount={pokemons?.length || 0}
          itemSize={size || 50}>
          {({ index, style }) => {
            const { number, name, score } = pokemons[index]
            return (
              <styled.Row style={size ? style : undefined} ref={index === 0 ? addRef : undefined}>
                <div>{number}</div>
                <div>{name}</div>
                <div>{score}</div>
                <div>-</div>
              </styled.Row>
            )
          }}
        </List>
      </Fade>
    </styled.Root >
  )
}