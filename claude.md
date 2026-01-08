# PayFunnel - Signup Funnel Design Project

## Project Overview

This project recreates and iterates on the signup funnel design for pay.com.au. The work happens in two phases:

1. **Phase 1: Figma Recreation** - Faithfully recreate the existing Figma design as a functional frontend
2. **Phase 2: Design Iteration** - Collaborate on alternate versions incorporating best practices from high-converting funnels

## Goals

- Pixel-perfect recreation of the Figma design
- Clean, maintainable code that allows rapid iteration
- A/B testable design variants
- Mobile-first, responsive implementation
- Accessibility compliance (WCAG 2.1 AA)

## Tech Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Components**: Custom components (no heavy UI libraries to maintain design fidelity)

## Project Structure

```
/src
  /components      # Reusable UI components
  /pages           # Funnel step pages
  /variants        # Alternate design versions for A/B testing
  /assets          # Images, icons, fonts
  /styles          # Global styles and Tailwind config
  /hooks           # Custom React hooks
  /utils           # Helper functions
```

## Design Principles

### Phase 1 - Recreation
- Match Figma designs exactly (spacing, colors, typography)
- Extract design tokens (colors, fonts, spacing) into Tailwind config
- Document any ambiguities or decisions made

### Phase 2 - Iteration
- Each variant should be self-contained and swappable
- Document the rationale and best practice source for each change
- Focus on conversion optimization: clarity, trust signals, friction reduction

## Funnel Best Practices to Explore

- Progress indicators and step clarity
- Social proof and trust badges
- Form field optimization (reduce fields, smart defaults)
- Mobile UX (thumb-friendly targets, keyboard optimization)
- Error handling and validation messaging
- Call-to-action prominence and copy
- Loading states and perceived performance

## File Naming Conventions

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Styles: `kebab-case.css`
- Variants: `VariantName/` directories

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
```

## Notes

- Keep components small and focused
- Prefer composition over complexity
- Document design decisions in code comments when deviating from Figma
- Screenshot comparisons between Figma and implementation are encouraged
