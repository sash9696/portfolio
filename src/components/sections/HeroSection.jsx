import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { openPortfolioChat } from '../../lib/portfolioChatEvents.js'
import { profile } from '../../data/profile.js'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'
import GlowButton from '../ui/GlowButton.jsx'
import { useTypewriter } from '../../hooks/useTypewriter.js'

const HeroBackdrop3D = lazy(() => import('./HeroBackdrop3D.jsx'))

const DISPLAY_NAME = [profile.name.first, profile.name.last]

const PARTICLES = [
  { t: 8, l: 12, d: 2.2, o: 0.35 },
  { t: 22, l: 78, d: 3.1, o: 0.25 },
  { t: 45, l: 18, d: 2.6, o: 0.3 },
  { t: 62, l: 88, d: 3.4, o: 0.22 },
  { t: 30, l: 55, d: 2.9, o: 0.28 },
  { t: 72, l: 32, d: 3.6, o: 0.2 },
  { t: 15, l: 42, d: 2.4, o: 0.32 },
  { t: 55, l: 68, d: 3.0, o: 0.26 },
]

export default function HeroSection() {
  const reduce = useReducedMotion()
  const roleText = useTypewriter(profile.roles, {
    typingMs: 36,
    deletingMs: 20,
    pauseEndMs: 2100,
    pauseBetweenMs: 320,
  })

  return (
    <section className="relative flex min-h-[min(90svh,52rem)] flex-col justify-center overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
      {reduce ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[var(--accent-cyan)] motion-reduce:animate-none"
              style={{
                top: `${p.t}%`,
                left: `${p.l}%`,
                width: 3,
                height: 3,
                opacity: p.o,
                animation: reduce ? 'none' : `hero-float ${p.d}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      ) : (
        <Suspense fallback={null}>
          <HeroBackdrop3D />
        </Suspense>
      )}

      <div className="relative z-[1] mx-auto w-full max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent-cyan)]"
        >
          {profile.title} · {profile.openTo}
        </motion.p>

        <h1 className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl">
          {DISPLAY_NAME.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.08 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <p className="mx-auto mt-6 min-h-[2rem] max-w-xl font-mono text-base text-[var(--accent-lime)] sm:text-lg md:text-xl">
          {roleText}
          <span className="ml-1 inline-block h-[1.1em] w-0.5 animate-pulse bg-[var(--accent-cyan)] align-[-2px] motion-reduce:animate-none" />
        </p>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {profile.tagline}
        </p>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.38, duration: 0.45 }}
          onClick={openPortfolioChat}
          className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-glow)] bg-[var(--accent-cyan)]/5 px-4 py-2 font-mono text-sm text-[var(--accent-lime)] transition hover:border-[var(--accent-cyan)]/50 hover:bg-[var(--accent-cyan)]/10 hover:text-[var(--accent-cyan)]"
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden />
          Ask the assistant about my work
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : 0.45, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <GlowButton to="/projects">View projects</GlowButton>
          <GlowButton href={profile.resumeMailto}>Request resume</GlowButton>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 sm:gap-10">
          {profile.stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix ?? ''}
            />
          ))}
        </div>
      </div>

      <a
        href="#explore"
        className="absolute bottom-6 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--text-muted)] transition hover:text-[var(--accent-cyan)]"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Explore</span>
        <motion.span
          animate={reduce ? false : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-6" />
        </motion.span>
      </a>
    </section>
  )
}
