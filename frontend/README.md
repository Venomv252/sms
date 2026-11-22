# School ERP Frontend

## Run locally

1. Install Node.js (LTS).
2. In this folder, run `npm install`.
3. Ensure `.env.local` contains `VITE_API_URL=http://localhost:5000/api`.
4. Run `npm run dev`.

The app uses the authenticated user's role returned by the backend to select the dashboard. The original supplied role dashboard source and CSS have been copied into `src/role-dashboards/`; their CSS files were preserved. Their internal routers use `MemoryRouter` so the host application can keep control of authentication and dashboard selection.

## Demo role routing

- `STUDENT` → Student dashboard
- `PARENT` → Parent dashboard
- `TEACHER` → Teacher dashboard
- `PRINCIPAL` → Principal dashboard
- `MANAGEMENT` → Management dashboard
- `ACCOUNTANT` → Accountant dashboard
- `DRIVER` → Driver dashboard
- `ADMIN` → Platform administration console

The imported dashboards retain the original supplied demo/static content. Existing backend-connected student/parent features continue to use their prior integration. Modules for which the backend has no matching API yet still need data/API integration; the UI copy itself does not make those features live.

## Login-page style isolation

Role dashboards are lazy-loaded from `src/App.jsx`. Their stylesheets contain
global selectors, so eagerly importing every role dashboard at application
startup could override the login page styles before authentication. Lazy
loading keeps those styles out of the anonymous login view while preserving
the role dashboards after login.
