class Watch{
    constructor(vm,explor,cb){
        console.log("vm123",vm);
        console.log("vm123",explor);
        Orderpublish.target = this;
        this.$vm = vm;
        this.$explor = explor;
        this.$cb = cb;
        this.oldValue = this.getValue();
        Orderpublish.target = null;
    }
    getValue(){
        return this.transformValue(this.$explor)
    }
    transformValue(explor){
        var splitArr = explor.split(".");
        var splitValue = splitArr.reduce(function(prev,next){
            return prev[next];
        },this.$vm.$data);
        return splitValue;
    }
    update(){
        var newValue = this.getValue();
        if(this.oldValue!=newValue){
            this.$cb(newValue);
        }
    }
}