<script lang="ts">
import { h, resolveComponent, Text, defineComponent, toRaw, computed } from 'vue'
import destr from 'destr'
import { kebabCase, pascalCase } from 'scule'
import { find, html } from 'property-information'
import type { VNode, ConcreteComponent, PropType, DefineComponent } from 'vue'
import { useRoute, useRuntimeConfig } from '#imports'
import htmlTags from '../parser/utils/html-tags-list'
import type { MDCElement, MDCNode, MDCRoot, MDCData } from '../types'

type CreateElement = typeof h

/**
 *  Default slot name
 */
const DEFAULT_SLOT = 'default'

const rxOn = /^@|^v-on:/
const rxBind = /^:|^v-bind:/
const rxModel = /^v-model/
const nativeInputs = ['select', 'textarea', 'input']

const proseComponentMap = Object.fromEntries(['p', 'a', 'blockquote', 'code', 'pre', 'code', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'img', 'ul', 'ol', 'li', 'strong', 'table', 'thead', 'tbody', 'td', 'th', 'tr', 'script'].map(t => [t, `prose-${t}`]))

export default defineComponent({
  name: 'MDCRenderer',
  props: {
    /**
     * Content to render
     */
    body: {
      type: Object as PropType<MDCRoot>,
      required: true
    },
    /**
     * Document meta data
     */
    data: {
      type: Object,
      default: () => ({})
    },
    /**
     * Root tag to use for rendering
     */
    tag: {
      type: [String, Boolean],
      default: undefined
    },
    /**
     * Whether or not to render Prose components instead of HTML tags
     */
    prose: {
      type: Boolean,
      default: undefined
    },
    /**
     * The map of custom components to use for rendering.
     */
    components: {
      type: Object as PropType<Record<string, string | DefineComponent<any, any, any>>>,
      default: () => ({})
    }
  },
  async setup (props) {
    const { mdc } = useRuntimeConfig().public

    const tags = {
      ...(mdc.components.prose && props.prose !== false ? proseComponentMap : {}),
      ...mdc.components.map,
      ...toRaw(props.data?.mdc?.components || {}),
      ...props.components
    }

    const contentKey = computed(() => {
      const components = (props.body?.children || [])
      .map(n => (n as any).tag || n.type)
      .filter(t => !htmlTags.includes(t))

      return Array.from(new Set(components)).sort().join('.')
    })

    await resolveContentComponents(props.body, { tags })

    return { tags, contentKey }
  },
  render (ctx: any) {
    const { tags, tag, body, data, contentKey } = ctx

    if (!body) {
      return null
    }

    const meta = { ...data, tags }

    // Resolve root component
    const component: string | ConcreteComponent = tag !== false ? resolveVueComponent((tag || meta.component?.name || meta.component || 'div') as string) : undefined

    const childrenRenderer = renderSlots(body, h, meta, meta)

    // Return Vue component
    return component
      ? h(component as any, { ...meta.component?.props, ...this.$attrs, key: contentKey }, childrenRenderer)
      : childrenRenderer.default?.()
  }
})

/**
 * Render a markdown node
 */
function renderNode (node: MDCNode, h: CreateElement, documentMeta: MDCData, parentScope: any = {}): VNode {
  /**
   * Render Text node
   */
  if (node.type === 'text') {
    return h(Text, node.value)
  }

  const originalTag = node.tag!
  // `_ignoreMap` is an special prop to disables tag-mapper
  const renderTag: string = findMappedTag(node as MDCElement, documentMeta.tags)

  if (node.tag === 'binding') {
    return renderBinding(node, h, documentMeta, parentScope)
  }

  const component = resolveVueComponent(renderTag)
  if (typeof component === 'object') {
    component.tag = originalTag
  }

  const props = propsToData(node, documentMeta)

  return h(
    component as any,
    props,
    renderSlots(node, h, documentMeta, { ...parentScope, ...props })
  )
}

