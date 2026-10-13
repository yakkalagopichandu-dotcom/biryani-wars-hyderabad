# Brand Guidelines: TruthLens AI

## 1. Brand Summary

* **Brand Name**: TruthLens AI
* **Tagline**: Verify Before You Believe.
* **Personality**: Trustworthy, Intelligent, Transparent, Professional, Calm
* **It Should Never Feel Like**: Political, Biased, Fear-mongering, Sensational, Clickbait
* **Positioning**: TruthLens AI is an AI-powered misinformation analysis platform that helps users evaluate online content using transparent reasoning, trusted sources, and evidence-based insights.

---

## 2. Color System

### Backgrounds
* **Base**: `#0F1115`
* **Surface**: `#171A21`
* **Elevated Surface**: `#202530`

### Text
* **Primary**: `#F5F7FA`
* **Secondary**: `#B8C1CC`
* **Muted**: `#7E8794`

### Borders
* **Border**: `#2B3342`

### Accent Color
* **TruthLens Blue**: `#3B82F6`

### Semantic Colors
* **Success**: `#22C55E`
* **Warning**: `#F59E0B`
* **Error**: `#EF4444`
* **Information**: `#06B6D4`
* **Confidence**: `#8B5CF6`

### Contrast Rules
* Use white text on dark surfaces.
* Use blue only for actions.
* Use green only for verified results.
* Use red only for high-risk content.
* Use orange for uncertain information.
* **Never use bright colors as page backgrounds.**

---

## 3. Typography

* **Primary Font**: `Inter`
* **Fallback**: `system-ui, sans-serif`
* **Numeric Font**: `JetBrains Mono`

### Type Scale
* **H1**: `48px` (Weight: `700`)
* **H2**: `36px` (Weight: `700`)
* **H3**: `28px` (Weight: `600`)
* **Body**: `16px` (Weight: `400`)
* **Small**: `14px` (Weight: `400`)
* **Caption**: `12px` (Weight: `400`)

### Rules
* Headlines should be concise.
* Body text should have generous line spacing.
* Confidence scores should use `JetBrains Mono`.
* Never use more than two font families.

---

## 4. Spacing & Layout

* **Spacing Scale**: `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `80`, `96`
* **Grid**:
  * **Mobile**: 1 Column (16px Padding)
  * **Tablet**: 2 Columns (24px Padding)
  * **Desktop**: 12 Column Grid (Maximum Width: `1280px`)
* **Cards**:
  * **Padding**: `24px`
  * **Radius**: `20px` (or `var(--radius-lg)`)
  * **Shadow**: `0 10px 40px rgba(0,0,0,.25)`

---

## 5. Components

* **Primary Button**:
  * Background: `TruthLens Blue` (`#3B82F6`)
  * Text: `White`
  * Hover: `Darker Blue`
  * Focus: `Blue Glow`
  * Disabled: `Gray`
* **Secondary Button**:
  * Background: `Dark Surface` (`#171A21`)
  * Border: `Gray` (`#2B3342` or similar)
  * Hover: `Slightly Lighter Surface`
* **Ghost Button**:
  * Background: `Transparent`
  * Text: `Blue Text`
* **Destructive Button**:
  * Background: `Red` (`#EF4444`)
  * Text: `White`
  * Hover: `Dark Red`
* **Inputs**:
  * Background: `Dark Surface` (`#171A21`)
  * Border: `Gray`
  * Focus: `Blue Outline`
  * Placeholder: `Muted Gray`
  * Error: `Red Border`
* **Search Bar**:
  * Rounded, Shadow, Search Icon, AI Icon
* **Analysis Cards**:
  * Dark Surface, Large Radius, Soft Shadow, Animated Confidence Meter
* **Result Badge**:
  * **Verified**: Green (`#22C55E`)
  * **Likely True**: Blue (`#3B82F6`)
  * **Needs Verification**: Orange (`#F59E0B`)
  * **Likely Misleading**: Red (`#EF4444`)
  * **AI Confidence**: Purple (`#8B5CF6`)
* **Toast**:
  * Bottom Right, Dark Background (Green, Orange, Red Variants)
* **Modal**:
  * Blurred Background, Large Radius, Soft Shadow, Esc key Closes

---

## 6. Iconography

* **Style**: Rounded Outline Icons (Stroke Width: `2px`)
* **Suggested**: Lucide Icons
* **Illustrations**: Minimal, Flat (focusing on Technology, Security, Artificial Intelligence, Fact Checking). Avoid cartoons.

---

## 7. Motion

* **Hover**: `150ms` (`--transition-fast`)
* **Cards**: `200ms` (`--transition-normal`)
* **Dialogs**: `250ms` (`--transition-slow`)
* **Loading**: Subtle Pulse
* **Reduced Motion**: Respect `prefers-reduced-motion`

---

## 8. Accessibility

* **Minimum Contrast**: `4.5:1`
* **Minimum Touch Target**: `44px`
* **Keyboard Navigation**: Supported
* **Focus Ring**: Visible
* **Semantic HTML**: Required
* **ARIA Labels**: Required

---

## 9. AI Visual Identity

* **Primary Symbol**: 🛡️ Shield
* **Secondary Symbol**: 🔍 Magnifying Glass
* **Accent**: ✨ AI Spark
* **Background Pattern**: Subtle Grid

---

## 10. Confidence Meter

* Instead of using only numbers, display: `92% [█████████░]`
* Use Colors for Levels:
  * **High Confidence**: Green (`#22C55E`)
  * **Medium Confidence**: Orange (`#F59E0B`)
  * **Low Confidence**: Red (`#EF4444`)

---

## 11. Charts

* **Use**: Bar Charts, Timeline, Confidence Gauge, Pie Charts, Trend Graphs
* **Avoid**: 3D charts

---

## 12. CSS Design Tokens

```css
:root {
  --bg: #0F1115;
  --surface: #171A21;
  --surface-elevated: #202530;

  --text-primary: #F5F7FA;
  --text-secondary: #B8C1CC;
  --text-muted: #7E8794;

  --border: #2B3342;

  --primary: #3B82F6;

  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #06B6D4;
  --confidence: #8B5CF6;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-sm: 0 4px 12px rgba(0,0,0,.15);
  --shadow-md: 0 8px 24px rgba(0,0,0,.2);
  --shadow-lg: 0 12px 40px rgba(0,0,0,.25);

  --transition-fast: 150ms;
  --transition-normal: 200ms;
  --transition-slow: 250ms;
}
```

### Design Philosophy
TruthLens AI should feel like a platform people can trust when they're uncertain about online information. Every design choice should reinforce clarity, transparency, and credibility. Instead of using dramatic colors or alarming visuals, the interface should communicate findings with calm, evidence-based presentation. Users should leave feeling informed rather than persuaded, with clear reasoning, trusted sources, and an understanding of the AI's confidence and limitations.
