This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set up your key to access Number Verification API (https://apilayer.com/marketplace/number_verification-api)

Place your API key in ```.env.local```

```bash
PHONE_LOOKUP_KEY=${YOUR_API_KEY}
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run end-to-end test cases in watch mode.

```bash
yarn cypress
```

## Features

- Phone validation
- View history of inputted phone number

## Tech stack

- Next.js
- Typescript
- React
- Tailwind CSS
- Number Verification API
- Cypress

