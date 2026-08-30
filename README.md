# Section8 Mentor — Reconstructed Frontend

This repository is a reconstructed frontend scaffold generated from the deployed app at https://section8-mentor-copy-7772d97c.base44.app/.

What I added
- Minimal dev scaffold (package.json, vite.config.js, postcss.config.cjs)
- Small runtime stubs: src/lib/app-params.js, src/lib/query-client.js, src/lib/AuthContext.jsx
- .env.example and README with run instructions

What remains
- You must provide real Base44 credentials (appId/token) in environment variables if you want API calls to work.
- Some platform-provided UI components and auth pages are intentionally not included (see original notes).

Run locally
1. Install dependencies:
   npm install
2. Add environment variables (see .env.example) or set values in src/lib/app-params.js for local testing.
3. Start dev server:
   npm run dev

Notes on secrets
- Do NOT commit real tokens or private keys. Use environment variables (Vite: VITE_ prefix) or a secrets manager.

If you want, I can also create a pull request instead of pushing directly, or add CI to build and preview the site.
