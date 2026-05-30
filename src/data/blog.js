/** @typedef {{ id: string, title: string, excerpt: string, tags: string[], readTime: string, date: string }} BlogPost */

/** @type {BlogPost[]} */
export const blogPosts = [
  {
    id: 'b1',
    title: 'Notes on long-context RAG',
    excerpt: 'Chunking strategies, re-ranking, and when to trust the retriever versus the model.',
    tags: ['RAG', 'Research'],
    readTime: '8 min',
    date: '2026-01-12',
  },
  {
    id: 'b2',
    title: 'Evaluating tool-calling agents',
    excerpt: 'A lightweight rubric for latency, safety, and task success in agent demos.',
    tags: ['Agents', 'Evals'],
    readTime: '6 min',
    date: '2025-11-03',
  },
  {
    id: 'b3',
    title: 'Stable diffusion fine-tuning diary',
    excerpt: 'LoRA vs full fine-tune, dataset hygiene, and ControlNet gotchas in practice.',
    tags: ['Generative AI'],
    readTime: '12 min',
    date: '2025-08-20',
  },
  {
    id: 'b4',
    title: 'From notebook to FastAPI',
    excerpt: 'Patterns for wrapping research code without losing reproducibility.',
    tags: ['MLOps', 'Python'],
    readTime: '5 min',
    date: '2025-05-01',
  },
]

export const BLOG_TAGS = ['All', 'RAG', 'Research', 'Agents', 'Evals', 'Generative AI', 'MLOps', 'Python']
