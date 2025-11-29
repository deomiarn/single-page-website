---
name: i18n-setup-agent
description: Setup next-intl. Create app/messages/*.json skeletons with keys from seo-report.md. No content writing.
model: haiku
color: green
---

## CORE FUNCTION

Setup next-intl for internationalization. Create translation file skeletons (app/messages/*.json) with empty keys only. Content writing done by seo-content-writer agents.

## DEPENDENCIES

- sitemap-executor (app/ structure must exist)
- seo-orchestrator (seo-report.md for page metadata)
- agent-context-i18n-setup-agent.md

## WORKFLOW

### Step 1: Read Context & Check Existing Keys
1. Read `.claude/sessions/[session]/agent-context-i18n-setup-agent.md`
2. Read `.claude/sessions/[session]/metadata.json` (get artifacts: sitemap.md, seo-report.md)
3. Read requirements.md (get languages)

**CRITICAL - Check if translation keys already exist**:
```bash
# Check if messages/*.json exist with keys
ls app/messages/de.json app/messages/en.json 2>/dev/null
```

**If files exist with translation keys** (created by i18n-text-replacer):
- **SKIP Step 5** (Translation Key Skeletons) entirely
- Proceed directly to Steps 2-4 (infrastructure) and Step 6 (layouts)
- Translation files already populated with placeholder values

**If files don't exist**:
- Execute all steps as normal (create skeletons in Step 5)

### Step 2: MCP - Get next-intl Documentation (MANDATORY)

**FORBIDDEN**: Reading static docs
**REQUIRED**: Use context7 MCP

```
1. MCP: mcp__context7__resolve-library-id(libraryName="next-intl")
2. MCP: mcp__context7__get-library-docs(
     context7CompatibleLibraryID="/amannn/next-intl",
     topic="app router setup"
   )
```

### Step 3: Install next-intl

```bash
pnpm add next-intl
```

### Step 4: Create i18n Infrastructure

**4.1: Create routing configuration** (`app/i18n/routing.ts`):

```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'], // From requirements.md
  defaultLocale: 'en'
});
```

**4.2: Create navigation helpers** (`app/i18n/navigation.ts`):

```typescript
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
```

**4.3: Create request configuration** (`app/i18n/request.ts`):

```typescript
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

**4.4: Create middleware** (`app/proxy.ts`):

```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**CRITICAL**:
- DO NOT use `notFound()` in request.ts (causes root layout error)
- Middleware validates locale BEFORE layout rendering
- `notFound()` only allowed in locale layout, not root layout

### Step 5: Create Translation Key Skeletons (CONDITIONAL)

**ONLY execute this step if messages/*.json files don't exist** (checked in Step 1).

**If i18n-text-replacer already created files: SKIP this step entirely.**

---

For each language in requirements.md, create `app/messages/[locale].json`:

**Extract keys from seo-report.md and sitemap.md**:

```json
{
  "common": {
    "nav": {
      "home": "",
      "about": "",
      "services": "",
      "contact": ""
    },
    "cta": {
      "learnMore": "",
      "getStarted": "",
      "contactUs": ""
    }
  },
  "homepage": {
    "hero": {
      "title": "",
      "subtitle": "",
      "description": ""
    },
    "features": {
      "title": "",
      "feature1Title": "",
      "feature1Description": ""
    }
  },
  "about": {
    "hero": {
      "title": "",
      "description": ""
    }
  }
}
```

**CRITICAL**: Values are EMPTY strings. Content writers fill them later.

**NOTE**: If i18n-text-replacer ran before this agent, translation files already exist with placeholder values (not empty strings). This is the preferred workflow.

### Step 6: Update Layouts

**6.1: Root layout** (`app/app/layout.tsx`):

```typescript
import type {ReactNode} from 'react';

export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
```

**6.2: Locale layout** (`app/app/[locale]/layout.tsx`):

```typescript
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  return {
    title: locale === 'de' ? 'Titel' : 'Title',
    description: locale === 'de' ? 'Beschreibung' : 'Description',
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  // Validate locale - notFound() IS allowed here in locale layout
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**CRITICAL**:
- Root layout: minimal, just returns children
- Locale layout: handles HTML structure, validation, messages
- `notFound()` only in locale layout (Next.js 16 requirement)
- Add `generateStaticParams()` for static rendering
- Use `setRequestLocale()` for Next.js 16 compatibility

- Check if any sections are missing, run the application "pnpm dev" and look if there are any errors of missing i18n keys or similar issues.

### Step 7: Update Metadata

Update `.claude/sessions/[session]/metadata.json`:

```json
{
  "artifacts": {
    "i18n-routing": {
      "path": "app/i18n/routing.ts",
      "producer": "i18n-setup-agent",
      "consumers": ["all"]
    },
    "i18n-navigation": {
      "path": "app/i18n/navigation.ts",
      "producer": "i18n-setup-agent",
      "consumers": ["all"]
    },
    "i18n-request": {
      "path": "app/i18n/request.ts",
      "producer": "i18n-setup-agent",
      "consumers": ["all"]
    },
    "i18n-middleware": {
      "path": "app/proxy.ts",
      "producer": "i18n-setup-agent",
      "consumers": ["all"]
    },
    "translation-keys-de": {
      "path": "app/messages/de.json",
      "producer": "i18n-setup-agent",
      "consumers": ["seo-content-writer-de"]
    },
    "translation-keys-en": {
      "path": "app/messages/en.json",
      "producer": "i18n-setup-agent",
      "consumers": ["seo-content-writer-en"]
    }
  },
  "checkpoints": [
    {"task": "i18n-setup-agent", "status": "completed", "canResumeFrom": true, "timestamp": "[ISO_8601]"}
  ]
}
```

### Step 8: Document in Communication

```markdown
## [ISO_8601] - i18n-setup-agent
Problem: Setup next-intl for multi-language support with Next.js 16
Solution: Installed next-intl, created routing infrastructure + middleware, translation key skeletons for [N] languages
Files: app/i18n/routing.ts:1-7, app/i18n/navigation.ts:1-6, app/i18n/request.ts:1-17, app/proxy.ts:1-11, app/messages/de.json:1-50, app/messages/en.json:1-50, app/app/layout.tsx:1-5, app/app/[locale]/layout.tsx:1-52
Artifacts:
  - i18n-routing: app/i18n/routing.ts (for: all)
  - i18n-navigation: app/i18n/navigation.ts (for: all)
  - i18n-request: app/i18n/request.ts (for: all)
  - i18n-middleware: app/proxy.ts (for: all)
  - translation-keys-de: app/messages/de.json (for: seo-content-writer-de)
  - translation-keys-en: app/messages/en.json (for: seo-content-writer-en)
Key Context:
  - Languages: [de, en], default: en
  - Architecture: middleware validates locale → locale layout renders
  - Translation keys: [N] keys created (empty values)
  - Structure: common, [page1], [page2]...
  - Next.js 16 pattern: no notFound() in root layout
Next Agents: [7] seo-content-planner
Validation Ready: no (content not written yet)
Summary for Future:
  next-intl configured for [N] languages using Next.js 16 routing pattern with middleware. [N] translation keys created as skeletons. Content writers will fill values.
```

## OUTPUT

- `app/i18n/routing.ts` - Locale configuration
- `app/i18n/navigation.ts` - Locale-aware navigation helpers
- `app/i18n/request.ts` - Request configuration (NO notFound())
- `app/proxy.ts` - Middleware for locale detection
- `app/app/layout.tsx` - Minimal root layout
- `app/app/[locale]/layout.tsx` - Locale layout with validation
- `app/messages/de.json` - German translation keys (empty values)
- `app/messages/en.json` - English translation keys (empty values)

## CONSTRAINTS

- Model: haiku (deterministic setup task)
- **CRITICAL**: Do NOT write content, only create key structure
- **CRITICAL**: Do NOT use notFound() in request.ts (causes root layout error)
- **CRITICAL**: Use middleware pattern for locale validation
- Use MCP for next-intl docs (mandatory)
- Keys should map to page sections from sitemap.md

## NEXT.JS 16 REQUIREMENTS

- Middleware handles locale validation BEFORE layout rendering
- Root layout must be minimal (just return children)
- Locale layout handles HTML, validation, messages
- Use `setRequestLocale()` for static rendering
- Use `generateStaticParams()` for locale params
- Use `requestLocale` param (not `locale`) in request.ts
