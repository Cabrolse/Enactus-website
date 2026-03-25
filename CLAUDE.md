# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for Enactus TUD (Technological University Dublin student society). Built with vanilla HTML, CSS, and JavaScript. No build system or package management.

## Repository Structure

```
├── index.html          # Homepage with hero, about, team sections
├── contact.html        # Contact page with Web3Forms integration
├── project.html        # Events/projects listing page
├── Project-BiaBox.html # Individual project detail page
├── style.css           # Single shared stylesheet
├── script.js           # Shared JavaScript (mobile nav, scroll animations)
└── *.jpg, *.png        # Image assets (hero, team photos, logo)
```

## Architecture

**CSS Architecture:**
- CSS custom properties in `:root` for color palette (blue, social-blue, gray variants)
- Shared component classes: `.container`, `.btn-3`, `.cta-button-2`, `.animate-on-scroll`
- Page-specific body classes: `.index-pg`, `.contact-pg` for style overrides
- Mobile-first responsive design with hamburger menu at 768px breakpoint

**JavaScript Patterns:**
- Mobile menu toggle: hamburger click toggles `.nav-links` display
- Scroll-triggered navbar: adds/removes `.scrolled` class to header based on scrollY > 80
- IntersectionObserver for scroll animations: `.animate-on-scroll` elements fade/slide in when entering viewport
- Form field interactions: `makeBlue()` and `resetBorder()` for contact form focus states

**External Dependencies:**
- Font Awesome loaded via CDN for social icons
- Web3Forms API endpoint for contact form submission (access_key in form)

## Development Workflow

**Serve locally:**
```bash
# Simple HTTP server
python3 -m http.server 8000

# Or with live reload
npx live-server --port=8000
```

**Deploy:**
- Push to `main` branch on GitHub
- Site auto-deploys via GitHub Pages to `cabrolse.github.io/Enactus-website/`

**No build step** - edit files directly and refresh browser.

## Common Tasks

**Add new page:**
1. Create `page-name.html` with same header/nav/footer structure
2. Add page-specific class to `<body>` if style overrides needed
3. Link in navigation (update all HTML files)

**Modify styles:**
- Edit `style.css` - changes affect all pages
- Use existing CSS variables for consistency
- Test mobile hamburger menu at < 768px widths

**Update team/project content:**
- Edit HTML directly - no templating system
- Add new images to root directory, reference with relative paths

## Known Quirks

- `contactForm_inputs` is declared but unused (was for planned validation)
- Some project pages have placeholder content ("Project 1", "Desc")
- Footer quick links must be manually synced across all HTML files
- Scroll animation triggers once per element (observer unobserves after first intersection)
