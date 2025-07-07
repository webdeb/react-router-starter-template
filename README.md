# Welcome to React Router + Cloudflare Workers!

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🗄️ Drizzle ORM with Cloudflare D1
- 📊 Database migrations and schema management
- 📖 [React Router docs](https://reactrouter.com/)

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Database Setup

This project uses Drizzle ORM with Cloudflare D1. To set up the database:

1. **Create a D1 database:**
   ```bash
   npx wrangler d1 create counter-db
   ```

2. **Update the database ID in `wrangler.json`:**
   Replace `your-database-id-here` with the actual database ID from step 1.

3. **Generate and apply migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Optional: Open Drizzle Studio to view data:**
   ```bash
   npm run db:studio
   ```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.json`:

```sh
npm run typegen
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

If you don't have a Cloudflare account, [create one here](https://dash.cloudflare.com/sign-up)! Go to your [Workers dashboard](https://dash.cloudflare.com/?to=%2F%3Aaccount%2Fworkers-and-pages) to see your [free custom Cloudflare Workers subdomain](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/) on `*.workers.dev`.

Once that's done, you can build your app:

```sh
npm run build
```

And deploy it:

```sh
npm run deploy
```

To deploy a preview URL:

```sh
npx wrangler versions upload
```

You can then promote a version to production after verification or roll it out progressively.

```sh
npx wrangler versions deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
