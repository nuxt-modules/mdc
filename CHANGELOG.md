# Changelog


## v0.16.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.15.0...v0.16.0)

### 🩹 Fixes

- **MDC:** Do not generate title/description and toc ([#354](https://github.com/nuxt-modules/mdc/pull/354))
- Upgrade deps and drop ohash ([3d08c74](https://github.com/nuxt-modules/mdc/commit/3d08c74))
- Broken custom highlighter ([d090484](https://github.com/nuxt-modules/mdc/commit/d090484))

### 🏡 Chore

- Drop edge channel in favor of  `pkg-pr-new` releases ([35cc446](https://github.com/nuxt-modules/mdc/commit/35cc446))
- Upgrade deps ([3853b10](https://github.com/nuxt-modules/mdc/commit/3853b10))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.15.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.14.0...v0.15.0)

### 🚀 Enhancements

- Add `cache-key` to MDC component ([#353](https://github.com/nuxt-modules/mdc/pull/353))

### 🩹 Fixes

- **parser:** Provide default `cwd` to prevent exception outside node environment ([738defe](https://github.com/nuxt-modules/mdc/commit/738defe))
- **parse:** Prevent undefined error due to bundler optimization ([30cd412](https://github.com/nuxt-modules/mdc/commit/30cd412))
- **mdc-remark:** Do not remove new lines from paragraphs ([49d0ed4](https://github.com/nuxt-modules/mdc/commit/49d0ed4))

### ❤️ Contributors

- Sébastien Chopin <seb@nuxt.com>
- Farnabaz <farnabaz@gmail.com>

## v0.14.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.13.5...v0.14.0)

### 🩹 Fixes

- **MDCRenderer:** Do not render script tags ([6c6a036](https://github.com/nuxt-modules/mdc/commit/6c6a036))

### 📖 Documentation

- Current links presets ([#345](https://github.com/nuxt-modules/mdc/pull/345))
- Clarifies the need to globally register the custom prose components ([#347](https://github.com/nuxt-modules/mdc/pull/347))

### 🏡 Chore

- Update nuxthub ci ([7fe5fe4](https://github.com/nuxt-modules/mdc/commit/7fe5fe4))
- Update ci ([3ecd111](https://github.com/nuxt-modules/mdc/commit/3ecd111))
- Update deps ([6e45da6](https://github.com/nuxt-modules/mdc/commit/6e45da6))
- Update nuxthub deploy ([f464043](https://github.com/nuxt-modules/mdc/commit/f464043))
- **playground:** Add prose ([5854ee3](https://github.com/nuxt-modules/mdc/commit/5854ee3))
- **playground:** Add prose-invert ([63cc459](https://github.com/nuxt-modules/mdc/commit/63cc459))
- Upgrade shiki v3 ([#349](https://github.com/nuxt-modules/mdc/pull/349))
- Upgrade deps ([9c11dfd](https://github.com/nuxt-modules/mdc/commit/9c11dfd))
- Upgrade deps ([b741441](https://github.com/nuxt-modules/mdc/commit/b741441))
- Revert ohash ([a648cf8](https://github.com/nuxt-modules/mdc/commit/a648cf8))

### 🤖 CI

- Add nuxthub workflow ([6464d9f](https://github.com/nuxt-modules/mdc/commit/6464d9f))
- Add `pkg-pr-new` ([55f8492](https://github.com/nuxt-modules/mdc/commit/55f8492))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Samuel M. Bednarz ([@CarelessCourage](http://github.com/CarelessCourage))
- Guspan Tanadi ([@guspan-tanadi](http://github.com/guspan-tanadi))
- Sébastien Chopin ([@atinux](http://github.com/atinux))

## v0.13.5

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.13.4...v0.13.5)

### 🩹 Fixes

- Support static file paths ([#340](https://github.com/nuxt-modules/mdc/pull/340))

### ❤️ Contributors

- Liran Tal ([@lirantal](http://github.com/lirantal))

## v0.13.4

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.13.3...v0.13.4)

### 🩹 Fixes

- Regression in allowed image links using absolute or relative paths ([#339](https://github.com/nuxt-modules/mdc/pull/339))

### 🤖 CI

- Fix corepack ([cf33c32](https://github.com/nuxt-modules/mdc/commit/cf33c32))
- Fix corepack ([9659658](https://github.com/nuxt-modules/mdc/commit/9659658))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Liran Tal ([@lirantal](http://github.com/lirantal))

## v0.13.3

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.13.2...v0.13.3)

## v0.13.2

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.13.1...v0.13.2)

### 🩹 Fixes

- Transpile yaml package ([#331](https://github.com/nuxt-modules/mdc/pull/331))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.13.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.13.0...v0.13.1)

### 🩹 Fixes

- **stringify:** Convert `mdc-element` back to rehype `element` ([017fff0](https://github.com/nuxt-modules/mdc/commit/017fff0))

### 🏡 Chore

- Upgrade deps ([9040c86](https://github.com/nuxt-modules/mdc/commit/9040c86))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.13.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.12.1...v0.13.0)

### 🩹 Fixes

- **stringify:** Use `*` instead `_` for emphsis syntax ([#325](https://github.com/nuxt-modules/mdc/pull/325))

### 📖 Documentation

- **README:** Links types module ([#324](https://github.com/nuxt-modules/mdc/pull/324))
- Module loads components from `components/mdc` directory ([aac575e](https://github.com/nuxt-modules/mdc/commit/aac575e))

### 🏡 Chore

- Upgrade deps ([317d82e](https://github.com/nuxt-modules/mdc/commit/317d82e))
- Freeze typescript 5.6.2 ([3955c94](https://github.com/nuxt-modules/mdc/commit/3955c94))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Guspan Tanadi ([@guspan-tanadi](http://github.com/guspan-tanadi))

## v0.12.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.12.0...v0.12.1)

### 🏡 Chore

- Upgrade deps ([2f8a1d0](https://github.com/nuxt-modules/mdc/commit/2f8a1d0))

### ✅ Tests

- Fix typecheck ([6b00e5c](https://github.com/nuxt-modules/mdc/commit/6b00e5c))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.12.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.11.1...v0.12.0)

### 🚀 Enhancements

- **parse:** Allow disabling heading extraction ([4420709](https://github.com/nuxt-modules/mdc/commit/4420709))

### 🩹 Fixes

- Text is default language for codeblocks ([#309](https://github.com/nuxt-modules/mdc/pull/309))
- `stringifyMarkdown` auto-import ([#311](https://github.com/nuxt-modules/mdc/pull/311))
- Do not remove text language from codeblocks ([3b6ca5b](https://github.com/nuxt-modules/mdc/commit/3b6ca5b))

### 🏡 Chore

- Upgrade deps ([b608fbd](https://github.com/nuxt-modules/mdc/commit/b608fbd))
- Upgrade deps ([febcb01](https://github.com/nuxt-modules/mdc/commit/febcb01))
- Upgrade deps ([2684dd2](https://github.com/nuxt-modules/mdc/commit/2684dd2))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Sandro Circi ([@sandros94](http://github.com/sandros94))

## v0.11.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.11.0...v0.11.1)

### 🏡 Chore

- Revert ro  `debug@4.3.7` ([d290452](https://github.com/nuxt-modules/mdc/commit/d290452))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.11.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.10.0...v0.11.0)

### 🚀 Enhancements

- **renderer:** Do not try to resolve `<svg>`, `<math>` and their children ([#299](https://github.com/nuxt-modules/mdc/pull/299))
- MDC stringify utility ([#300](https://github.com/nuxt-modules/mdc/pull/300))

### 🩹 Fixes

- Export processors ([a0601df](https://github.com/nuxt-modules/mdc/commit/a0601df))
- **stringify:** Do not remove slots with properties ([c862290](https://github.com/nuxt-modules/mdc/commit/c862290))
- **stringify:** Whitespace between inline components and texts ([e2a7c43](https://github.com/nuxt-modules/mdc/commit/e2a7c43))
- **stringify:** Whitespace between `:br` and texts ([42b9f9b](https://github.com/nuxt-modules/mdc/commit/42b9f9b))

### 🏡 Chore

- Upgrade deps ([f70b54c](https://github.com/nuxt-modules/mdc/commit/f70b54c))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.10.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.9.5...v0.10.0)

### 🚀 Enhancements

- **parser:** New `createProcessor` util ([#289](https://github.com/nuxt-modules/mdc/pull/289))
- **slot:** Detect Vue slots with `mdc-unwrap` prop and treat them as `<MDCSlot>` ([#294](https://github.com/nuxt-modules/mdc/pull/294))

### 🩹 Fixes

- **nodeTextContent:** `.value` has higher priority than `.children` ([08ce958](https://github.com/nuxt-modules/mdc/commit/08ce958))

### 🏡 Chore

- Upgrade deps ([2436c1c](https://github.com/nuxt-modules/mdc/commit/2436c1c))
- Disable docs update ([7ef26ba](https://github.com/nuxt-modules/mdc/commit/7ef26ba))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Sandro Circi ([@sandros94](http://github.com/sandros94))

## v0.9.5

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.9.4...v0.9.5)

### 🏡 Chore

- Upgrade `remark-mdc` ([484a12d](https://github.com/nuxt-modules/mdc/commit/484a12d))
- Upgrade deps ([45fb570](https://github.com/nuxt-modules/mdc/commit/45fb570))
- **playground:** Update syntax for github highlighting ([#290](https://github.com/nuxt-modules/mdc/pull/290))

### ❤️ Contributors

- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))
- Farnabaz <farnabaz@gmail.com>

## v0.9.4

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.9.3...v0.9.4)

### 🩹 Fixes

- **MDCRenderer:** App breaking when component is missing ([8531b09](https://github.com/nuxt-modules/mdc/commit/8531b09))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.9.3

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.9.2...v0.9.3)

### 🚀 Enhancements

- Space separated unwrap tags ([a64f871](https://github.com/nuxt-modules/mdc/commit/a64f871))
- Async nested rendering ([#270](https://github.com/nuxt-modules/mdc/pull/270))
- Support adding documentRoot vfile context to MDC parser ([#275](https://github.com/nuxt-modules/mdc/pull/275))

### 🩹 Fixes

- **module:** Possibility to remove module's default remark/rehype plugins from bundle ([#276](https://github.com/nuxt-modules/mdc/pull/276))
- Keep main plugins inside parser bundle ([11d9d72](https://github.com/nuxt-modules/mdc/commit/11d9d72))
- **MDCRenderer:** Vue3 `v-model` ([ce996d1](https://github.com/nuxt-modules/mdc/commit/ce996d1))

### 🏡 Chore

- Upgrade deps ([706ff04](https://github.com/nuxt-modules/mdc/commit/706ff04))
- Update playground ([befd68b](https://github.com/nuxt-modules/mdc/commit/befd68b))
- Add reproduction in playground ([e1a5eb0](https://github.com/nuxt-modules/mdc/commit/e1a5eb0))
- Push another issue to solve ([a44ace2](https://github.com/nuxt-modules/mdc/commit/a44ace2))
- **playground:** Add back link ([af55c0c](https://github.com/nuxt-modules/mdc/commit/af55c0c))
- **playground:** Update ([4438e05](https://github.com/nuxt-modules/mdc/commit/4438e05))
- Upgrade deps ([714ec57](https://github.com/nuxt-modules/mdc/commit/714ec57))
- Upgrade deps ([c1f928c](https://github.com/nuxt-modules/mdc/commit/c1f928c))
- Upgrade deps ([9481efb](https://github.com/nuxt-modules/mdc/commit/9481efb))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Jess ([@JessicaSachs](http://github.com/JessicaSachs))
- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))
- Sébastien Chopin ([@atinux](http://github.com/atinux))

## v0.9.2

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.9.1...v0.9.2)

### 🩹 Fixes

- **prose-image:** Broken template import ([d3ddc9c](https://github.com/nuxt-modules/mdc/commit/d3ddc9c))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.9.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.9.0...v0.9.1)

### 🚀 Enhancements

- Introduce `highlight.shikiEngine` option ([#256](https://github.com/nuxt-modules/mdc/pull/256))
- **highlight:** Introduce `noApiRoute` option to disable hightlight api ([bceb98a](https://github.com/nuxt-modules/mdc/commit/bceb98a))

### 🩹 Fixes

- **shiki:** Prevent change side effect ([ada4d71](https://github.com/nuxt-modules/mdc/commit/ada4d71))
- **MDCRenderer:** Allow passing component definition to `components` prop ([136f847](https://github.com/nuxt-modules/mdc/commit/136f847))
- Do not load `<NuxtImg>` stub if it is not installed ([#261](https://github.com/nuxt-modules/mdc/pull/261))

### 🏡 Chore

- Allow parser to be execute in node and jiti ([6278d20](https://github.com/nuxt-modules/mdc/commit/6278d20))
- Update prop inline documentation ([#262](https://github.com/nuxt-modules/mdc/pull/262))

### ❤️ Contributors

- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))
- Farnabaz <farnabaz@gmail.com>
- Anthony Fu <anthonyfu117@hotmail.com>

## v0.9.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.8.3...v0.9.0)

### 🩹 Fixes

- Use explicit `props` ([#252](https://github.com/nuxt-modules/mdc/pull/252))
- **shiki:** Dynamic import highlighter packages ([#253](https://github.com/nuxt-modules/mdc/pull/253))

### 🏡 Chore

- Upgrade deps ([e41bafc](https://github.com/nuxt-modules/mdc/commit/e41bafc))
- Update playground ([8a7c5b5](https://github.com/nuxt-modules/mdc/commit/8a7c5b5))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Eugen Istoc <eugenistoc@gmail.com>

## v0.8.3

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.8.2...v0.8.3)

### 🚀 Enhancements

- Upgrade shiki, support custom embedded languages `ts-type` and `vue-html` ([#232](https://github.com/nuxt-modules/mdc/pull/232))

### 🩹 Fixes

- `defineConfig` should be side-effect free ([#235](https://github.com/nuxt-modules/mdc/pull/235))
- **build:** Change default exports to `module.d.ts` ([c8b12d5](https://github.com/nuxt-modules/mdc/commit/c8b12d5))

### 🏡 Chore

- Upgrade deps ([5ef4d87](https://github.com/nuxt-modules/mdc/commit/5ef4d87))
- Update lockfile ([dc4cf01](https://github.com/nuxt-modules/mdc/commit/dc4cf01))

### 🤖 CI

- Update edge job ([b3c0f28](https://github.com/nuxt-modules/mdc/commit/b3c0f28))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Anthony Fu <anthonyfu117@hotmail.com>

## v0.8.2

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.8.1...v0.8.2)

### 🩹 Fixes

- Export module types under pakcage name ([#226](https://github.com/nuxt-modules/mdc/pull/226))

### 📖 Documentation

- Fix invalid `useAsyncData` usage ([3f2fb53](https://github.com/nuxt-modules/mdc/commit/3f2fb53))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>

## v0.8.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.8.0...v0.8.1)

### 🚀 Enhancements

- Export module types ([#223](https://github.com/nuxt-modules/mdc/pull/223))

### 🩹 Fixes

- **build:** Resolve `runtime/**/*.js` files and prose header types ([#220](https://github.com/nuxt-modules/mdc/pull/220))

### 🏡 Chore

- Bump `@nuxt/module-builder` ([#221](https://github.com/nuxt-modules/mdc/pull/221))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))

## v0.8.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.7.1...v0.8.0)

### 🩹 Fixes

- Anchor links types and type-safety ([#217](https://github.com/nuxt-modules/mdc/pull/217))
- **wasm:** Include cloudflare-module preset ([#216](https://github.com/nuxt-modules/mdc/pull/216))
- Types ([fc62d60](https://github.com/nuxt-modules/mdc/commit/fc62d60))

### 🏡 Chore

- Upgrade deps ([38dd182](https://github.com/nuxt-modules/mdc/commit/38dd182))

### ❤️ Contributors

- Farnabaz <farnabaz@gmail.com>
- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))

## v0.7.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.7.0...v0.7.1)

### 🚀 Enhancements

- Allow unwrapping tags in renderer ([#186](https://github.com/nuxt-modules/mdc/pull/186))

### 🩹 Fixes

- Cleanup top level text nodes ([231bac6](https://github.com/nuxt-modules/mdc/commit/231bac6))
- **types:** Add `useNuxtImage` type into runtime config ([#191](https://github.com/nuxt-modules/mdc/pull/191))
- Duplicate element in default highlight languages ([#201](https://github.com/nuxt-modules/mdc/pull/201))
- Add `false` as accepted value for `headings.anchorLinks` option ([#206](https://github.com/nuxt-modules/mdc/pull/206))

### 🏡 Chore

- Update renovate config ([#198](https://github.com/nuxt-modules/mdc/pull/198))
- Remove mdurl types ([399225c](https://github.com/nuxt-modules/mdc/commit/399225c))

### ❤️ Contributors

- Stefano Bartoletti ([@stefanobartoletti](http://github.com/stefanobartoletti))
- Farnabaz <farnabaz@gmail.com>
- Gangan ([@shinGangan](http://github.com/shinGangan))
- William Oldham ([@binaryoverload](http://github.com/binaryoverload))

## v0.7.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.6.1...v0.7.0)

### 🚀 Enhancements

- Use `NuxtImg` component in ProseImg if the `@nuxt/image` module is activated ([#180](https://github.com/nuxt-modules/mdc/pull/180))

### 🩹 Fixes

- Optimise deps with nested config ([#160](https://github.com/nuxt-modules/mdc/pull/160))
- Improve new line text node detection ([#163](https://github.com/nuxt-modules/mdc/pull/163))
- Component exports ([#166](https://github.com/nuxt-modules/mdc/pull/166))
- **shiki:** Enable WASM on CF deployment ([#167](https://github.com/nuxt-modules/mdc/pull/167))
- **ProseA:** Prop types mismatch ([6acc231](https://github.com/nuxt-modules/mdc/commit/6acc231))

### 📖 Documentation

- Add Stackblitz playground ([dfd777c](https://github.com/nuxt-modules/mdc/commit/dfd777c))
- Use default export ([#179](https://github.com/nuxt-modules/mdc/pull/179))
- Use new `nuxi module add` command in installation ([#176](https://github.com/nuxt-modules/mdc/pull/176))

### 🏡 Chore

- Update dev script ([83b8ca5](https://github.com/nuxt-modules/mdc/commit/83b8ca5))
- Upgrade remark-mdc ([42613d5](https://github.com/nuxt-modules/mdc/commit/42613d5))

### ❤️ Contributors

- Daniel Roe ([@danielroe](http://github.com/danielroe))
- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))
- Maxime Pauvert ([@maximepvrt](http://github.com/maximepvrt))
- Farnabaz ([@farnabaz](http://github.com/farnabaz))

## v0.6.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.6.0...v0.6.1)

### 🩹 Fixes

- Ssr route detection ([69a4e3d](https://github.com/nuxt-modules/mdc/commit/69a4e3d))
- Typo in dev detection ([b43e3b2](https://github.com/nuxt-modules/mdc/commit/b43e3b2))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))

## v0.6.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.5.0...v0.6.0)

### 🚀 Enhancements

- **comments:** Possibility to keep comments in MDC tree with `keepComments` option ([#152](https://github.com/nuxt-modules/mdc/pull/152))
- Remove '#imports` from MDC Renderer ([#153](https://github.com/nuxt-modules/mdc/pull/153))
- Use mdcrenderer component and parsemarkdown util outside nuxt ([#154](https://github.com/nuxt-modules/mdc/pull/154))

### 🩹 Fixes

- Strip non-word-chars from library import name ([#142](https://github.com/nuxt-modules/mdc/pull/142))
- Prepend import names with underscore ([#144](https://github.com/nuxt-modules/mdc/pull/144))
- **build:** Do not export component in runtime index ([9dc5cc3](https://github.com/nuxt-modules/mdc/commit/9dc5cc3))

### 📦 Build

- Exports types ([#145](https://github.com/nuxt-modules/mdc/pull/145))

### 🏡 Chore

- Upgrade remark-mdc ([3a0c5b0](https://github.com/nuxt-modules/mdc/commit/3a0c5b0))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Adam DeHaven ([@adamdehaven](http://github.com/adamdehaven))
- Nobkd ([@nobkd](http://github.com/nobkd))
- Estéban <e.soubiran25@gmail.com>

## v0.5.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.4.0...v0.5.0)

### 🚀 Enhancements

- Better wasm support for CF ([#137](https://github.com/nuxt-modules/mdc/pull/137))
- Add more default highlight langs ([#138](https://github.com/nuxt-modules/mdc/pull/138))

### 🩹 Fixes

- Check highlight for `undefined` value ([ea30fc7](https://github.com/nuxt-modules/mdc/commit/ea30fc7))

### 📖 Documentation

- Improve jsdoc ([516eb7e](https://github.com/nuxt-modules/mdc/commit/516eb7e))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Anthony Fu <anthonyfu117@hotmail.com>

## v0.4.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.3.2...v0.4.0)

### 🚀 Enhancements

- ⚠️  `mdc.config.js` support, improve shiki bundle ([#129](https://github.com/nuxt-modules/mdc/pull/129))

### 🩹 Fixes

- Improve optimizeDeps handling ([#131](https://github.com/nuxt-modules/mdc/pull/131))
- **code-block:** Convert string to `number[]` before rehypeShiki ([#133](https://github.com/nuxt-modules/mdc/pull/133))

### 🏡 Chore

- Remove comment ([9d75268](https://github.com/nuxt-modules/mdc/commit/9d75268))

#### ⚠️ Breaking Changes

- ⚠️  `mdc.config.js` support, improve shiki bundle ([#129](https://github.com/nuxt-modules/mdc/pull/129))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Charlie0228 <charlie800228@gmail.com>
- Anthony Fu <anthonyfu117@hotmail.com>

## v0.3.2

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.3.1...v0.3.2)

### 🩹 Fixes

- Add unwasm support to nitro prerenderer ([#126](https://github.com/nuxt-modules/mdc/pull/126))
- **shikiji:** Node children shound be an array ([b3b34f5](https://github.com/nuxt-modules/mdc/commit/b3b34f5))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.1

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.3.0...v0.3.1)

### 🚀 Enhancements

- Enable wasm with unwasm for highlighter ([#122](https://github.com/nuxt-modules/mdc/pull/122))

### 🩹 Fixes

- Remove `is-buffer` from optimize deps ([#123](https://github.com/nuxt-modules/mdc/pull/123))

### ❤️ Contributors

- Pooya Parsa ([@pi0](http://github.com/pi0))

## v0.3.0

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.9...v0.3.0)

### 🚀 Enhancements

- Syntax highlighter support notations ([#117](https://github.com/nuxt-modules/mdc/pull/117))

### 🩹 Fixes

- **shiki:** Remove deprecated transforms ([63076df](https://github.com/nuxt-modules/mdc/commit/63076df))

### ❤️ Contributors

- Anthony Fu <anthonyfu117@hotmail.com>
- Farnabaz ([@farnabaz](http://github.com/farnabaz))

## v0.2.9

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.8...v0.2.9)

### 🚀 Enhancements

- **highlighter:** Support text/unknown/no language line highlights ([#100](https://github.com/nuxt-modules/mdc/pull/100))
- Auto import `parseMarkdown` ([5182df2](https://github.com/nuxt-modules/mdc/commit/5182df2))

### 🩹 Fixes

- Only append new entry to `optimizeDeps` on `vite:extendConfig` ([#111](https://github.com/nuxt-modules/mdc/pull/111))

### 📖 Documentation

- Update README.md ([f74d225](https://github.com/nuxt-modules/mdc/commit/f74d225))
- Improve readme ([d5010b5](https://github.com/nuxt-modules/mdc/commit/d5010b5))
- Update ([ba4ea56](https://github.com/nuxt-modules/mdc/commit/ba4ea56))

### 🏡 Chore

- Use module-builder stub mode for more accurate types ([#107](https://github.com/nuxt-modules/mdc/pull/107))
- Update prepack script ([de0b2bf](https://github.com/nuxt-modules/mdc/commit/de0b2bf))

### 🤖 CI

- Fix release job conditional ([#103](https://github.com/nuxt-modules/mdc/pull/103))

### ❤️ Contributors

- Anthony Fu <anthonyfu117@hotmail.com>
- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Nobkd 
- Bobbie Goede <bobbiegoede@gmail.com>
- Daniel Roe <daniel@roe.dev>
- Sébastien Chopin ([@Atinux](http://github.com/Atinux))

## v0.2.8

[compare changes](https://github.com/nuxt-modules/mdc/compare/v0.2.7...v0.2.8)

### 🩹 Fixes

- **shiki:** Resolve rehype plugin with extension ([5d0f634](https://github.com/nuxt-modules/mdc/commit/5d0f634))

### 🏡 Chore

- Update deps and playground ([8976c1d](https://github.com/nuxt-modules/mdc/commit/8976c1d))

### ❤️ Contributors

- Farnabaz ([@farnabaz](http://github.com/farnabaz))
- Sébastien Chopin ([@Atinux](http://github.com/Atinux))

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