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

function getComputedData() {
  const gameMaster = require("../../game-master")
  const pokemons = Object.entries(gameMaster.pokemons).reduce((acc, [name, pokemon]) => {
    const { attack, defense, stamina } = pokemon

    acc[name] = {
      ...pokemon,
      name,
      score: Math.floor(attack * defense * stamina / 10000),
    }

    return acc
  }, {})

  return { pokemons }
}



