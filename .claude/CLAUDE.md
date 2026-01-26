# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
pnpm dev          # Start Vite dev server with HMR
pnpm build        # TypeScript check + Vite production build
pnpm lint         # Run ESLint
pnpm preview      # Preview production build locally
```

## Tech Stack

- **Framework:** React 19 + TypeScript 5.9 + Vite 7
- **Routing:** Wouter (lightweight client-side router)
- **UI Components:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS 4 with OKLch color system, CSS variables for theming
- **Forms:** React Hook Form + Zod for schema-first validation
- **i18n:** i18next with three languages (en, zh-Hant, zh-Hans) and three namespaces (translation, language, auth)

## Architecture

### Directory Structure
```
src/
├── components/
│   ├── ui/           # shadcn/ui base components
│   ├── auth/         # Auth forms with validation schemas
│   ├── chat/         # Chat feature components
│   ├── dashboard/    # Dashboard layout components
│   ├── i18n/         # Language selector
│   └── theme/        # ThemeProvider (dark/light/system)
├── page/             # Route page components
├── i18n/             # i18n configuration
├── hooks/            # Custom React hooks
└── lib/              # Utilities (cn() for class merging)
```

### Key Patterns

- **Path alias:** `@/*` maps to `./src/*`
- **Indexed exports:** Feature directories export from `index.ts`
- **HOC pattern:** `withAuthLayout()` wraps auth forms with card layout
- **Component variants:** CVA (class-variance-authority) for button/component variants
- **Theme persistence:** localStorage key `vite-ui-theme`
- **i18n translations:** Located in `public/locales/{lang}/{namespace}.json`

### Form Validation Pattern
```typescript
// Define Zod schema
const schema = z.object({ email: z.string().email() })
// Use with React Hook Form
const form = useForm({ resolver: zodResolver(schema) })
```

## Conventions

- Commit messages use conventional commits format (feat, fix, refactor)
- File naming: kebab-case for files, PascalCase for components
- Forms use `InputField` wrapper for consistent styling with i18n labels
