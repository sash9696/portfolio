import { Code2, Link2, Mail, ExternalLink } from 'lucide-react'
import { profile } from '../../data/profile.js'

const socials = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    Icon: Mail,
  },
  {
    label: 'GitHub',
    href: profile.github,
    Icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    Icon: Link2,
  },
  {
    label: 'CrackIt Dev',
    href: 'https://crackitdev.com',
    Icon: ExternalLink,
  },
  {
    label: 'Trend Agent (HF)',
    href: 'https://sash007-trend-research-agent.hf.space/',
    Icon: ExternalLink,
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--bg-secondary)]/70">
      <div id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-mono text-lg text-[var(--text-primary)]">Contact</h2>
            <p className="mt-1 max-w-md text-sm text-[var(--text-muted)]">
              {profile.name.full} · {profile.title}
              <br />
              <a
                href={`mailto:${profile.email}`}
                className="text-[var(--accent-cyan)] transition hover:text-[var(--accent-lime)]"
              >
                {profile.email}
              </a>
              {' · '}
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-[var(--text-primary)]">
                {profile.phone}
              </a>
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span
              className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            </span>
            Available for work
          </div>
        </div>

        <form
          className="mt-10 grid gap-6 md:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Contact form"
        >
          <div className="relative md:col-span-1">
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder=" "
              autoComplete="name"
              className="peer w-full rounded-lg border border-white/15 bg-[var(--bg-primary)]/80 px-4 pb-2.5 pt-5 font-sans text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-cyan)]/50 focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
            />
            <label
              htmlFor="contact-name"
              className="pointer-events-none absolute left-4 top-3 origin-[0] text-sm text-[var(--text-muted)] transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--accent-cyan)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Name
            </label>
          </div>
          <div className="relative md:col-span-1">
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder=" "
              autoComplete="email"
              className="peer w-full rounded-lg border border-white/15 bg-[var(--bg-primary)]/80 px-4 pb-2.5 pt-5 font-sans text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-cyan)]/50 focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
            />
            <label
              htmlFor="contact-email"
              className="pointer-events-none absolute left-4 top-3 origin-[0] text-sm text-[var(--text-muted)] transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--accent-cyan)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Email
            </label>
          </div>
          <div className="relative md:col-span-2">
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder=" "
              className="peer w-full resize-y rounded-lg border border-white/15 bg-[var(--bg-primary)]/80 px-4 pb-2.5 pt-5 font-sans text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent-cyan)]/50 focus:ring-1 focus:ring-[var(--accent-cyan)]/30"
            />
            <label
              htmlFor="contact-message"
              className="pointer-events-none absolute left-4 top-3 origin-[0] text-sm text-[var(--text-muted)] transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--accent-cyan)] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Message
            </label>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg border border-[var(--border-glow)] bg-[var(--accent-cyan)]/10 px-5 py-2.5 font-mono text-sm text-[var(--accent-cyan)] shadow-[0_0_24px_var(--border-glow)] transition hover:bg-[var(--accent-cyan)]/15"
            >
              Send message
            </button>
          </div>
        </form>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-3" aria-label="Social links">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-xs text-[var(--text-muted)] transition hover:border-[var(--border-glow)] hover:text-[var(--accent-cyan)]"
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[10px] text-[var(--text-muted)]/80">
            © {new Date().getFullYear()} {profile.name.full}
          </p>
        </div>
      </div>
    </footer>
  )
}
