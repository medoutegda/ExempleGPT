# ExampleGPT Calculator — Roadmap

> Product, UX, architecture and delivery roadmap for an advanced scientific calculator available on the Web and as a Google Chrome extension.

## 1. Product vision

Build a premium, fast and technically elegant calculator combining:
- Standard and scientific calculation modes.
- A powerful expression editor with keyboard-first UX.
- History, memory, variables, constants and reusable calculations.
- Multiple visual themes and an extensible design system.
- Responsive Web/PWA experience.
- Chrome Extension using the same calculator core and UI primitives.
- A polished landing page explaining the product and technology.
- Docker-first local development and reproducible deployments.

## 2. Recommended architecture

### Monorepo

```text
ExempleGPT/
├── apps/
│   ├── web/                 # React + TypeScript + Vite/PWA
│   └── extension/           # Chrome Manifest V3
├── packages/
│   ├── calculator-core/     # Pure TypeScript parser/evaluator/domain
│   ├── design-system/       # Tokens + reusable UI components
│   └── shared/              # Types, utilities, constants
├── services/
│   └── api/                 # Java 21 + Spring Boot REST API
├── infra/
│   ├── docker/
│   └── nginx/
├── docs/
│   ├── architecture/
│   ├── adr/
│   └── ux/
├── docker-compose.yml
├── README.md
└── ROADMAP.md
```

### Key architectural principle

The calculation engine must be independent from React and Spring Boot. Basic calculations should execute locally in the browser/extension with no network dependency. The Java API should handle optional capabilities such as synchronization, user preferences, telemetry (opt-in), saved workspaces and future collaborative/cloud features.

## 3. Recommended technical stack

### Frontend
- React + TypeScript + Vite.
- PWA support for installable Web experience.
- Tailwind CSS or CSS Modules backed by the custom design-token layer.
- Radix UI primitives where accessible behavior is useful.
- Zustand for lightweight UI state; keep calculator domain state in calculator-core.
- Vitest + Testing Library.
- Playwright for end-to-end tests.

### Calculator engine
- TypeScript package shared by Web and Chrome Extension.
- Tokenizer → parser → AST → evaluator pipeline.
- Prefer a well-defined AST instead of evaluating arbitrary JavaScript.
- Support operator precedence, unary operators, functions, constants, variables and configurable angle modes.
- Explicit numeric/error model: division by zero, domain errors, overflow, invalid syntax and precision limitations.
- Consider arbitrary-precision decimal support for financial/exact decimal use cases.

### Backend
- Java 21 LTS.
- Spring Boot 3.x.
- Spring Web, Validation and Actuator.
- PostgreSQL for persistent user data when synchronization is introduced.
- Flyway for database migrations.
- OpenAPI/Swagger for API contract documentation.
- Testcontainers for integration tests.

### Infrastructure
- Docker + Docker Compose for development.
- Multi-stage Dockerfiles.
- Nginx or a modern edge/reverse-proxy layer for production static hosting/API routing.
- GitHub Actions for build, test, lint, security checks and container publishing.

### Chrome Extension
- Manifest V3.
- Reuse `calculator-core`, design tokens and UI components where practical.
- Popup as the fast-entry calculator.
- Optional side panel for a larger workspace.
- Avoid coupling the extension to the backend for basic calculations.

## 4. Design system / visual direction

### Brand direction
Modern technical / engineering aesthetic: precise, minimal, premium and slightly futuristic without becoming visually noisy.

Suggested visual language:
- Dark-first interface with a light theme.
- Deep neutral surfaces, crisp borders and subtle elevation.
- One electric accent plus semantic colors for success/warning/error.
- Monospaced or technical typography for expressions and results; highly readable sans-serif for navigation and explanatory copy.
- Fine grid/background details used sparingly.
- Subtle glow and motion only for focus/feedback states.

### Design tokens
Define tokens for:
- Color roles, not raw colors.
- Typography scale and weights.
- Spacing.
- Radius.
- Shadows/elevation.
- Motion durations/easings.
- Focus rings.
- Calculator-specific key sizes and gaps.

