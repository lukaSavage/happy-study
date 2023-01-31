<script setup lang="ts">
import { computed, ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const count = ref(0)
const computedCount = computed(() => {
    let a = 222;
    
    return setTimeout(() => {
        a = count.value + 1
    }, 1000);
})
const handleClick = () => { }
</script>

<template>
    <div>{{ count }}</div>
    <h3>computed:{{ computedCount }}</h3>
    <button @click="handleClick">test</button>
    <HelloWorld msg="呵呵呵呵"></HelloWorld>
</template>

<style scoped>

</style>

