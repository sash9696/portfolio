import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, Send, X } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { OPEN_PORTFOLIO_CHAT } from '../../lib/portfolioChatEvents.js'

const API_URL = '/api/chat'

const STARTER = `Hi — I'm Sahil's portfolio assistant. Ask about my work at Rakuten, CrackIt Dev, skills, or how to get in touch.`

/**
 * @typedef {{ role: 'user' | 'assistant', content: string }} ChatMessage
 */

export default function PortfolioChat() {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  /** @type {[ChatMessage[], Function]} */
  const [messages, setMessages] = useState([{ role: 'assistant', content: STARTER }])
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_PORTFOLIO_CHAT, onOpen)
    return () => window.removeEventListener(OPEN_PORTFOLIO_CHAT, onOpen)
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const el = listRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    setError(null)
    setInput('')
    const userMsg = { role: 'user', content: text }
    const history = messages.filter((m) => m.role === 'user' || m.role === 'assistant')
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.slice(-10),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Could not get a reply')
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry — I couldn't reach the chat service. Email ${profile.email} directly, or start the API with \`npm run dev:api\` and set HF_TOKEN in .env.`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="portfolio-chat-panel"
            role="dialog"
            aria-label="Chat with Sahil's portfolio assistant"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="fixed bottom-20 right-4 z-[60] flex h-[min(32rem,70svh)] w-[min(100vw-2rem,24rem)] flex-col overflow-hidden rounded-2xl border border-[var(--border-glow)] bg-[var(--bg-secondary)]/95 shadow-[0_0_40px_-8px_var(--border-glow)] backdrop-blur-md sm:right-6"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-cyan)]">
                  Career chat
                </p>
                <p className="text-sm text-[var(--text-muted)]">Powered by Hugging Face</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-white/10 hover:text-[var(--text-primary)]"
                aria-label="Close chat"
              >
                <X className="size-5" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-3"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={[
                    'max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'ml-auto bg-[var(--accent-cyan)]/15 text-[var(--text-primary)]'
                      : 'mr-auto border border-white/10 bg-[var(--bg-primary)]/80 text-[var(--text-muted)]',
                  ].join(' ')}
                >
                  {m.content}
                </div>
              ))}
              {loading ? (
                <p className="font-mono text-xs text-[var(--accent-lime)] motion-reduce:animate-none animate-pulse">
                  Thinking…
                </p>
              ) : null}
            </div>

            {error ? (
              <p className="px-4 pb-1 font-mono text-[10px] text-amber-400/90">{error}</p>
            ) : null}

            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about experience, projects…"
                  disabled={loading}
                  className="min-h-[2.75rem] flex-1 resize-none rounded-lg border border-white/15 bg-[var(--bg-primary)]/90 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-cyan)]/50"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="flex shrink-0 items-center justify-center rounded-lg border border-[var(--border-glow)] bg-[var(--accent-cyan)]/15 px-3 text-[var(--accent-cyan)] transition hover:bg-[var(--accent-cyan)]/25 disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 right-4 z-[60] flex items-center gap-2 rounded-full border border-[var(--border-glow)] bg-[var(--bg-secondary)] px-4 py-3 font-mono text-xs text-[var(--accent-cyan)] shadow-[0_0_28px_var(--border-glow)] transition hover:bg-[var(--accent-cyan)]/10 sm:right-6"
        aria-expanded={open}
        aria-controls="portfolio-chat-panel"
      >
        <MessageCircle className="size-5" aria-hidden />
        {open ? 'Close' : 'Ask Sahil'}
      </button>
    </>
  )
}
