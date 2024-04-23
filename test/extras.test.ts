import { expect, it } from 'vitest'
import { Text } from 'vue'

it('Vue.Text === Symbol.for(\'v-txt\')', async () => {
  expect(Text === Symbol.for('v-txt')).toBe(true)
})
