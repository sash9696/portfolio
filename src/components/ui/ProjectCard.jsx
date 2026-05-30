import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/**
 * @param {{ project: import('../../data/projects.js').Project }} props
 */
export default function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-secondary)]/50 shadow-[0_0_0_1px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:border-[var(--border-glow)] hover:shadow-[0_12px_40px_-12px_var(--border-glow)]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(120deg, transparent 40%, rgba(0,245,212,0.08) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
        }}
      />

      {project.image ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block overflow-hidden border-b border-white/10 bg-[var(--bg-primary)]/60"
        >
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="aspect-[16/10] w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/80 via-transparent to-transparent opacity-60" />
        </a>
      ) : null}

      <div className="relative z-[2] flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-base font-semibold leading-snug text-[var(--text-primary)]">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] text-[var(--text-muted)]">{project.year}</span>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-[var(--text-muted)]">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-[var(--accent-cyan)]/90"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-3 font-mono text-xs">
          <a
            href={project.github}
            className="inline-flex items-center gap-1 text-[var(--text-muted)] transition hover:text-[var(--accent-cyan)]"
          >
            Code
            <ExternalLink className="size-3.5 opacity-70" aria-hidden />
          </a>
          <a
            href={project.demo}
            target={project.demo.startsWith('http') ? '_blank' : undefined}
            rel={project.demo.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1 text-[var(--text-muted)] transition hover:text-[var(--accent-lime)]"
          >
            Demo
            <ExternalLink className="size-3.5 opacity-70" aria-hidden />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
