# Changelog


## v0.2.7

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.6...v0.2.7)

### 🩹 Fixes

- **shiki:** Do not add new line to single line codes ([a09c9dc](https://github.com/nuxt-modules/mdc/commit/a09c9dc))
- **highlight:** Do not include shiki in bundle when highlight is disabled ([7cb2b9d](https://github.com/nuxt-modules/mdc/commit/7cb2b9d))
- Import nuxt composables from #imports ([#90](https://github.com/nuxt-modules/mdc/pull/90))
- Update scule to match latest one as nuxt ([47a3659](https://github.com/nuxt-modules/mdc/commit/47a3659))

### ✅ Tests

- Update inline highlighting ([2e7dcdb](https://github.com/nuxt-modules/mdc/commit/2e7dcdb))

### ❤️ Contributors

- Sébastien Chopin ([@Atinux](http://github.com/Atinux))
- Daniel Roe <daniel@roe.dev>
- Farnabaz ([@farnabaz](http://github.com/farnabaz))

## v0.2.6

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.5...v0.2.6)

### 🩹 Fixes

- Do not render script warning in production ([ffbd13a](https://github.com/nuxt-modules/mdc/commit/ffbd13a))
- Typecheck ([fffbce6](https://github.com/nuxt-modules/mdc/commit/fffbce6))
- **MDC:** Props mistmatch ([0bfafcd](https://github.com/nuxt-modules/mdc/commit/0bfafcd))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))

## v0.2.5

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.4...v0.2.5)

### 🩹 Fixes

- **MDC:** `tag` prop type ([b6e6ba2](https://github.com/nuxt-modules/mdc/commit/b6e6ba2))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))

## v0.2.4

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.3...v0.2.4)

### 🚀 Enhancements

- Add title and description on markdown returned type ([#80](https://github.com/nuxt-modules/mdc/pull/80))
- Add script render in mdc ([#74](https://github.com/nuxt-modules/mdc/pull/74))

### 🩹 Fixes

- Import types with `type` keyword ([#78](https://github.com/nuxt-modules/mdc/pull/78))
- Respect plugins options type ([e744cd3](https://github.com/nuxt-modules/mdc/commit/e744cd3))
- **shiki:** Fallback inline highlighter on static runtime ([64bda39](https://github.com/nuxt-modules/mdc/commit/64bda39))

### 🏡 Chore

- **code block:** Drop empty line styles ([#71](https://github.com/nuxt-modules/mdc/pull/71))
- Upgrade remark-mdc ([b4d0c2e](https://github.com/nuxt-modules/mdc/commit/b4d0c2e))

### ❤️ Contributors

- Natanael Dos Santos Feitosa 
- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Nobkd 
- Andrei Hudalla 
- Estéban ([@Barbapapazes](http://github.com/Barbapapazes))

## v0.2.3

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.2...v0.2.3)

### 🚀 Enhancements

- **shiki:** Remove `html` from `.shiki` css selector ([#67](https://github.com/nuxt-modules/mdc/pull/67))

### 🩹 Fixes

- **MDCRenderer:** Check for `__ssrInlineRender` to detect component ([d8a1b9c](https://github.com/nuxt-modules/mdc/commit/d8a1b9c))
- **MDCRenderer:** Rerender components when new components adds to content ([9599aef](https://github.com/nuxt-modules/mdc/commit/9599aef))
- **highlighter:** Allow multiple themes inside a page ([6a44c2d](https://github.com/nuxt-modules/mdc/commit/6a44c2d))
- Improve highlighter styles ([3901502](https://github.com/nuxt-modules/mdc/commit/3901502))
- Add line break to end of each code block line ([#62](https://github.com/nuxt-modules/mdc/pull/62))

### ❤️ Contributors

- Nobkd 
- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Benjamin Canac ([@benjamincanac](http://github.com/benjamincanac))

## v0.2.2

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.1...v0.2.2)

### 🚀 Enhancements

- Add default value to variable binding ([#59](https://github.com/nuxt-modules/mdc/pull/59))
- **MDCRenderer:** Controll wrapper node rendering ([#65](https://github.com/nuxt-modules/mdc/pull/65))

### 🩹 Fixes

- **highlighter:** Fallback to raw code in case of exception ([426c4b9](https://github.com/nuxt-modules/mdc/commit/426c4b9))
- **MDCRenderer:** Check for both kebabCase and pascalCase in tags map ([4bbc240](https://github.com/nuxt-modules/mdc/commit/4bbc240))
- Drop !important css rules from code highlighting ([#61](https://github.com/nuxt-modules/mdc/pull/61))

### 🏡 Chore

- Update package json ([4754726](https://github.com/nuxt-modules/mdc/commit/4754726))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Maxime Pauvert ([@maximepvrt](http://github.com/maximepvrt))
- Nobkd

## v0.2.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.0...v0.2.1)

### 🚀 Enhancements

- **shiki:** Control wrapper styles & preload languages ([#56](https://github.com/nuxt-modules/mdc/pull/56))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

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