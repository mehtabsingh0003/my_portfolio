# Envision Studio — Portfolio Site

A full-stack portfolio site: React (Vite + Tailwind) frontend, Node/Express +
MongoDB backend, image uploads via Cloudinary, and a JWT-protected admin panel.

## Structure

```
backend/    Express API (auth, projects, contact messages)
frontend/   React app (public site + admin dashboard)
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
- `MONGO_URI` — a local Mongo instance or an Atlas connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — from your Cloudinary dashboard (free tier is fine)
- `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only once, to create your admin login

Create your admin user (run once):

```bash
npm run seed:admin
```

Start the API:

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default.

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
```

`VITE_API_URL` defaults to `http://localhost:5000/api` — update it if your
backend runs elsewhere (e.g. after deploying).

```bash
npm run dev
```

The site runs on `http://localhost:5173` by default.

## 3. Using it

- Public site: Home, About, Projects (pulled live from the database), Contact
  (submits to the backend and shows up under Admin → Messages)
- Admin: go to `/admin/login`, sign in with the account you seeded, then
  manage Dashboard stats, Projects (create/edit/delete with image upload),
  and Messages

## Notes

- Admin routes (`/admin/*` except `/admin/login`) require a valid session —
  you'll be redirected to log in if you're not authenticated, and the token
  is verified against a real `User` in MongoDB (not hardcoded).
- Project create/update/delete on the backend require a valid JWT — the
  public `GET` endpoints are the only ones left open.
- Uploading a new image on an existing project replaces the Cloudinary image
  and cleans up the old one.
