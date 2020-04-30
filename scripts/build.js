const { spawnSync } = require("child_process")
const fs = require("fs-extra")

const options = { shell: true, stdio: "inherit", env: { ...process.env, NEXT_EXPORT: true } }

function build() {
  spawnSync("next build", options)
  spawnSync("next export", options)
  fs.copySync("public/404.html", "out/404.html")
  fs.createFileSync("out/.nojekyll")
}

const promises = [fs.remove(".next"), fs.remove("out")]

Promise.all(promises).then(build)