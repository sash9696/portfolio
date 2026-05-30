import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/**
 * @param {{ label: string, value: number }} props value 0–100
 */
export default function SkillBar({ label, value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })
  const reduce = useReducedMotion()
  const [w, setW] = useState(() => (reduce ? value : 0))

  useEffect(() => {
    if (!inView) return undefined
    if (reduce) {
      queueMicrotask(() => setW(value))
      return undefined
    }
    const t = window.setTimeout(() => {
      queueMicrotask(() => setW(value))
    }, 80)
    return () => window.clearTimeout(t)
  }, [inView, value, reduce])

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between font-mono text-[11px] text-[var(--text-muted)]">
        <span className="text-[var(--text-primary)]">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-cyan)] to-[var(--accent-lime)]"
          initial={false}
          animate={{ width: `${w}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
