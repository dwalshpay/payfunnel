# Variant G: The Advisor Engine

> **Strategic Focus**: Accountants and bookkeepers - portfolio-first framing for practice growth

---

## Concept Overview

### The Big Idea
Completely reframe the value proposition for accounting professionals. Instead of "earn rewards on your business expenses," it's **"unlock rewards across your entire client portfolio."** This variant speaks to accountants as practice owners, not as individual business users.

### Why This Works
Accountants and bookkeepers think differently about value:

1. **Portfolio Thinking**: They manage multiple businesses; aggregate numbers are more impressive
2. **Professional Identity**: "Advisor" framing appeals to how they see themselves
3. **Client-First Positioning**: Feels like helping clients, not being sold to
4. **Multiplier Effect**: One signup can unlock 10, 50, 100+ businesses
5. **Tool Access Motivation**: Dashboard preview creates desire for the software

### Target User
- Accountants managing 10+ business clients
- Bookkeepers with ongoing client relationships
- Tax agents who handle business payments
- Fractional CFOs and financial controllers
- Accounting practice owners looking for differentiation

### Value Proposition Stack
| For Their Clients | For Their Practice |
|-------------------|-------------------|
| Rewards on expenses | Referral bonuses |
| Cash flow flexibility | Client retention tool |
| Payment simplification | Practice differentiation |
| Points for travel/redemption | New revenue stream |

---

## Flow Structure

| Step | Name | Purpose | Duration |
|------|------|---------|----------|
| Entry | Practice Hook | Aggregate opportunity framing | 10 sec |
| 1 | Portfolio Overview | Client count + avg expenses | 30 sec |
| 2 | Client Mix | Industries + client types | 30 sec |
| 3 | Dashboard Preview | Show the advisor tools | 20 sec |
| 4 | Advisor Signup | Practice-specific registration | 60 sec |

**Total flow**: ~2.5 minutes

---

## Entry: Practice-Focused Hook

### Purpose
Immediately signal this is for accounting professionals, not individual businesses. Lead with the aggregate client opportunity.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │                                                              │  │
│  │  How much are your clients                                   │  │
│  │  leaving on the table?                                       │  │
│  │                                                              │  │
│  │  ───────────────────────────────────────────────────────     │  │
│  │                                                              │  │
│  │  Australian businesses miss out on $2.3B in rewards          │  │
│  │  annually by paying expenses via bank transfer.              │  │
│  │                                                              │  │
│  │  See what YOUR client portfolio could be earning.            │  │
│  │                                                              │  │
│  │              [ Calculate Portfolio Rewards ]                 │  │
│  │                                                              │  │
│  │  ───────────────────────────────────────────────────────     │  │
│  │                                                              │  │
│  │  🏢 Join 2,000+ accounting practices using pay.com.au        │  │
│  │                                                              │  │
│  │  "pay.com.au has become a key differentiator for our         │  │
│  │   practice. Clients love it."                                │  │
│  │   — Partner, Melbourne accounting firm                       │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Copy

**Headline**:
```
How much are your clients
leaving on the table?
```

**Supporting Stat**:
```
Australian businesses miss out on $2.3B in rewards
annually by paying expenses via bank transfer.
```

**CTA Lead-in**:
```
See what YOUR client portfolio could be earning.
```

**CTA Button**:
```
Calculate Portfolio Rewards
```

**Social Proof**:
```
🏢 Join 2,000+ accounting practices using pay.com.au
```

**Testimonial**:
```
"pay.com.au has become a key differentiator for our practice. Clients love it."
— Partner, Melbourne accounting firm
```

### Visual Design

**Layout**:
- Single-column centered content
- Maximum width container (~800px)
- Generous vertical spacing

**Background**:
- Subtle professional pattern (grid, dots)
- Light/neutral color scheme
- No flashy animations - professional tone

**Typography**:
- Large, confident headline
- Clear hierarchy
- Professional, not playful

