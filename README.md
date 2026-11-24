# Nexoys

Nexoys is a responsive website for Digital Solutions and Career Solutions.

## Local development

1. Install dependencies: `npm install`
2. Configure the required Supabase environment variables in `.env` for inquiry forms.
3. Start the development server: `npm run dev`
4. Create a production build: `npm run build`

## Main routes

- `/` — Nexoys homepage
- `/digital` — Digital Solutions
- `/career` — Career Solutions
- `/contact` — Contact

## Backend

Supabase is used for inquiry data and server-side operations. The project archive intentionally excludes `.env`; create your own `.env` from `.env.example` and connect a standalone Supabase project. Apply the included database migration to that project before using the inquiry forms. Keep service-role credentials server-side only.
