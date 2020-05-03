const { self } = global

self.addEventListener("message", async ({ data }) => {
  const [id, ...args] = data.value
  self.postMessage({ value: await functions[id](...args), id: data.id })
})

const BATTLE_TIME = 30
const data = getComputedData()

const functions = {
  getMaxStats() {
    return data.maxStats
  },

  getPokemon(name) {
    return data.pokemons[name]
  },

  getPokemons({ orderBy, direction }) {
    return Object.values(data.pokemons).sort((a, b) => {
      if (typeof a[orderBy] === "string") return a[orderBy].localeCompare(b[orderBy]) * direction
      return (a[orderBy] - b[orderBy]) * direction
    })
  },

  getFilteredPokemons(filter) {
    const pokemons = Object.values(data.pokemons)
    try {
      const regExp = new RegExp(`^${filter}`, "i")
      let filteredPokemons = []
      for (let i = 0; i < pokemons.length; i++) {
        if (regExp.test(pokemons[i].name)) filteredPokemons.push(pokemons[i])
        if (filteredPokemons.length === 5) break
      }
      return filteredPokemons
    } catch { }
  },
}

function round(value) {
  return Math.round(value * 10) / 10
}

function getDPS(fast, charge, stamina) {
  if (!fast || !charge || !fast.energyDamage) return 0
  const timeToCharge = -charge.energy / (fast.energyDamage + stamina / 2 / BATTLE_TIME)
  const totalTime = charge.duration / 1000 + timeToCharge
  return round((timeToCharge * fast.dps + charge.power) / totalTime)
}

function getTDO({ types, attack, defense, stamina, fastMoves = [], chargeMoves = [] }, moves) {
  const stats = attack * defense * stamina

  function findBestMove(acc, moveName) {
    const move = moves[moveName]
    const multiplier = types.includes(move.type) ? 1.2 : 1
    if (!acc || move.energyDamage * move.dps * multiplier > acc.energyDamage * acc.dps) {
      return {
        ...move,
        power: move.power * multiplier,
        dps: move.dps * multiplier,
      }
    } else return acc
  }

  const bestFastMove = fastMoves.reduce(findBestMove, null)
  const bestChargeMove = chargeMoves.reduce(findBestMove, null)
  const dps = getDPS(bestFastMove, bestChargeMove, stamina)

  return { tdo: round(stats * dps / (2 * Math.pow(10, 5))), dps: round(dps * attack / 20) }
}

function getComputedData() {
  const gameMaster = require("../../game-master")

  const moves = Object.entries(gameMaster.moves).reduce((acc, [name, move]) => {
    acc[name] = {
      ...move,
      name,
      dps: round(move.power * 1000 / move.duration),
      energyDamage: move.energy > 0 ? round(move.energy * 1000 / move.duration) : round(move.power / -move.energy),
    }

    return acc
  }, {})

  const maxStats = {
    attack: 0,
    defense: 0,
    stamina: 0,
  }

  const pokemons = Object.entries(gameMaster.pokemons).reduce((acc, [name, pokemon]) => {
    if (pokemon.attack > maxStats.attack) maxStats.attack = pokemon.attack
    if (pokemon.defense > maxStats.defense) maxStats.defense = pokemon.defense
    if (pokemon.stamina > maxStats.stamina) maxStats.stamina = pokemon.stamina

    acc[name] = {
      ...pokemon,
      ...getTDO(pokemon, moves),
      name,
    }

    return acc
  }, {})

  return { pokemons, moves, maxStats }
}



