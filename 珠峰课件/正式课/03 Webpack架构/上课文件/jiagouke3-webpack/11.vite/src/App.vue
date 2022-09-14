<template>
  <div>
    hello
    <img src="@/assets/kf.jpg" />
    <img :src="avatarUrl" />
    <div class="avatar"></div>
    <HelloWorld msg="hello" />
  </div>
</template>
<script setup>
//exposes all its top level bindings to the template
import HelloWorld from "@/components/HelloWorld.vue";
import avatarUrl from "@/assets/kf.jpg";
fetch("/api/get")
  .then((res) => res.json())
  .then((res) => console.log(res));
</script>
<style scoped>
.avatar {
  width: 200px;
  height: 200px;
  background-image: url(@/assets/kf.jpg);
  background-size: contain;
}
</style>
