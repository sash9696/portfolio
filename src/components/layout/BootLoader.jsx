import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export const BOOT_STORAGE_KEY = 'portfolio_boot_seen'

const LINES = [
  '> initializing portfolio...',
  '> loading neural weights...',
  '> sync complete.',
]

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export default function BootLoader() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [lines, setLines] = useState(() => LINES.map(() => ''))

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (localStorage.getItem(BOOT_STORAGE_KEY)) {
      return
    }

    if (reduceMotion) {
      localStorage.setItem(BOOT_STORAGE_KEY, '1')
      return
    }

    let cancelled = false

    async function typeBoot() {
      setVisible(true)
      for (let li = 0; li < LINES.length; li += 1) {
        const full = LINES[li]
          for (let c = 0; c <= full.length; c += 1) {
            if (cancelled) return
            setLines((prev) => {
              const next = [...prev]
              next[li] = full.slice(0, c)
              return next
            })
            await delay(c === 0 ? 100 : 22)
          }
          await delay(260)
      }
      if (cancelled) return
      localStorage.setItem(BOOT_STORAGE_KEY, '1')
      setVisible(false)
    }

    typeBoot()

    return () => {
      cancelled = true
    }
  }, [reduceMotion])

  const activeLineIndex = LINES.findIndex((full, i) => lines[i] !== full)
  const showCaret = visible && activeLineIndex !== -1

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--bg-primary)] px-6"
          role="status"
          aria-live="polite"
          aria-busy="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-md font-mono text-sm text-[var(--accent-cyan)] sm:text-base">
            {LINES.map((full, i) => (
              <p key={full} className="min-h-[1.5em] text-[var(--text-primary)]">
                <span className="text-[var(--accent-cyan)]">{lines[i]}</span>
                {showCaret && i === activeLineIndex ? (
                  <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[var(--accent-cyan)] align-[-2px]" />
                ) : null}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
