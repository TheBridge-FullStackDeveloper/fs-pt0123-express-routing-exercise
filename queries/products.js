const { read, write } = require('../db')
const { setLimit } = require('./utils')
const FILE = 'products'

const selectAll = async () =>
    await read(FILE)

const insertAll = async (list) =>
    await write(FILE, list)

const selectOneById = async (productId) => {
    const store = await selectAll()

    if(!store.ok) return store

    return {
        ok: true,
        content: store.content.find(({ id }) => id === Number(productId))
    }
}

const selectManyByStock = async (maxStock) => {
    const store = await selectAll()

    if(!store.ok) return store

    return {
        ok: true,
        content: store.content.filter(item => item.stock <= Number(maxStock))
    }
}

const selectManyByCategory = async (category) => {
    const store = await selectAll()

    if(!store.ok) return store

    return {
        ok: true,
        content: store.content.filter(item => item.category === category),
    }
}

const sortBySales = async ({ limit }) => {
    const store = await selectAll()

    if(!store.ok) return store

    const sorted = store.content.sort((a, b) => b.discountPercentage - a.discountPercentage)

    return {
        ok: true,
        content: limit ? setLimit(sorted, limit) : sorted,
    }
}

const insertOne = async (product) => {
    const store = await selectAll()

    if(!store.ok) return store

    const list = [...store.content, { id: store.content.length + 1, ...product }]

    const response = await insertAll(list)

    if(!response.ok) return response

    return await selectAll()
}

const updateOne = async (id, product) => {
    const store = await selectAll()

    if(!store.ok) return store

    const updatedList = store.content.map(item => {
        // return item.id === Number(id) ? { ...item, ...product } : item
        if(item.id === Number(id)) {
            return {
                ...item,
                ...product,
            }
        }
        return item
    })

    const response = await insertAll(updatedList)

    if(!response.ok) return response

    return await selectAll()
}

const deleteOne = async (id) => {
    const store = await selectAll()

    if(!store.ok) return store

    const filteredList = store.content.filter(item => item.id !== Number(id))

    const response = await insertAll(filteredList)

    if(!response.ok) return response

    return await selectAll()
}

module.exports = {
    selectAll,
    selectOneById,
    selectManyByStock,
    selectManyByCategory,
    sortBySales,
    insertOne,
    updateOne,
    deleteOne,
}