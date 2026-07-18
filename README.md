# Lamplit Labs

The official website for [Lamplit Labs](https://www.lamplitlabs.com) — a technology organization building practical tools that solve real problems.

Formerly known as Bites In Byte.

From medical exam prep for doctors in Germany to citizenship test tools, career resources, and developer utilities — small, practical software packed into every byte.

## Products

| Product | Description | URL |
|---------|-------------|-----|
| **Kenntnistrainer** | KI-gestützte Kenntnisprüfung simulation & training for foreign doctors in Germany | [kenntnistrainer.de](https://www.kenntnistrainer.de) |
| **Fachsprachprüfung** | KI-gestützte FSP simulation & training for foreign doctors in Germany _(coming soon)_ | — |
| **Leben in Deutschland** | German citizenship test (Einbürgerungstest) prep with 310 questions | [lebenindeutschland.org](https://www.lebenindeutschland.org) |
| **Resume Builder** | ATS-optimized resume builder | [resume.lamplitlabs.com](https://resume.lamplitlabs.com) |
| **Developer Tools** | Everyday developer utilities — JSON formatter, Base64, UUID, and more | [tools.lamplitlabs.com](https://tools.lamplitlabs.com) |
| **EDMX Tools** | Tools for EDMX/OData metadata files | [edmx.lamplitlabs.com](https://edmx.lamplitlabs.com) |

Each product lives in its own repository and is deployed independently.

## Tech Stack

- [Next.js 14](https://nextjs.org/) — static export (`output: "export"`)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) patterns
- [TypeScript](https://www.typescriptlang.org/)
- Deployed to [GitHub Pages](https://pages.github.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm

### Development

```bash
# Install dependencies
npm install

# Start dev server at http://localhost:3000
npm run dev

# Build static export to ./out
npm run build

# Clean build artifacts
npm run clean
```

## Project Structure

```
app/            → Next.js app directory (pages, layout, global styles)
components/     → UI components (product grid, hero globe, social bar, etc.)
hooks/          → Custom React hooks
lib/            → Utility functions
public/         → Static assets (favicons, product cover SVGs, OG image)
.github/        → GitHub Actions workflow for deployment
```

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

The site is served at [www.lamplitlabs.com](https://www.lamplitlabs.com) via the `CNAME` file.

## Connect

- [GitHub](https://github.com/lamplitlabs)
- [LinkedIn](https://www.linkedin.com/company/lamplitlabs)
- [Instagram](https://www.instagram.com/lamplitlabs)
- [Mastodon](https://me.dm/@lamplitlabs)
- [Threads](https://www.threads.net/@lamplitlabs)
- [Blog](https://blogs.lamplitlabs.com)

## License

[MIT](LICENSE)
