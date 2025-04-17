# Solai Wallet

<div align="center">
  <!-- <img src="public/solai-logo.svg" alt="Solai Wallet Logo" width="200"/> -->
  <p><strong>AI-Powered Solana Wallet with Intelligent Assistance</strong></p>

  <p>
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#development-workflow">Development Workflow</a> •
    <a href="#api-reference">API Reference</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#license">License</a>
  </p>
</div>

---

## Overview

Solai Wallet combines the power of the Solana blockchain with OpenAI-powered intelligence to deliver a next-generation crypto wallet experience. Built with modern tooling, it offers:

- Secure, frictionless authentication via Privy
- Embedded Solana wallets for seamless onboarding
- Real-time AI transaction guidance and insights
- Clean, responsive UI built with Next.js and TailwindCSS
- Fully typed TypeScript codebase for safety and scalability

---

## Features

- **Secure Authentication** – Powered by [Privy](https://privy.io/)
- **Auto Wallet Creation** – No wallet? No problem—it's generated for you
- **AI Chat Assistant** – GPT-4o for real-time insights and support
- **Transaction Guidance** – Smarter decisions, faster
- **Modern UX** – Built with [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/)
- **Type Safety** – All code written in [TypeScript](https://www.typescriptlang.org/)

---

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm
- OpenAI & Privy API keys

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solai-wallet.git
cd solai-wallet

# Install dependencies
npm install         # or yarn install / pnpm install
```

### Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```
OPENAI_API_KEY=your_openai_api_key        # Get from https://platform.openai.com/
PRIVY_APP_ID=your_privy_app_id            # Get from https://privy.io/dashboard
PRIVY_CLIENT_ID=your_privy_client_id
```

### Running the Development Server

```bash
npm run dev        # or yarn dev / pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Architecture

Solai Wallet follows a modular, modern architecture using the Next.js App Router:

```
solai-wallet/
├── app/                 # Next.js App Router
│   ├── api/             # API routes (e.g. /api/chat)
│   ├── page.tsx         # Main chat interface
│   └── layout.tsx       # Global layout and providers
├── components/          # Reusable UI elements
│   ├── LoginButton.tsx  # Auth button using Privy
│   └── Provider.tsx     # Context providers
├── public/              # Static assets
├── .env.local           # Your local environment config
└── ...                  # Config files (tsconfig, tailwind, etc.)
```

### Data Flow

1. **Authentication** – Handled by Privy and Solana wallet integration
2. **User Interaction** – AI-powered chat interface
3. **Backend Logic** – `/api/chat` receives messages, routes to AI
4. **Response Delivery** – AI streams responses to user

---

## Development Workflow

### Code Conventions

- Functional React components with hooks
- Fully typed with TypeScript
- TailwindCSS for design and utility styling
- Minimal CSS modules for scoped styles

### Testing

If tests are implemented:

```bash
npm test
```

Note: Add information about the testing framework (Jest, Vitest, etc.) if available.

### Production Build

```bash
npm run build
npm start
```

---

## API Reference

### POST /api/chat

Interact with the AI assistant via the backend chat endpoint.

**Request Example:**

```json
POST /api/chat
Content-Type: application/json

{
  "messages": [
    { "role": "user", "content": "Help me understand my wallet balance" }
  ]
}
```

**Response:**  
A streamed chat response with real-time guidance or insights about your Solana wallet.

---

## Tech Stack

### Frontend

- [Next.js 15](https://nextjs.org/) – App Router architecture
- [React 19](https://react.dev/) – Component-based UI
- [TailwindCSS 4](https://tailwindcss.com/) – Utility-first styling
- [TypeScript](https://www.typescriptlang.org/) – Static typing for safety

### Authentication & Blockchain

- [Privy](https://privy.io/) – Wallet-auth integration for Web3 apps
- [Solana Web3.js](https://solana-labs.github.io/solana-web3.js/) – Solana integration

### AI Integration

- [OPEN AI SDK](https://openai.com/) – GPT-4o assistant
- [AI SDK](https://www.ai-sdk.dev/) – Framework for AI features such as streaming and context management

---

## Contributing

We welcome contributions to Solai Wallet. Please follow the steps below:

```bash
# Fork the repository

# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git commit -m "Add: [short description]"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request
```

Refer to our [Contributing Guide](CONTRIBUTING.md) for more details.

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for full terms.

---

## Acknowledgements

- [Solana Foundation](https://solana.com/)
- [OpenAI](https://openai.com/)
- [Vercel](https://vercel.com/)
- [Privy](https://privy.io/)

---

<div align="center">
  <sub>Built with ❤️ by the Solai Wallet Team</sub>
</div>