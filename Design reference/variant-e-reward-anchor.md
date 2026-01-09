# Variant E: The Reward Anchor

> **Strategic Focus**: Maximum signups through psychological anchoring and minimal friction

---

## Concept Overview

### The Big Idea
Flip the traditional funnel. Instead of asking questions to calculate rewards, **start with the reward**. Show users an impressive benchmark number based on Australian business averages, then invite them to "beat" it by providing their details.

### Why This Works
Traditional funnels ask users to invest time and effort before showing value. This variant leads with the payoff:

1. **Anchoring Effect**: The first number users see (156,000 points) sets their expectation high
2. **Gamification**: "Can you beat the average?" creates engagement and curiosity
3. **Loss Aversion**: After seeing potential rewards, leaving feels like losing something
4. **Progress = Value**: Each question answered makes their estimate "more accurate" (reframed from "more work")

### Target User
- Business owners who are curious but time-poor
- Users who've bounced from longer funnels
- Mobile/distracted users who need quick gratification
- Points-curious users who want to see the potential before committing

---

## Flow Structure

| Step | Name | Purpose | Duration |
|------|------|---------|----------|
| 1 | Anchor Screen | Hook with benchmark | 5-10 sec |
| 2 | Quick Profile | Industry + spend | 15-20 sec |
| 3 | Your Result | Personalized result + email capture | 20-30 sec |
| 4 | Optional Enrichment | Refine estimate (optional) | 0-60 sec |

**Total minimum path**: ~45 seconds to email capture

---

## Step 1: The Anchor Screen

### Purpose
Create desire by showing what's possible before asking for anything.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │     Australian businesses earn an average of                │   │
│  │                                                             │   │
│  │              ✦ 156,000 points ✦                             │   │
│  │                    per year                                 │   │
│  │                                                             │   │
│  │     That's 2 return Business Class flights to Bali         │   │
│  │                                                             │   │
│  │           [ See What YOU Could Earn ]                       │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Accuracy: 0%                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Copy

**Headline**:
```
Australian businesses earn an average of
```

**Points Display**:
```
156,000 points
per year
```

**Value Translation**:
```
That's 2 return Business Class flights to Bali
```

**CTA**:
```
See What YOU Could Earn
```

**Accuracy Meter Label**:
```
Accuracy: 0%
```

### Visual Design

**Background**:
- Gradient from brand primary to a darker shade
- Subtle floating particles (small circles representing points)
- Faint airline/travel imagery (planes, destinations) that drift slowly

**Points Number**:
- Large, bold typography (48-64px)
- Animated count-up from 0 to 156,000 on page load (1.2s duration)
- Subtle glow or sparkle effect around the number
- Star/sparkle icon before and after

**Value Translation**:
- Smaller secondary text
- Plane icon inline
- Could rotate through different translations (flights, hotels, gift cards)

**CTA Button**:
- Primary brand color
- Full-width on mobile, centered max-width on desktop
- Hover: slight scale up (1.02) + shadow increase
- Arrow icon at end

**Accuracy Meter**:
- Horizontal bar at bottom of screen
- Empty state: gray/muted
- Label left-aligned
- Will fill in as user provides more data

### Interactions

**On Load**:
1. Background particles begin floating
2. Points number counts up from 0 (staggered start after 0.3s)
3. Value translation fades in after count completes
4. CTA pulses gently to draw attention

**CTA Click**:
1. Smooth scroll/transition to Step 2
2. Accuracy meter begins to fill slightly (0% → 10%)
3. Particles follow the transition direction

### Component: `AnchorReveal`

```typescript
interface AnchorRevealProps {
  benchmarkPoints: number;          // 156000
  valueTranslation: string;         // "2 return Business Class flights to Bali"
  onContinue: () => void;
}
```

**Behavior**:
- Counts up to `benchmarkPoints` on mount
- Can accept array of `valueTranslation` options to rotate through
- Exposes animation complete callback for sequencing

---

