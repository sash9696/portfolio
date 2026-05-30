import { useEffect, useRef, useState } from 'react'

/**
 * Cycles through strings with type / pause / delete behavior.
 * @param {string[]} strings
 * @param {{ typingMs?: number, deletingMs?: number, pauseEndMs?: number, pauseBetweenMs?: number }} [opts]
 */
export function useTypewriter(
  strings,
  { typingMs = 42, deletingMs = 24, pauseEndMs = 2200, pauseBetweenMs = 400 } = {},
) {
  const [text, setText] = useState('')
  const keys = strings.join('\0')
  const r = useRef({
    si: 0,
    ci: 0,
    mode: 'typing',
  })

  useEffect(() => {
    if (!strings.length) return undefined

    r.current = { si: 0, ci: 0, mode: 'typing' }
    queueMicrotask(() => setText(''))

    let disposed = false
    let tid

    const run = () => {
      if (disposed) return
      const { si, ci, mode } = r.current
      const s = strings[si] ?? ''

      if (mode === 'typing') {
        if (ci < s.length) {
          r.current = { si, ci: ci + 1, mode: 'typing' }
          setText(s.slice(0, ci + 1))
          tid = window.setTimeout(run, typingMs)
        } else {
          tid = window.setTimeout(() => {
            if (disposed) return
            r.current = { si, ci, mode: 'deleting' }
            run()
          }, pauseEndMs)
        }
      } else if (mode === 'deleting') {
        if (ci > 0) {
          r.current = { si, ci: ci - 1, mode: 'deleting' }
          setText(s.slice(0, ci - 1))
          tid = window.setTimeout(run, deletingMs)
        } else {
          const nextSi = (si + 1) % strings.length
          tid = window.setTimeout(() => {
            if (disposed) return
            r.current = { si: nextSi, ci: 0, mode: 'typing' }
            setText('')
            run()
          }, pauseBetweenMs)
        }
      }
    }

    tid = window.setTimeout(run, typingMs)

    return () => {
      disposed = true
      window.clearTimeout(tid)
    }
  }, [keys, strings, typingMs, deletingMs, pauseEndMs, pauseBetweenMs])

  return text
}
