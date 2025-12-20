# Tisa Prime - Development Documentation

## Project Overview

Tisa Prime is a Vue 3 application built with PrimeVue 4, featuring RTL support, internationalization, and a modern development workflow with Docker support.

## Technology Stack

- **Vue 3** - Latest version with Composition API (`<script setup>`)
- **PrimeVue 4** - UI component library with Tailwind CSS theme
- **Vite** - Build tool and development server
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Vue I18n** - Internationalization with lazy-loaded locales
- **SCSS** - Styling with global injection
- **Docker** - Containerization for development and production

## Project Structure

```
tisa-prime/
├── src/
│   ├── pages/
│   │   └── mainPage/
│   │       ├── MainPage.vue          # Main page component
│   │       ├── assets/                # Page-specific assets
│   │       │   ├── style/
│   │       │   └── images/
│   │       └── locales/
│   │           └── fa.json           # Farsi translations
│   ├── router/
│   │   └── index.js                  # Vue Router configuration
│   ├── stores/
│   │   └── ....js              # Pinia store
│   ├── assets/                       # Global assets
│   ├── styles/
│   │   └── global.scss               # Global SCSS styles
│   ├── App.vue                       # Root component
│   └── main.js                       # Application entry point
├── docker/
│   └── node/
│       ├── Dockerfile.dev            # Development Dockerfile
│       ├── Dockerfile.prod           # Production Dockerfile
│       └── entrypoint.sh             # Docker entrypoint script
├── docs/
│   └── DEV.md                        # This file
├── .env                              # Environment variables
├── .env.example                      # Environment variables template
├── docker-compose.yml                # Docker Compose configuration
├── vite.config.js                    # Vite configuration
└── package.json                      # Dependencies and scripts
```

## Environment Setup

### Prerequisites

- **Node.js** 24.x
- **Docker** and **Docker Compose** (optional, for containerized development)
- **npm** or **yarn**

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
VITE_APP_TITLE=Tisa Prime
VITE_API_BASE_URL=/api
```

## Development

### Option 1: With Docker (Recommended)

#### Development Environment

1. **Build and start the development container:**
   ```bash
   docker-compose up app-dev
   ```

2. **Access the application:**
   - Open your browser to `http://localhost:3000`

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

#### Production Build

1. **Build the production image:**
   ```bash
   docker-compose build app-prod
   ```

2. **Start the production container:**
   ```bash
   docker-compose up app-prod
   ```

3. **Access the application:**
   - Open your browser to `http://localhost:80`

### Option 2: Without Docker

#### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Open your browser to `http://localhost:3000`

#### Build for Production

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Key Features

### RTL Support

The application is configured for Right-to-Left (RTL) layout, optimized for Farsi/Persian language. RTL is enabled globally in PrimeVue configuration.

### Internationalization

- Default language: **Farsi (fa)**
- Locale messages are lazy-loaded per page
- Example: `src/pages/mainPage/locales/fa.json`
- Usage in components with dynamic imports

### PrimeVue Configuration

- Theme: Aura with Tailwind CSS
- RTL enabled globally
- PrimeIcons included
- SCSS theme customization in `global.scss`

## Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The production build will be output to the `dist/` directory with:
- Minified code
- Code splitting (vendor and PrimeVue chunks)
- Optimized assets

### Docker Production Deployment

1. **Build the production image:**
   ```bash
   docker build -f docker/node/Dockerfile.prod -t tisa-prime:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 80:80 --name tisa-prime tisa-prime:latest
   ```

## Vite Configuration

- **Server:** Host `0.0.0.0`, Port `3000`
- **Build:** Minified with esbuild
- **Output:** `dist/` directory
- **Code Splitting:** Separate chunks for vendor and PrimeVue

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, modify `vite.config.js`:

```javascript
server: {
  host: '0.0.0.0',
  port: 3001  // Change to available port
}
```

### Docker Issues

1. **Clear Docker volumes:**
   ```bash
   docker-compose down -v
   ```

2. **Rebuild containers:**
   ```bash
   docker-compose build --no-cache
   ```

### Node Modules Issues

1. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Additional Notes

- The application uses JavaScript only (no TypeScript)
- No ESLint or Prettier configuration included
- All styling uses SCSS with global injection
- Timezone: Tehran (Asia/Tehran) - configure in your deployment environment

## Support

For issues or questions, refer to:
- [Vue 3 Documentation](https://vuejs.org/)
- [PrimeVue Documentation](https://primevue.org/)
- [Vite Documentation](https://vitejs.dev/)

