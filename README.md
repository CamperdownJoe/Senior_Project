# CollectAI - Smart Bookmark Organization

CollectAI is a modern web application that helps users intelligently organize their bookmarks using various classification methods, including AI-powered categorization, Dewey Decimal system, and custom organization structures.

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** 
  - Tailwind CSS
  - shadcn/ui (Component Library)
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (Neon)
- **AI Integration:** OpenAI API
- **Type Safety:** TypeScript

## Features

- **Multiple Organization Methods:**
  - AI-powered smart categorization
  - Dewey Decimal Classification system
  - Custom user-defined structure
- **Interactive UI:**
  - Drag-and-drop bookmark management
  - Visual category organization
  - Real-time preview
- **Smart Analysis:**
  - Content-aware categorization
  - User preference learning
  - Intelligent folder structure

## Getting Started

1. **Install dependencies:**
```bash
npm install
# or
yarn install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```
Fill in your environment variables in `.env.local`

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Environment Variables

```env
DATABASE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
OPENAI_API_KEY=
```


## Credits & Acknowledgments

This project was built with inspiration and components from several amazing open-source projects:

- [Next.js SaaS Starter](https://github.com/mickasmt/next-saas-stripe-starter) by [@mickasmt](https://github.com/mickasmt) - For providing an excellent foundation with Next.js 14, shadcn/ui, and other modern tooling.
- [shadcn/ui](https://ui.shadcn.com/) - For the beautiful and accessible UI components.
