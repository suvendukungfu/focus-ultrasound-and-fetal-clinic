# Architecture

## Overview

Focus Ultrasound & Fetal Clinic is built with a modern, scalable frontend architecture designed for performance, accessibility, and maintainability.

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Shadcn UI
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router 6
- **Animations:** Framer Motion / Tailwind Animate

## Project Structure

```text
src/
├── components/     # Atomic UI components and feature-specific components
├── pages/          # Page-level components and routing definitions
├── hooks/          # Custom reusable logic
├── services/       # API clients and external service integrations
├── utils/          # Pure utility functions and helpers
├── contexts/       # React Context providers for global state
└── lib/            # Shared library configurations (e.g., shadcn/ui helpers)
```

## Key Architectural Decisions

1. **TypeScript First:** Strict typing for data structures and component props to ensure build-time safety.
2. **Component-Driven Development:** UI is broken down into small, testable, and reusable Shadcn-based components.
3. **Language Context:** A dedicated `LanguageProvider` handles internationalization (English/Hindi) across the platform.
4. **Performance:** Optimized asset loading and scroll-based animations for a smooth user experience.
