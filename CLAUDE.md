# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

We Check 66 (elect-survey-maps) - Thai election monitoring and survey maps web application built with Next.js 13, TypeScript, Material-UI, and MapLibre GL.

## Commands

```bash
# Development
bun run dev      # Start development server

# Build & Production
bun run build    # Production build
bun start        # Start production server

# Linting
bun run lint     # Run ESLint via Next.js
```

## Architecture

### State Management
- **Zustand** stores in `src/store/` for client-side state
- `location.store.ts` - Selected election unit location
- `layout.store.ts` - Layout state and desktop confirmation

### Key Directories
- `src/apis/` - API client functions with fetch wrappers
- `src/components/` - React components organized by type (dialogs, drawers, forms, panels, map)
- `src/config/` - Configuration (colors, map settings)
- `src/interfaces/` - TypeScript interfaces
- `src/pages/` - Next.js pages (index.tsx is main entry)
- `src/styles/` - MUI theme and global CSS

### UI Stack
- **Material-UI v5** with Emotion styling
- **Framer Motion** for animations
- **Notistack** for toast notifications
- Custom theme with primary green (#10C487), secondary yellow (#ffd542)

### Map Integration
- **MapLibre GL** with Vallaris Maps style
- Election unit points on layer "ELECT_PLACE_POI"
- Geolocation with custom pulsing dot animation
- Click events on map features trigger side panels

### Patterns
- Functional components with React hooks
- MUI `sx` prop for inline styles
- Responsive design with `useMediaQuery` hook
- Mobile-first drawer-based UI
- Thai language with Kanit font (no i18n library)
