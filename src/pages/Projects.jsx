import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import FeaturedProject from '../components/sections/FeaturedProject.jsx'
import FilterTabs from '../components/ui/FilterTabs.jsx'
import ProjectCard from '../components/ui/ProjectCard.jsx'
import { getFeaturedProject, projects, PROJECT_CATEGORIES } from '../data/projects.js'

export default function Projects() {
  const [tab, setTab] = useState('All')
  const featured = useMemo(() => getFeaturedProject(), [])

  const { showFeaturedRow, gridProjects } = useMemo(() => {
    if (tab === 'All') {
      return {
        showFeaturedRow: true,
        gridProjects: projects.filter((p) => !p.featured),
      }
    }
    return {
      showFeaturedRow: false,
      gridProjects: projects.filter((p) => p.category === tab),
    }
  }, [tab])

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl"
      >
        <p className="font-mono text-sm text-[var(--accent-cyan)]">// projects</p>
        <h1 className="mt-2 font-mono text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
          Selected work
        </h1>
        <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
          NLP, vision, generative models, and agents — shipped as products, research artifacts, and open
          experiments.
        </p>
      </motion.header>

      <div className="mt-8">
        <FilterTabs options={PROJECT_CATEGORIES} value={tab} onChange={setTab} aria-label="Filter projects" />
      </div>

      <div className="mt-10 space-y-10">
        {showFeaturedRow && <FeaturedProject project={featured} />}

        {gridProjects.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-[var(--bg-secondary)]/40 py-12 text-center font-mono text-sm text-[var(--text-muted)]">
            No projects in this category yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ delay: Math.min(i * 0.06, 0.36), duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
