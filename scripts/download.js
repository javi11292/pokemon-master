const fetch = require("node-fetch")
const fs = require("fs")
const gameMaster = require("../game-master")

function fetchVideos() {
  return Object.keys(gameMaster.pokemons).map(async pokemon => {
    const response = await fetch(`https://db.pokemongohub.net/videos/${pokemon}-small.mp4`)
      .catch(() => console.log(`Missing ${pokemon}`))
    response.body.pipe(fs.createWriteStream(`public/assets/videos/${pokemon}.mp4`))
  })
}

function fetchImages() {
  return Object.entries(gameMaster.pokemons).map(async ([name, pokemon]) => {
    const response = await fetch(`https://db.pokemongohub.net/images/official/detail/${pokemon.number.toString().padStart(3, "0")}.png`)
      .catch(() => console.log(`Missing ${name}`))
    response.body.pipe(fs.createWriteStream(`public/assets/images/${name}.png`))
  })
}

async function run() {
  await Promise.all(fetchVideos())
  await Promise.all(fetchImages())
  console.log("DONE")
}

run()