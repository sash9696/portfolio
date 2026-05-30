import { existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { config } from 'dotenv'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleCareerChat, parseChatBody } from './lib/hfChat.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Same HF_TOKEN as Trend Research / linkedin-post-generator-hf on Hugging Face
const trendAppEnv = join(__dirname, '../../AII/linkedin-post-generator-hf/.env')
if (existsSync(trendAppEnv)) {
  config({ path: trendAppEnv })
}
config({ path: join(__dirname, '../.env'), override: true })

const PORT = Number(process.env.CHAT_API_PORT) || 8787

const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true, hasToken: Boolean(process.env.HF_TOKEN) }))
    return
  }

  if (req.method !== 'POST' || req.url !== '/api/chat') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
    return
  }

  try {
    const body = await parseChatBody(req)
    const reply = await handleCareerChat(body)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ reply }))
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Chat failed'
    const status = message.includes('HF_TOKEN') ? 503 : 400
    res.writeHead(status, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: message }))
  }
})

server.listen(PORT, () => {
  console.log(`Career chat API http://localhost:${PORT}/api/chat`)
  if (!process.env.HF_TOKEN) {
    console.warn('Warning: HF_TOKEN not set — copy .env.example to .env')
  }
})
