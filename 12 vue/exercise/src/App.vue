<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import 'ace-builds/src-noconflict/mode-javascript' // 引入 JavaScript 模式支持
import 'ace-builds/src-noconflict/theme-github' // 引入 GitHub 主题样式

import HelloWorld from './components/HelloWorld.vue'
import Father from './components/Father/index.vue'
import DraggerBanner from './components/DraggerBanner.vue'

// 定义编辑器的内容、语言模式、主题和配置选项
const content = ref(`console.log('Hello, Ace Editor!');`) // 初始化代码内容
const language = ref('javascript') // 设置默认语言为 JavaScript
const theme = ref('github') // 设置默认主题为 GitHub 风格

// 编辑器的配置选项，如字体大小、是否显示打印边距等
const editorOptions = ref({
  fontSize: '14px', // 设置字体大小
  showPrintMargin: false, // 是否显示打印边距
  enableLiveAutocompletion: true // 启用实时自动补全功能
})

// const count = ref(0)
const computedCount = computed(() => {
  return setTimeout(() => {
    count.value + 1
  }, 1000)
})
const handleClick = (one: any, two: any, three: any, event: any) => {
  console.log(one, two, three, event)
}

const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1
  }
})

plusOne.value = 3
// console.log(count.value) // 0
console.log(plusOne.value) // 0
console.log(count.value) // 0

// console.log(11111, content.value)
// // 监听 content 变量的变化
// watch(content, (newValue, oldValue) => {
//   console.log('content changed from', oldValue, 'to', newValue)
// })

</script>

<template>
  <div>{{ count }}</div>
  <h3>computed:{{ computedCount }}</h3>
  <button @click="handleClick(1, 2, 3, $event)">test</button>
  <!-- <Father></Father> -->
  <draggerBanner>
    <template #left>这是左边</template>
    <template #right>
      <VAceEditor
        v-model:value="content"
        :lang="language"
        :theme="theme"
        :options="editorOptions"
        style="height: 500px; width: 100%"
      />
    </template>
  </draggerBanner>
  <!-- <HelloWorld msg="呵呵呵呵"></HelloWorld> -->
</template>

<style scoped></style>
