import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/sections/HeroSection.jsx'

export default function Home() {
  return (
    <div>
      <HeroSection />

      <section
        id="explore"
        className="mx-auto max-w-6xl scroll-mt-24 border-t border-white/10 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-[var(--bg-secondary)]/45 p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-cyan)]">Projects</p>
            <h2 className="mt-3 font-mono text-xl font-semibold text-[var(--text-primary)]">Shipped systems</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Production web apps, interview prep, and Hugging Face agents — with live demos and stack tags.
            </p>
            <Link
              to="/projects"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-[var(--accent-lime)] transition hover:text-[var(--accent-cyan)]"
            >
              Open project grid
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="rounded-2xl border border-white/10 bg-[var(--bg-secondary)]/45 p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent-cyan)]">About</p>
            <h2 className="mt-3 font-mono text-xl font-semibold text-[var(--text-primary)]">Background</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Skills, timeline, and what I am learning next — editorial layout with motion on scroll.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-[var(--accent-lime)] transition hover:text-[var(--accent-cyan)]"
            >
              View about page
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
