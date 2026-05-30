import { motion } from 'framer-motion'
import { Code2, Link2, Mail } from 'lucide-react'
import TimelineSection from '../components/sections/TimelineSection.jsx'
import SkillBar from '../components/ui/SkillBar.jsx'
import { profile } from '../data/profile.js'
import { currentlyLearning, skillGroups, skillProficiency } from '../data/skills.js'
import { timeline } from '../data/timeline.js'

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <p className="font-mono text-sm text-[var(--accent-cyan)]">// about</p>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
        About {profile.name.first}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">{profile.openTo}</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-md lg:mx-0"
        >
          <div
            className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)]/40 via-[var(--accent-purple)]/30 to-[var(--accent-lime)]/30 opacity-80 blur-md"
            aria-hidden
          />
          <div className="relative flex h-full min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border-glow)] bg-[var(--bg-secondary)] shadow-[0_0_40px_-10px_var(--border-glow)]">
            <span className="font-mono text-6xl font-semibold text-[var(--accent-cyan)]" aria-hidden>
              {profile.name.monogram}
            </span>
            <p className="mt-4 font-mono text-lg text-[var(--text-primary)]">{profile.name.full}</p>
            <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">{profile.location}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="space-y-5 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base"
        >
          <p>
            I am a senior frontend engineer with 7+ years building production web apps — from banking UAT at
            ICICI to data-platform UI at Groundzero and infrastructure consoles at Rakuten.
          </p>
          <p>
            At Rakuten I’m on the <strong className="font-medium text-[var(--text-primary)]">Cloud BU GUI team</strong>
            , building and maintaining <strong className="font-medium text-[var(--text-primary)]">CNP</strong>,{' '}
            <strong className="font-medium text-[var(--text-primary)]">ObjectStore</strong>, and{' '}
            <strong className="font-medium text-[var(--text-primary)]">Bare Metal Manager</strong> — including multiple{' '}
            <strong className="font-medium text-[var(--text-primary)]">GA releases</strong> to customers. Highlights
            include migrating CNP from PHP SSR to Vue 3 (large-cluster UI ~17s → under 250ms), greenfield S3-compatible
            storage screens with Vitest at ~78% coverage, and BMM work from bulk profile import to in-UI kubectl access.
          </p>
          <p>
            Side projects include{' '}
            <a href="https://crackitdev.com" className="text-[var(--accent-cyan)] hover:text-[var(--accent-lime)]">
              CrackIt Dev
            </a>{' '}
            (frontend interview platform) and the{' '}
            <a
              href="https://sash007-trend-research-agent.hf.space/"
              className="text-[var(--accent-cyan)] hover:text-[var(--accent-lime)]"
            >
              Trend Research Agent
            </a>{' '}
            on Hugging Face for Instagram Reels research.
          </p>
          <div className="flex flex-wrap gap-4 pt-1">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 font-mono text-sm text-[var(--accent-lime)] transition hover:text-[var(--accent-cyan)]"
            >
              <Mail className="size-4" aria-hidden />
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-[var(--accent-lime)] transition hover:text-[var(--accent-cyan)]"
            >
              <Code2 className="size-4" aria-hidden />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-[var(--accent-lime)] transition hover:text-[var(--accent-cyan)]"
            >
              <Link2 className="size-4" aria-hidden />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      <section className="mt-16 sm:mt-20">
        <h2 className="font-mono text-xl font-semibold text-[var(--text-primary)]">Skills</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)]">
          Frontend-first stack with platform engineering, testing, and AI-assisted workflows (including Claude).
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {Object.entries(skillGroups).map(([group, skills]) => (
            <div key={group} className="rounded-xl border border-white/10 bg-[var(--bg-secondary)]/40 p-5 sm:p-6">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-lime)]">
                {group}
              </h3>
              <div className="mt-5 space-y-4">
                {skills.map((skill) => (
                  <SkillBar key={skill} label={skill} value={skillProficiency[skill] ?? 75} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xl font-semibold text-[var(--text-primary)]">Currently learning</h2>
        <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-secondary)]/40 py-3">
          <div className="hidden flex-wrap justify-center gap-3 px-4 motion-reduce:flex">
            {currentlyLearning.map((item) => (
              <span
                key={item}
                className="shrink-0 rounded-full border border-[var(--border-glow)] bg-[var(--bg-primary)]/80 px-4 py-2 font-mono text-xs text-[var(--accent-cyan)]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex w-max gap-3 px-4 font-mono text-xs text-[var(--text-primary)] motion-reduce:hidden animate-marquee">
            {[...currentlyLearning, ...currentlyLearning].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="shrink-0 rounded-full border border-[var(--border-glow)] bg-[var(--bg-primary)]/80 px-4 py-2 text-[var(--accent-cyan)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TimelineSection items={timeline} />
    </div>
  )
}
