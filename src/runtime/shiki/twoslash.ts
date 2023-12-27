import { createTransformerFactory, rendererRich } from 'shikiji-twoslash/core'
import { createTwoSlashFromCDN } from 'twoslash-cdn'

async function _start() {
  const twoslash = createTwoSlashFromCDN({
    // storage: useStorage(), // TODO: figure out how to pass the storage instance properly
    compilerOptions: {
      lib: ['esnext', 'dom'],
    },
    twoSlashOptionsOverrides: {
      defaultOptions: {
        noErrorValidation: true,
      },
    },
  })

  return {
    twoslash,
    transformer: createTransformerFactory(twoslash.runSync)({
      renderer: rendererRich(),
      explicitTrigger: false,
    }),
  }
}

let promise: ReturnType<typeof _start> | undefined

export async function prepare(code: string) {
  if (!promise)
    promise = _start()
  const { twoslash, transformer } = await promise
  await twoslash.prepareTypes(code)

  return {
    twoslash,
    transformer,
  }
}
