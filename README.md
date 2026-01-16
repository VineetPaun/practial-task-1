# CRUD Application

A React + TypeScript application featuring user authentication, product listing, and profile management.

## Features

- **User Authentication**: Sign up and login with secure password hashing (bcryptjs)
- **Product Listing**: Browse products from DummyJSON API with caching
- **Product Details**: View comprehensive product information including reviews
- **Profile Management**: Update email and change password with validation
- **Responsive Design**: CSS modules with breakpoints for all screen sizes

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material UI (MUI)** for UI components
- **Zustand** for state management with session persistence
- **React Router** for navigation
- **React Hook Form + Zod** for form validation
- **bcryptjs** for password hashing
- **Axios** for API calls

## Project Structure

```
src/
├── components/
│   ├── Login.tsx          # User login page
│   ├── Signup.tsx         # User registration page
│   ├── Profile.tsx        # User profile management
│   ├── Products.tsx       # Product listing with API data
│   ├── ViewProduct.tsx    # Product detail page
│   └── ui/
│       └── Navbar.tsx     # Navigation component
├── store/
│   └── userStore.ts       # Zustand store for user state
├── utils/
│   └── schema.ts          # Zod validation schemas
├── styles/
│   ├── variables.css      # CSS variables (colors, spacing, breakpoints)
│   └── breakpoints.css    # Responsive breakpoint reference
├── App.tsx                # Main app component
└── main.tsx               # App entry point
```

## CSS Architecture

The project uses CSS Modules with a centralized variables file:

- **variables.css**: Contains all color codes (hex format), spacing, and font sizes
- **Component-specific modules**: Each component has its own `.module.css` file
- **Responsive breakpoints**: 1920px, 1199px, 991px, 767px, 575px

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## API

Product data is fetched from [DummyJSON](https://dummyjson.com/products) and cached in sessionStorage for performance.

## Password Requirements

- 8-32 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit
- At least one special character
