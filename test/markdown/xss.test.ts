import { expect, it } from 'vitest'
import { parseMarkdown } from '../utils/parser'
import type { MDCElement } from '../../src/types'
import { validateProp } from '../../src/runtime/parser/utils/props'

const md = `\
<!-- anchol link -->
[a](javascript://www.google.com%0Aprompt(1))
[a](JaVaScRiPt:alert(1))
[XSS](vbscript:alert(document.domain))
<javascript:prompt(document.cookie)>
[x](y '<style>')

<!-- image -->

![](x){onerror=alert(1) onload="alert('XSS')" }
![a]("onerror="alert(1))
![](contenteditable/autofocus/onfocus=confirm('qwq')//)">
![XSS](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)
<img src=x onerror=alert(1) onload="alert('XSS')" />
<img src=x onerror=alert(1)>">yep</a>
![XSS]("onerror="alert('XSS'))
![XSS](https://www.example.com/image.png"onload="alert('XSS'))
![onload](https://www.example.com/image.png"onload="alert('ImageOnLoad'))
![onerror]("onerror="alert('ImageOnError'))

<!-- iframe -->

:iframe{src=x onerror=alert(1) onload="alert('XSS')" }
<iframe src=x onerror=alert(1) onload="alert('XSS')" />

`.trim()

it('XSS', async () => {
  const { data, body } = await parseMarkdown(md)

  expect(Object.keys(data)).toHaveLength(2)

  for (const node of (body.children[0] as MDCElement).children) {
    const props = (node as MDCElement).props || {}
    expect(Object.entries(props as Record<string, any>).every(([k, v]) => validateProp(k, v))).toBeTruthy()
  }
})
