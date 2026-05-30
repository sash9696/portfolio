import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import FilterTabs from '../components/ui/FilterTabs.jsx'
import { blogPosts, BLOG_TAGS } from '../data/blog.js'

export default function Blog() {
  const [tag, setTag] = useState('All')

  const filtered = useMemo(() => {
    if (tag === 'All') return blogPosts
    return blogPosts.filter((post) => post.tags.includes(tag))
  }, [tag])

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <p className="font-mono text-sm text-[var(--accent-cyan)]">// blog</p>
      <h1 className="mt-2 font-mono text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">Writing</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
        Notes on retrieval, agents, training, and shipping ML — short articles with tags and read time.
      </p>

      <div className="mt-8">
        <FilterTabs options={BLOG_TAGS} value={tag} onChange={setTag} aria-label="Filter posts by tag" />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-xl border border-white/10 bg-[var(--bg-secondary)]/40 py-12 text-center font-mono text-sm text-[var(--text-muted)]">
          No posts with this tag.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((post, i) => (
            <li key={post.id}>
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6% 0px' }}
                transition={{ delay: Math.min(i * 0.05, 0.25), duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full flex-col rounded-xl border border-white/10 bg-[var(--bg-secondary)]/45 p-5 transition hover:border-[var(--border-glow)] hover:shadow-[0_12px_36px_-14px_var(--border-glow)] sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                  <span>{post.date}</span>
                  <span className="rounded-full border border-[var(--border-glow)] bg-[var(--accent-cyan)]/10 px-2 py-0.5 text-[var(--accent-cyan)]">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-3 font-mono text-lg font-semibold leading-snug text-[var(--text-primary)] transition group-hover:text-[var(--accent-lime)]">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-[var(--text-muted)]">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] text-[var(--accent-cyan)]/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
