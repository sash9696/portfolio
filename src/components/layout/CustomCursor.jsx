import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

const SELECTOR =
  'a, button, input, textarea, select, [role="button"], [data-cursor-hover], .cursor-pointer'

export default function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const ringX = useSpring(mx, { stiffness: 280, damping: 28, mass: 0.35 })
  const ringY = useSpring(my, { stiffness: 280, damping: 28, mass: 0.35 })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mqFine = window.matchMedia('(pointer: fine)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      setEnabled(mqFine.matches && !mqReduce.matches)
    }
    sync()
    mqFine.addEventListener('change', sync)
    mqReduce.addEventListener('change', sync)
    return () => {
      mqFine.removeEventListener('change', sync)
      mqReduce.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled || reduceMotion) {
      document.body.style.cursor = ''
      return undefined
    }

    document.body.style.cursor = 'none'

    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(!!el?.closest(SELECTOR))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
    }
  }, [enabled, reduceMotion, mx, my])

  if (!enabled || reduceMotion) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150]"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
      >
        <div className="size-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_12px_var(--accent-cyan)]" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[149]"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 1.65 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <div className="size-9 rounded-full border border-[var(--border-glow)] shadow-[0_0_20px_var(--border-glow)] bg-transparent" />
      </motion.div>
    </>
  )
}
