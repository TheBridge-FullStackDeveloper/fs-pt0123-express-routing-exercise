const { read } = require ('../db')
const FILE = 'products'

const selectAll =async () => 
await read (FILE)

module.exports = {
    selectAll,
}