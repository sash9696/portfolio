import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import BootLoader from './components/layout/BootLoader.jsx'
import CustomCursor from './components/layout/CustomCursor.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import PortfolioChat from './components/chat/PortfolioChat.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const About = lazy(() => import('./pages/About.jsx'))

function RouteFallback() {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-2 py-24 font-mono text-sm text-[var(--accent-cyan)] motion-reduce:animate-none"
      role="status"
      aria-live="polite"
    >
      <span className="inline-block size-4 animate-pulse rounded-sm bg-[var(--accent-cyan)]/80 motion-reduce:animate-none" />
      Loading…
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  const skipToMain = (e) => {
    e.preventDefault()
    const mainEl = document.getElementById('main-content')
    mainEl?.focus({ preventScroll: true })
    mainEl?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="relative flex min-h-svh flex-col">
      <a href="#main-content" className="skip-link" onClick={skipToMain}>
        Skip to content
      </a>
      <BootLoader />
      <CustomCursor />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="flex flex-1 flex-col"
            role="presentation"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -12 }}
            transition={{
              duration: reduceMotion ? 0 : 0.34,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <PortfolioChat />
    </div>
  )
}
