const fs = require("fs")
const rawGameMaster = require("../raw-game-master")

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

function getGameMaster() {
  return rawGameMaster.itemTemplate.reduce((acc, item) => {
    const { playerLevel, move, combatMove, pokemon, templateId } = item

    if (playerLevel) {
      acc.multipliers = playerLevel.cpMultiplier
    }

    else if (move) {
      const { movementId: id, pokemonType: type, power = 0, durationMs: duration, energyDelta: energy = -100 } = move
      const combat = acc.moves[id]?.combat

      const value = {
        type,
        power,
        duration,
        energy,
        combat,
      }

      acc.moves[id] = value
    }

    else if (combatMove) {
      const { uniqueId: id, power = 0, durationTurns: duration = 0.5, energyDelta: energy = -100 } = combatMove
      const value = acc.moves[id] || {}

      const combat = {
        power,
        duration,
        energy,
      }

      value.combat = combat
      acc.moves[id] = value
    }

    else if (pokemon) {
      const { uniqueId, type1, type2, stats, quickMoves, cinematicMoves, eliteQuickMoves, eliteCinematicMoves } = pokemon
      const id = uniqueId.split("_").map(capitalize)

      acc.pokemons[id.join("_")] = {
        prettyName: id.join(" "),
        number: parseInt(templateId.match(/^V(\d+)/)[1], 10),
        types: [type1, type2],
        attack: stats.baseAttack,
        defense: stats.baseDefense,
        stamina: stats.baseStamina,
        fastMoves: quickMoves,
        chargeMoves: cinematicMoves,
        eliteFastMoves: eliteQuickMoves,
        eliteChargeMoves: eliteCinematicMoves,
      }
    }

    return acc
  }, { pokemons: {}, moves: {}, multipliers: null })
}

fs.writeFileSync("game-master.json", JSON.stringify(getGameMaster()))