## Step 2: Quick Profile

### Purpose
Capture the two most important signals (industry + spend) with minimal friction.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  What type of business?           Your monthly expenses?      │ │
│  │                                                               │ │
│  │  ┌─────────┐ ┌─────────┐         ┌───────────────────────┐   │ │
│  │  │ 🏗️      │ │ 🔧      │         │  Under $10K           │   │ │
│  │  │ Const.  │ │ Trades  │         └───────────────────────┘   │ │
│  │  └─────────┘ └─────────┘         ┌───────────────────────┐   │ │
│  │  ┌─────────┐ ┌─────────┐         │  $10K - $50K          │   │ │
│  │  │ 💼      │ │ 🏥      │         └───────────────────────┘   │ │
│  │  │ Prof.   │ │ Health  │         ┌───────────────────────┐   │ │
│  │  └─────────┘ └─────────┘         │  $50K+                │   │ │
│  │  ┌─────────┐ ┌─────────┐         └───────────────────────┘   │ │
│  │  │ 📦      │ │ ✨      │                                     │ │
│  │  │ Retail  │ │ Other   │                                     │ │
│  │  └─────────┘ └─────────┘                                     │ │
│  │                                                               │ │
│  │                    [ Calculate My Rewards ]                   │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  ░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Accuracy: 40%                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Copy

**Question 1 - Industry**:
```
What type of business?
```

**Industry Options**:
| Option | Icon | Label |
|--------|------|-------|
| construction | 🏗️ | Construction |
| trades | 🔧 | Trades |
| professional | 💼 | Professional |
| healthcare | 🏥 | Healthcare |
| retail | 📦 | Retail |
| other | ✨ | Other |

**Question 2 - Spend**:
```
Your monthly expenses?
```

**Spend Options**:
| Option | Label | Multiplier |
|--------|-------|------------|
| low | Under $10K | 0.5x |
| medium | $10K - $50K | 1.0x |
| high | $50K+ | 2.0x |

**CTA**:
```
Calculate My Rewards
```

### Visual Design

**Two-Column Layout (Desktop)**:
- Industry grid on left (60%)
- Spend options on right (40%)
- Stacked on mobile

**Industry Grid**:
- 2x3 grid of square buttons
- Icon above label
- Selected state: filled background, checkmark overlay
- Hover: slight lift effect

**Spend Buttons**:
- Stacked vertical buttons
- Full-width within column
- Radio-style selection (one at a time)
- Selected: filled background, slight indent

**CTA Button**:
- Disabled until both selections made
- Enabled: primary color, animated pulse
- Shows "locked" state with both icons when incomplete

### Interactions

**Selection Behavior**:
- Single click to select/change industry
- Single click to select/change spend
- Accuracy meter animates: 10% → 25% on first selection, → 40% on second

**CTA Enable Logic**:
```typescript
const canContinue = selectedIndustry !== null && selectedSpend !== null;
```

**CTA Click**:
1. Brief calculation animation (0.5s)
2. Transition to Step 3 with personalized result

### Component: `QuickIndustryGrid`

```typescript
interface IndustryOption {
  id: string;
  icon: string;     // Emoji or icon component
  label: string;
}

interface QuickIndustryGridProps {
  options: IndustryOption[];
  selected: string | null;
  onSelect: (id: string) => void;
}
```

### Component: `SpendBuckets`

```typescript
interface SpendBucket {
  id: string;
  label: string;
  multiplier: number;
}

interface SpendBucketsProps {
  buckets: SpendBucket[];
  selected: string | null;
  onSelect: (id: string) => void;
}
```

---

## Step 3: Your Result

### Purpose
Deliver the personalized result, create emotional response, capture email.

