# Dashboard Sidebar CSS Audit

## Scope
Reviewed the uploaded frontend archive (`frontend(8).zip`) and the shared `RoleSidebar` used by Super Admin, Director, Principal, and Accountant dashboards.

## Issues found and corrected

1. **Missing shared shell geometry**: the previous cleanup removed generic `.platform-shell` layout rules, but the replacement role themes did not consistently restore the sidebar/content relationship. The shared sidebar now has a 264px desktop width and the main content receives the matching offset. On mobile, the content uses the full width and the sidebar becomes an off-canvas drawer.
2. **Brand icon flex bug**: `.platform-brand > div` styled both the icon wrapper and brand text wrapper as flexible columns. It now targets only the text wrapper; the icon remains a fixed-size element.
3. **Navigation layout**: the sidebar navigation now uses a flex column with a constrained scroll area, consistent spacing, and a visible active state.
4. **Theme consistency**: Super Admin, Director, and Accountant use the same green sidebar treatment as the existing Principal sidebar. Role-specific selectors keep theme rules isolated.
5. **Accountant wrapper collision**: Accountant previously included `principal-role-shell` in its wrapper, which could unintentionally activate Principal-specific CSS. It now uses only `platform-shell accountant-role-shell`.
6. **Mobile behavior**: all RoleSidebar dashboards use the same off-canvas width and open/closed behavior below 768px.

## Files changed

- `src/components/RoleSidebar.css`
- `src/role-dashboards/AccountantDashboard.jsx`
- `src/role-dashboards/accountant-theme.css`
- `src/role-dashboards/director-theme.css`
- `src/role-dashboards/superadmin-zip-theme.css`

Principal dashboard JSX and its existing sidebar theme were left unchanged.

## Verification status

- Source-level audit completed for all four `RoleSidebar` dashboard wrappers.
- ZIP integrity is checked after packaging.
- A production Vite build is **not verified**: dependency installation (`npm ci --no-audit --no-fund`) timed out in this environment. Run `npm ci` and `npm run build` locally before deployment.
- Browser visual QA (desktop and mobile) still needs to be performed in the user's environment.

## Regression checklist

- [ ] Super Admin: desktop sidebar/content alignment, active item, long navigation scroll
- [ ] Director: desktop sidebar/content alignment, active item, long navigation scroll
- [ ] Principal: unchanged visual appearance and working navigation
- [ ] Accountant: independent Accountant theme with no Principal CSS leakage
- [ ] All four: mobile drawer open/close, scrim, and content width
- [ ] All four: sign out and navigation callbacks
