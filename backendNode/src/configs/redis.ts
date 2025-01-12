import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config()

const mode = process.env.NODE_ENV?.trim()
const devUrl = "redis://localhost:6379"
const prodUrl = `redis://redis:6379`
const url = mode === 'prod' ? prodUrl : devUrl
export const redis = createClient({
    url: url
})

redis.on('connect', () => {
    console.log(`[REDIS] Client connected successfully with ${url}.`);
});

redis.on('error', (err) => {
    console.error(`[REDIS] ${url} Connection error:`, err);
});
