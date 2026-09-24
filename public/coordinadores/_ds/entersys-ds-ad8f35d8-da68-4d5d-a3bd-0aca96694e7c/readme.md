# Entersys — Design System

**Entersys** es una consultoría mexicana B2B que ayuda a empresas a implementar
metodologías de gestión y a digitalizar sus procesos a través de software e IA.
Traduce lo técnico en tableros, WorkApps y dashboards que operan "desde el día uno".
Su promesa central: *"ver si estás ganando o perdiendo en 3 segundos."*

This design system encodes Entersys' brand foundations (color, type, voice, logo
system) plus reusable UI components, foundation cards, and product UI kits so any
agent can produce on-brand interfaces and collateral.

## Sources provided
- `uploads/Lineamientos de color Entersys.pdf` — color rationale + 60/30/10 mixing rules.
- `uploads/manual_personalidad_entersys_v2.pdf` — brand personality, archetypes, voice/tone, expression map.
- Logo/isotype/symbol PNGs (`uploads/entersys_*.png`) → copied to `assets/logos/`.
- Titillium Web + Inter TTFs → copied to `assets/fonts/`.

No codebase, Figma, or product screenshots were provided. UI kits and components
below are built from the brand foundations and are reasonable, on-brand
interpretations of Entersys' stated product surfaces (dashboards, WorkApps) — not
recreations of shipping product. Flag for the user if pixel-accurate product
recreation is needed.

---

## BRAND PERSONALITY

**Central archetype — El Sabio Pragmático (The Pragmatic Sage).** Understands, translates
and simplifies complex/obsolete processes into decisions based on real data. Not a
theoretical sage — resolute and practical.

**Supporting archetypes:**
- *El Creador Funcional* — builds smart, durable, operation-centered solutions that work from day one.
- *El Cuidador Técnico* — present when most needed, protects the client from operational chaos without bureaucracy.

**Dominant traits:** clear, trustworthy, resolutive, functional, empathetic.
**Narrative tone:** professional yet close, concrete, authority without arrogance.
**DNA:** Sabiduría de procesos · Tecnología útil · Acompañamiento de calidad → al servicio del Cliente.

---

## CONTENT FUNDAMENTALS

**Language:** Spanish (Mexican, business register). Voice is *profesional pero accesible*,
authority without arrogance, builds trust by *showing* value rather than promising it.

**How copy is written:**
- **Functional language.** Words the client sees in their real operation. Say *"Esto es lo que ve tu jefe"*, *"Aquí puedes ver si estás ganando o perdiendo"*.
- **Visual & demonstrative.** Prioritize examples, figures, dashboards anchored in daily experience.
- **No empty ornament.** Go straight to the point; no hollow technicalities or buzzwords.
- **We / you (nosotros / tú).** Warm, direct second person to the client ("te ayudamos", "lo logramos juntos"). Institutional voice uses "En Entersys…".

**Expression map — say this, not that:**
- ✅ "Te ayudamos a ver si estás ganando o perdiendo"  ❌ "Potenciamos tu ROI con soluciones disruptivas"
- ✅ "En semanas, no en meses"  ❌ "Pronto estaremos en contacto"
- ✅ "Este tablero lo puedes usar desde mañana"  ❌ "Hacemos integraciones full-stack API-first"
- ✅ "Automatizamos lo que ya haces bien"  ❌ "Digitalizamos tus procesos end-to-end con IA"
- ✅ "Estamos contigo para resolver, no para complicar"  ❌ "Ofrecemos consultoría de clase mundial"

