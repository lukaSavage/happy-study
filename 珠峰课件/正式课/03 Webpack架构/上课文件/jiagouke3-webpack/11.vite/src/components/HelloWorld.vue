<template>
  <div>
    <h1>{{ msg }}</h1>

    <h2>less</h2>
    <h3>scss</h3>
    <div class="postcss"></div>
    <button @click="handleClick">{{ state.count }}</button>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import * as style from "./HelloWorld.module.css";

defineProps({
  msg: String,
});
interface State {
  count: number;
}
let state = reactive<State>({ count: 0 });
const handleClick = () => {
  state.count++;
};
</script>
<style scoped lang="less">
@color: red;
h2 {
  color: @color;
}
</style>
<style scoped lang="scss">
$color: green;
h3 {
  color: $color;
}
</style>
<style scoped>
.postcss {
  height: 50px;
  width: 200px;
  background-color: orange;
  transform: rotate(90deg);
}
</style>