**Social Proof Section**:
- Building/office icon
- Muted but visible
- Testimonial in subtle card or with quote styling

### Interactions

**CTA Hover**:
- Subtle scale (1.02)
- Professional, not bouncy

**Page Load**:
- Fade in elements sequentially
- No dramatic animations

---

## Step 1: Portfolio Overview

### Purpose
Understand the practice size and typical client characteristics. This lets us calculate aggregate rewards potential.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌────────────────────────────┬────────────────────────────────────┐│
│  │                            │                                    ││
│  │  YOUR PRACTICE             │   PORTFOLIO REWARDS CALCULATOR     ││
│  │                            │                                    ││
│  │  How many business         │   ┌────────────────────────────┐   ││
│  │  clients do you manage?    │   │                            │   ││
│  │                            │   │   👤 -- clients            │   ││
│  │  ┌───────────────────────┐ │   │   💰 $-- avg/month         │   ││
│  │  │                       │ │   │                            │   ││
│  │  │     ◄──[●]──────►     │ │   │   ─────────────────────    │   ││
│  │  │        25 clients     │ │   │                            │   ││
│  │  │                       │ │   │   PORTFOLIO POTENTIAL      │   ││
│  │  │  5   25   50   100+   │ │   │                            │   ││
│  │  │                       │ │   │   Calculating...           │   ││
│  │  └───────────────────────┘ │   │                            │   ││
│  │                            │   │                            │   ││
│  │  What's the average        │   │                            │   ││
│  │  monthly expense volume    │   │                            │   ││
│  │  per client?               │   │                            │   ││
│  │                            │   └────────────────────────────┘   ││
│  │  ○ Under $10,000           │                                    ││
│  │  ● $10,000 - $30,000       │   As you fill in details, the      ││
│  │  ○ $30,000 - $75,000       │   calculator updates in real-time  ││
│  │  ○ $75,000+                │                                    ││
│  │                            │                                    ││
│  │  [ Continue ]              │                                    ││
│  │                            │                                    ││
│  └────────────────────────────┴────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Questions

**Question 1: Client Count**
```
How many business clients do you manage?
```

Input: Slider with labeled tick marks
- Minimum: 5
- Maximum: 100+
- Default: 25
- Tick marks: 5, 25, 50, 100+

**Question 2: Average Client Expenses**
```
What's the average monthly expense volume per client?
```

Options:
| Value | Label | Monthly $ |
|-------|-------|-----------|
| low | Under $10,000 | 7,500 (midpoint) |
| medium | $10,000 - $30,000 | 20,000 (midpoint) |
| high | $30,000 - $75,000 | 52,500 (midpoint) |
| very_high | $75,000+ | 100,000 (estimate) |

### Portfolio Calculator (Sidebar)

**Header**:
```
PORTFOLIO REWARDS CALCULATOR
```

**Client Count Display**:
```
👤 [X] clients
💰 $[X]K avg/month
```

**Portfolio Potential Section**:
```
PORTFOLIO POTENTIAL

[Calculating... / Showing result]
```

**Helper Text**:
```
As you fill in details, the calculator updates in real-time
```

### Calculation Logic

```typescript
interface PortfolioInput {
  clientCount: number;
  avgMonthlyExpenses: number;  // In dollars
}

interface PortfolioResult {
  annualPortfolioVolume: number;
  annualPointsPotential: number;
  equivalentFlights: number;
  equivalentHotelNights: number;
  advisorBonusPotential: number;
}

const calculatePortfolioRewards = (input: PortfolioInput): PortfolioResult => {
  // Annual volume across all clients
  const annualPortfolioVolume = input.clientCount * input.avgMonthlyExpenses * 12;

  // Points calculation (1 point per $1 at base rate)
  const annualPointsPotential = annualPortfolioVolume;

  // Tangible equivalents
  const equivalentFlights = Math.floor(annualPointsPotential / 80000); // ~80K points per business class
  const equivalentHotelNights = Math.floor(annualPointsPotential / 25000); // ~25K per premium night

  // Advisor bonus (conceptual - percentage of client activity)
  const advisorBonusPotential = Math.round(annualPortfolioVolume * 0.002); // 0.2% referral

  return {
    annualPortfolioVolume,
    annualPointsPotential,
    equivalentFlights,
    equivalentHotelNights,
    advisorBonusPotential,
  };
};
```

