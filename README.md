# NGC FINAL V4

This is the approved light redesign, now wired to the existing NGC public services.

What is real in this package:
- MK / SR / EN switcher
- Home, About, Services, Blog, Blog Article, Start Project, Thank You
- Real Sanity blog feed and blog images (project l9cwvtr7 / production)
- Start Project POST to the existing Convex HTTP deployment
- Existing NGC service pricing used in the redesign
- Responsive desktop/mobile layout
- Approved white / blue / violet visual direction

Run locally:
1. npm install
2. npm run dev
3. Open the Local URL Next.js prints.

Optional:
Copy .env.example to .env.local. Defaults already point at the current NGC Sanity and Convex deployments.

Before replacing the GitHub main branch:
- Test all three languages
- Open all blog posts and verify images
- Submit one test Start Project request
- Run npm run build
- Keep a backup branch of the current production site


## V9 visual/readability update
- Increased small text sizes across the full site
- Larger labels, card copy, service metadata, process steps and footer contact details
- Colored pastel card backgrounds
- Modern hover lift/shadow effects on services, Why NGC, process, blog and footer
- Larger footer logo and contact details
- Mobile/tablet readability preserved


## V10 final visual tuning
- Large headings changed to NGC blue/violet/pink gradient
- Duplicate small Why NGC label removed
- Why NGC intro moved directly under the title
- Dark process section changed to a light branded gradient section
- All major cards glow on hover in their own color
- Header/footer logo enlarged
- Content, languages, blog, backend, routes and contact data kept unchanged


## V10.3
- Header restored to compact 78px height
- Header remains sticky while scrolling
- NGC logo enlarged inside the compact header
- NGC text gradient reinforced with webkit text-fill support
- NGC blog fallback labels also use gradient branding
- No other visual/content/backend/language changes

## V10.4 gradient fix
- Fixed gradient to use actual text width instead of full block width
- Large headings now visibly transition blue → violet → pink
- Why NGC card titles use the same proper text-width gradient
- No layout/content/backend/language/header changes
