<script setup lang="ts">
import { computed, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Father from './components/Father/index.vue'

// const count = ref(0)
// const computedCount = computed(() => {
//   return setTimeout(() => {
//     count.value + 1
//   }, 1000)
// })
// const handleClick = (one, two, three, event) => {
//   console.log(one, two, three, event)
// }

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
</script>

<template>
  <div>{{ count }}</div>
  <h3>computed:{{ computedCount }}</h3>
  <button @click="handleClick(1, 2, 3, $event)">test</button>
  <Father></Father>
  <!-- <HelloWorld msg="呵呵呵呵"></HelloWorld> -->
</template>

<style scoped></style>
