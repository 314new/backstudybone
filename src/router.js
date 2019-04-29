var Book = Backbone.Model.extend({
    id: 'book',
    idAttribute: 'name',    //  将此字段的值映射到id上
    defaults: {
        'name': '知否知否，应知红肥绿馊',
        'author': '张静',
        'pushTime': '2019-4-29'
    },
    initialize: function(initData) {
        this.defaults = initData
    },
    changed: function(data) {
        console.log(data)
    }
})

//  定义路由的时候不要使用前斜杠
App.Routers.Main = Backbone.Router.extend({
    routes: {
        '': 'home',
        'zhangjing': 'helloZhangjing',
        'zhangshuo': 'helloZhangshuo',
        'news/:type/:page': 'getNews'
    },

    home: function() {
        //  创建新的书籍对象
        let book = new Book({
            'name': '复仇者联盟4',
            'author': '张静',
            'pushTime': '2019-4-29'
        })

        //  监听事件，用于监听当前对象属性的不变化的函数
        book.on('change', function() {
            //  判断当前变化的属性是否为name属性值（下面我们可以针对属性进行监听操作）
            if (book.hasChanged('name')) {
                console.log('哼，谁让你更新人家的书名的')    
            }
        })
        //  这里可以写多个change的监听事件的，但是要注意在监听指定属性的change事件的时候，我们要注意
        //  冒号后面一定不能遗留空格，因为空格是为了多个属性准备的
        //  这里先进行执行
        book.on("change:name change:author", function() {
            console.log('你好，楼上的你累不累啊，我是很有针对性的哦！')
        })
        
        //  获取id属性， 存在idAttribute的情况下，其值是idAttributes属性所对应的值
        //  所以这里是 复仇者联盟4
        console.log(book.id)

        //  将id属性的值关联到哪里，这里是name属性值
        console.log(book.idAttribute)

        //  模型状态的内部的散列表, 就是defaul中的内容
        console.log(book.attributes)

        //  更改书籍对象的name值属性
        book.set({'name': '欢'})
        //  当用户设置了slient: true选项属性后属性的变化将不能被change事件监听得到
        //  book.set({'name': '欢'}, {silent: true})
        //  打印出book的数据解构，为一下内容
        // {
        //     attributes: {name: "欢", author: "张静", pushTime: "2019-4-29"}
        //     changed: {name: "欢"}
        //     cid: "c1"
        //     defaults: {name: "复仇者联盟4", author: "张静", pushTime: "2019-4-29"}
        //     _changing: false
        //     _pending: false
        //     _previousAttributes: {name: "复仇者联盟4", author: "张静", pushTime: "2019-4-29"}
        //     __proto__: Backbone.Model
        // }
        console.log(book)


        //  防止XSS攻击
        let xss = new Book({
            'name': '<script>alert("你被攻击了")</script>',
            'author': '怎么办？',
            'pushTime': '要防止XSS攻击'
        })
        console.log(xss.has("name"))
        //  判断当前的数据属性是否存在
        //  属性值为非 null 或非 undefined 时返回 true
        if(xss.has("name")) {
            //  <script>alert("你被攻击了")</script>
            //  这样用户输入的数据容易被执行的
            console.log(xss.get('name'))
            //  &lt;script&gt;alert(&quot;你被攻击了&quot;)&lt;/script&gt;
            //  这样用户输入的标签符号会被对应的字符集所代替，攻击代码就不会执行了
            alert(xss.escape('name'));
        }
    },
    helloZhangjing: function() {
        console.log('我是张静')
    },
    helloZhangshuo: function() {
        console.log('我是张烁')
    },
    getNews: function (type, page) {
        console.log(type)
        console.log(page)
    }
})