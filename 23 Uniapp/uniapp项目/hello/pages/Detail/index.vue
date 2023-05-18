<template>
	<view>
		<view>这是message中detail的详情页</view>
		<DemoComp></DemoComp>
	</view>
</template>

<script>
import DemoComp from '../../components/DemoComp/index.vue'
export default {
	name: 'Detail',
	components: {
		DemoComp
	},
	data() {
		return {
			title: 111111
		}
	},
}
</script>

<style>
.demo{
	width: 200px;
	height: 200px;
	background: url(../../static/images/tabs/contact-active.png);
}
</style>