**Casing:** Sentence case for body and most headings. Uppercase reserved for short
eyebrows / section labels (e.g. `CONSTRUCCIÓN`, `ARQUETIPO CENTRAL`) with wide tracking.
**Emoji:** not part of the brand — avoid in product UI. (✅/❌ appear only in internal
do/don't guidance, never in shipped copy.)

**Tone by context:**
- *Comercial (clientes):* claro, resolutivo, confiable — show fast results, no jargon, operational empathy.
- *Alianzas (socios):* técnico, estratégico, colaborativo — synergies, shared vision, execution efficiency.
- *Institucional (empleados):* cercano, transparente, motivador — recognize wins, give clear context.

---

## VISUAL FOUNDATIONS

**Color.** Built on the 60/30/10 rule:
- **~60% dominant** — one of: Azul oscuro `#1c2838` (institutional), Turquesa opaco `#093d53` (fresh/innovative), or Blanco `#fafafa` (classic light). Choose by context (institutional vs. commercial).
- **~30% structural** — Gris azulado `#7c878e` for text blocks, neutral fills, dividers, process diagrams; a "visual rest" that prevents blue oversaturation.
- **~10% accent** — Turquesa vivo `#009ca6` (action buttons, interactive icons, dashboard highlights) and Oro opaco `#c2a56d` (standout titles, achievements, key figures, certifications). Never abuse — accents only direct attention.

Imagery/color vibe is **cool and clean** — teal/navy/steel, no warm casts except the muted gold accent. No neon, no purple gradients.

**Type.** Titillium Web for titles/headings (humanist, slightly technical, condensed feel);
Inter for body/paragraphs (neutral, legible). Headings use SemiBold/Bold; body Regular.
Eyebrows are uppercase Titillium SemiBold with `0.08em` tracking.

**Spacing & layout.** 4px base scale. Generous whitespace, structured grids, clear
alignment — the "estandarización de procesos" pillar expressed visually. Content max ~720px, container max ~1200px.

**Backgrounds.** Solid brand fills (navy, deep teal, paper) — NOT busy. Dark surfaces
(`#1c2838`, `#093d53`) used for dashboards and storytelling for elegant contrast. No
hand-drawn illustration, no photographic texture required. Subtle flat fills only;
gradients used sparingly and only within-hue (teal→deep teal), never rainbow/purple.

**Corner radii.** Restrained: cards ~10–16px, inputs ~6–10px, chips/pills fully rounded,
buttons ~8px. Nothing overly bubbly.

**Cards.** White surface, subtle 1px `#e2e6e8` border, soft cool-tinted shadow
(`0 4px 12px rgba(28,40,56,.08)`). Modest rounding. On dark surfaces, cards become
lighter navy panels (`#26374b`) with faint borders.

**Shadows.** Soft, low-opacity, navy-tinted — never black, never harsh. A dedicated
teal glow (`--shadow-brand`) for primary actions only.

**Borders.** Hairline neutral borders are the default separator, not heavy rules.

**Motion.** Calm and functional. Standard `cubic-bezier(.4,0,.2,1)` at 120–320ms.
Fades and short slides; **no bounce, no playful springs.** Respect reduced motion.

**Hover states.** Buttons darken (teal 500→600); ghost/secondary get a faint neutral
fill; links darken + underline. **Press states.** Darken further (teal 700) + very slight
optical settle; avoid dramatic scale.

**Transparency & blur.** Used sparingly — e.g. overlay scrims on dialogs
(`rgba(28,40,56,.5)`). Not a decorative glassmorphism system.

---

## ICONOGRAPHY

Entersys' provided assets contain **no product icon set** — only the logo/isotype/symbol
family. For UI, this system standardizes on **Material Symbols (Rounded)** — Google's
open icon set, which Entersys already works with. The font **ships with the design
system via `styles.css`** (imported in `tokens/icons.css`), so consumers get it with the
one stylesheet link — no extra `<link>`/`<script>` per page.

- **Style:** rounded, single-weight symbols; use `fill={1}` for emphasis/active states, outlined (default) elsewhere.
- **Names:** snake_case Material Symbols names (`dashboard`, `trending_up`, `check_circle`, `account_tree`, `bolt`).
- Icons inherit `currentColor` (teal for interactive, slate for neutral). Use the `<Icon>` component or the `.material-symbols-rounded` class directly.
- **No emoji** in product UI. No multicolor icons. Unicode glyphs are not used as icons.
- **Logo/brand marks** live in `assets/logos/` (see below) — use PNGs, never redraw.

### Logo system (`assets/logos/`)
- **Symbol** — the abstract "sy" mark alone (`entersys_symbol_{darkblue,white,black}.png`).
- **Isotype** — the symbol inside a filled circle (`entersys_isotype_{teal,darkblue,gold,grey,white}.png`).
- **Isologotype** — mark + "Entersys" wordmark, stacked (`entersys_isologotype_stacked.png`) or horizontal (`entersys_isologotype_horizontal.png`).
- Wordmark color is slate/steel or gold depending on lockup; the mark's primary color is Turquesa vivo. Preserve clear space and never recolor outside the provided variants.

---

## INDEX / MANIFEST

**Root**
- `styles.css` — global entry (import lines only). Link this one file.
- `readme.md` — this guide.
- `SKILL.md` — Agent Skills wrapper.

**tokens/** — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`, `base.css`.

**assets/** — `fonts/` (Titillium Web + Inter TTFs), `logos/` (brand mark PNGs).

**guidelines/** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**ui_kits/console/** — interactive dashboard/WorkApp recreation (login → operación). See its README.

**templates/dashboard/** — `Panel de operación` DC template consuming projects can copy (`Dashboard.dc.html` + `ds-base.js`).

**components/** — reusable React primitives (see cards in the "Components" group), consumed via `window.EntersysDesignSystem_ad8f35`:
- **forms/** — `Button`, `Input`, `Select`, `Checkbox`, `Switch`
- **core/** — `Card`, `Badge`, `Tag`, `Icon`
- **navigation/** — `Tabs`
- **feedback/** — `Dialog`
- **data/** — `StatCard`
- **dataviz/** — `DonutChart`, `BarChart`, `ProgressRing`, `Sparkline`, `Infolet` — brand-colored graphs & metric tiles for decks, résumés and dashboards.

**Intentional additions** (no source component inventory was provided; standard set authored from brand foundations):
- `Icon` — thin Material Symbols wrapper; Entersys' chosen icon set (shipped via `styles.css`).
- `StatCard` — KPI tile; central to the "ver si estás ganando o perdiendo en 3 segundos" dashboard promise.
- `dataviz/*` — charts + `Infolet` metric tiles, built for the "assets for decks/résumés" use case, all defaulting to the brand palette.

**ui_kits/** — full-screen product recreations (Entersys dashboard / WorkApp).

Namespace for consuming the bundle: see `check_design_system` output (`window.<Namespace>`).