### Layout - Beat Average Scenario
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │     YOU could earn                                          │   │
│  │                                                             │   │
│  │           ✦ 234,000 points ✦                                │   │
│  │                                                             │   │
│  │     🎉 50% MORE than average Australian businesses!         │   │
│  │                                                             │   │
│  │     ══════════════════════════════════════════════════      │   │
│  │     That's worth:                                           │   │
│  │     ✈️ 3 Business Class flights to Singapore                │   │
│  │     🏨 12 nights at Marriott properties                     │   │
│  │     🎁 $2,340 in gift cards                                 │   │
│  │     ══════════════════════════════════════════════════      │   │
│  │                                                             │   │
│  │     ┌─────────────────────────────────────────────────┐     │   │
│  │     │  Enter email to lock in your rewards estimate   │     │   │
│  │     │  📧 [                                         ] │     │   │
│  │     │         [ Start Earning Points ]                │     │   │
│  │     └─────────────────────────────────────────────────┘     │   │
│  │                                                             │   │
│  │     ↓ Want a more accurate estimate? Add details ↓          │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Accuracy: 65%                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Calculation Logic

```typescript
const calculatePoints = (industry: string, spend: string): number => {
  // Base calculation from benchmark
  const benchmark = 156000;

  // Industry multipliers (some industries have higher payment volumes)
  const industryMultipliers: Record<string, number> = {
    construction: 1.5,
    trades: 1.3,
    professional: 1.2,
    healthcare: 1.1,
    retail: 1.0,
    other: 1.0,
  };

  // Spend multipliers
  const spendMultipliers: Record<string, number> = {
    low: 0.5,      // Under $10K
    medium: 1.0,   // $10K - $50K
    high: 2.0,     // $50K+
  };

  return Math.round(
    benchmark *
    industryMultipliers[industry] *
    spendMultipliers[spend]
  );
};

const calculateComparison = (userPoints: number, benchmark: number): {
  percentage: number;
  isAbove: boolean;
} => {
  const diff = ((userPoints - benchmark) / benchmark) * 100;
  return {
    percentage: Math.abs(Math.round(diff)),
    isAbove: diff > 0,
  };
};
```

### Copy - Above Average

**Headline**:
```
YOU could earn
```

**Points Display**:
```
[calculated points] points
```

**Comparison Badge**:
```
🎉 [X]% MORE than average Australian businesses!
```

**Value Breakdown Header**:
```
That's worth:
```

**Value Options** (show top 3):
```
✈️ [X] Business Class flights to Singapore
🏨 [X] nights at Marriott properties
🎁 $[X] in gift cards
```

**Email Capture**:
```
Enter email to lock in your rewards estimate
```

**CTA**:
```
Start Earning Points
```

**Expand Prompt**:
```
↓ Want a more accurate estimate? Add details ↓
```

### Copy - Below Average

**Comparison Badge**:
```
📈 Add more details to unlock your full potential
```

**Expand Prompt**:
```
↓ Most businesses like yours earn more - let's refine your estimate ↓
```

### Visual Design

**Above Average State**:
- Confetti animation on load (subtle, not overwhelming)
- Green/positive accent color on comparison badge
- Celebration emoji
- Upward trending visual indicator

**Below Average State**:
- No confetti
- Amber/neutral accent color
- Encouragement messaging
- Emphasis on the expand section

**Points Number**:
- Same styling as Step 1 but counts up from benchmark to user's number
- If above: number pulses green briefly
- If below: number shown in neutral color

**Value Breakdown**:
- Card-style container
- Icon + text for each value option
- Subtle separator lines

**Email Capture**:
- Contained in a distinct card/box
- Email icon inline with input
- Single field + button (no name required at this stage)
- Validation on blur (basic email format)

### Interactions

**On Load**:
1. Points count up from benchmark (156,000) to user's result
2. Comparison badge fades in
3. If above average: confetti triggers
4. Value breakdown staggers in (each item 0.1s apart)

**Email Submission**:
1. Validate email format
2. Show loading state on button
3. On success: animate to Step 4 (enrichment) or direct to signup
4. Store email + current answers in state

**Expand Click**:
1. Smooth scroll/expand to Step 4
2. Keep email capture visible (sticky if needed)

