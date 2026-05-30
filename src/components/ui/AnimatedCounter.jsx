import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * @param {{ end: number, label: string, suffix?: string, duration?: number, className?: string }} props
 */
export default function AnimatedCounter({ end, label, suffix = '', duration = 1.35, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(() => (reduceMotion ? end : 0))

  useEffect(() => {
    if (!inView) return undefined
    if (reduceMotion) {
      queueMicrotask(() => setValue(end))
      return undefined
    }
    const controls = animate(0, end, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, end, duration, reduceMotion])

  return (
    <div ref={ref} className={['text-center', className].filter(Boolean).join(' ')}>
      <p className="font-mono text-3xl font-semibold tabular-nums text-[var(--accent-cyan)] sm:text-4xl">
        {value}
        {suffix ? <span className="text-[var(--accent-lime)]">{suffix}</span> : null}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
    </div>
  )
}
