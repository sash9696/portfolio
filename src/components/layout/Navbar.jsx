import { useEffect, useId, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../../data/profile.js'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function NavItem({ to, label, end, onClick, variant = 'desktop' }) {
  const wrap =
    variant === 'mobile' ? 'relative block border-b border-white/5 py-3' : 'relative inline-block'

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'group relative rounded-sm py-1 font-mono text-sm tracking-wide transition-colors focus-visible:outline-offset-4',
          isActive ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <span className={wrap}>
          {label}
          <span
            aria-hidden
            className={[
              'pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[var(--accent-cyan)] shadow-[0_0_12px_var(--accent-cyan)] transition-transform duration-300 ease-out',
              isActive
                ? 'scale-x-100'
                : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
            ].join(' ')}
          />
        </span>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const menuBtnRef = useRef(null)
  const panelRef = useRef(null)
  const drawerCloseRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const panel = panelRef.current

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }

      if (e.key !== 'Tab' || !panel) return

      const focusables = [...panel.querySelectorAll(FOCUSABLE_SELECTOR)].filter((el) => {
        if (el.getAttribute('tabindex') === '-1') return false
        const rect = el.getBoundingClientRect()
        return rect.width > 0 && rect.height > 0
      })

      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement

      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault()
          menuBtnRef.current?.focus()
        }
      } else if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    const onFocusIn = () => {
      window.requestAnimationFrame(() => {
        if (!panelRef.current) return
        const active = document.activeElement
        if (!active) return
        if (panelRef.current.contains(active) || active === menuBtnRef.current) return
        drawerCloseRef.current?.focus()
      })
    }
    document.addEventListener('focusin', onFocusIn)

    const t = window.setTimeout(() => {
      drawerCloseRef.current?.focus()
    }, 50)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const menuButton = menuBtnRef.current

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
      window.clearTimeout(t)
      document.body.style.overflow = prevOverflow
      menuButton?.focus()
    }
  }, [open])

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[var(--bg-primary)]/70 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="rounded-sm font-mono text-lg font-semibold tracking-tight text-[var(--text-primary)] focus-visible:outline-offset-4"
          style={{ textShadow: '0 0 18px var(--border-glow)' }}
          end
          onClick={() => setOpen(false)}
        >
          {profile.name.monogram}
        </NavLink>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {links.map(({ to, label }) => (
              <NavItem key={to} to={to} label={label} end={to === '/'} />
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 p-2.5 text-[var(--text-primary)] transition hover:border-[var(--border-glow)] hover:text-[var(--accent-cyan)] focus-visible:outline-offset-4 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            ref={menuBtnRef}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              key="backdrop"
              aria-label="Close menu"
              tabIndex={-1}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="panel"
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${panelId}-title`}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,88vw)] flex-col border-l border-white/10 bg-[var(--bg-secondary)]/95 p-6 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            >
              <div className="mb-6 flex items-start justify-between gap-3">
                <p id={`${panelId}-title`} className="font-mono text-xs text-[var(--text-muted)]">
                  // navigate
                </p>
                <button
                  type="button"
                  ref={drawerCloseRef}
                  className="shrink-0 rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-[var(--text-primary)] transition hover:border-[var(--border-glow)] hover:text-[var(--accent-cyan)] focus-visible:outline-offset-4"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {links.map(({ to, label }) => (
                  <NavItem
                    key={to}
                    to={to}
                    label={label}
                    end={to === '/'}
                    variant="mobile"
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
