import gameMaster from "../../game-master"

const { self } = global

self.addEventListener("message", async ({ data }) => {
  const [id, ...args] = data.value
  self.postMessage({ value: await functions[id](args), id: data.id })
})

const data = getComputedData()

const functions = {
  getPokemons() {
    return Object.values(data.pokemons)
  }
}

function round(value) {
  return Math.floor(value * 100) / 100
}

function getComputedData() {
  const pokemons = Object.entries(gameMaster.pokemons).reduce((acc, [name, pokemon]) => {
    const { attack, defense, stamina } = pokemon

    acc[name] = {
      ...pokemon,
      name,
      score: round(attack * defense * stamina / 10000),
    }

    return acc
  }, {})

  return { pokemons }
}



