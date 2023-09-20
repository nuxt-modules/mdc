# Changelog


## v0.2.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.1.6...v0.2.0)

### 🚀 Enhancements

- **MDC:** Pass excerpt and toc to slot ([#23](https://github.com/nuxt-modules/mdc/pull/23))
- Migrate to `shikiji` ([#27](https://github.com/nuxt-modules/mdc/pull/27))
- **MDC:** Accept parser options in `<MDC>` ([#36](https://github.com/nuxt-modules/mdc/pull/36))

### 🩹 Fixes

- **node-utils:** Do not import utils from Vue package ([e7387d8](https://github.com/nuxt-modules/mdc/commit/e7387d8))
- **node-env:** Dynamic import module options ([cc6045a](https://github.com/nuxt-modules/mdc/commit/cc6045a))
- **unist-compiler:** Heading tag detection ([9c357bf](https://github.com/nuxt-modules/mdc/commit/9c357bf))
- **slot:** Remove default unwrap tag for backward compatibility ([39d3bc9](https://github.com/nuxt-modules/mdc/commit/39d3bc9))
- Pass missing highlight class ([#21](https://github.com/nuxt-modules/mdc/pull/21))
- TrimEnd to code in highlighter, close #29 ([#32](https://github.com/nuxt-modules/mdc/pull/32), [#29](https://github.com/nuxt-modules/mdc/issues/29))
- **unwrapSlot:** Handle string tags ([#30](https://github.com/nuxt-modules/mdc/pull/30))
- **highlighter:** Missing highlights ([c5633c3](https://github.com/nuxt-modules/mdc/commit/c5633c3))
- Inline code highlighting ([#39](https://github.com/nuxt-modules/mdc/pull/39))
- **MDCRenderer:** Missing body ([ee5afad](https://github.com/nuxt-modules/mdc/commit/ee5afad))
- **module:** Use url in module alias ([#45](https://github.com/nuxt-modules/mdc/pull/45))
- **module:** Don't change alias path in non-development mode ([ea3e7d2](https://github.com/nuxt-modules/mdc/commit/ea3e7d2))

### 📖 Documentation

- Add links ([efe9236](https://github.com/nuxt-modules/mdc/commit/efe9236))

### 🏡 Chore

- Enable wasm for shikiji support in CF ([d9a1874](https://github.com/nuxt-modules/mdc/commit/d9a1874))

### ✅ Tests

- Test highlighted lines in code blocks ([7cbe123](https://github.com/nuxt-modules/mdc/commit/7cbe123))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Nobkd 
- Anthony Fu <anthonyfu117@hotmail.com>
- Sébastien Chopin ([@Atinux](http://github.com/Atinux))

## v0.1.6

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.1.5...v0.1.6)

### 🩹 Fixes

- Remark/rehype plugin options ([911eea3](https://github.com/nuxt-modules/mdc/commit/911eea3))
- **slot-transformer:** Prevent context conflict ([61291ff](https://github.com/nuxt-modules/mdc/commit/61291ff))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.1.5

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.1.4...v0.1.5)

### 🩹 Fixes

- **MDC:** Reduce key size ([3c324d0](https://github.com/nuxt-modules/mdc/commit/3c324d0))
- **slot-transformer:** Prevent duplicate import renderer ([654be0f](https://github.com/nuxt-modules/mdc/commit/654be0f))

### 🏡 Chore

- Upgrade deps ([c5978a1](https://github.com/nuxt-modules/mdc/commit/c5978a1))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.1.4

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.1.3...v0.1.4)

### 🩹 Fixes

- **MDCSlot:** Do not unwrap Comment nodes ([fa45aa8](https://github.com/nuxt-modules/mdc/commit/fa45aa8))
- **slot-transformer:** Drop plugin in favor of context imports ([f941516](https://github.com/nuxt-modules/mdc/commit/f941516))
- **MDC:** Use raw content as `useAsyncData` key in `<MDC>` ([400e0de](https://github.com/nuxt-modules/mdc/commit/400e0de))
- **MDCSlot:** Do not merge non-text vnodes ([82a5ff1](https://github.com/nuxt-modules/mdc/commit/82a5ff1))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.1.3

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.1.2...v0.1.3)

### 🩹 Fixes

- Exclude `@nuxtjs/mdc` from vite optimization ([ac3cd57](https://github.com/nuxt-modules/mdc/commit/ac3cd57))
- Typecheck ([f65b3e9](https://github.com/nuxt-modules/mdc/commit/f65b3e9))
- **types:** Undefined check ([edbc6b0](https://github.com/nuxt-modules/mdc/commit/edbc6b0))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.1.2

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.1.1...v0.1.2)

### 🚀 Enhancements

- Expose `unwrapSlot` ([#7](https://github.com/nuxt-modules/mdc/pull/7))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.1.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/0.1.0...v0.1.1)

### 📖 Documentation

- Add prose components source links ([0dcc76c](https://github.com/nuxt-modules/mdc/commit/0dcc76c))
- Improve readme ([f0329bd](https://github.com/nuxt-modules/mdc/commit/f0329bd))
- Remove extra space ([15eaaab](https://github.com/nuxt-modules/mdc/commit/15eaaab))
- Update readme ([135eb33](https://github.com/nuxt-modules/mdc/commit/135eb33))

### 🏡 Chore

- Add changelog ([7f4160b](https://github.com/nuxt-modules/mdc/commit/7f4160b))
- Remove studio.yml ([58037ba](https://github.com/nuxt-modules/mdc/commit/58037ba))

### ❤️ Contributors

- Sébastien Chopin ([@Atinux](http://github.com/Atinux))
- Farnabaz <farnabaz@gmail.com>

## v0.1.0

Initial Release.