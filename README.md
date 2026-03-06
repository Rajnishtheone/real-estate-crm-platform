# Premium Real Estate Platform

![Demo](docs/demo.gif)

Full-stack SaaS for real estate consultants, agents, buyers, and NRI clients. Features marketplace listings, lead CRM, admin approvals, NRI portfolio management, document vault, email/WhatsApp notifications, and RBAC auth.

## Tech Stack
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind, React Query, Zustand, shadcn-ui ready
- Backend: Node.js, Express, TypeScript, Prisma, PostgreSQL, Redis caching
- Auth: JWT access + refresh tokens, RBAC
- Storage & comms: Cloudinary uploads, Nodemailer, WhatsApp API hooks
- DevOps: Docker/Docker Compose, Pino logging, Swagger docs at `/api/docs`

## Monorepo Structure
```
root
├─ server/          # Express API (controller → service → repository)
│  ├─ src/
│  │  ├─ routes/ controllers/ services/ repositories/
│  │  ├─ middleware/ validators/ utils/ config/
│  │  └─ app.ts, index.ts
│  └─ prisma/       # schema.prisma, migrations
├─ frontend/        # Next.js app (App Router)
│  ├─ app/          # pages (home, properties, dashboards, auth)
│  ├─ components/   # UI blocks, providers, skeletons
│  ├─ services/     # axios API clients
│  ├─ hooks/ store/ types/
│  └─ public/
└─ docs/            # architecture notes, demo gif placeholder
```

## Quick Start (local, no Docker)
1) Start Postgres & (optional) Redis locally. Update `server/.env` `DATABASE_URL`.
2) Backend
```bash
cd server
npm install
npm run generate
npm run migrate -- --name init
npm run dev
```
3) Frontend
```bash
cd frontend
npm install
npm run dev
```
- API: http://localhost:4000
- Web: http://localhost:3000
- Swagger: http://localhost:4000/api/docs

### Using Docker (requires Docker Desktop running)
From repo root:
```bash
docker-compose up db redis   # start services
# in another shell
cd server && npm run dev     # API
cd frontend && npm run dev   # Web
```

## Environment
- See `server/.env.example` and `frontend/.env.example`.
- Do **not** commit real secrets. `.env` is gitignored.

## Testing / Lint
- Add your preferred runner (Jest/Vitest). Lint script ready: `npm run lint` in each app.

## Notes
- Redis errors on startup mean Redis isn’t running; set `REDIS_URL=` to disable cache.
- Replace `docs/demo.gif` with your own screen recording for a polished README.

## License
MIT
