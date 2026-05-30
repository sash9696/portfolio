import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/**
 * @param {{ project: import('../../data/projects.js').Project }} props
 */
export default function FeaturedProject({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-glow)] bg-[var(--bg-secondary)]/60 p-6 shadow-[0_0_40px_-8px_var(--border-glow)] backdrop-blur-sm sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[var(--accent-lime)]/40 bg-[var(--accent-lime)]/10 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--accent-lime)]">
              Featured
            </span>
            <span className="font-mono text-xs text-[var(--text-muted)]">{project.year}</span>
            <span className="font-mono text-xs text-[var(--accent-cyan)]">{project.category}</span>
          </div>
          <h2 className="mt-4 font-mono text-2xl font-semibold leading-tight text-[var(--text-primary)] sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-[var(--bg-primary)]/60 px-2.5 py-1 font-mono text-[11px] text-[var(--accent-cyan)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 font-mono text-sm">
            <a
              href={project.github}
              className="inline-flex items-center gap-1.5 text-[var(--text-muted)] transition hover:text-[var(--accent-cyan)]"
            >
              GitHub
              <ExternalLink className="size-4 opacity-70" aria-hidden />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--text-muted)] transition hover:text-[var(--accent-lime)]"
            >
              Live demo
              <ExternalLink className="size-4 opacity-70" aria-hidden />
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-primary)]/80 shadow-inner">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/90" />
            <span className="size-2.5 rounded-full bg-amber-400/90" />
            <span className="size-2.5 rounded-full bg-emerald-400/90" />
            <span className="ml-2 truncate font-mono text-[10px] text-[var(--text-muted)]">
              {project.demo.replace(/^https?:\/\//, '')}
            </span>
          </div>
          {project.image ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="max-h-[20rem] w-full object-cover object-top"
              />
            </a>
          ) : (
            <div className="flex min-h-[14rem] items-center justify-center p-8 font-mono text-xs text-[var(--text-muted)] sm:min-h-[16rem]">
              Preview coming soon
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
