# Nuxt 3 Umami Demo

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the drupal or mock server on `http://localhost:3001`:

```
# drupal docker
# Enable the menu items Endpoint http://localhost:3001/admin/config/services/linkset
pnpm run drupal

# mock server
pnpm run mock
```

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
