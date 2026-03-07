# Nitin Chauhan - Developer Portfolio

A modern, high-end developer portfolio website built with Next.js, Tailwind CSS, and GSAP animations. Features a dark theme, vibrant gradients, glassmorphism cards, and smooth interactive UI.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** GSAP (GreenSock Animation Platform)
- **Icons:** Lucide React

## Project Structure

```
portfolio/
├── public/                 # Static assets (add resume.pdf here)
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   ├── AnimatedCursor.tsx   # Custom cursor (desktop only)
│   │   ├── ScrollProgress.tsx   # Scroll progress indicator
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Hero.tsx             # Hero section
│   │   ├── About.tsx            # About section
│   │   ├── Skills.tsx           # Skills section
│   │   ├── Projects.tsx         # Projects section
│   │   ├── Experience.tsx       # Experience timeline
│   │   ├── GitHub.tsx           # GitHub section
│   │   ├── Contact.tsx          # Contact section
│   │   └── FloatingTechIcons.tsx # Background tech icons
│   └── data/
│       └── portfolio.ts    # Portfolio content (edit this to update your info)
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

## Installation

1. **Clone the repository** (or navigate to the project folder):
   ```bash
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add your resume PDF** (optional):
   - Place your `resume.pdf` file in the `public` folder
   - Update `resumeUrl` in `src/data/portfolio.ts` if using a different filename

4. **Update your content** (optional):
   - Edit `src/data/portfolio.ts` to update:
     - GitHub and LinkedIn URLs
     - Project links and live demo URLs
     - Any other personal information

## Commands to Run the Project

### Development Mode
```bash
npm run dev
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
Creates an optimized production build.

### Start Production Server
```bash
npm start
```
Runs the production build. Run `npm run build` first.

### Lint
```bash
npm run lint
```
Runs ESLint to check code quality.

## Features

- **Hero Section:** Full-screen hero with animated headline and gradient background
- **About Me:** Resume summary, education, certifications
- **Skills:** Animated tech icons (React, Node.js, MongoDB, etc.)
- **Projects:** Project cards with GitHub and live demo links
- **Experience:** Timeline of work experience
- **GitHub:** Profile link and contribution stats
- **Contact:** Email, phone, social links, and contact form

## Customization

All content is centralized in `src/data/portfolio.ts`. Update this file to:
- Change personal info (name, email, phone)
- Update GitHub and LinkedIn URLs
- Add or edit projects
- Modify skills list
- Update experience and education

## Deployment

Deploy easily to [Vercel](https://vercel.com) (recommended for Next.js):

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

Or build and deploy to any Node.js hosting:
```bash
npm run build
npm start
```

## License

MIT
