import { createClient } from 'redis'

const client = createClient()

client.on('error', err => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Redis running...'))

client.connect()

const get = async (key: any) => {
    return await client.get(key)
}

const set = async (key: any, value: any) => {
    await client.set(key, value)
}

export default {
    get,
    set
}