### Component: `RewardComparison`

```typescript
interface RewardComparisonProps {
  userPoints: number;
  benchmarkPoints: number;
  onEmailSubmit: (email: string) => void;
  onExpand: () => void;
}
```

### Component: `ConfettiCelebration`

```typescript
interface ConfettiCelebrationProps {
  trigger: boolean;
  duration?: number;    // Default 3000ms
  intensity?: 'low' | 'medium' | 'high';
}
```

---

## Step 4: Optional Enrichment

### Purpose
Allow motivated users to provide more details for a refined estimate (and better lead qualification).

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                                                             │   │
│  │  Refine your estimate                                       │   │
│  │  Each section increases accuracy                            │   │
│  │                                                             │   │
│  │  ┌───────────────────────────────────────────────────────┐ │   │
│  │  │ 👥 Team size                              [Expand ▼]  │ │   │
│  │  │                                                       │ │   │
│  │  │   ○ Just me                                           │ │   │
│  │  │   ○ 2-10 employees                                    │ │   │
│  │  │   ○ 11-50 employees                                   │ │   │
│  │  │   ○ 50+ employees                                     │ │   │
│  │  │                                           [Collapse]  │ │   │
│  │  └───────────────────────────────────────────────────────┘ │   │
│  │                                                             │   │
│  │  ┌───────────────────────────────────────────────────────┐ │   │
│  │  │ 💳 Payment methods you use                [Expand ▼]  │ │   │
│  │  └───────────────────────────────────────────────────────┘ │   │
│  │                                                             │   │
│  │  ┌───────────────────────────────────────────────────────┐ │   │
│  │  │ 📋 Types of payments                      [Expand ▼]  │ │   │
│  │  └───────────────────────────────────────────────────────┘ │   │
│  │                                                             │   │
│  │            [ Skip & Create Account ]                        │   │
│  │                                                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│  Accuracy: 95%                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Enrichment Sections

**Section 1: Team Size**
| Option | Label | Points Modifier |
|--------|-------|-----------------|
| solo | Just me | 0.8x |
| small | 2-10 employees | 1.0x |
| medium | 11-50 employees | 1.2x |
| large | 50+ employees | 1.5x |

**Section 2: Payment Methods**
| Option | Label | Points Modifier |
|--------|-------|-----------------|
| amex | American Express | +20% |
| visa | Visa | +10% |
| mastercard | Mastercard | +10% |
| bank_transfer | Bank Transfer | +5% |

(Multi-select, modifiers stack)

**Section 3: Payment Types**
| Option | Label | Points Modifier |
|--------|-------|-----------------|
| suppliers | Supplier invoices | +15% |
| ato | ATO / Tax payments | +15% |
| payroll | Staff payroll | +10% |
| rent | Business rent | +10% |
| insurance | Insurance | +5% |

(Multi-select, modifiers stack)

### Copy

**Section Header**:
```
Refine your estimate
Each section increases accuracy
```

**Section Labels**:
```
👥 Team size
💳 Payment methods you use
📋 Types of payments
```

**Skip CTA**:
```
Skip & Create Account
```

**After Completion CTA**:
```
Create Account with Full Estimate
```

### Visual Design

**Accordion Behavior**:
- Collapsed by default (show header + expand icon)
- Expand on click (smooth height animation)
- Can have multiple open at once
- Checkmark appears on header when section completed

**Section Content**:
- Radio buttons for single-select (team size)
- Checkboxes for multi-select (payment methods, types)
- Each selection triggers accuracy meter update

**Accuracy Meter Updates**:
- 65% → 75% after team size
- 75% → 85% after payment methods
- 85% → 95-100% after payment types

**Points Recalculation**:
- Show mini "recalculating" animation when selections change
- Points number updates smoothly (count animation)
- If points increase significantly, subtle celebration micro-interaction

### Interactions

**Accordion Toggle**:
1. Click header to expand/collapse
2. Smooth height transition (300ms)
3. Rotate chevron icon

