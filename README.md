# MarketPro MERN Ecommerce

Week 3 final ecommerce submission built with React, Tailwind CSS, Node.js, Express, MongoDB, and Mongoose.

## Features

- JWT signup and login with token persistence in `localStorage`
- Role-based access for `user` and `admin`
- Public signup creates customer users only; admin accounts are seeded/managed by the owner
- Protected admin dashboard for product CRUD
- Admin stats, user management, and order status management
- Product catalog with search, categories, sorting, pagination, loading states, and error states
- Product details page with gallery and add-to-cart
- Cart stored in `localStorage` with add, remove, increase/decrease quantity, and totals
- Protected checkout, profile, and orders pages backed by MongoDB orders
- Forgot password and reset password demo flows
- Responsive navbar, product grid, product details, cart, checkout, and admin panel
- Toast notifications for auth and cart actions
- Deployment-ready environment variables and CORS config

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT signed with `JWT_SECRET`, password hashes with `bcryptjs`

## Environment Variables

Backend `backend/.env`:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerceDB
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Frontend `frontend/.env`:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run seed:users
npm run dev
```

The backend runs at `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173`.

## API Endpoints

```text
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

GET    /api/products
GET    /api/products/featured
GET    /api/products/:id
POST   /api/products          admin only
PUT    /api/products/:id      admin only
DELETE /api/products/:id      admin only

POST   /api/orders            logged-in users
GET    /api/orders/my         logged-in users
GET    /api/orders/admin      admin only
PUT    /api/orders/:id/status admin only

GET    /api/users             admin only
POST   /api/users/admin       admin only
PUT    /api/users/profile     logged-in users
DELETE /api/users/:id         admin only

GET    /api/admin/stats       admin only
```

## Deployment

Render backend:

- Build command: `npm install`
- Start command: `npm start`
- Root directory: `backend`
- Add `MONGO_URI`, `JWT_SECRET`, `PORT`, and `CLIENT_URL`

Vercel frontend:

- Framework preset: Vite
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_URL` with the deployed Render API URL ending in `/api`

After deployment, set backend `CLIENT_URL` to the Vercel frontend URL so CORS allows the deployed app.

## Links

- GitHub repo: add your repository URL here
- Live frontend: add your Vercel URL here
- Live backend: add your Render URL here