### Visual Design

**Two-Column Layout**:
- Left (55%): Form questions
- Right (45%): Live calculator

**Client Slider**:
- Large, easy to manipulate
- Current value displayed prominently
- Tick marks with labels
- Smooth animation on change

**Expense Radio Options**:
- Vertical stack
- Clear selection state
- Dollar amounts prominent

**Calculator Card**:
- Elevated card with shadow
- Sticky on scroll (desktop)
- Updates animate smoothly

### Interactions

**Slider Change**:
1. Value updates in calculator immediately
2. If both values set, show calculated result
3. Smooth number animations

**Radio Selection**:
1. Triggers calculator update
2. Check mark appears on selected option

**Both Values Set**:
1. Calculator shows full result
2. "Calculating..." becomes actual numbers
3. Continue button enables

---

## Step 2: Client Mix

### Purpose
Refine the estimate based on industry mix and client types. Also positions pay.com.au as industry-aware.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌────────────────────────────┬────────────────────────────────────┐│
│  │                            │                                    ││
│  │  CLIENT INDUSTRIES         │   PORTFOLIO REWARDS CALCULATOR     ││
│  │                            │                                    ││
│  │  What industries do your   │   ┌────────────────────────────┐   ││
│  │  clients operate in?       │   │                            │   ││
│  │  (Select all that apply)   │   │   👤 25 clients            │   ││
│  │                            │   │   💰 $20K avg/month        │   ││
│  │  ☑ Construction            │   │                            │   ││
│  │  ☑ Trades                  │   │   ─────────────────────    │   ││
│  │  ☐ Professional services   │   │                            │   ││
│  │  ☐ Healthcare              │   │   📊 PORTFOLIO POTENTIAL   │   ││
│  │  ☐ Retail                  │   │                            │   ││
│  │  ☐ Property                │   │   6,000,000                │   ││
│  │  ☐ Other                   │   │   points per year          │   ││
│  │                            │   │                            │   ││
│  │  ─────────────────────────  │   │   That's worth:           │   ││
│  │                            │   │   ✈️ 75 Business flights   │   ││
│  │  What type of clients      │   │   🏨 240 hotel nights      │   ││
│  │  do you primarily serve?   │   │                            │   ││
│  │                            │   │   ─────────────────────    │   ││
│  │  ○ Sole traders            │   │                            │   ││
│  │  ● SMEs (2-50 employees)   │   │   💼 YOUR ADVISOR BONUS    │   ││
│  │  ○ Mid-market (50-200)     │   │   Potential referral       │   ││
│  │  ○ Mixed portfolio         │   │   earnings:                │   ││
│  │                            │   │                            │   ││
│  │                            │   │   $12,000 / year           │   ││
│  │  [ Continue ]              │   │                            │   ││
│  │                            │   └────────────────────────────┘   ││
│  └────────────────────────────┴────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Questions

**Question 1: Client Industries** (Multi-select)
```
What industries do your clients operate in?
(Select all that apply)
```

Options:
| Value | Label | Multiplier |
|-------|-------|------------|
| construction | Construction | 1.3x |
| trades | Trades | 1.2x |
| professional | Professional services | 1.0x |
| healthcare | Healthcare | 1.0x |
| retail | Retail | 0.9x |
| property | Property | 1.2x |
| other | Other | 1.0x |

**Question 2: Client Type**
```
What type of clients do you primarily serve?
```

Options:
| Value | Label | Multiplier |
|-------|-------|------------|
| sole_traders | Sole traders | 0.8x |
| smes | SMEs (2-50 employees) | 1.0x |
| mid_market | Mid-market (50-200) | 1.3x |
| mixed | Mixed portfolio | 1.1x |

