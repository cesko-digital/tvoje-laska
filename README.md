# Getting Started

Here https://docs.google.com/document/d/1MxzFjsEiA7MWljbHhquHuU9NFj-JtOP0PJlG1nRocZI/edit you can find detailed technical documentation


## Install dependencies

```bash
npm install
```

## Run the development server:

```bash
npm run dev
```

The portal will be running at http://localhost:3000.

## Run the production server:

To test in the production environment you must build the project first:

```bash
npm run build
npm run start
```

## Tech

- [React](https://react.dev/) - a JavaScript framework used to build web, mobile and desktop applications
- [Next.js](https://nextjs.org/) - a React framework that enables server-side rendering and static web applications for projects build with React
- [TypeScript](https://www.typescriptlang.org/) - high-level programming language that adds static typing to JavaScript
- [Tailwind](https://tailwindcss.com/) - CSS framework providing single-purpose utility classes


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Wordpress notes

Simple JWT plugin is currently hacked in PHP file so that autologin is working. We had to comment signature check. If autologin is not working, check plugin files
