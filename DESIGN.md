---
name: Thanon Portfolio
description: A focused technical portfolio with a midnight-blue interface and clear project storytelling.
colors:
  midnight-canvas: "oklch(0.145 0.025 258)"
  deep-midnight: "oklch(0.105 0.02 258)"
  soft-midnight: "oklch(0.19 0.03 258)"
  translucent-surface: "oklch(0.225 0.035 258 / 0.72)"
  solid-surface: "oklch(0.225 0.035 258)"
  frost-text: "oklch(0.965 0.012 245)"
  muted-slate: "oklch(0.75 0.03 248)"
  faint-slate: "oklch(0.57 0.035 250)"
  quiet-line: "oklch(0.75 0.05 250 / 0.13)"
  strong-line: "oklch(0.8 0.06 248 / 0.24)"
  cobalt-accent: "oklch(0.65 0.19 258)"
  ice-accent: "oklch(0.86 0.09 233)"
  blue-accent: "oklch(0.72 0.14 244)"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 9vw, 7.8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.07em"
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 2vw, 1.35rem)"
    fontWeight: 700
    lineHeight: 1.25
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  none: "0"
  subtle: "7px"
  utility: "8px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "5px"
  sm: "8px"
  md: "10px"
  lg: "18px"
  xl: "24px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ice-accent}"
    textColor: "{colors.deep-midnight}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.translucent-surface}"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
    height: "52px"
  project-card:
    backgroundColor: "{colors.translucent-surface}"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.none}"
  metadata-badge:
    backgroundColor: "{colors.translucent-surface}"
    textColor: "{colors.frost-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "5px 10px"
    height: "30px"
  tooltip:
    backgroundColor: "{colors.deep-midnight}"
    textColor: "{colors.frost-text}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "7px 10px"
---

# Design System: Thanon Portfolio

## Overview

**Creative North Star: "The Midnight Project Desk"**

The portfolio should feel like a focused workspace used by a recruiter reviewing real technical work. Midnight surfaces keep attention on screenshots, concise descriptions, and direct actions. Ice blue is reserved for navigation, state, and primary actions rather than decoration.

The system is precise, technical, and confident. It uses a strict visible grid, square-edged project surfaces, strong type hierarchy, and restrained motion. It explicitly rejects generic template layouts, crowded controls, vague marketing language, hidden navigation, and decorative effects that reduce readability.

**Key Characteristics:**

- Midnight-blue layered surfaces with one clear ice-blue accent.
- Large, compact headlines balanced by readable body copy.
- Project screenshots carry more visual weight than decoration.
- Square-edged controls and cards with thin structural borders.
- Short motion that confirms interaction and never delays navigation.

## Colors

The palette uses deep blue-black neutrals with frost text and a cool ice accent.

### Primary

- **Ice Signal:** Used for primary actions, active navigation, focus rings, and important interactive labels.
- **Cobalt Current:** Used sparingly for deeper blue emphasis and selected-state color mixing.

### Neutral

- **Midnight Canvas:** Main page background.
- **Deep Midnight:** Navigation docks, tooltips, and the deepest content surfaces.
- **Soft Midnight:** Raised tonal regions.
- **Translucent Surface:** Cards and secondary controls that need separation without a solid block.
- **Frost Text:** Primary text and high-priority labels.
- **Muted Slate:** Supporting descriptions and secondary information.
- **Faint Slate:** Low-priority metadata.
- **Quiet Line / Strong Line:** Structural borders and active separation.

**The Ice Signal Rule.** Ice blue must communicate priority or interaction. Never spread it across large decorative areas.

**The Tinted Neutral Rule.** Never introduce pure black or pure white. Every neutral remains tied to the blue hue of the interface.

## Typography

**Display Font:** Inter with system sans fallbacks  
**Body Font:** Inter with system sans fallbacks  
**Label/Mono Font:** SFMono-compatible system monospace stack

**Character:** The sans family is direct and readable, while monospace labels add technical precision to dates, categories, and section markers. Monospace is supporting vocabulary, never the main reading voice.

### Hierarchy

