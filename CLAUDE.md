# CLAUDE.md - AI Assistant Guide for Wenbo Zhao Portfolio

This document provides guidance for AI assistants working with this portfolio website codebase.

## Project Overview

Personal portfolio website for Wenbo Zhao — a business builder based in Toronto who combines marketing strategy, creative direction, and full-stack execution. Built with vanilla HTML, CSS, and JavaScript for performance and simplicity.

### Brand Positioning
- **Name:** Wenbo Zhao
- **One-liner:** I design and build businesses — combining marketing, creative strategy, and full-stack execution.
- **Location:** Toronto, Canada
- **Focus:** Business building, marketing strategy, creative direction, and front-end execution

## Project Structure

```
Website/
├── index.html          # Main HTML file (single-page application)
├── css/
│   └── style.css       # Premium dark theme with CSS custom properties
├── js/
│   └── main.js         # Navigation, modals, project data, animations
├── assets/             # Images and static files (placeholder)
└── CLAUDE.md           # This file
```

## Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Dark theme, bento grid, custom properties |
| JavaScript (ES6+) | Modals, animations, interactivity |
| Google Fonts (Inter) | Typography |
| SVG Icons | Inline icons (no external dependencies) |

## Site Sections

1. **Hero** - Bold headline, tagline, and CTA buttons (View Work, Contact)
2. **What I Do (Bento Grid)** - 6 cards highlighting capabilities
3. **Featured Work** - 4 project cards with modal detail pages
4. **About** - Bio text and grouped skills display
5. **Contact** - Simple CTA section
6. **Footer** - Social links (Instagram, LinkedIn, GitHub)

## CSS Architecture

### Theme Variables
Located at top of `css/style.css`:

```css
:root {
    /* Colors - Premium Dark Theme */
    --color-primary: #ffffff;
    --color-accent: #6366f1;
    --bg-primary: #09090b;
    --bg-secondary: #18181b;
    --bg-card: #18181b;
    --text-primary: #fafafa;
    --text-secondary: #a1a1aa;
    --text-muted: #71717a;
    --border-color: #27272a;
}
```

### Key CSS Classes
- `.bento-grid` - 3-column grid for service cards
- `.bento-card` - Individual capability cards
- `.bento-large` - Spans 2 columns
- `.bento-accent` - Gradient accent card
- `.project-card` - Clickable project cards
- `.project-gradient` - CSS gradient placeholders (gradient-1 through gradient-4)
- `.skill-chip` - Individual skill tags
- `.modal` - Project detail modal

## JavaScript Structure

### Project Data (`js/main.js`)
Project details are stored in `projectData` object:

```javascript
const projectData = {
    'project-id': {
        category: 'Category Name',
        title: 'Project Title',
        overview: 'Brief description',
        role: 'My Role',
        tools: ['Tool 1', 'Tool 2'],
        problem: 'Problem statement',
        solution: ['Solution point 1', 'Solution point 2'],
        outcomes: ['Outcome 1', 'Outcome 2']
    }
};
```

### Current Projects
1. `creative-system` - Growth + Creative System
2. `shopify-storefront` - Shopify Storefront Build
3. `google-ads` - Google Ads Setup
4. `portfolio-platform` - Front-End Portfolio Platform

## Common Tasks

### Adding a New Project

1. Add project data to `js/main.js`:
```javascript
'new-project-id': {
    category: 'Category',
    title: 'Project Name',
    overview: 'Description',
    role: 'Your Role',
    tools: ['Tool 1', 'Tool 2'],
    problem: 'The problem...',
    solution: ['Step 1', 'Step 2'],
    outcomes: ['Result 1', 'Result 2']
}
```

2. Add project card to `index.html` within `.projects-grid`:
```html
<article class="project-card" data-project="new-project-id" tabindex="0" role="button" aria-label="View project details">
    <div class="project-image">
        <div class="project-gradient gradient-1" aria-hidden="true">
            <span class="project-number">05</span>
        </div>
    </div>
    <div class="project-content">
        <span class="project-category">Category</span>
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Brief description</p>
        <div class="project-tech">
            <span class="tech-tag">Tech 1</span>
        </div>
        <span class="project-cta">View Case Study <span aria-hidden="true">&rarr;</span></span>
    </div>
</article>
```

### Adding a Bento Card

Add within `.bento-grid` in `index.html`:
```html
<article class="bento-card" aria-label="Card Label">
    <div class="bento-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <!-- SVG path -->
        </svg>
    </div>
    <h3 class="bento-title">Title</h3>
    <p class="bento-description">Description text</p>
</article>
```

### Updating Skills

Edit the skills section in `index.html`:
```html
<div class="skill-group">
    <h4 class="skill-group-title">Category Name</h4>
    <div class="skill-chips">
        <span class="skill-chip">Skill Name</span>
    </div>
</div>
```

### Updating Social Links

Search and replace TODO placeholders in `index.html`:
- `https://instagram.com/TODO` - Instagram profile
- `https://linkedin.com/in/TODO` - LinkedIn profile
- `https://github.com/TODO` - GitHub profile
- `mailto:TODO@example.com` - Contact email

## Skills Configuration

Current skill groups:
- **Creative & Design:** Adobe Photoshop, After Effects, Premiere Pro
- **Front-End / Web:** Next.js, React, HTML/CSS/JavaScript
- **Programming / Automation:** Python
- **Ecommerce & Growth:** Shopify, Google Ads, GA4/GTM, Creative Testing

## Accessibility Features

- Semantic HTML structure
- `aria-label` on icon buttons and cards
- `role="button"` and `tabindex="0"` on clickable cards
- Keyboard navigation (Enter/Space to open modals, Escape to close)
- Focus trap in modals
- `aria-hidden="true"` on decorative elements
- Focus-visible styles for keyboard users

## Deployment

### GitHub Pages
1. Push to repository
2. Settings > Pages > Select source branch
3. Site available at `username.github.io/repo-name`

### Netlify / Vercel
1. Connect repository
2. No build command needed (static files)
3. Publish directory: `/`

## Development

```bash
# Local development server (Python)
python -m http.server 8000

# Local development server (Node.js)
npx serve

# Open browser
open http://localhost:8000
```

## Files to Personalize

1. **Social links** - Replace TODO placeholders
2. **Contact email** - Update mailto link
3. **Project data** - Add real projects in `js/main.js`
4. **Assets** - Add profile photo, project screenshots

## Design Conventions

- **Colors:** Dark theme with indigo accent (#6366f1)
- **Typography:** Inter font, tight letter-spacing on headings
- **Spacing:** Consistent use of CSS custom properties
- **Cards:** Rounded corners (16px), subtle borders, hover lift effects
- **Gradients:** Used for project placeholders (gradient-1 through gradient-4)
- **Animations:** Reveal on scroll, smooth transitions
