---
name: health-react
description: A calm, warm self-assessment survey app for checking in on your mental and emotional wellbeing
colors:
  companion-teal: "#3a6d5a"
  companion-teal-soft: "#5fa088"
  sage: "#c7d3c9"
  sage-deep: "#33422f"
  cream: "#f2ead9"
  mustard: "#d9a319"
  terracotta: "#b3402f"
  ink: "#2a2a28"
  surface: "#f2ead9"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.companion-teal}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.companion-teal}"
    textColor: "#ffffff"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.companion-teal}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
---

# Design System: health-react

## 1. Overview

**Creative North Star: "The Quiet Companion"**

The app is a quiet, steady presence at someone's side while they check in on how they're doing — never a clinical intake form, never a gamified quiz. Density stays low: one question at a time, generous white space, nothing competing for attention. The palette has shifted from a desaturated navy-blue to a warm, earthy system — sage green for structure, cream for surfaces, a deep teal for primary actions, and mustard as a selection/state accent — while keeping the same restrained, tactile philosophy: one steady accent carries primary actions, warmth comes from the surrounding neutrals, not from decoration.

This system explicitly rejects the unstyled-Bootstrap-starter look it grew out of — default `btn-primary` blue with no intention behind it, flat gray gradients with no warmth, and box-shadow values copy-pasted without a philosophy. Every token here exists because it's already load-bearing in the product; nothing is decorative.

**Key Characteristics:**
- One steady accent color (`#3a6d5a`, Companion Teal) carries all primary actions — no competing accents.
- Mustard (`#d9a319`) is reserved for a single, distinct role: selection/current-state outlines.
- Warm cream and sage neutral surfaces, not sterile white or cold gray-blue.
- Gentle, consistent lift on cards and buttons — tactile, not flat, not glassy.
- Low density: one question, one card, one decision at a time.

## 2. Colors

A restrained palette: one steady accent, warm-tinted neutrals, and sage for secondary structure (nav, header bar).

