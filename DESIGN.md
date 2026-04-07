```markdown
# Design System Specification: Industrial Precision & Kinetic Automation

## 1. Overview & Creative North Star
### The Creative North Star: "The Kinetic Monolith"
This design system is built to reflect the uncompromising precision of robotic engineering. We are moving away from the "friendly SaaS" aesthetic and toward a "Kinetic Monolith"—a style characterized by heavy architectural weight, absolute sharp edges (0px radius), and the sophisticated atmosphere of a high-end factory floor at midnight.

To break the "template" look, designers must embrace **Intentional Asymmetry**. Do not center every element. Use wide, sweeping gutters and off-center focal points to mimic the movement of a robotic arm. We achieve a premium editorial feel through a massive contrast in typography scale and the layering of metallic tones rather than the use of traditional UI "containers."

---

## 2. Colors: Tonal Depth & The No-Line Rule
The palette is rooted in deep blacks (`#0e0e0e`) and metallic grays. The goal is to create a UI that feels machined from a single block of steel.

*   **Primary & Secondary:** Use `primary` (#c6c6c7) for high-frequency interactions and `secondary` (#979fa4) for supporting technical data.
*   **Tertiary Accents:** The `tertiary` (#ff7162) is our "Laser" color. It should be used with extreme restraint—only for critical status indicators, active robotic paths, or high-priority CTAs.

### The "No-Line" Rule
**Borders are prohibited.** Do not use 1px solid strokes to separate sections. Instead:
1.  **Background Shifts:** Transition from `surface` (#0e0e0e) to `surface_container_low` (#131313) to define a new section.
2.  **Hard Shadows:** Use a sharp change in tonal value to imply an edge.
3.  **Negative Space:** Use the Spacing Scale to create "voids" that act as invisible dividers.

### Surface Hierarchy & Nesting
Treat the UI as a physical assembly. 
*   **Base:** `surface` (#0e0e0e).
*   **In-set Components:** `surface_container_lowest` (#000000) for recessed areas like code blocks or terminal inputs.
*   **Raised Components:** `surface_container_high` (#1f2020) for floating panels or cards.

### The "Glass & Gradient" Rule
For "Heads-Up Display" (HUD) elements, use semi-transparent `surface_variant` (#252626) with a 20px backdrop-blur. To give buttons "soul," apply a subtle linear gradient from `primary` to `primary_container` at a 45-degree angle; this mimics the way light hits a brushed metal surface.

---

## 3. Typography: Technical Authority
We pair **Space Grotesk** (geometric, architectural) with **Inter** (technical, functional) to create a hierarchy that feels like an engineering blueprint.

*   **Display (Space Grotesk):** Use `display-lg` (3.5rem) for hero statements. Tighten the letter spacing (-0.02em) to make it feel dense and powerful.
*   **Labels (Space Grotesk):** `label-sm` (0.6875rem) should always be Uppercase with increased letter spacing (+0.1em). This is for technical metadata, "Serial Numbers," or "System Status."
*   **Body (Inter):** `body-lg` (1rem) is for readability. Use `on_surface_variant` (#acabaa) for secondary body text to reduce visual noise and maintain the dark-mode atmosphere.

---

## 4. Elevation & Depth: Atmospheric Engineering
In a world without rounded corners or thick borders, depth is everything.

*   **Tonal Layering:** Achieve "lift" by placing a `surface_container_highest` element on top of a `surface_dim` background. The eye perceives the lighter gray as being closer to the light source.
*   **Ambient Shadows:** For floating elements (like a robotic arm configuration modal), use a massive, diffused shadow: `box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6)`. The shadow color must never be pure black; it should be a deep, tinted shade of the background.
*   **The "Ghost Border" Fallback:** If accessibility requires a boundary, use `outline_variant` (#484848) at **15% opacity**. It should be felt, not seen.
*   **Kinetic Hover States:** On hover, elements should not just change color; they should "activate." A card on `surface_container` should shift to `surface_bright` with a 0.2s ease-out transition, mimicking a light turning on.

---

## 5. Components: The Industrial Suite

### Buttons
*   **Primary:** Solid `primary` (#c6c6c7) with `on_primary` (#3f4041) text. **0px border radius.**
*   **Secondary:** Ghost style. No background, `outline` (#767575) at 20% opacity. On hover, fill with `surface_container_high`.
*   **Tertiary:** Text-only, `label-md` style, with a `tertiary` (#ff7162) 2px underline that expands from the center on hover.

### Inputs & Form Fields
*   **Style:** Do not use four-sided boxes. Use a `surface_container_lowest` background with a 1px solid bottom-border of `primary`.
*   **Focus State:** The bottom border transforms to `tertiary` (#ff7162).

### Cards
*   **Forbid Dividers:** Use `surface_container` (#191a1a) as the card base. 
*   **Internal Layout:** Use `label-sm` in the top right for "Serial No" or "Timestamp" to lean into the industrial aesthetic.

### Additional Component: "The Telemetry Strip"
A thin, horizontal component used at the top or bottom of sections. It displays real-time-style data (PLC status, Latency: 2ms, etc.) using `label-sm` in `tertiary` color. This reinforces the "Live Automation" feel.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use 0px border-radius on everything. No exceptions.
*   **DO** use extreme typographic scale. A 3.5rem headline next to a 0.75rem label creates a "high-end" feel.
*   **DO** leave massive amounts of empty `surface` (#0e0e0e). Space is a luxury in industrial design.
*   **DO** align technical data to a strict grid to imply precision.

### Don't:
*   **DON'T** use 1px solid borders for layout separation. Use color steps.
*   **DON'T** use bright, saturated blues or greens. Stick to the "Laser" `tertiary` for color.
*   **DON'T** use "soft" or "playful" animations. Transitions should be fast (0.15s - 0.2s) and linear or ease-out, mimicking mechanical movement.
*   **DON'T** use drop shadows on flat UI elements. Only use them for genuinely floating modal layers.

---
**Director's Note:** This system is about the beauty of the machine. If it feels too "busy," remove a color. If it feels too "soft," sharpen an edge. Every pixel must feel like it was measured by a micrometer.```