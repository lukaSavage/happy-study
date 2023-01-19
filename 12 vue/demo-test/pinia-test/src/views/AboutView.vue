<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useStrStore } from '@/stores/counter2'
const countStore = useCounterStore()
const { increment } = countStore
const handleClick = () => {
    increment()
}

const countStore2 = useStrStore()
const { increment2 } = countStore2
const handleClick2 = () => {
    increment2(233)
}
</script>

<template>
    <div class="about">
        <h1>This is an about page</h1>
        <span style="color: #f00; fontsize: 50px">{{
            countStore.doubleCount
        }}</span>
        <h3 style="color: #08e">{{ countStore2.currentStr }}</h3>
        <button @click="handleClick">点我+1</button>
        <button @click="handleClick2">测试第二个btn</button>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
