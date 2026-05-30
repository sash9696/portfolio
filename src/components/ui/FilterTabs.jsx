/**
 * @param {{
 *   options: string[]
 *   value: string
 *   onChange: (next: string) => void
 *   'aria-label'?: string
 *   className?: string
 * }} props
 */
export default function FilterTabs({ options, value, onChange, 'aria-label': ariaLabel, className = '' }) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel ?? 'Filter'}
      className={['flex flex-wrap gap-2', className].filter(Boolean).join(' ')}
    >
      {options.map((opt) => {
        const selected = opt === value
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt)}
            className={[
              'rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide transition-colors',
              selected
                ? 'border-[var(--border-glow)] bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] shadow-[0_0_20px_var(--border-glow)]'
                : 'border-white/10 bg-transparent text-[var(--text-muted)] hover:border-white/20 hover:text-[var(--text-primary)]',
            ].join(' ')}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