### Calculator Updates

**After Step 2**:
- Show refined portfolio potential
- Add industry multiplier to calculation
- Show tangible equivalents (flights, hotels)
- **NEW**: Show advisor bonus potential

**Advisor Bonus Display**:
```
💼 YOUR ADVISOR BONUS
Potential referral earnings:
$[X],XXX / year
```

Note: This is conceptual - the actual number shown should be calculated based on the portfolio size but not commit to specific rates.

### Visual Design

**Industry Checkboxes**:
- Two-column grid
- Icons or small illustrations per industry
- Check marks on selected
- Count indicator ("3 selected")

**Client Type Radio**:
- Single-select
- Clear descriptions
- Selected state prominent

**Calculator Card** (evolved):
- Now shows full breakdown
- Advisor bonus section added
- Numbers animate on recalculation

### Interactions

**Industry Selection**:
- Multi-select (can choose multiple)
- Each selection triggers recalculation
- Weighted average based on selection

**Client Type Selection**:
- Applies multiplier to calculation
- Single selection replaces previous

---

## Step 3: Dashboard Preview

### Purpose
Create desire for the advisor tools by showing what they'll get access to. This is the "product demo" moment.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │  YOUR ADVISOR DASHBOARD                                      │  │
│  │  Here's what you'll get access to:                           │  │
│  │                                                              │  │
│  │  ┌────────────────────────────────────────────────────────┐  │  │
│  │  │                                                        │  │  │
│  │  │  ┌──────────────────────────────────────────────────┐  │  │  │
│  │  │  │  pay.com.au Advisor Dashboard                    │  │  │  │
│  │  │  ├──────────────────────────────────────────────────┤  │  │  │
│  │  │  │                                                  │  │  │  │
│  │  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────┐  │  │  │  │
│  │  │  │  │ Clients  │ │ Payments │ │ Rewards  │ │Bonus│  │  │  │  │
│  │  │  │  │    25    │ │  $500K   │ │  6.0M    │ │$12K │  │  │  │  │
│  │  │  │  │ enrolled │ │ monthly  │ │ points   │ │ YTD │  │  │  │  │
│  │  │  │  └──────────┘ └──────────┘ └──────────┘ └─────┘  │  │  │  │
│  │  │  │                                                  │  │  │  │
│  │  │  │  CLIENT PORTFOLIO                                │  │  │  │
│  │  │  │  ┌────────────────────────────────────────────┐  │  │  │  │
│  │  │  │  │ Acme Construction    $45K/mo    Active  ▶  │  │  │  │  │
│  │  │  │  │ Smith Plumbing       $22K/mo    Active  ▶  │  │  │  │  │
│  │  │  │  │ Jones Medical        $18K/mo    Pending ⏳ │  │  │  │  │
│  │  │  │  │ [more clients...]                          │  │  │  │  │
│  │  │  │  └────────────────────────────────────────────┘  │  │  │  │
│  │  │  │                                                  │  │  │  │
│  │  │  └──────────────────────────────────────────────────┘  │  │  │
│  │  │                                                        │  │  │
│  │  └────────────────────────────────────────────────────────┘  │  │
│  │                                                              │  │
│  │  ADVISOR PROGRAM BENEFITS                                    │  │
│  │  ─────────────────────────────────────────────────────────   │  │
│  │                                                              │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐   │  │
│  │  │ 📨          │  │ 📊          │  │ 💰                  │   │  │
│  │  │ Client      │  │ Portfolio   │  │ Referral            │   │  │
│  │  │ Onboarding  │  │ Tracking    │  │ Bonuses             │   │  │
│  │  │ Tools       │  │ Dashboard   │  │                     │   │  │
│  │  │             │  │             │  │ Earn on client      │   │  │
│  │  │ Invite      │  │ Track all   │  │ activity across     │   │  │
│  │  │ links,      │  │ client      │  │ your entire         │   │  │
│  │  │ bulk        │  │ payments    │  │ portfolio           │   │  │
│  │  │ import      │  │ & rewards   │  │                     │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘   │  │
│  │                                                              │  │
│  │  ┌─────────────┐  ┌─────────────┐                            │  │
│  │  │ 🎯          │  │ 📞          │                            │  │
│  │  │ Priority    │  │ Dedicated   │                            │  │
│  │  │ Support     │  │ Account     │                            │  │
│  │  │             │  │ Manager     │                            │  │
│  │  │ Fast        │  │             │                            │  │
│  │  │ response    │  │ Personal    │                            │  │
│  │  │ for you     │  │ support     │                            │  │
│  │  │ & clients   │  │ for onboard │                            │  │
│  │  └─────────────┘  └─────────────┘                            │  │
│  │                                                              │  │
│  │              [ Get Advisor Access ]                          │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Dashboard Preview

