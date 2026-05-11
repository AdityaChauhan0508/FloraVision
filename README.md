# FloraVision Designs

A plant-focused ecommerce UI built with TanStack Start and Vite. The app showcases hero merchandising, trendy plant highlights, top-selling cards, customer testimonials, and an O2 plant collection section with a cart drawer experience.

## Features

- Hero banner with featured product and call-to-action
- Trendy plant cards with alternating layouts
- Top-selling grid with add-to-cart controls
- O2 plant collection carousel/section
- Testimonials and social proof
- Cart drawer with quantity updates and remove actions

## Tech Stack

- React 19 + TypeScript
- TanStack Start, Router, and Query
- Vite build tooling
- Tailwind CSS v4
- Radix UI primitives + shadcn/ui components
- Lucide icons

## Scripts

- `npm run dev` - start the local dev server
- `npm run build` - production build
- `npm run build:dev` - build in development mode
- `npm run preview` - preview the production build
- `npm run lint` - lint the codebase
- `npm run format` - format files with Prettier

## Project Structure

- `src/routes/` - route entries (home page is in `index.tsx`)
- `src/components/site/` - page-level UI sections (hero, cards, footer, navbar)
- `src/components/ui/` - reusable UI primitives
- `src/data/plants.ts` - product, testimonial, and O2 slide data
- `src/assets/` - local images used across sections
- `src/styles.css` - global styles

## Data and Images

Product cards and section content come from `src/data/plants.ts`. Swap images by importing files from `src/assets/` and updating the relevant data entries or component props.

## Development Notes

TanStack Start server entry and error handling are configured in `src/start.ts` and `src/server.ts`.
