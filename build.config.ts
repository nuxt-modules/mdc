import fs from 'node:fs'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/config.ts'
  ],
  hooks: {
    'rollup:done': () => {
      fs.writeFileSync('dist/config.cjs', 'module.exports = {}; module.exports.defineConfig = configs => configs', 'utf-8')
    }
  },
  externals: [
    'hast'
  ]
})
