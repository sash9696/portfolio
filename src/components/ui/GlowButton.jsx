import { Link } from 'react-router-dom'

/**
 * @param {{
 *   children: import('react').ReactNode
 *   className?: string
 *   to?: string
 *   href?: string
 *   type?: 'button' | 'submit'
 *   download?: boolean | string
 *   rel?: string
 *   target?: string
 * }} props
 */
export default function GlowButton({
  children,
  className = '',
  to,
  href,
  type = 'button',
  download,
  rel,
  target,
}) {
  const inner = (
    <span
      className={[
        'relative z-10 inline-flex items-center justify-center gap-2 rounded-[inherit] bg-[var(--bg-primary)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--text-primary)] transition-transform duration-200 group-hover:-translate-y-0.5 group-active:translate-y-0',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )

  const shell = (
    <span className="group relative inline-flex overflow-hidden rounded-lg p-[1px]">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-full animate-glow-spin bg-[conic-gradient(from_90deg,var(--accent-cyan),var(--accent-purple),var(--accent-lime),var(--accent-cyan))] opacity-90 motion-reduce:animate-none"
      />
      {inner}
    </span>
  )

  if (to) {
    return (
      <Link to={to} className="inline-flex cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]">
        {shell}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        download={download}
        rel={rel ?? 'noopener noreferrer'}
        target={target}
        className="inline-flex cursor-pointer rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
      >
        {shell}
      </a>
    )
  }

  return (
    <button
      type={type}
      className="inline-flex cursor-pointer rounded-lg border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
    >
      {shell}
    </button>
  )
}
