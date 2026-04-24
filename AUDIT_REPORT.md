# Curb Ball Launch Readiness Audit (April 24, 2026)

## Scope completed in this pass

- Deployment configuration audit for Vercel + Facebook Instant Games hosting constraints.
- Static gameplay/playability audit from source code review.
- UI/UX flow audit for game start, loop, monetization, and retention hooks.
- Ads readiness audit for rewarded + interstitial placement configuration.

## Blocking issues found and fixed

1. **TypeScript compile blocker in `GameCanvas`**
   - Duplicate ref declarations (`isChargingRef`, `gameAreaRef`) caused a hard build break.
   - Fixed by removing duplicate declarations.

2. **Facebook embedding blocked by security headers in `vercel.json`**
   - `X-Frame-Options: DENY` prevents Facebook iframe embedding.
   - Replaced with CSP `frame-ancestors` policy allowing Facebook domains.

3. **Ad placement IDs hardcoded placeholders**
   - Rewarded and interstitial ad IDs used placeholder strings.
   - Replaced with env-based IDs:
     - `VITE_FB_REWARDED_PLACEMENT_ID`
     - `VITE_FB_INTERSTITIAL_PLACEMENT_ID`
   - Added explicit warnings and safe early returns when unset.

## Playability and UX review

### Core loop status

- Difficulty selection and timed run loop are implemented.
- Scoring, progression, achievements, and daily challenges are present.
- Local persistence exists for coins, owned items, challenges, and scores.

### UX strengths

- Strong feedback systems (toasts, confetti, floating coin feedback).
- Shop and unlock loops are integrated with progression.
- Responsive-focused gameplay (touch + wake lock + pause handling).

### UX risks before paid traffic

- No explicit first-time tutorial funnel; new users may drop before understanding throw timing.
- Rewarded ad value is static and not dynamically balanced by difficulty/session length.
- No explicit ad frequency cap policy documented for interstitial cadence.

## Recommendation checklist before scaling ads

- [ ] Add first-session onboarding tooltips (aim, charge, release, scoring zones).
- [ ] Define interstitial cadence (e.g., every 2 games max, never on first session).
- [ ] Add ad cooldown timers and ad-failure fallback rewards.
- [ ] Instrument funnel analytics: start rate, finish rate, retry rate, ad opt-in rate, D1 retention.
- [ ] Add consent/privacy flow depending on region/ad network requirements.
- [ ] Add pre-release smoke checklist in CI: `typecheck`, `lint`, `build`.

## Platform readiness notes

- **Facebook Instant Games**: Security header and placement ID fixes now support expected integration path.
- **Vercel**: SPA routing and output directory are configured correctly.
- **Other platforms**: Build output is static and portable to Netlify/GitHub Pages/CDN hosting.

## Manual playthrough note

A full browser playthrough could not be executed in this environment due package registry restrictions preventing a complete toolchain install for runtime (`vite` binary unavailable). Static audit and compile checks were completed instead.
