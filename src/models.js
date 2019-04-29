var Book = Backbone.Model.extend({
    defaults: function() {
        return {
            'name': '知否知否，应知红肥绿馊',
            'author': '张静',
            'pushTime': '2019-4-29'
        }
    },
    initialize: function(initData) {
        this.defaults = initData
    },
    changed: function(data) {
        console.log(data)
    }
})