**Header**:
```
YOUR ADVISOR DASHBOARD
Here's what you'll get access to:
```

**Dashboard Mockup Elements**:

1. **Stats Bar** (populated with their numbers):
   - Clients enrolled: [from Step 1]
   - Monthly payments: [calculated]
   - Total points: [calculated]
   - YTD bonus: [calculated]

2. **Client List** (sample):
   - 3-4 example client rows
   - Business name, monthly volume, status
   - Mix of "Active" and "Pending" statuses
   - Scrollable/expandable indication

**Benefits Grid**:
```
📨 Client Onboarding Tools
Invite links, bulk import

📊 Portfolio Tracking Dashboard
Track all client payments & rewards

💰 Referral Bonuses
Earn on client activity across your entire portfolio

🎯 Priority Support
Fast response for you & clients

📞 Dedicated Account Manager
Personal support for onboarding
```

### Visual Design

**Dashboard Preview**:
- Realistic mockup of the actual dashboard
- Styled like a screenshot or embedded app
- Numbers populated from their inputs
- Subtle shadow/depth to look like an app window

**Benefits Grid**:
- 3-column grid (desktop)
- Icon + title + description format
- Even spacing, clean alignment

**CTA**:
- Primary button
- Full-width or prominent centered
- Action-oriented text

### Interactions

**Dashboard Mockup**:
- Static but realistic
- Hover could show tooltip: "Your actual dashboard"
- Numbers match their input (personalized)

**Client List in Mockup**:
- Could have subtle hover states
- Indicates interactivity they'll have

---

## Step 4: Advisor Signup

### Purpose
Capture practice-specific information and create the advisor account. Different fields from standard business signup.

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌────────────────────────────┬────────────────────────────────────┐│
│  │                            │                                    ││
│  │  CREATE YOUR ADVISOR       │   WHAT HAPPENS NEXT                ││
│  │  ACCOUNT                   │                                    ││
│  │                            │   ✓ Instant dashboard access       ││
│  │  Practice/firm name        │                                    ││
│  │  ┌───────────────────────┐ │   ✓ Client invite links ready     ││
│  │  │ Smith & Co Accounting │ │                                    ││
│  │  └───────────────────────┘ │   ✓ Onboarding call scheduled     ││
│  │                            │      (we'll help you roll out      ││
│  │  Your name                 │      to your first clients)        ││
│  │  ┌───────────────────────┐ │                                    ││
│  │  │ Sarah Smith           │ │   ✓ Marketing materials sent       ││
│  │  └───────────────────────┘ │                                    ││
│  │                            │   ─────────────────────────────    ││
│  │  Work email                │                                    ││
│  │  ┌───────────────────────┐ │   "pay.com.au has been a game     ││
│  │  │ sarah@smithco.com.au  │ │   changer for our practice. Our    ││
│  │  └───────────────────────┘ │   clients love the rewards and    ││
│  │                            │   we've added a new revenue        ││
│  │  Phone number              │   stream through referrals."       ││
│  │  ┌───────────────────────┐ │                                    ││
│  │  │ 03 9xxx xxxx          │ │   — Sarah K., Melbourne CPA        ││
│  │  └───────────────────────┘ │                                    ││
│  │                            │                                    ││
│  │  Practice ABN (optional)   │   ┌────────────────────────────┐   ││
│  │  ┌───────────────────────┐ │   │                            │   ││
│  │  │                       │ │   │   📊 YOUR PORTFOLIO        │   ││
│  │  └───────────────────────┘ │   │                            │   ││
│  │                            │   │   25 clients               │   ││
│  │  [ Create Advisor Account ]│   │   6M points potential      │   ││
│  │                            │   │   $12K bonus potential     │   ││
│  │  By creating an account,   │   │                            │   ││
│  │  you agree to our Terms    │   └────────────────────────────┘   ││
│  │  and Privacy Policy.       │                                    ││
│  │                            │                                    ││
│  └────────────────────────────┴────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### Form Fields

