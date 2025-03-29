import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'

const md = `
\`\`\`ts {1-3} [server/api/products/[id].ts] meta=meta-value
class C {
  private name: string = "foo"
}

const c = new C()
\`\`\`
`.trim()

it('Code block with server API route filename with single brackets', async () => {
  const { body } = await parseMarkdown(md, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [
              {
                "type": "text",
                "value": "class C {
      private name: string = "foo"
    }

    const c = new C()
    ",
              },
            ],
            "props": {
              "__ignoreMap": "",
            },
            "tag": "code",
            "type": "element",
          },
        ],
        "props": {
          "className": [
            "language-ts",
          ],
          "code": "class C {
      private name: string = "foo"
    }

    const c = new C()
    ",
          "filename": "server/api/products/[id].ts",
          "highlights": [
            1,
            2,
            3,
          ],
          "language": "ts",
          "meta": "meta=meta-value",
        },
        "tag": "pre",
        "type": "element",
      },
    ]
  `)
})

const md2 = `
\`\`\`ts {1-3} [server/api/products/[[id]].ts] meta=meta-value
class C {
  private name: string = "foo"
}

const c = new C()
\`\`\`
`.trim()

it('Code block with server API route filename with double brackets', async () => {
  const { body } = await parseMarkdown(md2, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children).toMatchInlineSnapshot(`
    [
      {
        "children": [
          {
            "children": [
              {
                "type": "text",
                "value": "class C {
      private name: string = "foo"
    }

    const c = new C()
    ",
              },
            ],
            "props": {
              "__ignoreMap": "",
            },
            "tag": "code",
            "type": "element",
          },
        ],
        "props": {
          "className": [
            "language-ts",
          ],
          "code": "class C {
      private name: string = "foo"
    }

    const c = new C()
    ",
          "filename": "server/api/products/[[id]].ts",
          "highlights": [
            1,
            2,
            3,
          ],
          "language": "ts",
          "meta": "meta=meta-value",
        },
        "tag": "pre",
        "type": "element",
      },
    ]
  `)
})

const mdQueryParams = `
\`\`\`js [api/search?query=test&page=1] showLineNumbers
function search(params) {
  return fetch(\`/api/search?q=\${params.query}&page=\${params.page}\`)
}
\`\`\`
`.trim()

it('Code block with filename containing query parameters', async () => {
  const { body } = await parseMarkdown(mdQueryParams, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children[0].props.filename).toBe('api/search?query=test&page=1')
  expect(body.children[0].props.language).toBe('js')
})

const mdNestedPath = `
\`\`\`ts [services/auth/strategies/oauth2/github.ts]
export default defineAuthStrategy({
  name: 'github',
  handler: (req, res) => {
    // OAuth implementation
  }
})
\`\`\`
`.trim()

it('Code block with deeply nested filepath', async () => {
  const { body } = await parseMarkdown(mdNestedPath, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children[0].props.filename).toBe('services/auth/strategies/oauth2/github.ts')
})

const mdSpecialChars = `
\`\`\`json [utils/i18n/translations-[locale].json] 
{
  "welcome": "Welcome to our site",
  "login": "Log in",
  "signup": "Sign up"
}
\`\`\`
`.trim()

it('Code block with filename containing square brackets as part of the filename', async () => {
  const { body } = await parseMarkdown(mdSpecialChars, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children[0].props.filename).toBe('utils/i18n/translations-[locale].json')
})

const mdMultipleParams = `
\`\`\`js {2-5} [api/users/[userId]/posts/[postId].js]
export default defineEventHandler(async (event) => {
  const { userId, postId } = event.context.params
  const post = await prisma.post.findUnique({
    where: { id: postId, authorId: userId }
  })
  return post
})
\`\`\`
`.trim()

it('Code block with path containing multiple parameters', async () => {
  const { body } = await parseMarkdown(mdMultipleParams, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children[0].props.filename).toBe('api/users/[userId]/posts/[postId].js')
  expect(body.children[0].props.highlights).toEqual([2, 3, 4, 5])
})

const mdDashesAndUnderscores = `
\`\`\`vue [components/user-settings/profile_image.vue]
<template>
  <div class="profile-image">
    <img :src="profileImageUrl" alt="User profile" />
  </div>
</template>
\`\`\`
`.trim()

it('Code block with dashes and underscores in filename', async () => {
  const { body } = await parseMarkdown(mdDashesAndUnderscores, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children[0].props.filename).toBe('components/user-settings/profile_image.vue')
  expect(body.children[0].props.language).toBe('vue')
})

const mdWindowsPath = `
\`\`\`tsx [components\\Header\\Navigation.tsx]
export function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </nav>
  )
}
\`\`\`
`.trim()

it('Code block with Windows-style backslash path separators', async () => {
  const { body } = await parseMarkdown(mdWindowsPath, {
    highlight: false
  })
  expect(body).toHaveProperty('type', 'root')
  expect(body.children).toHaveLength(1)
  expect(body.children[0].props.filename).toBe('components\\Header\\Navigation.tsx')
  expect(body.children[0].props.language).toBe('tsx')
})
