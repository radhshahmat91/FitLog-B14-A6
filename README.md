# FitLog — B14-A6

A dark, responsive workout library and daily planning app built from the FitLog Figma brief. Users can browse 12 exercises, inspect details, build a five-lift daily plan, save exercises for later, mark planned lifts done, and keep their data after reload.

## Technologies
- Next.js App Router
- React
- Tailwind CSS
- Lucide React icons
- FitLog REST API
- Browser localStorage

## Key Features
1. Responsive workout library with API-powered cards.
2. Workout detail pages with specs and instructions.
3. Today's Plan with a five-lift cap and live metrics.
4. Saved workouts with duplicate protection and toast feedback.
5. Sort by duration, calories, or rating.
6. Mark workouts as done and remove them.
7. Persistent localStorage state.
8. Custom 404 and loading states.

## API
`https://api.abcz.workers.dev/api/fitlog`

## Run locally
```bash
npm install
npm run dev
```

## Deployment
The app is ready for Vercel/Netlify/Cloudflare-style Next.js deployment.

## Git submission — important
This ZIP intentionally **does not include the `.git` folder**. That prevents old Git history/author metadata from coming with the project and helps you avoid the "2 contributors" issue when starting your GitHub repository.

After creating your GitHub repository, initialize Git in this project and make at least 8 meaningful commits using the same GitHub account/email. Example commit messages:
1. `setup nextjs and tailwind`
2. `added fitlog api integration`
3. `built responsive navbar and footer`
4. `added workout library cards`
5. `added workout detail page`
6. `added plan and saved state`
7. `added sorting and done actions`
8. `added responsive polish and readme`