**Selection Made**:
1. Update accuracy meter
2. Recalculate points with new modifiers
3. Update points display with count animation

**Skip Button**:
1. Proceeds to account creation with current data
2. Passes email + all answers collected

**Complete All Sections**:
1. CTA changes from "Skip" to "Create Account with Full Estimate"
2. Accuracy shows 100%
3. Final points calculation displayed

### Component: `EnrichmentAccordion`

```typescript
interface EnrichmentSection {
  id: string;
  icon: string;
  title: string;
  type: 'single' | 'multi';
  options: Array<{
    id: string;
    label: string;
    modifier: number;
  }>;
}

interface EnrichmentAccordionProps {
  sections: EnrichmentSection[];
  values: Record<string, string | string[]>;
  onChange: (sectionId: string, value: string | string[]) => void;
  onComplete: () => void;
  onSkip: () => void;
}
```

---

## Accuracy Meter Component

### Purpose
Visual indicator that gamifies providing more information. Shows users they're making progress and their estimate is becoming more reliable.

### Design

```
Collapsed State:
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  Accuracy: 40%

Filled State:
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░  Accuracy: 65%

Complete State:
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  Accuracy: 100% ✓
```

### Visual Design
- Horizontal bar at bottom of viewport (sticky)
- Brand color gradient fill
- Percentage label right-aligned
- Checkmark icon when 100%
- Subtle pulse animation on increase

### Component: `AccuracyMeter`

```typescript
interface AccuracyMeterProps {
  percentage: number;           // 0-100
  label?: string;               // Default: "Accuracy"
  showCheckOnComplete?: boolean;// Default: true
}
```

### Accuracy Calculation

```typescript
const calculateAccuracy = (answers: FunnelAnswers): number => {
  let accuracy = 0;

  // Step 1 viewed
  accuracy += 10;

  // Step 2 selections
  if (answers.industry) accuracy += 15;
  if (answers.spend) accuracy += 15;

  // Step 3 email provided
  if (answers.email) accuracy += 25;

  // Step 4 enrichment
  if (answers.teamSize) accuracy += 10;
  if (answers.paymentMethods?.length) accuracy += 15;
  if (answers.paymentTypes?.length) accuracy += 10;

  return Math.min(accuracy, 100);
};
```

---

## State Management

### Funnel State Shape

```typescript
interface VariantEState {
  // Current step
  currentStep: 1 | 2 | 3 | 4;

  // User answers
  answers: {
    industry: string | null;
    spend: string | null;
    email: string | null;
    teamSize: string | null;
    paymentMethods: string[];
    paymentTypes: string[];
  };

  // Calculated values
  calculated: {
    benchmarkPoints: number;
    userPoints: number;
    comparisonPercentage: number;
    isAboveBenchmark: boolean;
    accuracy: number;
  };

  // UI state
  ui: {
    expandedSections: string[];
    isCalculating: boolean;
    emailSubmitted: boolean;
  };
}
```

### Initial State

```typescript
const initialState: VariantEState = {
  currentStep: 1,
  answers: {
    industry: null,
    spend: null,
    email: null,
    teamSize: null,
    paymentMethods: [],
    paymentTypes: [],
  },
  calculated: {
    benchmarkPoints: 156000,
    userPoints: 0,
    comparisonPercentage: 0,
    isAboveBenchmark: false,
    accuracy: 0,
  },
  ui: {
    expandedSections: [],
    isCalculating: false,
    emailSubmitted: false,
  },
};
```

---

## Transitions & Animations

### Step Transitions
- **Duration**: 400ms
- **Easing**: ease-out
- **Effect**: Fade + slight slide up (translateY: 20px → 0)

### Number Count Animations
- **Duration**: 1200ms for initial benchmark reveal
- **Duration**: 600ms for recalculations
- **Easing**: ease-out
- **Format**: Thousands separator (156,000 not 156000)

