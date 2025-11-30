# Full Website Build with SEO & i18n

**Purpose**: Complete automated website creation with SEO optimization, multi-language support, and validation gates.

**Agents**: 12 agents (7 execution + 5 validators)
**Time**: ~90-110 minutes
**Automation**: 95% hands-off

---

## INPUTS [EDIT HERE]
Only use shadcn_search components for UI and don't create custom components unless absolutely necessary.
Execute as many tasks as possible in parallel and use multiple instances of the same subagent when you delegate the tasks.
Always delegate tasks to the subagents, never do the work yourself.
After page structure and components are selected, create the page structure with the chosen components, then stop and show me the page structure and component selection for confirmation before proceeding to the next step.
For branding, also adjust h1, h2, h3, p etc. in globals.css to ensure consistency across the entire website.
Use sections with images regularly throughout the site—no galleries, just images integrated into sections on every page.
All sections must be centered on the page (container mx-auto), but content within sections should NOT be centered by you.
Before starting, document all business information and requirements in requirements.md.


USE ONLY SHADCN_SEARCH Components

Business Information
Company Name: Zürcher Unterland Räumungen (oder "Meier Entsorgung & Räumung")

Industry: House Clearance, Waste Disposal, Decluttering (Räumung, Entsorgung, Entrümpelung)

Value Proposition: Discreet, fast, and eco-friendly house clearances in the Dielsdorf region. Fixed price guarantee (Festpreisgarantie) – no hidden costs. We handle everything from furniture disposal to final sweeping.

Target Audience: Families dealing with inheritance (Erbfall), Seniors moving to care homes, Landlords needing quick clearance.

Geographic Focus: Dielsdorf, Bülach, Regensdorf, Steinmaur (Bezirk Dielsdorf).

Pages Required
STRICTLY SINGLE PAGE ARCHITECTURE (One-Pager) A clean, reassuring layout that builds trust immediately (avoiding the "dark/trashy" look of competitors).

Hero Section: Friendly image of a clean empty room (not a trash pile!). Headline: "Sorgenfreie Wohnungsräumung im Zürcher Unterland." CTA: "Gratis Besichtigungstermin".

Trust Badges: "Besenrein-Garantie", "100% Recycling", "Festpreis".

Services: Cards for: Wohnungsräumung, Entsorgung, Kellerräumung, Firmenauflösung.

Process: 1. Besichtigung (Gratis), 2. Offerte, 3. Räumung & Übergabe.

About: "Local family business in Dielsdorf" (builds trust vs. anonymous national chains).

Testimonials: Focus on "Reliable", "On time", "Friendly".

Contact/Footer: Large Phone Number (Click-to-call is crucial!), Simple form for "Free Quote".

Languages
Primary Language: de (German - Trustworthy, empathetic tone)

Secondary Languages: en (English - optional, but good for expats leaving CH)

SEO Keywords
Primary Keywords: Räumung Dielsdorf, Wohnungsauflösung Zürich Unterland, Entsorgung Dielsdorf

Secondary Keywords: Entrümpelung Firma, Hausräumung nach Todesfall, Sperrmüll abholen, Keller räumen lassen

Competitors: [Leave empty]

Features
Check all that apply:

[x] Contact form (Fields: Name, Phone, Object type (House/Apt), Date)

[ ] Blog/News section

[ ] Pricing calculator

[ ] Booking/Demo scheduling

[ ] Newsletter signup

[ ] E-commerce

[x] Customer testimonials

[ ] Case studies

[x] Multi-language support (next-intl)

