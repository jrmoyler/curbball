# Curb Ball Launch Readiness Audit (April 24, 2026)

## What I validated in this pass

- Reviewed the full gameplay flow in code from start -> timed run -> end-of-game state transitions.
- Reviewed monetization hooks for rewarded and interstitial ad entry points.
- Reviewed Vercel deployment configuration for deterministic installs and SPA routing.

## Issues found and fixed

1. **Gameplay interval cleanup bug**
   - `chargeIntervalRef` is created by `setInterval` but was being cleaned up with `cancelAnimationFrame`.
   - Fixed to use `clearInterval`, preventing orphaned timers and inconsistent input behavior after unmount.

2. **Vercel install reliability**
   - Updated Vercel install command to `npm ci --no-audit --no-fund` to reduce failures from advisory endpoint/network policy differences.

3. **Build/runtime consistency on Vercel**
   - Pinned Node runtime to `20.x` in `package.json` to avoid Node-version drift issues in build tooling.

4. **Header policy simplification for deploy stability**
   - Removed custom global security-header overrides from `vercel.json` to avoid accidental CSP/X-Frame embedding conflicts while stabilizing deployment.

## Gameplay/UI/UX audit findings

### Strengths
- Core loop has clear progression: difficulty select, timed round, score tracking, persistence, and post-game summary.
- Good feedback loops (coins, confetti, challenge progression, toasts).
- Mobile-focused safeguards exist (wake lock hooks, pause handling, touch inputs).

### Remaining improvements before aggressive ad spend
- Add a first-session tutorial overlay for aiming/power timing.
- Add explicit ad cadence caps (e.g., interstitial every N rounds) and cooldown state.
- Add telemetry events for funnel monitoring (session start, round complete, ad-show, ad-reward, churn points).

## Playthrough note

A literal manual browser playthrough could not be executed in this environment because browser automation tooling is not available in this run context. The audit above is based on code-level state-flow analysis plus TypeScript validation.