### Accuracy Meter
- **Duration**: 300ms per increment
- **Easing**: ease-in-out
- **Delay**: 100ms after triggering action

### Confetti
- **Duration**: 3000ms
- **Particle count**: 50-100
- **Colors**: Brand colors + gold/yellow
- **Fall pattern**: Random with slight drift

### Accordion
- **Duration**: 300ms
- **Easing**: ease-in-out
- **Effect**: Height transition with opacity

---

## Mobile Considerations

### Step 1
- Full viewport height
- Centered content
- Bottom-pinned CTA button

### Step 2
- Stack questions vertically (industry above spend)
- 2x3 grid for industry becomes 3x2
- Full-width spend buttons

### Step 3
- Single column layout
- Email capture as sticky bottom element
- Value breakdown in scrollable area

### Step 4
- Accordion works same as desktop
- Skip button sticky at bottom

### Accuracy Meter
- Horizontal bar at very bottom
- Thinner height (4px vs 8px)
- Label hidden, percentage only

---

## Analytics Events

```typescript
// Track funnel progression
const analyticsEvents = {
  FUNNEL_START: 'variant_e_funnel_start',
  STEP_VIEW: 'variant_e_step_view',
  INDUSTRY_SELECT: 'variant_e_industry_select',
  SPEND_SELECT: 'variant_e_spend_select',
  RESULT_VIEW: 'variant_e_result_view',
  EMAIL_SUBMIT: 'variant_e_email_submit',
  ENRICHMENT_EXPAND: 'variant_e_enrichment_expand',
  ENRICHMENT_COMPLETE: 'variant_e_enrichment_complete',
  SKIP_ENRICHMENT: 'variant_e_skip_enrichment',
  SIGNUP_COMPLETE: 'variant_e_signup_complete',
};

// Track with context
const trackEvent = (event: string, context: {
  step: number;
  accuracy: number;
  userPoints: number;
  isAboveBenchmark: boolean;
  industry?: string;
  spend?: string;
}) => void;
```

---

## Success Criteria

### Primary Metrics
- **Email capture rate**: Target 40%+ of Step 1 viewers
- **Time to email**: Target < 60 seconds average
- **Funnel completion**: Target 25%+ reach signup

### Secondary Metrics
- Enrichment completion rate (of those who expand)
- Points comparison distribution (% above vs below benchmark)
- Industry and spend segment breakdown

---

## Component Summary

| Component | Purpose | Props |
|-----------|---------|-------|
| `AnchorReveal` | Step 1 benchmark display | benchmarkPoints, valueTranslation, onContinue |
| `QuickIndustryGrid` | 6-option industry selector | options, selected, onSelect |
| `SpendBuckets` | 3-option spend selector | buckets, selected, onSelect |
| `RewardComparison` | Step 3 result display | userPoints, benchmarkPoints, onEmailSubmit, onExpand |
| `ConfettiCelebration` | Above-average celebration | trigger, duration, intensity |
| `EnrichmentAccordion` | Step 4 optional sections | sections, values, onChange, onComplete, onSkip |
| `AccuracyMeter` | Progress indicator | percentage, label, showCheckOnComplete |
| `ValueBreakdown` | Flight/hotel/gift card display | points, showItems |

---

## File Structure

```
/src/variants/variant-e/
  /components/
    AnchorReveal.tsx
    QuickIndustryGrid.tsx
    SpendBuckets.tsx
    RewardComparison.tsx
    ConfettiCelebration.tsx
    EnrichmentAccordion.tsx
    AccuracyMeter.tsx
    ValueBreakdown.tsx
  /pages/
    Step1Anchor.tsx
    Step2Profile.tsx
    Step3Result.tsx
    Step4Enrichment.tsx
  /hooks/
    useVariantEState.ts
    usePointsCalculation.ts
    useAccuracy.ts
  /utils/
    calculations.ts
    analytics.ts
  VariantELayout.tsx
  VariantEFunnel.tsx
  index.ts
```
