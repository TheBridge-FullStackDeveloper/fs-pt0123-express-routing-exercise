const calculateAge = (date = new Date()) => {
    const now = Date.now()
    const tsDate = new Date(date).getTime()
    return Math.floor(now - tsDate) / 1000 / 60 / 60 / 24 / 365
}

const mask = (str = '') => str.slice(-4).padStart(card.length, '*')

module.exports = {
    calculateAge,
    mask,
}