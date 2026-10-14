# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains the Vue application: `components/` for UI, `components/md/` for Markdown renderers, `router/` for routing, and `assets/` for TypeScript helpers, Stylus/CSS, and fonts.
- `docs/` holds Markdown notes and nearby assets; `docs/config.yml` defines navigation.
- `packages/vite-plugin-vue-xecades-note/` is both a Git submodule and an npm workspace. Its `src/` implements content compilation; `test/` contains automated tests.
- `public/` contains static files. `cache/` and `dist/` are generated; do not edit or commit them.

## Build, Test, and Development Commands

Use Node.js 24 from `.nvmrc`. Run commands from the repository root:

- `git submodule update --init --recursive`: populate the local plugin checkout.
- `nvm use` followed by `npm ci`: select Node and install locked workspace dependencies. The workspace links the plugin automatically.
- `npm run dev`: start the Vite development server.
- `npm run cache`: regenerate content metadata and compiled content.
- `npm run type-check`: check application and plugin TypeScript; generate the cache first on a fresh checkout.
- `npm test`: run the plugin's Vitest suite once.
- `npm run build`: regenerate cache, check types, and build into `dist/`.
- `npm run preview`: serve the production build locally.

## Coding Style & Naming Conventions

Match existing four-space indentation, double-quoted TypeScript strings, and semicolons. Use Vue Composition API with `<script setup lang="ts">`, PascalCase component filenames, and camelCase functions and variables. Prefer `@/` imports for application source. Preserve existing Stylus conventions. No ESLint or Prettier configuration is provided.

For notes, use descriptive lowercase, hyphenated filenames, YAML front matter with `title`, and `##` for ordinary top-level body headings. Update `docs/config.yml` when adding navigation entries.

## Testing Guidelines

Add plugin regression tests as `test/*.test.ts`, using Vitest `describe`, `it`, and `expect`. Cover changed compiler, content, or build behavior. No coverage threshold is configured. Run `npm test` and `npm run build`, matching CI. For rendering changes, inspect affected pages and examples under `docs/misc/test/` locally.

## Commit & Pull Request Guidelines

Follow existing prefixes: `feat:`, `fix:`, `docs:`, `refactor:`, and `chore:`; optional scopes include `fix(search):`. Keep commits focused. Commit plugin changes within its submodule, then update the parent repository's submodule reference.

PRs should describe the change, link relevant issues, report validation commands, and include screenshots for visible UI changes.
