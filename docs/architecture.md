# Architecture

## Backend
- Pattern: controller → service → repository → Prisma
- Validation: Zod at route/controller boundary
- Auth: JWT access (15m) + refresh (7d) with DB-stored refresh tokens, RBAC middleware
- Caching: Redis for property listings (safe SCAN invalidation)
- Observability: Pino HTTP logger, requestId middleware
- Docs: Swagger at `/api/docs`
- Security: helmet, CORS, rate limiting, input validation

## Frontend
- Next.js App Router with feature folders
- Data fetching: React Query + axios client with auth header
- State: Zustand for auth (access/refresh storage)
- UI: Tailwind, lightweight skeleton loaders, components in `components/`
- Guards: `ProtectedRoute` wraps dashboards by role

## Key Modules
- Properties: CRUD, filters, images (Multer + Cloudinary), admin approval
- Leads: public create, agent/admin list & status updates, analytics
- Documents: upload to Cloudinary, ownership/lease/legal types
- NRI: rent tracking, documents, manager assignment

## Deployment Sketch
- Frontend: Vercel/Netlify
- Backend: Render/Fly.io/AWS ECS/Fargate
- DB: Managed Postgres (Neon/Supabase/RDS)
- Redis: Upstash/ElastiCache
- Storage: Cloudinary or S3