### Components
Create a component inventory including:
- Button / IconButton.
- CalculatorKey.
- KeyGroup.
- Display / ExpressionDisplay / ResultDisplay.
- ModeSwitcher.
- FunctionPalette.
- HistoryPanel.
- MemoryBar.
- VariableChip.
- ThemeSwitcher.
- SettingsPanel.
- Toast / ErrorBanner.
- Modal / CommandPalette.
- Landing-page sections.

Every component should support keyboard navigation, visible focus and accessible names.

## 5. Calculator feature roadmap

### Phase 0 — Foundation
- [x] Initialize repository.
- [ ] Create monorepo structure.
- [ ] Define coding standards and branch strategy.
- [ ] Define architecture decision records.
- [ ] Establish CI baseline.

### Phase 1 — MVP calculator
- [ ] Standard operations: +, −, ×, ÷, %, parentheses.
- [ ] Decimal input and backspace/clear.
- [ ] Keyboard support.
- [ ] Expression display + result display.
- [ ] Error states.
- [ ] Calculation history stored locally.
- [ ] Responsive mobile/desktop layout.

### Phase 2 — Scientific calculator
- [ ] sin/cos/tan and inverse functions.
- [ ] Hyperbolic functions.
- [ ] log/ln/exp.
- [ ] Power, root, factorial.
- [ ] Constants π and e.
- [ ] Degree/radian/grad modes.
- [ ] Scientific notation.
- [ ] Combinatorics and permutations.
- [ ] Modulo and integer operations.
- [ ] Complex-number mode (optional advanced milestone).

### Phase 3 — Power-user workspace
- [ ] Variables: `x`, `y`, custom variables.
- [ ] Memory registers.
- [ ] Named constants.
- [ ] Reusable expressions.
- [ ] Calculation history search/filter.
- [ ] Copy/share calculation as text/LaTeX.
- [ ] Command palette.
- [ ] Calculation keyboard shortcuts.
- [ ] Optional graphing module for functions.

### Phase 4 — Web/PWA
- [ ] PWA manifest and service worker.
- [ ] Offline-first calculator behavior.
- [ ] Install prompt.
- [ ] Persistent local preferences.
- [ ] Import/export settings and history.

### Phase 5 — Chrome Extension
- [ ] Manifest V3 extension shell.
- [ ] Popup calculator.
- [ ] Side panel experience.
- [ ] Keyboard shortcut to open calculator.
- [ ] Shared theme/preferences.
- [ ] Context-menu action: calculate selected text (with explicit user action).

### Phase 6 — Optional cloud features
- [ ] Authentication only if cloud sync is needed.
- [ ] Sync preferences/history/workspaces.
- [ ] PostgreSQL persistence.
- [ ] API rate limiting.
- [ ] Privacy controls and data export/deletion.

## 6. Landing page roadmap

Sections:
1. Hero: “A calculator built for people who think in expressions.”
2. Interactive calculator preview.
3. Scientific capabilities.
4. Keyboard-first workflow.
5. Web + Chrome Extension.
6. Themes/design system showcase.
7. Architecture/technology section.
8. Privacy/offline-first positioning.
9. Screenshots or animated product demo.
10. CTA: Try the calculator / Install extension / View GitHub.

SEO basics:
- Strong semantic headings.
- Open Graph/Twitter metadata.
- Product structured metadata where appropriate.
- Fast-loading assets.
- Lighthouse performance/accessibility targets.

## 7. Quality gates

Target before production:
- Unit tests for calculator-core covering edge cases.
- Property-based tests for parser/evaluator invariants where useful.
- Frontend component tests.
- Playwright critical-path E2E tests.
- Accessibility audit (keyboard + screen reader basics).
- Lighthouse performance/accessibility review.
- Dependency and container vulnerability scanning.
- No arbitrary JavaScript evaluation of user expressions.
- Clear precision/rounding rules documented in the product.

## 8. Security and privacy

