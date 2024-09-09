# Falkor Website

This repository contains the source code for the Falkor website, built using **React** and **TypeScript**, with **Vite** for development and build processes.

## Features
- **Vite** for fast, efficient development.
- **TypeScript** for static typing and improved developer experience.
- **TailwindCSS** for styling.
- **ESLint** for code quality and consistency.

## Getting Started

### Prerequisites
- Node.js v16+
- npm, yarn, or bun (my personal pick)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Team-Falkor/website
cd website
npm install
```

### Running the Project

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

### Linting

Run ESLint to ensure code consistency:

```bash
npm run lint
```

## Project Structure

- `src/`: Main source code.
  - `assets/`: Static files like images and fonts.
  - `components/`: Reusable React components.
  - `routes/`: Route components for each route.
  - `styles/`: Tailwind configuration and global CSS files.
  
- `public/`: Public static assets.
- `vite.config.ts`: Vite configuration for build and development.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.js`: TailwindCSS configuration.

## Contributing

We welcome contributions! Please create an issue or open a pull request.

## License

This project is licensed under the MIT License.
