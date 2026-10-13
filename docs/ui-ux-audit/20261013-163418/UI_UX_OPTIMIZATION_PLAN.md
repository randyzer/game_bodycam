# UI/UX optimization plan

| Finding | Scope | Minimal repair | Risk | Verification | Approval |
| --- | --- | --- | --- | --- | --- |
| UX-001 | `content/en/guides/system-requirements.mdx`, `src/app/globals.css` | Replace pipe rows with a semantic table and labelled scroll container. | MDX JSX compile or narrow-screen overflow. | `pnpm typecheck`, `pnpm test`, production build, browser tree at 390px and table width measurement. | Authorized by the user's request to optimize and check before launch; completed. |
