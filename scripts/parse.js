const fs = require("fs")
const rawGameMaster = require("../raw-game-master")

function getGameMaster() {
  return rawGameMaster.itemTemplate.reduce((acc, item) => {
    const { playerLevel, move, combatMove, pokemon, templateId } = item

    if (playerLevel) {
      acc.multipliers = playerLevel.cpMultiplier
    }

    else if (move) {
      const { movementId: id, pokemonType: type, power, durationMs: duration, energyDelta: energy } = move
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
      const { uniqueId: id, power, durationTurns: duration = 0.5, energyDelta: energy } = combatMove
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
      const { uniqueId: id, type1, type2, stats, quickMoves, cinematicMoves, eliteQuickMoves, eliteCinematicMoves } = pokemon

      acc.pokemons[id] = {
        number: parseInt(templateId.match(/^V(\d+)/)[1], 10),
        type1,
        type2,
        attack: stats.baseAttack,
        defense: stats.baseDefense,
        stamina: stats.baseStamina,
        quickMoves,
        cinematicMoves,
        eliteQuickMoves,
        eliteCinematicMoves,
      }
    }

    return acc
  }, { pokemons: {}, moves: {}, multipliers: null })
}

fs.writeFileSync("game-master.json", JSON.stringify(getGameMaster()))