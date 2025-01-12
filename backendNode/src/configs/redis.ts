import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config()

const mode = process.env.NODE_ENV?.trim()
const devUrl = "redis://localhost:6379"
const prodUrl = `redis://redis:6379`

export const redis = createClient({
    url: mode === 'prod' ? prodUrl : devUrl
})

redis.on('connect', () => {
    console.log(`[REDIS] Client connected successfully in ${process.env.NODE_ENV?.trim() === 'prod' ? 'Production' : "Development"} mode.`);
});

redis.on('error', (err) => {
    console.error('[REDIS] Connection error:', err);
});
