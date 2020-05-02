const fetch = require("node-fetch")
const fs = require("fs")
const gameMaster = require("../game-master")

const a = "https://db.pokemongohub.net/images/official/detail/002.png"

Object.keys(gameMaster.pokemons).forEach(async pokemon => {
  const interval = setInterval(() => console.log(`Getting ${pokemon}...`))
  const response = await fetch(`https://db.pokemongohub.net/videos/${pokemon}-small.mp4`)
  response.body.pipe(fs.createWriteStream(`public/assets/${pokemon}.mp4`))
  console.log("END")
  clearInterval(interval)
})