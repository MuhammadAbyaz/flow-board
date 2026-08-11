# Flow Board

Task management and project collaboration platform built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with OAuth 2.0 and SAML support

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Self-serve signup and onboarding
│   ├── (dashboard)/
│   │   ├── board/           # Kanban board views
│   │   ├── list/            # List views
│   │   ├── timeline/        # Timeline views
│   │   └── rollup/          # Manager rollup dashboard
│   ├── api/
│   │   └── v1/              # REST API for third-party integrations
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/                  # shadcn/ui components
├── features/
│   ├── tasks/               # Task assignments, comments, attachments
│   ├── workflows/           # Custom workflows and automation rules
│   └── notifications/       # Real-time notifications
└── styles/
    └── globals.css          # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MuhammadAbyaz/flow-board.git
cd flow-board
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database

Run Prisma Studio to manage your database:
```bash
npx prisma studio
```

## Features

### Authentication
- OAuth 2.0 support
- SAML SSO integration
- NextAuth.js configuration ready

### Dashboard Views
- Kanban board for visual task management
- List view for detailed task information
- Timeline view for project planning
- Manager rollup dashboard for project health overview

### API
- RESTful API v1 for third-party integrations
- Comprehensive endpoint documentation

### Core Features
- Task assignments and management
- Inline comments and discussions
- File attachments
- Custom workflows and automation rules
- Real-time notifications

## License

Proprietary - All rights reserved