- **Display** (700, fluid 3rem to 7.8rem, 0.9): Project and page-level statements.
- **Headline** (700, fluid 2rem to 4.5rem, 1): Section headings.
- **Title** (700, fluid 1.1rem to 1.35rem, 1.25): Project names, feature names, and card headings.
- **Body** (400, 1rem, 1.6): Descriptions with a target line length of 65 to 75 characters.
- **Label** (700, 0.72rem, 0.08em): Dates, categories, compact badges, and navigation metadata.

**The Two-Voice Rule.** Use sans for reading and hierarchy. Use monospace only for short technical labels and metadata.

## Elevation

The system uses a hybrid of tonal layering, thin borders, and broad ambient shadows. Cards remain visually stable at rest. Stronger shadows appear on floating controls, tooltips, dialogs, and hover states where depth communicates interaction.

### Shadow Vocabulary

- **Card Ambient** (`0 24px 64px oklch(0.05 0.025 258 / 0.22)`): Project cards at rest.
- **Floating Control** (`0 18px 46px oklch(0.04 0.025 258 / 0.34)`): Compact navigation controls.
- **Tooltip Lift** (`0 10px 28px oklch(0.04 0.025 258 / 0.4)`): Temporary explanatory overlays.
- **Dialog Depth** (`0 32px 96px oklch(0.02 0.015 258 / 0.7)`): Full media preview dialogs only.

**The Structural Depth Rule.** Use borders and tonal contrast first. Add shadow only when an element is raised, temporary, or interactive.

## Components

### Buttons

- **Shape:** Square by default, with no decorative rounding.
- **Primary:** Ice background with deep-midnight text, 52px minimum height, and centered icon plus label.
- **Hover / Focus:** Lift by 2 to 3px, strengthen the ambient shadow, and show the standard ice focus outline. Motion uses the confident ease-out curve and lasts 180 to 480ms depending on effect.
- **Secondary:** Translucent midnight surface with a thin border. Hover changes border and text to ice blue.
- **Active:** Compress slightly for immediate click feedback.

### Chips

- **Style:** Compact bordered metadata with short uppercase or numeric content.
- **State:** Category badges use a faint blue tint. Year badges use the same translucent surface on the home page and project detail pages.

### Cards / Containers

- **Corner Style:** Square project cards and media frames. Small radii are reserved for utility surfaces.
- **Background:** Translucent midnight surface over the main canvas.
- **Shadow Strategy:** Broad ambient shadow, never a hard drop shadow.
- **Border:** One-pixel quiet or strong line.
- **Internal Padding:** Fluid spacing, usually 18px to 48px depending on card scale.

### Inputs / Fields

- **Style:** Dark surface, thin structural border, readable label, and at least 44px touch height.
- **Focus:** Two-pixel ice outline with a four-pixel offset.
- **Error / Disabled:** Disabled controls lower opacity but retain readable labels. Error treatment must remain high contrast and must not rely on color alone.

### Navigation

The fixed top navigation uses clear text labels, generous touch targets, and a dark backdrop when scrolled. Project navigation uses one centered Previous/Next control group with explicit labels on wider screens and accessible arrow buttons on small screens.

### Project Action Tooltip

Tooltips appear above project action buttons on hover or keyboard focus. They use the deep-midnight surface, frost text, a thin border, and a short fade plus upward movement. They never replace visible button labels.

## Do's and Don'ts

### Do:

- **Do** show real project work before decoration.
- **Do** keep navigation obvious and easy to use at every screen size.
- **Do** use short, plain English descriptions.
- **Do** keep the midnight-blue visual identity consistent.
- **Do** separate quick project summaries from detailed project pages.
- **Do** respect reduced-motion preferences and preserve keyboard focus states.

### Don't:

- **Don't** use generic template layouts.
- **Don't** create crowded controls or duplicate navigation signals.
- **Don't** use vague marketing language.
- **Don't** hide navigation or make project movement depend on unexplained numbers.
- **Don't** add decorative effects that reduce readability.
- **Don't** use pure black, pure white, gradient text, decorative glassmorphism, bounce motion, or colored side stripes.
