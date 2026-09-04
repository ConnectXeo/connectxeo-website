# Design System Inspired by Linear

> Auto-extracted from `https://linear.app/` on 2026-09-03

## 1. Visual Theme & Atmosphere

High-contrast dark mode with vivid accents — feels modern, technical, and focused.

The hero section leads with "The product development system for teams and agentsThe product developmentsystem for teams and agent" followed by "Purpose-built for planning and building products. Designed for the AI era.NewLoops →NewLoops →".

**Key Characteristics:**
- Inter Variable as the heading font
- Inter Variable as the body font for all running text
- Heading weight 510, letter-spacing -1.408px
- Dark background (#08090a) as the primary canvas
- Primary accent `#5e6ad2` used for CTAs and brand highlights
- 8 shadow level(s) detected — tinted shadows
- Rounded corners (8px+) creating a friendly, approachable feel
- Tags: dark, rounded, colorful, monospace, sans-serif

## 2. Color Palette & Roles

### Primary
- **Primary Accent** (`#5e6ad2`) · `--color-primary`: Brand color, CTA backgrounds, link text, interactive highlights.
- **Secondary Accent** (`#f34e52`) · `--color-secondary`: Secondary brand, hover states, complementary highlights.
- **Background** (`#08090a`) · `--color-bg`: Page background, primary canvas.
- **Background Secondary** (`#0f1011`) · `--color-bg-secondary`: Cards, surfaces, alternating sections.

### Text
- **Text Primary** (`#f7f8f8`) · `--color-text`: Headings and body text.
- **Text Secondary** (`#999999`) · `--color-text-secondary`: Muted text, captions, placeholders.

### Borders & Surfaces
- **Border** (`#0f1011`) · `--color-border`: Dividers, outlines, input borders.

### Full Extracted Palette

| # | Hex | CSS Variable | Role | Area | Contrast |
|---|---|---|---|---|---|
| 1 | `#ffffff` | `--palette-1` | badge | large | text-dark |
| 2 | `#0f1011` | `--palette-2` | block | large | text-light |
| 3 | `#161718` | `--palette-3` | section | large | text-light |
| 4 | `#5e6ad2` | `--palette-4` | block | medium | text-light |
| 5 | `#000000` | `--palette-5` | badge | small | text-light |
| 6 | `#e5e5e6` | `--palette-6` | button | small | text-dark |
| 7 | `#2e2e32` | `--palette-7` | badge | small | text-light |
| 8 | `#6d78d5` | `--palette-8` | badge | small | text-light |
| 9 | `#f34e52` | `--palette-9` | text-accent | small | text-dark |
| 10 | `#27a644` | `--palette-10` | text-accent | small | text-light |

## 3. Typography Rules

- **Heading Font:** `Inter Variable`, sans-serif
- **Body Font:** `Inter Variable`, sans-serif

### Type Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|---|
| H1 | Inter Variable | 64px | 510 | 64px | -1.408px |
| H2 | Inter Variable | 48px | 510 | 48px | -1.056px |
| H3 | Inter Variable | 20px | 590 | 26.6px | -0.24px |
| H4 | Inter Variable | 16px | 590 | 28px | normal |
| Body | Inter Variable | 15px | 400 | 24px | -0.165px |
| Code | Berkeley Mono | 12px | 400 | 20px | -0.182px |

### Type Scale

| Token | Size | Suggested Usage |
|---|---|---|
| Display | `64px` | headings |
| H1 | `48px` | headings |
| H2 | `24px` | headings |
| H3 | `20px` | headings |
| H4 | `18px` | headings |
| Body L | `16px` | body / supporting text |
| Body | `15px` | body / supporting text |
| Small | `14px` | body / supporting text |
| XS | `13.3333px` | body / supporting text |
| Caption | `13px` | body / supporting text |

## 4. Component Stylings

### Primary Button

```css
.btn-primary {
  background: transparent;
  color: #8a8f98;
  border-radius: 9999px;
  padding: 0px 12px;
  font-size: 13px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: #ffffff;
  border-radius: 8px;
  padding: 0px 4px;
  font-size: 13.3333px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Ghost Button 2

```css
.btn-ghost-2 {
  background: transparent;
  color: #d0d6e0;
  border-radius: 8px;
  padding: 0px 7px;
  font-size: 13px;
  font-weight: 510;
  border: none;
  cursor: pointer;
}
```

### Ghost Button 3

```css
.btn-ghost-3 {
  background: transparent;
  color: #62666d;
  border-radius: 8px;
  padding: 4px 6px;
  font-size: 12px;
  font-weight: 510;
  border: none;
  cursor: pointer;
}
```

### Filled Button

```css
.btn-filled {
  background: #ffffff;
  color: #d0d6e0;
  border-radius: 8px;
  padding: 0px 7px;
  font-size: 13px;
  font-weight: 510;
  border: none;
  cursor: pointer;
}
```

### Pill Button

```css
.btn-pill {
  background: transparent;
  color: #ffffff;
  border-radius: 9999px;
  padding: 0px 0px;
  font-size: 13.3333px;
  font-weight: 400;
  border: none;
  cursor: pointer;
}
```

### Card

```css
.card {
  background: #161718;
  border-radius: 6px;
  padding: 11px;
}
```

## 5. Layout Principles

- **Base spacing unit:** `8px` — use multiples (16px, 24px, 32px, etc.)

### Spacing Scale (extracted from real elements)

| Token | Value | Role |
|---|---|---|
| spacing-1 | `8px` | element |
| spacing-2 | `4px` | element |
| spacing-3 | `1px` | element |
| spacing-4 | `5px` | element |
| spacing-5 | `24px` | card |
| spacing-6 | `3px` | element |
| spacing-7 | `6px` | element |
| spacing-8 | `10px` | element |

### Border Radius Scale

| Token | Value | Element |
|---|---|---|
| radius-button | `8px` | button |
| radius-card | `50px` | card |
| radius-button | `9px` | button |
| radius-subtle | `4px` | subtle |
| radius-button | `12px` | button |
| radius-button | `6px` | button |

## 6. Depth & Elevation

| Level | Shadow | Usage |
|---|---|---|
| Mid | `rgba(0, 0, 0, 0.2) 0px 0px 12px 0px inset` | Dropdowns, popovers |
| Low | `rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0.2) 0px 0px 0px 1px` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0...` | Cards, subtle elevation |
| Low | `rgba(0, 0, 0, 0.06) 0px 4px 4px -1px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px` | Cards, subtle elevation |


