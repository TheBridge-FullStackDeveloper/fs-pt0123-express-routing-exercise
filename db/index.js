const fs = require('fs/promises')
const path = require('path')

const getPath = (file) => path.join(__dirname, `${file}.json`)

const read = async (file) => {
    try {
        const content = JSON.parse(await fs.readFile(getPath(file)))

        return {
            ok: true,
            content,
        }
    } catch(error) {
        return {
            ok: false,
            message: error.message,
        }
    }
}

const write = async (file, content) => {
    try {
        await fs.writeFile(getPath(file), JSON.stringify(content))

        return {
            ok: true,
        }
    } catch(error) {
        return {
            ok: false,
            message: error.message,
        }
    }
}

module.exports = {
    read,
    write,
}