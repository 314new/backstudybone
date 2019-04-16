//  定义路由的时候不要使用前斜杠
App.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'home',
        'zhangjing': 'helloZhangjing',
        'zhangshuo': 'helloZhangshuo'
    },

    home: function() {
        console.log('我们有一个家')
    },
    helloZhangjing: function() {
        console.log('我是张静')
    },
    helloZhangshuo: function() {
        console.log('我是张烁')
    }
})