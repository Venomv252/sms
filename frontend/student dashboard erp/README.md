# Greenwood High Student ERP

Responsive React/Vite recreation of the supplied desktop and mobile dashboard designs.

## Run

1. Install Node.js
2. Open this folder in VS Code / terminal
3. Run:

npm install
npm run dev

Then open the local Vite URL.

## Build

npm run build


## Connect to the backend database

This frontend now requests live records from the Express API for the student profile, attendance, homework, results, notices, fees, timetable and subjects.

1. Start PostgreSQL and your backend in the backend folder.
2. Seed the backend database with `npm run db:seed`.
3. In this frontend folder, copy `.env.example` to `.env.local`.
4. Check `VITE_API_URL` is set to `http://localhost:5000/api`.
5. Install frontend packages with `npm install`.
6. Start the frontend with `npm run dev`.

For local development, the frontend automatically signs in using the seeded student account (`student@example.com` / `ChangeMe123!`) so the existing dashboard can load protected API data without adding a login screen or changing the original layout. This is only a development convenience. Remove this auto-login behavior and add a real login flow before deployment.

The existing page design and original demo content are retained. Each supported page now also displays a live database panel, so you can verify the records returned by the backend. Features not exposed by the current backend API remain in their original frontend state until matching API endpoints are implemented.


## Backend connection behavior

The page content remains blank until the frontend can authenticate through the backend API against the seeded database. If the backend is stopped or the database cannot be reached, only the application shell/navigation is shown. The frontend checks again every 5 seconds and reveals page content after the API becomes available.

Start the backend first, then run the frontend. The default API URL is `http://localhost:5000/api`; override it with `VITE_API_URL` in `.env.local`. The local demo login requires the seeded `student@example.com` account.
