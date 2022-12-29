const redis = require('redis')
client = redis.createClient()

client.on('error', err => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis running...'))

client.connect()

const get = async (key) => {
    return await client.get(key)
}

const set = async (key, value) => {
    await client.set(key, value)
}

module.exports = { get, set }
