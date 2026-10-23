# KRIHIT STUDIO Website

A responsive multi-page wedding photography and films website, with package pages and a secure server-side AI chat endpoint.

## Pages
- `/` Home
- `/about.html` About
- `/photography.html` Wedding Photography gallery
- `/films.html` Films & Reels gallery
- `/packages.html` All four packages and booking terms
- `/albums.html` Albums
- `/contact.html` Booking inquiry form that opens WhatsApp with a prefilled message

## Run locally
1. Install Node.js 18 or newer.
2. Open this folder in a terminal and run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your own API key to `.env` as `OPENAI_API_KEY=...`. Never put the key in browser code or commit `.env` to GitHub.
5. Run `npm start` and open `http://localhost:3000`.

Without an API key, the chat UI will show a WhatsApp fallback rather than pretend to be live AI. The API endpoint is server-side and has basic rate limiting and input limits. Before public launch, consider adding bot protection, logging/monitoring, and a stricter Content Security Policy.

## Important before publishing
- `public/assets/krihit-logo.png` is the supplied KRIHIT STUDIO logo.
- Gallery images are external illustrative stock images, not represented as actual studio client work. Replace them with original photos/videos you have permission to publish.
- Add approved video URLs to the Films & Reels page.
- Verify package terms, date availability, album specifications, and all deliverables before taking bookings.
- WhatsApp number and Instagram handle are configured from the details supplied in the brief.

## Deployment
This is a Node/Express site because the AI API key must remain on the server. Deploy to a Node-capable host (for example Render, Railway, or a VPS), configure `OPENAI_API_KEY` and `OPENAI_MODEL` as environment variables, then point your domain to the host. Do not publish the `.env` file.
