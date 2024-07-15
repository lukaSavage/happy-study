<script setup lang="ts">
import { computed, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const count = ref(0)
const computedCount = computed(() => {
    return setTimeout(() => {
        count.value + 1
    }, 1000)
})
const handleClick = (one, two, three, event) => {
    console.log(one, two, three,event)
}

</script>

<template>
    <div>{{ count }}</div>
    <h3>computed:{{ computedCount }}</h3>
    <button @click="handleClick(1, 2, 3,$event)">test</button>
    <HelloWorld msg="呵呵呵呵"></HelloWorld>
</template>

<style scoped></style>
