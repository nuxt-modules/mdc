import { defineBuildConfig } from 'unbuild'
import fs from 'fs'

export default defineBuildConfig({
  entries: [
    'src/config.ts',
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