**Practice/Firm Name** (Required)
```
Practice/firm name
```
- Text input
- Placeholder: "Smith & Co Accounting"

**Your Name** (Required)
```
Your name
```
- Text input
- Placeholder: "Sarah Smith"

**Work Email** (Required)
```
Work email
```
- Email input
- Validation: email format
- Placeholder: "sarah@smithco.com.au"

**Phone Number** (Required)
```
Phone number
```
- Phone input
- Australian format hint
- For onboarding call scheduling

**Practice ABN** (Optional)
```
Practice ABN (optional)
```
- ABN input
- Optional - can be added later
- ABN lookup if provided

### Sidebar: What Happens Next

```
WHAT HAPPENS NEXT

✓ Instant dashboard access

✓ Client invite links ready

✓ Onboarding call scheduled
  (we'll help you roll out to your first clients)

✓ Marketing materials sent
```

**Testimonial**:
```
"pay.com.au has been a game changer for our practice.
Our clients love the rewards and we've added a new
revenue stream through referrals."

— Sarah K., Melbourne CPA
```

**Portfolio Summary**:
```
📊 YOUR PORTFOLIO

25 clients
6M points potential
$12K bonus potential
```

### Visual Design

**Form Layout**:
- Single column form (left side)
- Right sidebar with reassurance + summary

**Input Styling**:
- Clean, professional inputs
- Clear labels
- Validation feedback inline

**Terms Text**:
- Small, muted text below CTA
- Links to Terms and Privacy Policy

**Portfolio Summary Card**:
- Condensed version of calculator result
- Reinforces the opportunity
- Keeps motivation high during form completion

### Interactions

**Form Validation**:
- Real-time validation
- Error messages inline
- Submit button disabled until valid

**ABN Lookup** (if provided):
- Auto-lookup and populate practice name if not entered
- Validation against ABR

**Submit**:
- Loading state on button
- Success: redirect to dashboard or confirmation

---

## Success Page (Post-Signup)

### Layout
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                                                              │  │
│  │                    ✓                                         │  │
│  │                                                              │  │
│  │         Welcome to pay.com.au, Sarah!                        │  │
│  │                                                              │  │
│  │         Your advisor account is ready.                       │  │
│  │                                                              │  │
│  │  ────────────────────────────────────────────────────────    │  │
│  │                                                              │  │
│  │  NEXT STEPS                                                  │  │
│  │                                                              │  │
│  │  1. Access your dashboard                                    │  │
│  │     [ Go to Dashboard ]                                      │  │
│  │                                                              │  │
│  │  2. Book your onboarding call                                │  │
│  │     We'll help you roll out to your first clients            │  │
│  │     [ Schedule Call ]                                        │  │
│  │                                                              │  │
│  │  3. Get your client invite link                              │  │
│  │     Share with clients to onboard them                       │  │
│  │     [ Copy Invite Link ]                                     │  │
│  │                                                              │  │
│  │  ────────────────────────────────────────────────────────    │  │
│  │                                                              │  │
│  │  Check your email for:                                       │  │
│  │  • Dashboard access link                                     │  │
│  │  • Client pitch deck (PDF)                                   │  │
│  │  • Getting started guide                                     │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Copy

