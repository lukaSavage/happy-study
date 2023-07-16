<template>
  <view>
    <uni-swipe-action>
      <uni-swipe-action-item :right-options="options" @click="bindClick" @change="swipeChange($event, index)">
        <view>item1</view>
      </uni-swipe-action-item>
      <uni-swipe-action-item :right-options="options" @click="bindClick" @change="swipeChange($event, index)">
        <view>item2</view>
      </uni-swipe-action-item>
      <uni-swipe-action-item :right-options="options" @click="bindClick" @change="swipeChange($event, index)">
        <view>item3</view>
      </uni-swipe-action-item>
    </uni-swipe-action>
  </view>
</template>

<script>
export default {
  name: 'DemoComp',
  data() {
    return {
      test: '',
	  options:[
        {
            text: '取消',
            style: {
                backgroundColor: '#007aff'
            }
        }, {
            text: '确认',
            style: {
                backgroundColor: '#dd524d'
            }
        }
      ]
    }
  },
  methods:{
    onClick(e){
      console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
    },
    swipeChange(e,index){
      console.log('当前状态：'+ e +'，下标：' + index)
    }
  },
  mounted() {
    this.test = this.$parent.$data.title
    console.log(this.test)
  }
}
</script>

<style></style>