### Primary
- **Companion Teal** (#3a6d5a): The primary accent in the system. Used for every primary action — submit buttons, the "Start" and "Try again" CTAs, focus rings, links.

### Secondary
- **Mustard** (#d9a319): A single, distinct secondary role — selection outlines and current-state indicators (theme-card hover/focus, the "unsure" swipe badge). Never used for primary actions, so it stays legible as a state signal.
- **Terracotta** (#b3402f): Reserved for the negative/"disagree" signal on distortion cards, echoing the original screenshot's accent icon color without competing with Teal or Mustard.

### Neutral
- **Sage** (#c7d3c9) / **Cream** (#f2ead9): The body background gradient — a soft green-to-warm wash instead of flat white or cool gray, giving the page a gentle, grounded atmosphere at rest.
- **Sage Deep** (#33422f): Background for the dashboard sidebar (dark mode of the same hue family, replacing the old navy).
- **Ink** (#2a2a28): Heading and body text color — warm near-black, keeps headlines calm rather than heavy.
- **Surface** (#f2ead9): Card backgrounds — warm cream instead of stark white.

### Named Rules
**The One Teal Rule.** Companion Teal is the only accent used for actions (buttons, links, primary focus). Mustard and Terracotta are state signals, not action colors — they never appear on a clickable primary button.

## 3. Typography

**Body & Headline Font:** -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif (system font stack; no custom font is loaded)

**Character:** A plain, quiet system-font voice — nothing loud or branded about the typography itself. Personality comes from color and spacing, not typographic flourish. Headlines are set light (300 weight) to keep the tone soft rather than declarative.

### Hierarchy
- **Headline** (300 weight, 2.5rem desktop / 2rem mobile, line-height 1.2): Page titles ("health-react", section intros). Centered, generous bottom margin (3rem).
- **Title** (500 weight, ~1.25rem): Card titles — the survey question prompt itself.
- **Body** (400 weight, 1rem, line-height 1.5): Answer option labels, descriptions, result text. Cap prose at 65–75ch even though most content here is short.
- **Label** (400 weight, 0.875rem, `btn-sm`): Header username, logout button, small UI chrome.

### Named Rules
**The One Question Rule.** Typography never competes with the single question on screen — one prompt, one card, no secondary headline pulling focus away from it.

## 4. Elevation

Gently lifted, not flat. Cards and buttons carry a soft, shallow shadow at rest (`0 10px 20px rgba(0,0,0,0.1)`), which deepens further on hover (`0 15px 30px rgba(0,0,0,0.2)`) alongside a small upward translate. This is a deliberate warmth choice: the product should feel tactile and approachable, like something you can pick up, not a sterile flat form.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)`): Default state for all `.card` elements (question cards, theme cards).
- **Lifted** (`box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2)`, `transform: translateY(-5px)`): Hover state for cards — reinforces that the interface responds to touch.

### Named Rules
**The Always-Soft Rule.** Shadows are always soft and diffuse (large blur, low opacity). Never a hard, sharp drop-shadow — that reads clinical, not companionable.

## 5. Components

### Buttons
- **Shape:** Bootstrap default radius (`4px`), consistent across primary, outline, and success states.
- **Primary:** Solid Companion Teal (`#3a6d5a`) background, white text, `8px 16px` padding (`.btn` default) or full-width (`w-100`) on auth forms.
- **Outline:** Cream background, Teal border and text; used for unselected survey options so the selected state (solid teal) is unambiguous.
- **Confirmed/Success:** Bootstrap `btn-success` green, reserved exclusively for a confirmed survey answer — never reused elsewhere, so green stays a single, legible signal.
- **Hover / Focus:** Background/border/color transition over `0.2s ease` (`.question-option-btn`); outline buttons darken border and get `2px` width on hover/focus-visible for a clear, non-jumpy focus state.

### Cards
- **Corner Style:** `8px` radius (Bootstrap default `.card`).
- **Background:** Warm cream (`#f2ead9`).
- **Shadow Strategy:** Resting → Lifted per the Elevation section; `0.3s` transform transition on hover.
- **Border:** None — depth comes from shadow, not stroke.
- **Internal Padding:** Bootstrap `.card-body` default, content centered both axes; fixed `320px × 480px` footprint for question and theme cards so the one-question-at-a-time flow feels consistent screen to screen.

### Inputs / Fields
- **Style:** Bootstrap default form-control (light border, white background, `4px` radius).
- **Focus:** Teal focus ring — consistent with Companion Teal as the primary accent.
- **Error:** Formik/Yup validation messages in Bootstrap's default danger red, shown inline below the field.

### Navigation
- **Style:** No persistent top nav; a single header bar (`#c7d3c9` sage background, `8px` radius, `16px` padding) shows the logged-in user's name and a small outline-secondary logout button, only when authenticated.
- **Theme Selector:** A Bootstrap Carousel of `320×480px` cards, one theme per slide, no numbered indicators — browsing themes feels like flipping through options, not filling a form field. Hover/focus outline uses Mustard as the selection signal.

## 6. Do's and Don'ts

### Do:
- **Do** keep Companion Teal (`#3a6d5a`) as the only accent color used on actionable elements.
- **Do** use Mustard (`#d9a319`) only for selection/current-state outlines, never for buttons or links.
- **Do** use soft, diffuse shadows (`rgba(0,0,0,0.1–0.2)`, large blur) for all elevation — never a hard, sharp shadow.
- **Do** keep one question / one card on screen at a time; resist adding secondary content that competes with the current prompt.
- **Do** reserve green (`btn-success`) exclusively for confirmed survey answers.
- **Do** keep body copy warm and plain — short sentences, no clinical jargon, no diagnostic language.

### Don't:
- **Don't** put Mustard or Terracotta on a primary action button; that dilutes their meaning as state signals.
- **Don't** let the interface slip back into the unstyled-Bootstrap-starter look (default blue with no intention, flat gray-only backgrounds, copy-pasted shadow values) that this system explicitly moved away from.
- **Don't** use a hard drop-shadow or flat, shadow-less cards — both break the "gently lifted, tactile" feel.
- **Don't** use clinical/cold visual language (sterile white forms, hospital-form aesthetics) even on the heavier survey themes (anxiety, depression, burnout); the warmth of the system should hold across all themes.
- **Don't** stack multiple questions or decisions on one screen; it breaks the One Question Rule.
