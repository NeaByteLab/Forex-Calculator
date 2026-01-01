import { defineBuildConfig } from 'unbuild'
import { resolve } from 'node:path'

export default defineBuildConfig({
  entries: ['src/index'],
  declaration: true,
  clean: true,
  alias: {
    '@app': resolve(__dirname, 'src'),
    '@helpers': resolve(__dirname, 'src/helpers')
  },
  rollup: {
    emitCJS: true,
    inlineDependencies: true
  },
  sourcemap: false,
  failOnWarn: false
})
