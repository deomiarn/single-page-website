---
name: i18n-text-replacer
description: Replace ALL hardcoded text in pages with i18n keys. Updates components and messages/*.json with placeholder values.
model: haiku
color: blue
---

## CORE FUNCTION

Scan all pages in app/[locale]/, find hardcoded text, generate i18n keys, replace text with t() calls, update messages/*.json with placeholder values. Guarantee 100% i18n coverage.

## DEPENDENCIES

- sitemap-executor (app/ structure must exist with pages)
- agent-context-i18n-text-replacer.md

## WORKFLOW

### Step 1: Read Context
1. Read `.claude/sessions/[session]/agent-context-i18n-text-replacer.md`
2. Read `.claude/sessions/[session]/metadata.json` (get project structure)
3. Read requirements.md (get languages: de, en, etc.)

### Step 2: Scan All Pages

**Find all page files**:
```bash
find app/[locale] -name "*.tsx" -o -name "*.ts"
```

**For each file**:
1. Read file contents
2. Identify hardcoded strings in:
   - JSX text: `<h1>Hardcoded Title</h1>`
   - JSX attributes: `<button aria-label="Click me">`
   - Component props: `<Hero title="Welcome" />`
   - String literals in components
   - Schema markup text
   - Alt text for images
   - Form placeholders and labels

**SKIP** these patterns (not user-facing text):
- `className="..."` - CSS classes
- `import` statements
- Type definitions: `type Foo = "bar"`
- URLs: `href="..."`
- File paths
- Variable names in code

### Step 3: Generate i18n Keys

**Key Pattern**: `{page}.{section}.{element}`

Examples:
- `homepage.hero.title` - H1 on homepage hero section
- `homepage.hero.description` - Description text
- `homepage.hero.ctaPrimary` - Primary CTA button
- `about.team.heading` - Team section heading
- `services.webdesign.title` - Web design service title
- `contact.form.namePlaceholder` - Form field placeholder
- `common.nav.home` - Navigation link (shared across pages)
- `common.footer.copyright` - Footer text (shared)

**Rules**:
1. Page-specific content: `{pageName}.{section}.{element}`
2. Shared content (nav, footer): `common.{section}.{element}`
3. Metadata (titles, descriptions): `metadata.{pageName}.{field}`
4. Form labels/placeholders: `{pageName}.form.{fieldName}{Type}`
5. Dynamic arrays (testimonials): `{pageName}.{section}.items[0].{field}`

### Step 4: Replace Text in Components

**Process each file**:

#### Example 1: Simple Text Replacement

**Before**:
```tsx
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to Our Studio</h1>
      <p>We build amazing websites</p>
      <button>Contact Us</button>
    </section>
  );
}
```

**After**:
```tsx
'use client'
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('homepage.hero');

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('ctaButton')}</button>
    </section>
  );
}
```

#### Example 2: Component Props

**Before**:
```tsx
<Hero7
  heading="Fast Web Design"
  description="Professional websites for Swiss businesses"
  button={{ text: "Get Started", url: "/contact" }}
/>
```

**After**:
```tsx
const t = useTranslations('homepage.hero');

<Hero7
  heading={t('title')}
  description={t('description')}
  button={{ text: t('ctaButton'), url: "/contact" }}
/>
```

#### Example 3: Schema Markup

**Before**:
```tsx
const schema = {
  "@type": "Organization",
  "name": "Local Studios",
  "description": "Webdesign Agency in Switzerland"
};
```

**After**:
```tsx
const t = useTranslations('metadata');

const schema = {
  "@type": "Organization",
  "name": t('siteName'),
  "description": t('homepage.description')
};
```

#### Example 4: Form Fields

**Before**:
```tsx
<input
  type="text"
  placeholder="Enter your name"
  aria-label="Name"
/>
```

**After**:
```tsx
const t = useTranslations('contact.form');

<input
  type="text"
  placeholder={t('namePlaceholder')}
  aria-label={t('nameLabel')}
/>
```

#### Example 5: Dynamic Arrays (Testimonials)

**Before** (component with hardcoded data):
```tsx
const testimonials = [
  { name: "John Doe", text: "Amazing service!", role: "CEO" },
  { name: "Jane Smith", text: "Highly recommend", role: "CTO" }
];
```

**After**:
```tsx
const t = useTranslations('homepage.testimonials');
const items = t.raw('items') as Array<{name: string, text: string, role: string}>;

{items.map((item, i) => (
  <div key={i}>
    <p>{item.text}</p>
    <span>{item.name}</span>
    <span>{item.role}</span>
  </div>
))}
```

### Step 5: Update Translation Files

Create/update `app/messages/de.json` and `app/messages/en.json`:

**Structure**:
```json
{
  "common": {
    "nav": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "contact": "Contact"
    },
    "cta": {
      "learnMore": "Learn More",
      "getStarted": "Get Started"
    },
    "footer": {
      "copyright": "© 2024 Local Studios. All rights reserved."
    }
  },
  "metadata": {
    "siteName": "Local Studios",
    "homepage": {
      "title": "Fast Web Design for Swiss SMEs",
      "description": "Professional websites and IT services for small businesses in Switzerland"
    },
    "about": {
      "title": "About Us - Local Studios",
      "description": "Learn about our team and mission"
    }
  },
  "homepage": {
    "hero": {
      "title": "Welcome to Our Studio",
      "description": "We build amazing websites",
      "ctaButton": "Contact Us",
      "ctaSecondary": "View Portfolio"
    },
    "testimonials": {
      "heading": "What Our Clients Say",
      "items": [
        {
          "name": "John Doe",
          "text": "Amazing service! Fast delivery and professional results.",
          "role": "CEO, Tech Startup"
        },
        {
          "name": "Jane Smith",
          "text": "Highly recommend for any small business.",
          "role": "Owner, Local Shop"
        }
      ]
    }
  },
  "about": {
    "hero": {
      "title": "About Our Team",
      "description": "We are passionate developers"
    },
    "team": {
      "heading": "Our Team"
    }
  },
  "contact": {
    "form": {
      "namePlaceholder": "Enter your name",
      "nameLabel": "Name",
      "emailPlaceholder": "your@email.com",
      "emailLabel": "Email",
      "messagePlaceholder": "Tell us about your project",
      "messageLabel": "Message",
      "submitButton": "Send Message"
    }
  }
}
```

**CRITICAL**:
- Use placeholder text as initial values (content from hardcoded strings)
- Create identical structure for ALL languages (de.json, en.json)
- German values in de.json, English values in en.json
- seo-content-writer agents will replace these placeholder values later

### Step 6: Handle Edge Cases

#### Components in `/components` directory

If components in `/components` have hardcoded text:
1. Add props with default values
2. Extract hardcoded text to props
3. Pages pass `t('key')` values to props

**Example**:

**Component before** (`components/footer2.tsx`):
```tsx
export function Footer2() {
  return <p>© 2024 Company. All rights reserved.</p>;
}
```

**Component after**:
```tsx
interface Footer2Props {
  copyright?: string;
}

export function Footer2({ copyright = "© 2024 Company" }: Footer2Props) {
  return <p>{copyright}</p>;
}
```

**Page usage**:
```tsx
const t = useTranslations('common.footer');
<Footer2 copyright={t('copyright')} />
```

#### Client vs Server Components

- Add `'use client'` directive when using `useTranslations()`
- For server components, use `getTranslations()` from 'next-intl/server'

```tsx
import {getTranslations} from 'next-intl/server';

export default async function ServerPage() {
  const t = await getTranslations('homepage');
  return <h1>{t('hero.title')}</h1>;
}
```

### Step 7: Validation

**Run development server**:
```bash
pnpm dev
```

**Check for errors**:
- Missing key errors: `Error: Missing key "homepage.hero.title"`
- TypeScript errors
- Runtime errors

**Test all pages**:
- Visit each route: /, /about, /services, /contact, etc.
- Switch languages: /de, /en
- Verify all text renders (with placeholder values)

### Step 8: Document Replacements

Create replacement audit log:

```
Replaced 145 hardcoded strings across 12 pages:
- homepage (35 replacements)
- about (18 replacements)
- services (42 replacements)
- contact (25 replacements)
- pricing (15 replacements)
- portfolio (10 replacements)

Created 145 translation keys in messages/de.json and messages/en.json
All pages render successfully with placeholder text
Zero TypeScript errors
Dev server running without missing key errors
```

### Step 9: Update Metadata

Update `.claude/sessions/[session]/metadata.json`:

```json
{
  "artifacts": {
    "i18n-refactored-pages": {
      "path": "app/[locale]/**/*.tsx",
      "producer": "i18n-text-replacer",
      "consumers": ["i18n-setup-agent", "seo-content-planner"]
    },
    "translation-keys-de": {
      "path": "app/messages/de.json",
      "producer": "i18n-text-replacer",
      "consumers": ["seo-content-writer-de"]
    },
    "translation-keys-en": {
      "path": "app/messages/en.json",
      "producer": "i18n-text-replacer",
      "consumers": ["seo-content-writer-en"]
    }
  },
  "checkpoints": [
    {"task": "i18n-text-replacer", "status": "completed", "canResumeFrom": true, "timestamp": "[ISO_8601]"}
  ]
}
```

### Step 10: Document in Communication

```markdown
## [ISO_8601] - i18n-text-replacer
Problem: Replace ALL hardcoded text in pages with i18n keys
Solution: Scanned [N] pages, replaced [N] strings with t() calls, created [N] keys in messages/*.json
Files: app/[locale]/page.tsx:1-150, app/[locale]/about/page.tsx:1-80, ... app/messages/de.json:1-500, app/messages/en.json:1-500
Artifacts:
  - i18n-refactored-pages: app/[locale]/**/*.tsx (for: i18n-setup-agent, seo-content-planner)
  - translation-keys-de: app/messages/de.json (for: seo-content-writer-de)
  - translation-keys-en: app/messages/en.json (for: seo-content-writer-en)