## 7. Do's and Don'ts

### Do
- Use `#08090a` as the primary background color
- Use `Inter Variable` for all headings and `Inter Variable` for body text
- Use `#5e6ad2` as the single dominant accent/CTA color
- Maintain `8px` as the base spacing unit — all gaps should be multiples
- Keep the overall feel dark — use dark surfaces throughout
- Use rounded corners (`8px`+) consistently for all interactive elements
- Embrace bold color combinations — playful energy is the point
- Apply the shadow system for elevation — use the extracted shadow values
- Use weight 510 for headings to match the brand's typographic voice

### Don't
- Don't use colors outside the extracted palette without justification
- Don't substitute Inter Variable/Inter Variable with generic alternatives
- Don't use irregular spacing — stick to 8px grid
- Don't introduce bright white surfaces — they break the dark palette
- Don't use sharp corners — they feel hostile in this rounded design language
- Don't use pure black (#000000) for text — use `#f7f8f8` instead
- Don't add decorative elements not present in the original design — no badges, ribbons, banners, or ornaments unless the source site uses them
- Don't invent UI patterns the source site doesn't have — if the original has no NEW badge, don't add one just because a red is in the palette

## 8. Responsive Behavior

| Breakpoint | Width | Notes |
|---|---|---|
| Mobile | < 640px | Single column, stack sections, reduce font sizes ~80% |
| Tablet | 640–1024px | 2-column where appropriate, maintain spacing ratios |
| Desktop | 1024–1440px | Full layout as designed |
| Wide | > 1440px | Max-width container, center content |

- Touch targets: minimum 44×44px on mobile
- Maintain 8px base unit across breakpoints — only scale multipliers

## 9. Agent Prompt Guide

### Quick Color Reference

```
Background:  #08090a
Text:        #f7f8f8
Accent:      #5e6ad2
Secondary:   #f34e52
Border:      #0f1011
```

### Example Prompts

1. "Build a hero section with a `#08090a` background, `Inter Variable` heading in `#f7f8f8`, and a `#5e6ad2` CTA button with 8px radius."
2. "Create a pricing card using background `#0f1011`, border `#0f1011`, `Inter Variable` for text, and 24px padding."
3. "Design a navigation bar — `#08090a` background, `#f7f8f8` links, `#5e6ad2` for active state."
4. "Build a feature grid with 3 columns, 24px gap, each card using the card component style."
5. "Create a footer with `#0f1011` background, `#f7f8f8` text, and 16px padding."

### Iteration Guide

1. Start with layout structure (sections, grid, spacing)
2. Apply colors from the palette — background first, then text, then accents
3. Set typography — font families, sizes from the type scale, weights
4. Add components — buttons, cards, inputs using the specs above
5. Apply border-radius consistently across all elements
6. Add shadows for depth — use the extracted shadow values, not defaults
7. Check responsive behavior — test mobile and tablet layouts
8. Final pass — verify all colors match, spacing is consistent, fonts are correct
