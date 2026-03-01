# Neonum

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular)
![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)

Neonum is a production-ready media exploration application built with Angular 21, leveraging Standalone Components, the new control flow, and NgRx SignalStore for reactive state management. The project is focused on performance, strict typing, and maintaining a clear separation of concerns.

---

## Features

- Dashboard and media exploration
- Movie and TV show detail views
- Personnel (actor) profiles
- Local user authentication and profiles built with route guards
- Responsive design via Angular Material and custom SCSS

---

## Tech Stack

- **Framework**: Angular 21 (Standalone Components)
- **Language**: TypeScript 5.9 (Strict mode enabled)
- **State Management**: @ngrx/signals, @angular-architects/ngrx-toolkit, RxJS
- **Styling**: SCSS, Angular Material 21
- **Platform**: Node.js 24.0.0

---

## Architecture

The application implements a feature-driven architecture.

**Standalone Approach**: Exclusively uses Standalone Components.

**Smart/Dumb Pattern**: Features are separated into Smart `container` components that connect to the store, and Dumb `components` that rely on inputs/outputs.

**State Management**: Centralized reactive state through `@ngrx/signals` configured separately under `store/`.

**Core / Shared / Features**:

- `core/`: Singleton services, guards, and interceptors (e.g., auth interceptor).
- `shared/`: Reusable, generic UI components, directives, styles, and pipes.
- `features/`: Specific, isolated features combining their distinct routes, components, and containers.

---

## Project Structure

```
src/app/
├── core/
│   ├── auth/
│   ├── guards/
│   ├── interceptors/
│   └── services/
├── features/
│   ├── actor-detail/
│   ├── dashboard/
│   ├── explore/
│   ├── movie-detail/
│   ├── search/
│   └── user-profile/
├── shared/
│   ├── components/
│   ├── directives/
│   ├── models/
│   ├── pipes/
│   ├── services/
│   └── styles/
└── store/
    ├── global/
    ├── movie/
    ├── search/
    └── user-info/
```

---

## Getting Started

### Prerequisites

- Node.js
- npm
- Netlify CLI (`npm install -g netlify-cli`)

### Important: Environment Variables and API Access

This project requires a `.env` file with a valid TMDB API key to function correctly. The application is run via **Netlify Dev** (`netlify dev`) rather than the standard Angular dev server, because Netlify Dev injects the environment variables and proxies serverless functions needed for API communication.

**The `.env` file is not included in the repository.** Without it, the application will start but API calls will fail and no media data will be loaded. If you have been granted access to the required credentials, create a `.env` file in the project root and populate it with the appropriate values before running the project.

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with the required API credentials.
4. Run the development server using Netlify Dev:

```bash
netlify dev
```

Navigate to `http://localhost:8888/` (or the port Netlify Dev assigns). The application will automatically reload if you change any of the source files.

> **Note**: Running `npm run start` directly will start the Angular dev server, but environment variables will not be injected and API functionality will not work.

---

## Available Scripts

- `npm run start` - Runs the Angular development server only (`ng serve`). API will not function without Netlify Dev.
- `npm run build` - Builds the application for production (`ng build`).
- `npm run watch` - Builds the application and watches for file changes (`ng build --watch --configuration development`).

---

## Quality and Tooling

- **Formatting**: Prettier is configured (`.prettierrc`).
- **TypeScript Strict Mode**: Enabled in `tsconfig.json`.
- **Dependency Handling**: `deno.lock` and `package-lock.json` mappings are present.

---

## Performance

High Lighthouse scores which help with SEO optimization.

---

## License

Private. No open-source license provided.
