import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/**
 * @param {{ items: { id: string, title: string, org: string, date: string, description: string }[] }} props
 */
export default function TimelineSection({ items }) {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()

  return (
    <section className="mt-16 sm:mt-20">
      <h2 className="font-mono text-xl font-semibold text-[var(--text-primary)]">Timeline</h2>
      <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
        Milestones across research, product ML, and education — animated on first scroll into view.
      </p>

      <div ref={lineRef} className="relative mx-auto mt-10 max-w-3xl pl-6 sm:pl-8">
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-lime)]/40 sm:left-[15px]"
          style={{ transformOrigin: 'top' }}
          initial={{ scaleY: reduce ? 1 : 0 }}
          animate={{ scaleY: lineInView ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] }}
        />
        <ul className="space-y-10">
          {items.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })
  const reduce = useReducedMotion()

  return (
    <li ref={ref} className="relative pl-8 sm:pl-10">
      <span className="absolute left-0 top-1.5 z-[1] size-3 rounded-full border-2 border-[var(--bg-primary)] bg-[var(--accent-cyan)] shadow-[0_0_12px_var(--border-glow)] sm:top-2 sm:size-3.5" />
      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: reduce ? 0 : 0.08 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl border border-white/10 bg-[var(--bg-secondary)]/50 p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-mono text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
          <span className="font-mono text-xs text-[var(--accent-lime)]">{item.date}</span>
        </div>
        <p className="mt-1 font-mono text-xs text-[var(--accent-cyan)]">{item.org}</p>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{item.description}</p>
      </motion.div>
    </li>
  )
}
