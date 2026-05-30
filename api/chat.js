import { handleCareerChat } from '../server/lib/hfChat.mjs'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, history = [] } = req.body ?? {}
    const trimmed = typeof message === 'string' ? message.trim() : ''
    if (!trimmed) {
      return res.status(400).json({ error: 'message is required' })
    }

    const sanitized = (Array.isArray(history) ? history : [])
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))

    const reply = await handleCareerChat({
      message: trimmed.slice(0, 2000),
      history: sanitized,
    })

    return res.status(200).json({ reply })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Chat failed'
    const status = message.includes('HF_TOKEN') ? 503 : 500
    return res.status(status).json({ error: message })
  }
}
