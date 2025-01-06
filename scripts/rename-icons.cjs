const fs = require('fs')
const fsp = fs.promises

const dirWithIcons = 'src/assets/icons'

async function main() {
  const files = await fsp.readdir(dirWithIcons)
  files.forEach(file => {
    const newName = file.replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '').toLowerCase()
    fs.rename(join(dirWithIcons, file), join(dirWithIcons, newName))
  })
}
void main()