function renderBinding (node: MDCElement, h: CreateElement, documentMeta: MDCData, parentScope: any = {}): VNode {
  const data = {
    ...parentScope,
    $route: () => useRoute(),
    $document: documentMeta,
    $doc: documentMeta
  }
  const splitter = /\.|\[(\d+)\]/
  const keys: string[] = node.props?.value.trim().split(splitter).filter(Boolean)
  const value = keys.reduce((data, key) => {
    if (key in data) {
      if (typeof data[key] === 'function') {
        return data[key]()
      } else {
        return data[key]
      }
    }
    return {}
  }, data)
  const defaultValue = node.props?.defaultValue

  return h(Text, value ?? defaultValue ?? '')
}

/**
 * Create slots from `node` template children.
 */
function renderSlots (node: MDCNode, h: CreateElement, documentMeta: MDCData, parentProps: any): Record<string, () => VNode[]> {
  const children: MDCNode[] = (node as MDCElement).children || []

  const slotNodes: Record<string, MDCNode[]> = children.reduce((data, node) => {
    if (!isTemplate(node)) {
      data[DEFAULT_SLOT].push(node)
      return data
    }

    const slotName = getSlotName(node)
    data[slotName] = data[slotName] || []
    if (node.type === 'element') {
      // Append children to slot
      data[slotName].push(...(node.children || []))
    }

    return data
  }, {
    [DEFAULT_SLOT]: [] as any[]
  } as Record<string, any[]>)

  const slots = Object.entries(slotNodes).reduce((slots, [name, children]) => {
    if (!children.length) { return slots }

    slots[name] = () => {
      const vNodes = children.map(child => renderNode(child, h, documentMeta, parentProps))
      return mergeTextNodes(vNodes)
    }

    return slots
  }, {} as Record<string, () => VNode[]>)

  return slots
}

/**
 * Create component data from node props.
 */
function propsToData (node: MDCElement, documentMeta: MDCData) {
  const { tag = '', props = {} } = node
  return Object.keys(props).reduce(function (data, key) {
    // Ignore internal `__ignoreMap` prop.
    if (key === '__ignoreMap') { return data }

    const value = props[key]

    // `v-model="foo"`
    if (rxModel.test(key) && !nativeInputs.includes(tag)) {
      return propsToDataRxModel(key, value, data, documentMeta)
    }

    // `v-bind="{foo: 'bar'}"`
    if (key === 'v-bind') {
      return propsToDataVBind(key, value, data, documentMeta)
    }

    // `v-on="foo"`
    if (rxOn.test(key)) {
      return propsToDataRxOn(key, value, data, documentMeta)
    }

    // `:foo="bar"`, `v-bind:foo="bar"`
    if (rxBind.test(key)) {
      return propsToDataRxBind(key, value, data, documentMeta)
    }

    const { attribute } = find(html, key)

    // Join string arrays using space, see: https://github.com/nuxt/content/issues/247
    if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
      data[attribute] = value.join(' ')
      return data
    }

    data[attribute] = value

    return data
  }, {} as any)
}

/**
 * Handle `v-model`
 */
function propsToDataRxModel (key: string, value: any, data: any, documentMeta: MDCData) {
  // Model modifiers
  const number = (d: any) => +d
  const trim = (d: any) => d.trim()
  const noop = (d: any) => d

  const mods = key
    .replace(rxModel, '')
    .split('.')
    .filter(d => d)
    .reduce((d, k) => {
      d[k] = true
      return d
    }, {} as any)

  // As of yet we don't resolve custom v-model field/event names from components
  const field = 'value'
  const event = mods.lazy ? 'change' : 'input'
  const processor = mods.number ? number : mods.trim ? trim : noop
  data[field] = evalInContext(value, documentMeta)
  data.on = data.on || {}
  data.on[event] = (e: any) => ((documentMeta as any)[value] = processor(e))

  return data
}

/**
 * Handle object binding `v-bind`
 */
