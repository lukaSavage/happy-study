// components/my-search-tabs/my-search-tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabData: {
        type: Array,
        value: []
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
    clickTab(e){
        const { item } = e.currentTarget.dataset;
        this.triggerEvent('myclick',{id: item.id},{})
    }
  },
  lifetimes: {
    created: function(){
        console.log(111111);
    },
    attached(){
      console.log('组件创建了');
    },
    detached(){
      console.log('组件销毁了~');
    }
  },
  
  
})
