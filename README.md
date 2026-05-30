# portfolio

Personal portfolio — React, Vite, Tailwind. Includes projects, about timeline, and a career chat powered by Hugging Face.

## Local development

```bash
npm install
cp .env.example .env   # add HF_TOKEN
npm run dev:all        # site + chat API
```

## Deploy

Host on **Vercel** (or similar) with `HF_TOKEN` set for `/api/chat`.