function propsToDataVBind (_key: string, value: any, data: any, documentMeta: MDCData) {
  const val = evalInContext(value, documentMeta)
  data = Object.assign(data, val)
  return data
}

/**
 * Handle `v-on` and `@`
 */
function propsToDataRxOn (key: string, value: any, data: any, documentMeta: MDCData) {
  key = key.replace(rxOn, '')
  data.on = data.on || {}
  data.on[key] = () => evalInContext(value, documentMeta)
  return data
}

/**
 * Handle single binding `v-bind:` and `:`
 */
function propsToDataRxBind (key: string, value: any, data: any, documentMeta: MDCData) {
  key = key.replace(rxBind, '')
  data[key] = evalInContext(value, documentMeta)
  return data
}

/**
 * Resolve component if it's a Vue component
 */
const resolveVueComponent = (component: any) => {
  // Check if node is not a native HTML tag
  if (!htmlTags.includes(component) && !component?.render && !component?.ssrRender) {
    const componentFn = resolveComponent(pascalCase(component), false)
    // If component exists
    if (typeof componentFn === 'object') {
      return componentFn
    }
  }
  return component
}

/**
 * Evaluate value in specific context
 */
function evalInContext (code: string, context: any) {
  // Retrive value from context
  const result = code
    .split('.')
    .reduce((o: any, k) => typeof o === 'object' ? o[k] : undefined, context)

  return typeof result === 'undefined' ? destr(code) : result
}

/**
 * Get slot name out of a node
 */
function getSlotName (node: MDCNode) {
  let name = ''
  for (const propName of Object.keys((node as MDCElement).props || {})) {
    // Check if prop name correspond to a slot
    if (!propName.startsWith('#') && !propName.startsWith('v-slot:')) {
      continue
    }
    // Get slot name
    name = propName.split(/[:#]/, 2)[1]
    break
  }
  return name || DEFAULT_SLOT
}

/**
 * Check if node is Vue template tag
 */
function isTemplate (node: MDCNode) {
  return (node as MDCElement).tag === 'template'
}

/**
 * Merge consequent Text nodes into single node
 */
function mergeTextNodes (nodes: Array<VNode>) {
  const mergedNodes: Array<VNode> = []
  for (const node of nodes) {
    const previousNode = mergedNodes[mergedNodes.length - 1]
    if (node.type === Text && previousNode?.type === Text) {
      previousNode.children = (previousNode.children as string) + node.children
    } else {
      mergedNodes.push(node)
    }
  }
  return mergedNodes
}

async function resolveContentComponents (body: MDCRoot, meta: Record<string, any>) {
  if (!body) {
    return
  }

  const components = Array.from(new Set(loadComponents(body, meta)))
  await Promise.all(components.map(async (c: any) => {
    if (c?.render || c?.ssrRender || c?.__ssrInlineRender) {
      return
    }
    const resolvedComponent = resolveVueComponent(c) as any
    if (resolvedComponent?.__asyncLoader && !resolvedComponent.__asyncResolved) {
      await resolvedComponent.__asyncLoader()
    }
  }))

  function loadComponents (node: MDCRoot | MDCNode, documentMeta: Record<string, any>) {
    const tag = (node as MDCElement).tag

    if (node.type === 'text' || tag === 'binding') {
      return []
    }

    const renderTag: string = findMappedTag(node as MDCElement, documentMeta.tags)

    const components: string[] = []
    if (node.type !== 'root' && !htmlTags.includes(renderTag as any)) {
      components.push(renderTag)
    }
    for (const child of (node.children || [])) {
      components.push(...loadComponents(child, documentMeta))
    }
    return components
  }
}

function findMappedTag (node: MDCElement, tags: Record<string, string>) {
  const tag = node.tag

  if (!tag || typeof (node as MDCElement).props?.__ignoreMap !== 'undefined') {
    return tag
  }

  return tags[tag] || tags[pascalCase(tag)] || tags[kebabCase(node.tag)] || tag

}
</script>
