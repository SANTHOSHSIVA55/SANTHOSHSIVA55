# Implementation Plan: Portfolio Refinement & Polish

## Overview
Systematically fix all bugs, performance issues, and old color references, then refine the design to Awwwards quality.

---

## Phase 1: Critical Bug Fixes & Performance

### 1.1 Fix Memory Leaks
- **SmoothScroll.tsx**: Fix `requestAnimationFrame` loop that never cancels on unmount. Store frame ID and cancel in cleanup.
- **AnimatedBackground.tsx**: Convert `ScrollProgress` from `dangerouslySetInnerHTML` script injection to a proper React `useEffect` with cleanup. Add tab visibility check to canvas animation loop.

### 1.2 Fix Array Mutation Bug
- **Navbar.tsx line 23**: `sections.reverse()` mutates in place on every scroll. Change to `[...sections].reverse()` or reverse the array definition.

### 1.3 Fix Duplicate API Calls
- **Sections.tsx**: Projects and GithubStats both fetch the same GitHub repos endpoint. Create a shared cache or use a single fetch point.

### 1.4 Remove Dead Code
- **Hero.tsx**: Remove unused `Mail` import, remove unused `glareX`/`glareY` computed values
- **Sections.tsx**: Remove unused `useCallback`, `ExternalLink`, `ArrowUpRight`, `BookMarked`, `Cloud` imports
- **CustomCursor.tsx**: Remove unused `followerRef`
- **SmoothScroll.tsx**: Remove unused `lenisRef`, remove empty scroll callback
- **styles.css**: Remove dead CSS (`.chrome-ambient`, `@keyframes particle-drift`, `@keyframes count-up`, `.magnetic-btn`, `@keyframes mask-reveal`)

### 1.5 Fix Old Color References
- **Contact.tsx**: Change `color="#00E5FF"` → `#E8E8E8`, `color="#3B82F6"` → `#D9D9D9`, default `#00E5FF` → `#E8E8E8`
- **Navbar.tsx**: Change `rgba(0, 229, 255, 0.08)` → `rgba(232, 232, 232, 0.08)` in scrolled border
- **Sections.tsx**: Change fallback `#00E5FF` → `#E8E8E8` in Journey and Achievements

### 1.6 Fix Typing Effect Cleanup
- **Hero.tsx**: Fix nested `setTimeout` in `useTypingEffect` that doesn't clean up inner timer on unmount.

### 1.7 Fix Timeline Layout
- **Sections.tsx line 419**: Both sides use `justify-end`. Change right-side column to `justify-start`.

---

## Phase 2: Profile Photo Redesign

### Hero Profile Card
- Circular crop with `rounded-full`
- Glass frame with metallic silver border (`border-2 border-white/10`)
- Soft shadow (`shadow-elevated`)
- Elegant hover: subtle scale + border glow
- Remove excessive glow orb behind card
- Keep the "Currently" info card below the photo

---

## Phase 3: Project Section Redesign

### Remove Mobile Mockup
- Remove `MobileMockup` component and all mobile mockup rendering
- Remove `mobileSrc`, `mobileLoaded`, `mobileError` state from both card components
- Remove `Smartphone` import from lucide-react

### Make Preview Larger
- Featured card: Increase mockup area height from `pt-10 sm:pt-14 md:pt-16` to `pt-12 sm:pt-16 md:pt-20 pb-4`
- Grid cards: Increase from `pt-8 sm:pt-10` to `pt-10 sm:pt-12 pb-2`
- Laptop mockup max-width: Featured from `520px` to `640px`, Grid from `320px` to `400px`

### Improve Presentation
- Better spacing between mockup and content
- Premium glass cards with subtle metallic border
- Refined typography hierarchy
- Better button styling with chrome gradients
- Improved hover animations

---

## Phase 4: Design Refinement

### Color Palette Update
- Primary Background: `#020202`
- Secondary Background: `#090909`
- Cards: `#151515`
- Primary Text: `#FFFFFF`
- Secondary Text: `#B5B5B5`
- Metallic Silver: `#C0C0C0`, `#D9D9D9`, `#ECECEC`

### Update styles.css
- Update `--muted-foreground` from `#A8A8A8` to `#B5B5B5`
- Update card background from `rgba(255,255,255,0.04)` to `#151515`
- Refine glass effects
- Update all color references throughout components

### Typography
- Ensure consistent font weights
- Improve heading hierarchy
- Better letter-spacing for uppercase text

### Spacing
- Improve section padding
- Better card padding
- Consistent gaps between elements

---

## Phase 5: Favicon

### Create SVG Favicon
- Create `public/favicon.svg` with a minimal ◆ diamond symbol
- Update `__root.tsx` to reference the SVG favicon
- Keep it clean and professional

---

## Phase 6: Performance Optimization

### Bundle Optimization
- Add `React.memo` to static components (SectionHeader, MiniStat)
- Lazy load below-fold sections
- Optimize canvas particle count based on device capability
- Add `will-change` hints for animated elements

### Animation Optimization
- Use `transform` and `opacity` only for animations (GPU-accelerated)
- Reduce spring stiffness where appropriate
- Add `prefers-reduced-motion` media query support

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/styles.css` | Update colors, remove dead CSS, add favicon styles |
| `src/components/portfolio/Hero.tsx` | Remove dead code, fix typing cleanup, circular photo, refine design |
| `src/components/portfolio/ProjectShowcase.tsx` | Remove mobile mockup, enlarge previews, refine design |
| `src/components/portfolio/Sections.tsx` | Fix timeline, remove unused imports, fix fallback colors |
| `src/components/portfolio/Navbar.tsx` | Fix reverse() bug, fix old color |
| `src/components/portfolio/Contact.tsx` | Fix old color references |
| `src/components/portfolio/AnimatedBackground.tsx` | Fix ScrollProgress script, optimize canvas |
| `src/components/portfolio/SmoothScroll.tsx` | Fix memory leak, remove dead code |
| `src/components/portfolio/CustomCursor.tsx` | Remove dead ref |
| `src/routes/__root.tsx` | Update favicon reference |
| `public/favicon.svg` | **NEW** - SVG favicon |

---

## Verification
1. `npm run build` must pass with zero errors
2. No console errors in browser
3. No TypeScript warnings
4. All old color references eliminated
5. All memory leaks fixed
6. Profile photo circular with glass frame
7. Projects show only laptop mockup (no mobile)
8. Favicon shows ◆ symbol