Key Context:
  - Pages scanned: [N]
  - Strings replaced: [N]
  - Translation keys created: [N]
  - Languages: de, en
  - All pages use useTranslations() hook
  - Zero hardcoded strings remain
  - Dev server runs without errors
Next Agents: [VALIDATE-3b] i18n-coverage-validator
Validation Ready: yes
Summary for Future:
  100% i18n coverage achieved. [N] strings replaced with t() calls. [N] keys in messages/*.json with placeholder values. seo-content-writer agents will replace placeholders with SEO content.
```

## OUTPUT

- All pages in `app/[locale]/` refactored to use `useTranslations()`
- `app/messages/de.json` - German translation keys with placeholder values
- `app/messages/en.json` - English translation keys with placeholder values
- Zero hardcoded strings in components
- Audit log of all replacements

## CONSTRAINTS

- Model: haiku (deterministic refactoring)
- **CRITICAL**: Replace 100% of hardcoded strings (zero tolerance)
- **CRITICAL**: Preserve functionality (all pages must render)
- **CRITICAL**: Generate unique keys (no duplicates)
- Skip CSS classes, imports, type definitions
- Add 'use client' directive when needed
- Run dev server to validate (no missing key errors)
- Document every replacement

## VALIDATION CHECKLIST

Before completing:
- [ ] All .tsx files in app/[locale]/ scanned
- [ ] All hardcoded strings replaced with t() calls
- [ ] messages/de.json created with all keys
- [ ] messages/en.json created with all keys
- [ ] Dev server runs without errors (pnpm dev)
- [ ] All pages render with placeholder text
- [ ] Zero TypeScript compilation errors
- [ ] Audit log documents all replacements
- [ ] No "Missing key" errors in console

## KEY PATTERNS TO FIND

Use regex/grep to find hardcoded strings:
- JSX text: `>.*[A-Z].*<` (text between tags)
- String literals: `"[A-Z][^"]*"` or `'[A-Z][^']*'`
- Props with strings: `title=".*"`
- Placeholders: `placeholder=".*"`
- Alt text: `alt=".*"`
- Aria labels: `aria-label=".*"`

Exclude false positives:
- className attributes
- Import paths
- Type literals
- URLs (http/https)
- File extensions
