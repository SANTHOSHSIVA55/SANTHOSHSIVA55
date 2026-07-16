# Plan: Premium Project Showcase with Auto-Generated Screenshots

## Status: APPROVED - Ready for Implementation

## Overview
Redesign the Projects section to automatically capture and display real website screenshots from Live Demo URLs using thum.io screenshot API, presented in laptop and mobile mockup frames with premium hover/tilt effects.

---

## 1. Screenshot Strategy

### Primary: thum.io API (free, no API key needed)
- **Desktop screenshot:** `https://image.thum.io/get/width/1600/crop/900/https://example.com`
- **Mobile screenshot:** `https://image.thum.io/get/width/400/crop/800/aspect/mobile/https://example.com`
- Returns image directly (usable as `<img src>`), auto-refreshes when website changes
- Rate limited but fine for portfolio use

### Fallback chain:
1. Try thum.io screenshot from Live Demo URL
2. If no Live Demo URL → show premium gradient placeholder with project title
3. Images load with skeleton shimmer while fetching

### Projects with Live Demo URLs:
| Project | Desktop Screenshot URL | Mobile Screenshot URL |
|---------|----------------------|----------------------|
| GenAI BI Platform | `https://image.thum.io/get/width/1600/crop/900/https://genaibi.vercel.app` | `https://image.thum.io/get/width/400/crop/800/aspect/mobile/https://genaibi.vercel.app` |
| AquaBloom Analytics | `https://image.thum.io/get/width/1600/crop/900/https://aqua-bloom-v2.vercel.app` | `https://image.thum.io/get/width/400/crop/800/aspect/mobile/https://aqua-bloom-v2.vercel.app` |
| Portfolio | `https://image.thum.io/get/width/1600/crop/900/https://santhosh-portfolio-plum.vercel.app` | `https://image.thum.io/get/width/400/crop/800/aspect/mobile/https://santhosh-portfolio-plum.vercel.app` |
| E-commerce Dashboard | No live demo → premium placeholder | N/A |

---

## 2. New Components to Create

### `src/components/portfolio/ProjectShowcase.tsx` (NEW FILE)
Main showcase component containing:

#### 2a. `ScreenshotFetcher` - Custom hook
```ts
function useScreenshot(url: string | null, options?: { width?: number; mobile?: boolean })
```
- Constructs thum.io URL from live demo URL
- Returns `{ src, loading, error }` 
- Handles image preload with `new Image()` 
- Falls back to gradient placeholder on error
- Memoized to avoid re-fetching

#### 2b. `LaptopMockup` - SVG laptop frame
- Realistic MacBook-style frame with:
  - Dark bezel (rounded corners)
  - Screen area showing the screenshot
  - Subtle reflection/glare overlay
  - Bottom chin with notch detail
  - Drop shadow
- Accepts `children` or `src` prop for screenshot

#### 2c. `MobileMockup` - SVG phone frame
- iPhone-style frame with:
  - Rounded corners with dynamic island
  - Thin bezels
  - Screenshot fills the screen area
  - Subtle edge highlight
- Smaller than laptop, positioned as secondary visual

#### 2d. `ScreenshotCarousel` - Multi-page carousel
- Shows desktop screenshot by default
- Dot indicators for navigation
- Swipe/drag support (optional, using framer-motion)
- Smooth crossfade transitions between screenshots
- Auto-plays through pages if multiple exist

#### 2e. `ProjectShowcaseCard` - Featured project card (replaces FeaturedProjectCard)
- Full-width premium card
- Large laptop mockup with desktop screenshot (center stage)
- Mobile mockup overlapping from right side (peeking out)
- Hover: zoom into screenshot slightly, glow effect
- Tilt: 3D perspective tilt on mouse move (existing pattern)
- Gradient border on hover
- Glassmorphism background
- Below mockups: title, description, features, tech stack, Live Demo + GitHub buttons

#### 2f. `ProjectCardCompact` - Grid project card (replaces ProjectCard)
- Smaller card for 2-column grid
- Laptop mockup preview (smaller scale)
- Mobile mockup peeking from side
- Same tilt/hover/gradient effects
- Compact content below

---

## 3. Modifications to Existing Files

### `src/components/portfolio/Sections.tsx`
- Replace `FeaturedProjectCard` with `ProjectShowcaseCard`
- Replace `ProjectCard` with `ProjectCardCompact`
- Import new components from `ProjectShowcase.tsx`
- Keep the `Projects()` function structure (GitHub API fetch, data merging)
- Add screenshot URL generation logic in the `cards` useMemo

### `src/styles.css`
- Add `.mockup-shadow` utility for realistic device shadows
- Add `.screenshot-shimmer` animation for loading state
- Add `.gradient-border` animation for hover borders
- Add `.screenshot-zoom` for hover zoom transition

---

## 4. Visual Design Details

### Laptop Mockup Dimensions:
- Featured card: ~90% width of card, max-width 800px
- Grid cards: 100% width of card area
- Aspect ratio: 16:10 (macOS style)
- Bezel: 12px sides, 14px top, 20px bottom (chin)
- Color: `#1a1a2e` with subtle gradient

### Mobile Mockup Dimensions:
- Featured card: 180px wide, positioned right side overlapping laptop
- Grid cards: 120px wide, positioned right side
- Aspect ratio: 9:19.5 (iPhone style)
- Dynamic island: 100px × 30px pill at top
- Color: `#1a1a2e`

### Hover Effects:
- **Featured:** Scale 1.02, screenshot zooms to 1.05, gradient border appears, glow intensifies
- **Grid:** Scale 1.03, screenshot zooms to 1.08, subtle tilt

### Gradient Border:
```css
.gradient-border {
  position: relative;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, var(--from), var(--to));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s;
}
.gradient-border:hover::before {
  opacity: 1;
}
```

### Scroll Reveal:
- Use framer-motion `whileInView` with staggered delays
- Laptop slides up first, mobile slides up 100ms later
- Content fades in after mockups

---

## 5. Implementation Order

1. **Create `ProjectShowcase.tsx`** with all sub-components
2. **Update `Sections.tsx`** to import and use new components
3. **Update `styles.css`** with new utility classes
4. **Build and verify** with `npm run build`
5. **Deploy to Vercel** and push to GitHub

---

## 6. File Changes Summary

| File | Action | Lines (est.) |
|------|--------|-------------|
| `src/components/portfolio/ProjectShowcase.tsx` | CREATE | ~400 |
| `src/components/portfolio/Sections.tsx` | MODIFY | Replace ~250 lines (FeaturedProjectCard + ProjectCard) with imports |
| `src/styles.css` | MODIFY | Add ~40 lines of new utilities |

---

## 7. Verification

- `npm run build` must pass
- `vercel deploy --prod` to live site
- Visually verify:
  - Screenshots load from thum.io for projects with live demos
  - Laptop mockup renders correctly
  - Mobile mockup overlaps correctly
  - Hover zoom works
  - Tilt effect works
  - Gradient border appears on hover
  - Live Demo + GitHub buttons work
  - Fallback placeholder shows for E-commerce project (no live demo)
  - Responsive: works on mobile/tablet/desktop
