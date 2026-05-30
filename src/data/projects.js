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
    title: 'SentimentFlow — NLP Analytics Dashboard',
    category: 'NLP',
    tags: ['HuggingFace', 'BERT', 'D3.js', 'FastAPI'],
    description:
      'End-to-end sentiment analysis platform processing 1M+ social media posts daily with real-time dashboards.',
    github: '#',
    demo: '#',
    featured: false,
    year: '2023',
  },
  {
    id: 4,
    title: 'DreamWeave — AI Image Generation Studio',
    category: 'Generative AI',
    tags: ['Stable Diffusion', 'ControlNet', 'Python', 'Gradio'],
    description:
      'A custom fine-tuned Stable Diffusion pipeline with ControlNet for consistent character generation.',
    github: '#',
    demo: '#',
    featured: false,
    year: '2024',
  },
  {
    id: 5,
    title: 'DocuMind — RAG-powered Document QA',
    category: 'Agents',
    tags: ['RAG', 'Pinecone', 'LlamaIndex', 'Streamlit'],
    description:
      'Retrieval-augmented generation system enabling natural language Q&A over enterprise document repositories.',
    github: '#',
    demo: '#',
    featured: false,
    year: '2023',
  },
  {
    id: 6,
    title: 'MedScan — Medical Image Classifier',
    category: 'Computer Vision',
    tags: ['ResNet', 'PyTorch', 'DICOM', 'React'],
    description:
      'CNN-based diagnostic tool achieving 97.3% accuracy on chest X-ray pathology classification across 14 conditions.',
    github: '#',
    demo: '#',
    featured: false,
    year: '2023',
  },
]

export const PROJECT_CATEGORIES = [
  'All',
  'Product',
  'Agents',
  'Generative AI',
  'NLP',
  'Computer Vision',
]

export function getFeaturedProject() {
  return projects.find((p) => p.featured) ?? projects[0]
}
