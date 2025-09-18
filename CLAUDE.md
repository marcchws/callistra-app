# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Callistra App** - a Next.js 15 project with TypeScript, using the App Router architecture. The project is configured with shadcn/ui components and multiple UI registries for extensive component access.

## Architecture

- **Framework**: Next.js 15 with App Router (`src/app/` directory)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with CSS variables
- **Components**: shadcn/ui with "new-york" style
- **Icons**: Lucide React
- **Fonts**: Inter from Google Fonts

### Key Configuration

- **Path aliases**: `@/*` maps to `./src/*`
- **Component aliases**: Configured in `components.json` with multiple registries
- **UI registries**: 30+ component registries available including @aceternity, @magicui, @originui, @kokonutui
- **Base color**: Slate theme with CSS variables enabled

## Development Commands

### Essential Commands
- **Start development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build for production**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Lint code**: `npm run lint` (ESLint with Next.js and TypeScript configs)

### Component Management
- **Add shadcn components**: Use the `shadcn` CLI or MCP shadcn tools
- **Available registries**: 30+ registries configured in `components.json`

## File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
└── lib/
    └── utils.ts           # Utility functions (cn helper)
```

## Development Notes

### Styling
- Uses Tailwind CSS v4 with CSS variables for theming
- Global styles in `src/app/globals.css`
- `cn()` utility function available for className merging (`@/lib/utils`)

### Components
- Follow shadcn/ui component patterns
- Multiple UI registries available for diverse component needs
- Components should be placed in `@/components` (via alias)

### TypeScript
- Strict mode enabled with ES2017 target
- Path aliases configured for clean imports
- ESLint configured with Next.js and TypeScript rules

### Fonts
- Geist Sans and Geist Mono are pre-configured
- CSS variables: `--font-geist-sans` and `--font-geist-mono`

## Common Tasks

When building features:
1. Use existing component registries before creating custom components
2. Follow the established path alias structure (`@/components`, `@/lib`, etc.)
3. Maintain TypeScript strict mode compliance
4. Use the `cn()` utility for conditional className handling