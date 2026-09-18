# FoodStack Sales Page — Design Specification

## Status

Approved direction from the prior design discussion, materialized into this SDD on 2026-09-18.

## Product intent

Build a premium commercial showcase for 07Dev/FoodStack that sells custom digital-menu and ordering projects through real product evidence rather than generic agency claims.

## Architecture

Next.js App Router with Server Components by default. Typed editorial data lives outside UI components. GSAP and Three.js are isolated browser runtimes with graceful fallbacks. WhatsApp is the only required conversion integration for v1.

## Visual narrative

Dark artisanal FoodStack identity → customer journey → real systems → semi-technical engineering proof → project conversation.

## Real project evidence

Use the supplied Take/João and Chalezinho do Capivara captures as case-study media. Do not imply every capability is automatically included in every contract.

## Legal and privacy

Mirror the structural rigor of 07Dev policies, but publish only confirmed identity/process data. No analytics or first-party lead capture is required in v1.

## Success criteria

- understandable proposition above the fold;
- clear path to WhatsApp;
- high visual fidelity desktop/mobile;
- progressive motion that degrades safely;
- no sensitive system detail exposed;
- go-live blocked on unresolved legal identity fields.
