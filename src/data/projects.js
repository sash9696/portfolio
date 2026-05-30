import trendResearchImage from '../assets/trend-research-agent.png'
import crackitdevImage from '../assets/crackitdev.png'

/** @typedef {{ id: number, title: string, category: string, tags: string[], description: string, github: string, demo: string, featured: boolean, year: string, image?: string }} Project */

/** @type {Project[]} */
export const projects = [
  {
    id: 1,
    title: 'Trend Research Agent',
    category: 'Agents',
    tags: ['Gradio', 'Python', 'Hugging Face', 'OpenAI', 'Instagram'],
    description:
      'Finds trending topics for Instagram Reels by domain, with optional deep research on a custom topic. Deployed on Hugging Face Spaces with a Gradio UI.',
    github: '#',
    demo: 'https://sash007-trend-research-agent.hf.space/',
    featured: true,
    year: '2026',
    image: trendResearchImage,
  },
  {
    id: 2,
    title: 'CrackIt Dev',
    category: 'Product',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay', 'AI Coach'],
    description:
      'Freemium frontend interview platform: RADIO practice, AI coach, scored reviews, and mock interviews. Systems design, DSA, JavaScript, and machine coding — with regional pricing via Razorpay.',
    github: '#',
    demo: 'https://crackitdev.com',
    featured: false,
    year: '2026',
    image: crackitdevImage,
  },
  {
    id: 3,
    title: 'Knowledge Worker',
    category: 'RAG',
    tags: ['RAG', 'Chroma', 'Gradio', 'Hugging Face', 'LangChain'],
    description:
      'RAG knowledge worker: ingest markdown, retrieve chunks, answer with sources panel. Demo corpus (products, employees, contracts, company) on Hugging Face with HF router.',
    github: 'https://github.com/sash9696/rag-knowlege-worker',
    demo: 'https://huggingface.co/spaces/sash007/knowledge-worker',
    featured: false,
    year: '2026',
  },
  {
    id: 4,
    title: 'The Complete JavaScript Interview Handbook',
    category: 'Education',
    tags: ['JavaScript', 'Interview prep', 'Ebook', 'Topmate'],
    description:
      '28-chapter technical reference for JavaScript interviews: closures, event loop, polyfills, data structures, design patterns, and a 7-week study plan. 7,200+ lines with 200+ working code examples.',
    github: '#',
    demo: 'https://topmate.io/sahil_chopra/1791349',
    featured: false,
    year: '2025',
  },
  {
    id: 5,
    title: 'Frontend Interview Kit',
    category: 'Education',
    tags: ['JavaScript', 'React', 'Interview prep', 'Open source', 'Free'],
    description:
      'Free open-source guide to frontend interviews — curated resources, 12-week roadmap, DSA, system design, machine coding, and project ideas. Star on GitHub if it helps!',
    github: 'https://github.com/sash9696/frontend-interview-kit',
    demo: 'https://github.com/sash9696/frontend-interview-kit',
    featured: false,
    year: '2025',
  },
]

export const PROJECT_CATEGORIES = [
  'All',
  'Product',
  'Education',
  'Agents',
  'RAG',
  'Generative AI',
  'NLP',
  'Computer Vision',
]

export function getFeaturedProject() {
  return projects.find((p) => p.featured) ?? projects[0]
}
