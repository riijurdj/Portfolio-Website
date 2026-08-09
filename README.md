# Riiju Jagetiya — Portfolio

A production-ready personal portfolio built on the MERN stack (MongoDB, Express, React, Node.js). Every piece of content — text, images, resume, projects, credentials, even which sections are visible — is editable from a JWT-protected admin panel. Nothing is hardcoded in the frontend, so day-to-day updates never require touching code or redeploying.

Live structure: public site at `/`, admin panel at `/admin`.

## Tech Stack

- **Frontend:** React 18 (Vite), Tailwind CSS, Framer Motion, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB via Mongoose
- **Auth:** JWT (admin-only), bcrypt password hashing
- **Uploads:** Multer (photos and resume PDF stored as base64 in MongoDB — no server disk dependency, so it survives redeploys on hosts with ephemeral filesystems)

## What you can change without ever touching code

Everything below is editable live from `/admin`, with changes reflected on the site immediately:

| What | Where in admin |
|---|---|
| Name, taglines, social links, profile photo | Hero |
| **Resume PDF** (upload directly, or link to an external URL as a fallback) | Hero |
| About story, achievement stat counters, About photo | About |
| Skill categories and individual skills | Skills |
| Experience timeline entries and achievement bullets | Experience |
| Projects (add/edit/delete, tech stack, links) | Projects |
| Certifications, Education | Certifications / Education |
| Research publication details | Publications |
| Contact info, footer text | Contact |
| Entirely new custom sections | Custom Sections |
| Show/hide any section on the live site | Section Visibility |
| **Admin login email & password** | Account |
| Site theme (Dark / Light / Neon Green) | Theme switcher (top right, public site & admin) |

Photo and resume uploads are stored as base64 directly in MongoDB — not as files on the server — so they survive redeploys and work on hosts with ephemeral/read-only filesystems (Render, Railway, Vercel, etc.) without any extra configuration.

### Things that do still require a code change

To keep expectations honest, a few things are intentionally code-level rather than admin-editable, since they're rare, structural changes rather than content updates:
- Adding a brand-new **theme** beyond the three built in (Dark/Light/Neon Green) — see `client/src/context/ThemeContext.jsx` and `client/src/index.css`.
- The site favicon (`client/public/favicon.svg`) and Google Fonts choice (`client/index.html`).
- Section **order** on the page (currently fixed in `client/src/App.jsx`).

## Project Structure

```
portfolio/
├── client/    React frontend (Vite)
├── server/    Express API + MongoDB models
└── package.json   Root scripts (runs both together)
```

## Prerequisites

- Node.js 18+ and npm
- A MongoDB instance — either:
  - Local: `brew install mongodb-community` (macOS) then `brew services start mongodb-community`, or run `mongod` directly
  - Or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (use its connection string as `MONGO_URI`) — recommended for deployment

## Local Setup

1. **Install dependencies** (root, client, and server):

   ```bash
   npm run install:all
   ```

