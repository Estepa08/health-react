# Product

## Register

product

## Users
People self-assessing their mental/emotional state across themed questionnaires (anxiety, burnout, cognitive load, depression, etc.). They register or log in, pick a theme, answer one question at a time, and get a scored result with a level and description. Emotional stakes vary by theme: some (anxiety, depression, burnout) are sensitive and the user may already feel vulnerable or stressed; others (cognitive) are closer to a casual self-check. The interface should flex to hold both without feeling clinical-cold on the heavy themes or overly serious on the light ones.

## Product Purpose
Give users a low-friction way to check in on a specific aspect of their wellbeing and get a clear, non-alarming read on where they stand, then let them return over time. Success looks like: users complete the survey without feeling judged or rushed, understand their result without needing to interpret raw scores, and feel comfortable coming back for other themes.

## Brand Personality
Warm, friendly, approachable. Speaks like a caring companion, not a medical form. Confident but gentle — the app is a small act of self-care, not a diagnosis.

## Anti-references
No specific named anti-references, but the current default Bootstrap look (default blue primary, generic card shadows, unstyled gray gradient body) reads as an unstyled starter template — avoid keeping the app in that just-scaffolded state.

## Design Principles
- Gentle before efficient: pacing and copy should never feel like they're rushing a stressed user through a form.
- One question, one breath: the single-question-at-a-time flow is the product's core UX idea — preserve and reinforce it, don't compress it into a dense multi-field form.
- Results reassure, not alarm: score presentation leads with clarity and warmth (level, plain-language description) before any raw numbers.
- Consistent warmth across themes: heavier themes (depression, anxiety) and lighter ones (cognitive) should share one calm, approachable visual language rather than shifting tone per theme.

## Accessibility & Inclusion
Standard WCAG AA: body text ≥4.5:1 contrast, visible focus states, full keyboard operability for the survey flow (question navigation, option selection), and respect for `prefers-reduced-motion` in any transitions between questions/results.
