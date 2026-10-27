# Documentation on a Figma page

Read this before writing anything on any page's documentation.
Why it exists: on 2026-08-05 (page 04 Grid) an anatomy and 9 specimen images were pushed into the Page Documentation,
which should be a summary skeleton only. The standard wasn't read, the sample pages weren't checked, and nobody asked which
kind of doc to write. The user had to fix it.

## Pre-flight: 4 steps before writing anything on a new page
1. Read `docs/rules/component-doc-standard.md` section 0.5 every time. Don't trust memory. It defines the 5 kinds of document per page
   (Page Documentation, Token Document, Information Document, Component Previews, Space Document), placed left to right in that order,
   starting at x = 0, 200 apart
2. Scan the target page: list its top-level frames and compare them with the references, page **01 Color** (has every kind) and
   page **03 Typography** (variable-driven, no components). Find which kinds this page is missing
3. List which kinds you will touch or create (1 Page Documentation, several Information Documents, Component Previews if the page has
   components, a Token Document if the page has tokens, a Space Document if the page has components), then wait for confirmation.
   When asked to "write a document", always ask which of the 5 kinds it is before starting
4. MUST NOT use the Page Documentation as a dumping ground. Specimens, image sets, detailed value tables and long anatomies go in an
   Information Document. A token table goes in the Token Document

## Where content goes
| Content | Goes to |
| --- | --- |
| What this page is, what it has, when to use it, do and don't, links to the child docs | Page Documentation (exactly 1) |
| Specimen images, image sets, anatomy, deep principles, detailed tables per system | Information Document (one per topic) |
| The page's real components, including `_` base parts | Component Previews (one per kind) |
| The table that maps Figma name, code name, value and where it's used | Token Document (exactly 1) |

## Section structure
Use the template on page 00 Document only. Don't assemble your own.
```
content-section        padding 80, gap 24, bg color/background/general/primary
  header               gap 8
    title   text style section-heading/xl   (never lg or another size)
    desc    text style body/xl              (only when there is one block of description)
  content              padding 40, bg color/background/general/secondary
```
- Add `desc` only when the section has one block of description. With several blocks, a table, images or cards, keep only the title in the header and place the content after the header
- The gray `content` frame in the template is a placeholder that marks where content goes. It is not a style to keep. Real documents place content straight after `header`, with no gray box around it (see `[Template] Token Document`: header, then `token-table` or `how-to-read`)
- For a layout wrapper (for example to wrap several pieces), create an empty frame with `fills = []` and a meaningful name such as `grid`. Don't keep the placeholder
- Width: normally 1440. It may be wider when the content (for example a real component) is wider than 1440. That is not a broken pattern
- New or edited documents MUST be cloned from a `[Template] ...` frame on page 00 Document

## Page Documentation needs real examples
The user flagged 9 pages at once on 2026-10-12 for being text only.
- At least 5 topics MUST have an example block: parts, sets, sizes, states, do and don't
- The example block is named `preview`, a horizontal auto layout with a gap of 16 to 24, holding real instances from that page. Never drawn by hand
- Do and don't uses a `do-dont` block built from `info-card / do` and `info-card / don't` on page 27. Never one paragraph
- Pages with no components (for example 06 Shape, 07 Space, 04 Grid) MAY have example blocks drawn for them (allowed by the user 2026-10-12), or borrow a block already drawn in that page's Information Document and shrink it
- A topic with nothing real to show (for example states for radius or spacing, which have no states) MUST NOT get a fake example. Write why there is none, as page 01 Color does
- Scan before you say done: count the instances in the Page Documentation. 0 means it is still text only
- There MUST be no gray frame named `content`. When scanning, count only the direct children of a section. A layer named `content` inside an instance belongs to the component, not to the placeholder

## Checks before you say done
- The page has 1 Page Documentation and at least 1 Information Document
- It has a Token Document if it has tokens, and Component Previews and a Space Document if it has components
- The documents sit left to right as Page Documentation, Token Document, Information Documents, Component Previews, Space Document, starting at x = 0 and y = 0, 200 apart measured from the right edge of the previous one
- No specimen, image set, value table or anatomy is left in the Page Documentation
- The Page Documentation has real instances (count above 0)
