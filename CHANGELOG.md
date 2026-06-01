# Changelog

All notable changes to PersonaFolio are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); versions follow [SemVer](https://semver.org/).

## [Unreleased]

## [1.0.0] — 2026-06-01

First public release.

### Added
- Conversational AI portfolio — talk to a D-ID avatar that answers questions and navigates the
  site by voice (scroll to sections, open projects, return home) instead of clicking static pages.
- Manga/anime visual design across the hero, About, Skills, ElevenHacks, Education, and Contact.
- About "hologram" page — floating HUD panels, focus areas synced to the AI agent, track-record card.
- Standalone, deep-linkable pages for each of the eleven ElevenHacks builds, each tagged with its
  build week, weekly tool stack (ElevenLabs + partner), and hackathon awards (🏆 / 🥉).
- Hero background video (served from `/public`).
- Vercel Web Analytics — privacy-friendly pageview tracking across the history-based routing.
- Ambient background audio and click feedback with a mute toggle.
- Custom cursor with a fading code trail.

### Changed
- Unified manga styling — ink-border panels, hard offset shadows, comic-paper texture, and
  sticky-note labels reused via shared mixins across Experience, Skills, ElevenHacks, and Education.
- Reworked the Skills section into curated, tools-only groups laid out in an even grid.

### Fixed
- Voice navigation from a project page back to a home section now lands on the correct section
  instead of the hero (recompute Lenis's scroll limit once the home view re-appears).
- Production build resolves the hero clip by shipping it from `/public` (was a gitignored module import).

[Unreleased]: https://github.com/padmanabhan-r/PersonaFolio/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/padmanabhan-r/PersonaFolio/releases/tag/v1.0.0
