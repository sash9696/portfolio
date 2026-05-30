import { motion } from 'framer-motion'

/**
 * @param {{ children: import('react').ReactNode, className?: string, delay?: number }} props
 */
export default function SkillBadge({ children, className = '', delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{
        type: 'spring',
        stiffness: 420,
        damping: 22,
        delay,
      }}
      className={[
        'inline-flex items-center rounded-md border border-white/10 bg-[var(--bg-secondary)] px-2.5 py-1 font-mono text-[11px] text-[var(--accent-lime)]',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </motion.span>
  )
}
