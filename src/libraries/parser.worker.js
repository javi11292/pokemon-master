const { self } = global

self.addEventListener("message", async ({ data }) => {
  const [id, ...args] = data.value
  self.postMessage({ value: await functions[id](...args), id: data.id })
})

const data = getComputedData()

const functions = {
  getPokemons({ orderBy, direction }) {
    return Object.values(data.pokemons).sort((a, b) => {
      if (typeof a[orderBy] === "string") return a[orderBy].localeCompare(b[orderBy]) * direction
      return (a[orderBy] - b[orderBy]) * direction
    })
  }
}

function round(value) {
  return Math.round(value * 10) / 10
}

function getDPS(fast, charge) {
  if (!fast || !charge || !fast.energyDamage) return 0
  const timeToCharge = -charge.energy / fast.energyDamage
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
  const dps = getDPS(bestFastMove, bestChargeMove)

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

  const pokemons = Object.entries(gameMaster.pokemons).reduce((acc, [name, pokemon]) => {
    acc[name] = {
      ...pokemon,
      ...getTDO(pokemon, moves),
      name,
    }

    return acc
  }, {})

  return { pokemons, moves }
}