**Welcome**:
```
Welcome to pay.com.au, [Name]!
Your advisor account is ready.
```

**Next Steps**:
```
1. Access your dashboard
   [Go to Dashboard]

2. Book your onboarding call
   We'll help you roll out to your first clients
   [Schedule Call]

3. Get your client invite link
   Share with clients to onboard them
   [Copy Invite Link]
```

**Email Follow-up**:
```
Check your email for:
• Dashboard access link
• Client pitch deck (PDF)
• Getting started guide
```

---

## State Management

### Advisor Funnel State

```typescript
interface VariantGState {
  // Step tracking
  currentStep: 'entry' | 1 | 2 | 3 | 4 | 'success';

  // Step 1: Portfolio Overview
  portfolioOverview: {
    clientCount: number;              // 5-100+
    avgMonthlyExpenses: string | null; // 'low' | 'medium' | 'high' | 'very_high'
  };

  // Step 2: Client Mix
  clientMix: {
    industries: string[];             // Multi-select
    clientType: string | null;        // 'sole_traders' | 'smes' | 'mid_market' | 'mixed'
  };

  // Step 4: Signup
  advisorInfo: {
    practiceName: string;
    name: string;
    email: string;
    phone: string;
    abn: string;                      // Optional
  };

  // Calculated Results
  calculated: {
    annualPortfolioVolume: number;
    annualPointsPotential: number;
    equivalentFlights: number;
    equivalentHotelNights: number;
    advisorBonusPotential: number;
  };

  // UI State
  ui: {
    isCalculating: boolean;
    isSubmitting: boolean;
    errors: Record<string, string>;
  };
}
```

---

## Calculation Details

### Portfolio Rewards Calculator

```typescript
const EXPENSE_VALUES: Record<string, number> = {
  low: 7500,        // Under $10K → midpoint
  medium: 20000,    // $10K-$30K → midpoint
  high: 52500,      // $30K-$75K → midpoint
  very_high: 100000 // $75K+ → estimate
};

const INDUSTRY_MULTIPLIERS: Record<string, number> = {
  construction: 1.3,
  trades: 1.2,
  professional: 1.0,
  healthcare: 1.0,
  retail: 0.9,
  property: 1.2,
  other: 1.0
};

const CLIENT_TYPE_MULTIPLIERS: Record<string, number> = {
  sole_traders: 0.8,
  smes: 1.0,
  mid_market: 1.3,
  mixed: 1.1
};

const calculatePortfolioRewards = (state: VariantGState): PortfolioResult => {
  const { clientCount, avgMonthlyExpenses } = state.portfolioOverview;
  const { industries, clientType } = state.clientMix;

  // Base calculation
  const monthlyExpenseValue = EXPENSE_VALUES[avgMonthlyExpenses || 'medium'];
  const annualVolume = clientCount * monthlyExpenseValue * 12;

  // Industry multiplier (weighted average if multiple selected)
  let industryMultiplier = 1.0;
  if (industries.length > 0) {
    const totalMultiplier = industries.reduce(
      (sum, ind) => sum + (INDUSTRY_MULTIPLIERS[ind] || 1.0), 0
    );
    industryMultiplier = totalMultiplier / industries.length;
  }

  // Client type multiplier
  const clientTypeMultiplier = CLIENT_TYPE_MULTIPLIERS[clientType || 'mixed'];

  // Final calculation
  const adjustedVolume = annualVolume * industryMultiplier * clientTypeMultiplier;
  const annualPointsPotential = Math.round(adjustedVolume);

  return {
    annualPortfolioVolume: Math.round(adjustedVolume),
    annualPointsPotential,
    equivalentFlights: Math.floor(annualPointsPotential / 80000),
    equivalentHotelNights: Math.floor(annualPointsPotential / 25000),
    advisorBonusPotential: Math.round(adjustedVolume * 0.002) // Conceptual
  };
};
```

