// components/cop1/cop1.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: String,
            value: 'hehe'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        compClick() {
            console.log(this.selectOwnerComponent().data);
            this.triggerEvent('myClick', { data: 'success!' }, {})
        }
    }
})
