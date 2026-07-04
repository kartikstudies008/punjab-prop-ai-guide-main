# Punjab Property AI

AI-powered property price prediction for Punjab & Tricity.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (dev server on port `8080`)
- **Tailwind CSS 3** + **shadcn-ui**
- **React Router v6** for routing
- **TanStack React Query** for data fetching
- Backend: **Flask API** at `http://127.0.0.1:5000` (separate repo)

## Getting Started

```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## Backend API

The frontend expects a Flask server running at `http://127.0.0.1:5000` with these endpoints:

| Method | Endpoint | Request Body | Response |
|--------|----------|-------------|----------|
| `POST` | `/login` | `{ email, password }` | `200` or `{ error }` |
| `POST` | `/signup` | `{ name, email, password }` | `200` or `{ error }` |
| `POST` | `/predict` | `{ city, bhk, area_sqft, furnishing, bathroom, parking, property_age }` | `{ predicted_price }` |

## Project Structure

```
src/
├── pages/          # Route pages (Index, Login, Signup, Predict, NotFound)
├── components/     # UI components (Navbar, HeroSection, PredictionForm, etc.)
├── hooks/          # Custom React hooks
├── lib/            # Utilities and shared config (api.ts, utils.ts)
└── assets/         # Static assets
```

## Available Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run test` — Run tests
- `npm run lint` — Lint code

## License

© 2026 Punjab Property AI. All Rights Reserved.