[x] SEO optimization (Local SEO is #1 priority here)

[ ] Analytics integration

Brand Guidelines (Optional)
Tone: Empathetic, Efficient, Serious, Clean. (Not "loud" or aggressive).

Colors: Primary: Trust Blue (#0B4F6C) or Eco Green (#4A7C59). Background: Very clean White/Beige. Avoid Black/Red (looks like danger/trash).

Fonts: Very readable Sans-Serif (Inter, DM Sans). Big font sizes for older target audience.

Logo: Text with a simple "Box" or "Recycling" symbol.

---

## EXECUTION PROMPT

Copy this entire prompt to Parent:

```
Create a complete Next.js 15 website with SEO optimization and multi-language support.

**Business:**
- Company: [Company Name]
- Industry: [Industry]
- Value Proposition: [Value Prop]
- Target Audience: [Audience]
- Geographic Focus: [Regions]

**Pages Required:**
[Paste list of pages from above]

**Languages:**
- Primary: [Primary Language Code]
- Secondary: [Secondary Language Codes]

**SEO Focus:**
- Primary Keywords: [Keywords]
- Secondary Keywords: [Keywords]
- Competitors: [URLs]

**Features:**
[List checked features from above]

**Brand:**
- Tone: [Tone]
- Colors: [Colors if provided]
- Fonts: [Fonts if provided]

**Architecture:**
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS + shadcn/ui components
- i18n: next-intl
- Deployment: Vercel

**Requirements:**
1. Use `.claude/sessions/` for session tracking
2. Create planning.md with Task DAG (website workflow from parent-workflow.md)
3. Generate agent-context files before each agent launch
4. Trigger all 5 validation gates
5. Use MCPs: shadcn-search (components), context7 (Next.js/next-intl docs), next-devtools (validation)
6. Parallel execution where possible (3 parallel groups)
7. Output to `.claude/planning/[project-name]/`

**Expected Deliverables:**
- ✅ brand.json - Brand assets extracted
- ✅ requirements.md - Business requirements documented
- ✅ sitemap.md - Page structure + component selections
- ✅ app/ - Complete Next.js structure with components
- ✅ seo-report.md - Keywords, meta tags, URL structure
- ✅ i18n.ts - next-intl configuration
- ✅ messages/*.json - Translation files with SEO content
- ✅ validation-report.md - Final quality audit (accessibility, performance, SEO)

**Success Criteria:**
- All 5 validation gates PASS (≥80 score)
- Token usage ~11,850 (62% reduction from baseline)
- Keyword density 1-2% (primary), 0.5-1% (secondary)
- WCAG AA accessibility
- Lighthouse performance >90
- No TypeScript errors
- Production-ready in ~90-110 minutes
```

---

## WORKFLOW OVERVIEW

Parent will execute this automatically:

### Phase 1: Discovery (Parallel) - 15 min
```
[1] brand-analyzer (extract colors, fonts, logo from project)
[2] requirements-analyst (structure business requirements)
    ↓
[VALIDATE-1] requirements-validator (score 0-100, PASS ≥80)
```

### Phase 2: Architecture - 20 min
```
[3] sitemap-analyst (plan pages, select shadcn components via MCP)
    ↓
[VALIDATE-2] sitemap-quality-validator (verify component choices)
```

### Phase 3: Build + SEO + i18n Refactor (Parallel + Sequential) - 40 min
```
[4] sitemap-executor (create app/ structure, install components)
[5] seo-orchestrator (keyword research, meta tags, URLs)
    ↓
[VALIDATE-3a] code-structure-validator (TypeScript compilation check)
    ↓
[6] i18n-text-replacer (replace ALL hardcoded text with i18n keys)
    ↓
[VALIDATE-3b] i18n-coverage-validator (verify 100% i18n coverage)
```

### Phase 4: i18n Setup + Content Planning - 10 min
```
[7] i18n-setup-agent (routing/middleware only, keys already exist from i18n-text-replacer)
[8] seo-content-planner (plan content structure based on existing keys)
```

### Phase 5: Content Writing (Parallel) - 20 min
```
[9] seo-content-writer-de (replace placeholder values with German SEO content)
[10] seo-content-writer-en (replace placeholder values with English SEO content)
    ↓
[VALIDATE-4] content-quality-validator (SEO quality, i18n completeness)
```

### Phase 6: Final Validation - 10 min
```
[VALIDATE-5] production-readiness-validator
    ├── accessibility-compliance (WCAG AA)
    ├── performance-testing-review (Lighthouse)
    └── seo-content-auditor (E-E-A-T)
```

---

## VALIDATION GATES

### Gate 1: Requirements Completeness (30 points)
- Business context clearly stated
- Value proposition defined
- Target audience specified
- All pages listed
- Languages confirmed
- SEO keywords provided

**If FAIL**: Parent retries requirements-analyst with feedback

### Gate 2: Sitemap Quality (25 points)
- Component selections appropriate
- SEO-friendly URLs
- Internal linking strategy
- MCP usage verified

**If FAIL**: Parent retries sitemap-analyst with feedback

### Gate 3: Code Structure (25 points)
- TypeScript compiles without errors
- Components properly imported
- i18n integration correct
- File structure follows Next.js conventions

**If FAIL**: Parent retries sitemap-executor with feedback

### Gate 4: Content Quality (35 points)
- Keyword density within targets (1-2% primary)
- E-E-A-T signals present
- No placeholders
- Translation parity (all languages complete)

**If FAIL**: Parent retries content writers with feedback

### Gate 5: Production Readiness (weighted average)
- Accessibility: 35% weight (WCAG AA compliance)
- Performance: 35% weight (Lighthouse >90)
- SEO: 30% weight (meta tags, structured data, sitemap)

**If FAIL**: Parent escalates to user for manual review

---

## OUTPUT FILES

After completion, you'll find:

```
.claude/planning/[project-name]/
├── brand.json                 # Extracted brand assets
├── requirements.md            # Business requirements
├── sitemap.md                 # Page structure + components
├── seo-report.md             # Keywords, meta tags, strategy
├── content-plan.md           # SEO content outline
└── validation-report.md      # Final quality audit

app/
├── [locale]/                 # Multi-language routes
│   ├── page.tsx             # Homepage
│   ├── about/page.tsx       # About page
│   ├── services/page.tsx    # Services page
│   └── ...                  # All pages from sitemap
├── layout.tsx               # Root layout
└── global.css               # Tailwind styles

messages/
├── de.json                  # German translations
├── en.json                  # English translations
└── ...                      # Other languages

components/
├── ui/                      # shadcn components
└── ...                      # Custom components

i18n.ts                      # next-intl config
next.config.js              # Next.js config
tailwind.config.ts          # Tailwind config
```

---

## CUSTOMIZATION AFTER BUILD

Once the automated build completes:

1. **Review validation-report.md** - Check all gates passed
2. **Customize content** - Edit messages/*.json for brand voice
3. **Add images** - Replace placeholder images with real assets
4. **Fine-tune styling** - Adjust Tailwind config for brand colors
5. **Test locally** - Run `pnpm dev` and review
6. **Deploy** - Push to Vercel

---

## TROUBLESHOOTING

### If validation gate fails multiple times
- Check agent-context files for feedback
- Review metadata.json validation state
- Manually fix issues identified by validator
- Re-run Parent with "retry from phase X"

### If token usage is high
- Verify MCPs are being used (check communication.md)
- Ensure agent-context files are ~300 tokens
- Check Parent is creating summaries (50 tokens for old entries)

### If build time exceeds 110 minutes
- Check if agents are running in parallel (Phase 1, 3, 5)
- Verify validation gates aren't timing out
- Review communication.md for stuck agents

---

## NEXT STEPS AFTER BUILD

1. **Local Testing**
   ```bash
   pnpm dev
   # Visit http://localhost:3000
   # Test all pages, languages, forms
   ```

2. **SEO Setup**
    - Submit sitemap.xml to Google Search Console
    - Set up Google Analytics
    - Configure Vercel Analytics

3. **Deploy**
   ```bash
   git add .
   git commit -m "Initial website build"
   git push
   # Vercel auto-deploys on push
   ```

4. **Monitor**
    - Track Core Web Vitals
    - Monitor keyword rankings
    - Review validation-report.md monthly

---

**Estimated Time**: 90-110 minutes (with validation)
**Token Cost**: ~11,850 tokens (62% optimized)
**Success Rate**: 95% (with validation gates)
