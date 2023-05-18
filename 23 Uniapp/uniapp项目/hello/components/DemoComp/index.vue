<template>
	<view>
		<text>这是子组件</text>
		<text>{{ test }}</text>
		
	</view>
</template>

<script>
export default {
	name: 'DemoComp',
	data() {
		return {
			test: ''
		}
	},
	mounted() {
		this.test = this.$parent.$data.title
		console.log(this.test)
	}
}
</script>

<style>
</style>