2. **Configure environment variables.** Copy `.env.example` to `server/.env`:

   ```bash
   cp .env.example server/.env
   ```

   Then edit `server/.env` — see the [Environment Variables](#environment-variables) section below for what each one does.

   Also create `client/.env`:

   ```
   VITE_API_BASE_URL=http://localhost:5050/api
   ```

3. **Seed the database.** This populates MongoDB with the initial portfolio content and creates the first admin user from `ADMIN_EMAIL`/`ADMIN_PASSWORD` in `server/.env`:

   ```bash
   npm run seed
   ```

   Only needed **once**, on a fresh database. After that, change the admin email/password from the Account tab in `/admin` instead of editing `.env` — editing `.env` alone does nothing once the admin user already exists in the database, since those two values are only ever read at seed time.

4. **Replace the placeholder resume** (optional) — `client/public/resume.pdf` is a static fallback used until you upload a real one from the Hero tab in `/admin`.

## Running locally

From the project root, this starts both the API (port 5050) and the Vite dev server (port 5173) together:

```bash
npm run dev
```

- Site: http://localhost:5173
- API: http://localhost:5050/api
- Admin panel: http://localhost:5173/admin (redirects to `/admin/login` if not authenticated)

## Environment Variables

| Variable | Where | Required | Description |
|---|---|---|---|
| `PORT` | server | No (default `5050`) | Port the API listens on |
| `MONGO_URI` | server | Yes | MongoDB connection string |
| `JWT_EXPIRES_IN` | server | No (default `7d`) | How long an admin login stays valid before it must be renewed |
| `JWT_SECRET` | server | No | See [Admin sessions & JWT_SECRET](#admin-sessions--jwt_secret) below — recommended for hosted deployments |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | server | Only for the first `npm run seed` | Creates the initial admin user. Change credentials afterward from the Account tab, not here |
| `VITE_API_BASE_URL` | client | Yes | Base URL the frontend uses to call the API, e.g. `https://your-api.example.com/api` |

### Admin sessions & JWT_SECRET

By default (no `JWT_SECRET` set), the server generates a random signing key in memory every time it starts. This means:
- While the server keeps running, admin logins persist normally — no repeated prompts.
- If the server process restarts, everyone is signed out and must log in again.

That's a nice safety property for local development (a stray old token never lingers), but most hosting platforms restart or recycle your server process far more often than you'd expect — deploys, crashes, or free-tier idle spin-down all count. If you don't want admin logins reset every time that happens, set a fixed `JWT_SECRET` in your hosting provider's environment variables:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Paste the output in as `JWT_SECRET`. With it set, admin sessions survive restarts and only expire after `JWT_EXPIRES_IN`.

## Using the Admin Panel

1. Go to `/admin/login` and sign in.
2. Use the sidebar to edit any section — see the [full list above](#what-you-can-change-without-ever-touching-code).
3. Changes save immediately to MongoDB and reflect on the public site on next load — no rebuild or redeploy needed.
4. To change your login email or password, use the **Account** tab (requires your current password). You'll be signed out and asked to log back in with the new credentials afterward.

Skill/feature icons are set by name (e.g. `SiReact`, `TbBrain`) from the [react-icons](https://react-icons.github.io/react-icons/) `si` (Simple Icons), `tb` (Tabler), and `di` (Devicons) sets.

## Deploying to real hosting

This is a two-part deployment: a static frontend and a Node API, plus a hosted database.

1. **Database — MongoDB Atlas** (free tier is enough): create a cluster, add a database user, allow network access from your API host (or `0.0.0.0/0` for simplicity), and copy the connection string for `MONGO_URI`.

2. **Backend** — deploy `server/` to any Node host (Render, Railway, Fly.io, a VPS, etc.):
   - Set `MONGO_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and (recommended) `JWT_SECRET` as environment variables on the host.
   - Run `npm install` then `npm run seed` once against the production database (most hosts let you run a one-off command, or run it locally against the Atlas `MONGO_URI` before first deploy).
   - Start command: `npm start` (or `node index.js`).

3. **Frontend** — build and deploy `client/` to any static host (Vercel, Netlify, Cloudflare Pages):
   - Set `VITE_API_BASE_URL` to your deployed backend's `/api` URL **before building** — Vite inlines it at build time, so changing it later requires a rebuild.
   - Build command: `npm run build` (from `client/`), output directory: `client/dist`.

4. **Verify**: visit your frontend URL, confirm the site loads real data, then log into `/admin` and confirm you can save an edit.

### Production checklist

- [ ] `JWT_SECRET` set on the backend host (avoids forced re-login on every restart — see above)
- [ ] Admin password changed from the default via the Account tab (or set a strong `ADMIN_PASSWORD` before the first seed)
- [ ] Real resume uploaded via the Hero tab
- [ ] Real profile photo uploaded via Hero/About tabs
- [ ] `.env` files are **not** committed (already covered by `.gitignore`)
- [ ] CORS: the API allows all origins by default (`cors()` in `server/index.js`), which is fine for a public read-only portfolio API and doesn't expose the admin routes since those require a bearer token regardless of origin. Restrict it to your frontend's domain in `server/index.js` if you want to lock it down further.

## Building for production locally

```bash
npm run build
```

This builds the client into `client/dist`. Serve that as static assets and run the server (`npm start`) separately.

## Scripts reference

| Command | Description |
|---|---|
| `npm run install:all` | Installs root, client, and server dependencies |
| `npm run dev` | Runs client + server together in development |
| `npm run seed` | Seeds/resets the database with the initial portfolio content and admin user (only needed once, on a fresh database) |
| `npm run build` | Builds the client for production |
| `npm start` | Runs the server in production mode |