- Basic calculation must work without an account.
- Do not send expressions to the backend unless the feature explicitly requires it.
- Never execute user input as JavaScript.
- Validate and constrain API payloads.
- Use secure headers and HTTPS in production.
- Keep secrets outside the repository.
- Add dependency/container scanning to CI.
- If analytics are introduced, make them privacy-conscious and opt-in where appropriate.

## 9. API direction

Suggested REST boundaries:
- `GET /api/v1/health` — application health if a public endpoint is needed.
- `GET /api/v1/preferences` — synchronized preferences.
- `PUT /api/v1/preferences` — update preferences.
- `GET /api/v1/workspaces` — saved calculation workspaces.
- `POST /api/v1/workspaces` — create workspace.
- `PUT /api/v1/workspaces/{id}` — update workspace.
- `DELETE /api/v1/workspaces/{id}` — delete workspace.

Do not create an API endpoint for every calculator operation. Keep the deterministic calculation engine local and reusable.

## 10. Docker roadmap

Development Compose profile:
- `web` — frontend dev/prod container depending on profile.
- `api` — Spring Boot service.
- `postgres` — optional persistence profile.
- `nginx` — optional reverse proxy profile.

Production:
- Build immutable images.
- Use non-root containers.
- Health checks.
- Resource limits where supported.
- Separate development and production Compose configurations.

## 11. CI/CD roadmap

GitHub Actions pipeline:
1. Install dependencies.
2. Lint/format checks.
3. Calculator-core unit tests.
4. Frontend tests.
5. Java tests.
6. Integration tests with Testcontainers.
7. Build Web/PWA.
8. Build Chrome Extension ZIP.
9. Build Docker images.
10. Dependency/security scans.
11. Publish artifacts/images.
12. Deploy after protected-branch approval.

## 12. Recommended future differentiators

- Natural-language-to-expression helper, always showing the generated expression before execution.
- Unit conversion mode.
- Equation solver.
- Statistics/probability mode.
- Matrix/vector mode.
- Base conversion (binary/octal/decimal/hex).
- Programmer calculator mode.
- Function graphing.
- LaTeX rendering and export.
- Shareable calculation links.
- Custom keyboard layouts.
- Focus mode for distraction-free calculation.

These should remain modular features; avoid turning the MVP into a giant calculator before the core experience is excellent.

## 13. Architecture recommendations / remarks

1. **Do not put calculation logic in Spring Boot.** The browser and extension should remain useful offline and instantly responsive.
2. **Keep the evaluator as a pure library.** This is the most important reuse boundary between Web and Extension.
3. **Use AST-based evaluation.** Never use `eval()` or equivalent dynamic code execution.
4. **Separate domain state from UI state.** Calculator history/variables are domain concerns; drawers/modals/theme menus are UI concerns.
5. **Design system before visual polish.** Establish tokens and component contracts before creating dozens of screens.
6. **Use progressive complexity.** Standard mode should feel simple; scientific/power-user features should appear progressively.
7. **Prefer local-first.** Cloud sync should be optional, not required for basic use.
8. **Treat precision as a product decision.** Document floating-point behavior and consider arbitrary precision for advanced/exact calculations.
9. **Chrome Extension should be a thin adapter.** Avoid maintaining a separate calculator implementation.
10. **Landing page should reuse the design system.** It should feel like the same product, not a separate marketing website.

## 14. Suggested delivery order

**Milestone A:** repository + monorepo + calculator-core + design tokens + CI.

**Milestone B:** polished standard calculator + keyboard UX + history.

**Milestone C:** scientific functions + modes + variables/memory.

**Milestone D:** PWA + offline behavior + landing page.

**Milestone E:** Chrome Extension popup + side panel + shared preferences.

**Milestone F:** Java API + PostgreSQL + optional cloud synchronization.

**Milestone G:** graphing, unit conversion, equation/statistics/programmer modes.

## 15. Definition of Done

A milestone is complete only when the feature is implemented, tested, accessible, documented, integrated into the design system, covered by CI and usable in Docker. Avoid marking work complete solely because the UI exists.
