<template>
  <view @click="myClick">
    <!-- #ifdef H5 -->
    <view>我吸完在h5页面中展示</view>
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view>我希望只在微信小程序页面中看见</view>
    <!-- #endif -->
    <!-- <navigator url="pages/Detail/index" open-type="switchTab">跳转到首页</navigator> -->
  </view>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      xxx: 1
    }
  },
  methods: {
    myClick() {
      console.log(111111)
    }
  }
}
</script>

<style>
view {
  width: 375rpx;
  height: 375rpx;
  background-color: #ccc;
}
</style>
