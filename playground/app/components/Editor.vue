<template>
  <div ref="editorContainer" class="h-full w-full" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import loader from '@monaco-editor/loader'
import { language as mdc } from '@nuxtlabs/monarch-mdc'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'mdc'
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  theme: {
    type: String,
    default: 'vs-dark'
  }
})

const emit = defineEmits(['update:code'])
const editorContainer = ref(null)
let editor = null

onMounted(async () => {
  const monaco = await loader.init()

  // Register the MDC language
  monaco.languages.register({ id: 'mdc' })
  monaco.languages.setMonarchTokensProvider('mdc', mdc)

  editor = monaco.editor.create(editorContainer.value, {
    value: props.code,
    language: props.language,
    theme: props.theme,
    automaticLayout: true,
    readOnly: props.readOnly,
    minimap: {
      enabled: false
    },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    roundedSelection: false,
    padding: {
      top: 8
    },
    bracketPairColorization: {
      enabled: true
    },
    formatOnPaste: true,
    formatOnType: true
  })

  editor.onDidChangeModelContent(() => {
    emit('update:code', editor.getValue())
  })

  monaco.editor.setTheme(props.theme)
})

watch(() => props.code, (newCode) => {
  if (editor && editor.getValue() !== newCode) {
    editor.setValue(newCode)
  }
})

watch(() => props.language, (newLanguage) => {
  if (editor) {
    const model = editor.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, newLanguage === 'vue' ? 'mdc' : newLanguage)
    }
  }
})

watch(() => props.theme, (newTheme) => {
  if (editor) {
    monaco.editor.setTheme(newTheme)
  }
})
</script>