---

## Components Summary

| Component | Purpose | Location |
|-----------|---------|----------|
| `PracticeHook` | Entry page with aggregate framing | Entry |
| `ClientCountSlider` | Slider for number of clients | Step 1 |
| `ExpenseRangeSelector` | Radio options for avg expenses | Step 1 |
| `PortfolioCalculator` | Live calculation sidebar | Steps 1-2 |
| `IndustryCheckboxGrid` | Multi-select industry picker | Step 2 |
| `ClientTypeSelector` | Radio for client business size | Step 2 |
| `DashboardPreview` | Mockup of advisor dashboard | Step 3 |
| `AdvisorBenefitsGrid` | Benefits feature cards | Step 3 |
| `AdvisorSignupForm` | Practice-specific form | Step 4 |
| `NextStepsPanel` | Right sidebar with reassurance | Step 4 |
| `AdvisorSuccessPage` | Post-signup confirmation | Success |

---

## Analytics Events

```typescript
const analyticsEvents = {
  // Funnel progression
  ADVISOR_FUNNEL_START: 'variant_g_funnel_start',
  PORTFOLIO_SIZE_SET: 'variant_g_portfolio_size_set',
  CLIENT_MIX_SET: 'variant_g_client_mix_set',
  DASHBOARD_PREVIEW_VIEW: 'variant_g_dashboard_preview_view',
  ADVISOR_SIGNUP_START: 'variant_g_signup_start',
  ADVISOR_SIGNUP_COMPLETE: 'variant_g_signup_complete',

  // Calculator interactions
  CLIENT_COUNT_CHANGE: 'variant_g_client_count_change',
  EXPENSE_RANGE_SELECT: 'variant_g_expense_range_select',
  INDUSTRY_SELECT: 'variant_g_industry_select',

  // Post-signup
  DASHBOARD_CLICK: 'variant_g_dashboard_click',
  SCHEDULE_CALL_CLICK: 'variant_g_schedule_call_click',
  INVITE_LINK_COPY: 'variant_g_invite_link_copy',
};

// Track with portfolio context
const trackEvent = (event: string, context: {
  clientCount?: number;
  avgExpenses?: string;
  industries?: string[];
  portfolioPotential?: number;
  advisorBonus?: number;
}) => void;
```

---

## File Structure

```
/src/variants/variant-g/
  /components/
    PracticeHook.tsx
    ClientCountSlider.tsx
    ExpenseRangeSelector.tsx
    PortfolioCalculator.tsx
    IndustryCheckboxGrid.tsx
    ClientTypeSelector.tsx
    DashboardPreview.tsx
    AdvisorBenefitsGrid.tsx
    AdvisorSignupForm.tsx
    NextStepsPanel.tsx
    AdvisorSuccessPage.tsx
  /pages/
    EntryPage.tsx
    Step1PortfolioOverview.tsx
    Step2ClientMix.tsx
    Step3DashboardPreview.tsx
    Step4AdvisorSignup.tsx
    SuccessPage.tsx
  /hooks/
    useVariantGState.ts
    usePortfolioCalculation.ts
  /utils/
    calculations.ts
    analytics.ts
  VariantGLayout.tsx
  VariantGFunnel.tsx
  index.ts
```

---

## Success Criteria

### Primary Metrics
- **Funnel completion rate**: Target 50%+ of starters
- **Advisor account creation**: Primary conversion
- **Average client count**: Quality indicator (higher = better)

### Secondary Metrics
- Portfolio size distribution
- Industry mix patterns
- Onboarding call booking rate
- First client invite sent (activation metric)

### Long-term Metrics
- Clients enrolled per advisor (30/60/90 day)
- Portfolio volume through platform
- Advisor retention rate
