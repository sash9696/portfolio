import { buildSystemPrompt } from './buildSystemPrompt.mjs'

/** Same HF router model as linkedin-post-generator-hf / Trend Research Agent */
export const DEFAULT_HF_MODEL = 'moonshotai/Kimi-K2-Instruct-0905'

const HF_CHAT_URL = 'https://router.huggingface.co/v1/chat/completions'

/**
 * @param {{ messages: { role: string, content: string }[], model?: string, maxTokens?: number }} opts
 */
export async function chatWithHuggingFace({ messages, model, maxTokens = 512 }) {
  const token = process.env.HF_TOKEN
  if (!token) {
    throw new Error('HF_TOKEN is not set. Add a free token from huggingface.co/settings/tokens')
  }

  const modelId = model || process.env.HF_MODEL || DEFAULT_HF_MODEL

  const res = await fetch(HF_CHAT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      messages,
      max_tokens: maxTokens,
      temperature: 0.6,
      top_p: 0.9,
    }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const err =
      data?.error?.message ||
      data?.error ||
      (typeof data === 'string' ? data : null) ||
      `Hugging Face API error (${res.status})`
    throw new Error(err)
  }

  const content = data?.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Empty response from Hugging Face model')
  }

  return content.trim()
}

/**
 * @param {import('http').IncomingMessage} req
 * @returns {Promise<{ message: string, history: { role: string, content: string }[] }>}
 */
export async function parseChatBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) {
    throw new Error('Empty request body')
  }
  const body = JSON.parse(raw)
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) {
    throw new Error('message is required')
  }
  const history = Array.isArray(body.history) ? body.history : []
  const sanitized = history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))

  return { message: message.slice(0, 2000), history: sanitized }
}

/**
 * @param {{ message: string, history: { role: string, content: string }[] }} param0
 */
export async function handleCareerChat({ message, history }) {
  const system = buildSystemPrompt()
  const messages = [
    { role: 'system', content: system },
    ...history,
    { role: 'user', content: message },
  ]
  return chatWithHuggingFace({ messages })
}
